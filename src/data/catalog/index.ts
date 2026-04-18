import rawCatalog from "./printer-catalog.json";
import type { CatalogRecord, CatalogStore } from "./types";

export const printerCatalog = rawCatalog as CatalogStore;

export function getCatalogRecordBySlug(slug: string): CatalogRecord | undefined {
  return printerCatalog.records.find((record) => record.slug === slug);
}

export function getCatalogRecordsByValidationState(state: CatalogRecord["validation"]["state"]): readonly CatalogRecord[] {
  return printerCatalog.records.filter((record) => record.validation.state === state);
}

