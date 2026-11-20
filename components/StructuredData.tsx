import { jsonLd } from "@/lib/seo";

/** Emits schema.org JSON-LD. Build nodes with the helpers in lib/seo.ts. */
export default function StructuredData({ nodes }: { nodes: Record<string, unknown>[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(nodes) }} />;
}
