import type { Thing, WithContext } from "schema-dts";

interface JsonLdProps {
  readonly data: WithContext<Thing>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
