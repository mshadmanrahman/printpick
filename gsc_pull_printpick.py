#!/usr/bin/env python3
from __future__ import annotations

import csv
import json
import os
import subprocess
import sys
import tempfile
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import date, timedelta
from pathlib import Path

SITE = 'sc-domain:printpick.dev'
PROJECT = 'shadmans-sandbox'
# Workspace root. Derived from this file's location (repo lives at <workspace>/_opensource/printpick)
# so the script is portable; override with VIBECODING_ROOT if the layout differs.
WORKSPACE = Path(os.environ.get('VIBECODING_ROOT') or Path(__file__).resolve().parents[2])
OUTDIR = Path(os.environ.get('PRINTPICK_GSC_OUTDIR', WORKSPACE / '_tools/printpick-analytics/gsc-csv'))
OUTDIR.mkdir(parents=True, exist_ok=True)

ADC_PATH = Path(os.environ.get('GOOGLE_APPLICATION_CREDENTIALS', Path.home() / '.config/gcloud/application_default_credentials.json'))
SERVICE_ACCOUNT_KEY = Path(os.environ['GSC_KEY_FILE']) if os.environ.get('GSC_KEY_FILE') else None
REQUIRED_SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly'

end = date.today() - timedelta(days=2)  # GSC usually lags
start = end - timedelta(days=27)
prev_end = start - timedelta(days=1)
prev_start = prev_end - timedelta(days=27)

def _b64url(raw: bytes) -> str:
    import base64
    return base64.urlsafe_b64encode(raw).rstrip(b'=').decode()


def service_account_token() -> str | None:
    if SERVICE_ACCOUNT_KEY is None or not SERVICE_ACCOUNT_KEY.exists():
        return None
    key = json.loads(SERVICE_ACCOUNT_KEY.read_text())
    if key.get('type') != 'service_account':
        return None
    now = int(time.time())
    header = {'alg': 'RS256', 'typ': 'JWT'}
    claim = {
        'iss': key['client_email'],
        'scope': REQUIRED_SCOPE,
        'aud': 'https://oauth2.googleapis.com/token',
        'iat': now,
        'exp': now + 3600,
    }
    unsigned = '.'.join([
        _b64url(json.dumps(header, separators=(',', ':')).encode()),
        _b64url(json.dumps(claim, separators=(',', ':')).encode()),
    ])
    with tempfile.NamedTemporaryFile('w', delete=False) as f:
        f.write(key['private_key'])
        private_key_path = f.name
    try:
        sig = subprocess.run(
            ['openssl', 'dgst', '-sha256', '-sign', private_key_path],
            input=unsigned.encode(),
            capture_output=True,
            check=True,
        ).stdout
    finally:
        Path(private_key_path).unlink(missing_ok=True)
    assertion = unsigned + '.' + _b64url(sig)
    data = urllib.parse.urlencode({
        'grant_type': 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        'assertion': assertion,
    }).encode()
    with urllib.request.urlopen(urllib.request.Request('https://oauth2.googleapis.com/token', data=data), timeout=30) as r:
        return json.loads(r.read().decode())['access_token']


def adc_token() -> str:
    """Refresh ADC directly instead of shelling to gcloud.

    `gcloud auth application-default print-access-token` can fail in non-interactive
    runs when reauth is required even though the local ADC refresh token is usable.
    Direct OAuth refresh gives clearer errors and avoids cron-only gcloud failures.
    """
    if not ADC_PATH.exists():
        raise SystemExit(f'ADC file missing: {ADC_PATH}. Run: gcloud auth application-default login --scopes={REQUIRED_SCOPE}')
    creds = json.loads(ADC_PATH.read_text())
    required = ['client_id', 'client_secret', 'refresh_token']
    missing = [k for k in required if not creds.get(k)]
    if missing:
        raise SystemExit(f'ADC file {ADC_PATH} missing fields: {missing}')
    data = urllib.parse.urlencode({
        'client_id': creds['client_id'],
        'client_secret': creds['client_secret'],
        'refresh_token': creds['refresh_token'],
        'grant_type': 'refresh_token',
    }).encode()
    try:
        with urllib.request.urlopen(urllib.request.Request('https://oauth2.googleapis.com/token', data=data), timeout=30) as r:
            return json.loads(r.read().decode())['access_token']
    except urllib.error.HTTPError as e:
        body = e.read().decode(errors='replace')
        raise SystemExit(f'ADC refresh failed from {ADC_PATH}: HTTP {e.code}: {body[:800]}')


