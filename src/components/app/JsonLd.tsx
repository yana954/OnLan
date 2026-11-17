import type { JsonLdNode } from '@/lib/structuredData';

interface JsonLdProps {
    data: JsonLdNode | JsonLdNode[];
}

/**
 * Server-rendered JSON-LD. `<` is escaped so a stray `</script>` inside content
 * can never break out of the tag — the payload is data, never markup.
 */
export default function JsonLd({ data }: JsonLdProps) {
    const json = JSON.stringify(data).replace(/</g, '\\u003c');

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
