type JsonLdValue = Record<string, unknown> | readonly Record<string, unknown>[];

function serializeJsonLd(value: JsonLdValue) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function JsonLdScript({
  id,
  value,
}: {
  id: string;
  value: JsonLdValue;
}) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd(value),
      }}
    />
  );
}