def token() -> str:
    # Short-lived user token override for manual recovery. Do not persist this in shell profiles or cron.
    if os.environ.get('GSC_ACCESS_TOKEN'):
        return os.environ['GSC_ACCESS_TOKEN']
    return service_account_token() or adc_token()

TOK = token()

def query(start_date, end_date, dimensions, row_limit=25000, dimension_filter_groups=None):
    body = {
        'startDate': start_date.isoformat(),
        'endDate': end_date.isoformat(),
        'dimensions': dimensions,
        'rowLimit': row_limit,
        'dataState': 'final',
    }
    if dimension_filter_groups:
        body['dimensionFilterGroups'] = dimension_filter_groups
    url = 'https://www.googleapis.com/webmasters/v3/sites/' + urllib.parse.quote(SITE, safe='') + '/searchAnalytics/query'
    req = urllib.request.Request(url, data=json.dumps(body).encode(), method='POST', headers={
        'Authorization': 'Bearer ' + TOK,
        'X-Goog-User-Project': PROJECT,
        'Content-Type': 'application/json',
    })
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return json.loads(r.read().decode()).get('rows', [])
    except urllib.error.HTTPError as e:
        body = e.read().decode(errors='replace')
        if e.code == 403 and 'ACCESS_TOKEN_SCOPE_INSUFFICIENT' in body:
            raise SystemExit(
                'GSC token lacks Search Console scope. Fix once with: '
                f'gcloud auth application-default login --scopes={REQUIRED_SCOPE},https://www.googleapis.com/auth/cloud-platform'
            )
        if e.code == 403 and 'sufficient permission for site' in body and SERVICE_ACCOUNT_KEY is not None and SERVICE_ACCOUNT_KEY.exists():
            key = json.loads(SERVICE_ACCOUNT_KEY.read_text())
            email = key.get('client_email', str(SERVICE_ACCOUNT_KEY))
            raise SystemExit(
                f'GSC service account lacks access to {SITE}. Add {email} in Search Console → Settings → Users and permissions, then rerun.'
            )
        raise SystemExit(f'GSC query failed: HTTP {e.code}: {body[:1200]}')

def save(name, rows, dimensions):
    path = OUTDIR / name
    with path.open('w', newline='') as f:
        w = csv.writer(f)
        w.writerow(dimensions + ['clicks','impressions','ctr','position'])
        for row in rows:
            w.writerow(row.get('keys',[]) + [row.get('clicks'), row.get('impressions'), row.get('ctr'), row.get('position')])
    return path

reports = {}
for label, s, e in [('current', start, end), ('previous', prev_start, prev_end)]:
    reports[label] = {
        'query': query(s,e,['query']),
        'page': query(s,e,['page']),
        'page_query': query(s,e,['page','query']),
        'country': query(s,e,['country']),
        'device': query(s,e,['device']),
    }
    for dims, rows in reports[label].items():
        save(f'{label}_{dims}_{s}_{e}.csv', rows, dims.split('_'))

summary = {
    'site': SITE,
    'current': {'start': start.isoformat(), 'end': end.isoformat()},
    'previous': {'start': prev_start.isoformat(), 'end': prev_end.isoformat()},
}
(OUTDIR/'summary.json').write_text(json.dumps(summary, indent=2))
print(json.dumps(summary, indent=2))
print('OUTDIR', OUTDIR)
