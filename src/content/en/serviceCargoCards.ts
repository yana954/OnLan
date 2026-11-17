import { SERVICE_CARGO_SECTIONS, type ServiceCargoSection } from '@/content/serviceCargoCards';

/**
 * English copy for the "what we ship" cards. Icons and image seeds come from
 * the Ukrainian source (same order), only the visible text is translated.
 * `headingHighlight` must stay a substring of `heading`.
 */
type SectionText = {
    eyebrow: string;
    heading: string;
    headingHighlight: string;
    /** [title, route] in the same order as the Ukrainian cards */
    cards: [string, string][];
};

const TEXT: Record<string, SectionText> = {
    automotive: {
        eyebrow: 'What we ship',
        heading: 'What we transport by road',
        headingHighlight: 'transport by road',
        cards: [
            ['Furniture and home goods', 'Italy • Poland • Germany → Ukraine'],
            ['Palletised cargo', 'EU → Ukraine'],
            ['Building materials', 'Poland • Czechia • Germany → Ukraine'],
            ['Equipment and spare parts', 'Netherlands • Belgium → Ukraine'],
            ['Refrigerated transport', 'Europe → Ukraine'],
            ['Groupage cargo (LTL)', 'Europe → Ukraine'],
            ['Goods for retail chains', 'EU → Ukraine'],
        ],
    },
    'sea-container': {
        eyebrow: 'Sea lines',
        heading: 'What cargo we deliver by sea',
        headingHighlight: 'deliver by sea',
        cards: [
            ['Furniture from China', 'China → Ukraine'],
            ['Electronics and home appliances', 'China • Southeast Asia → Ukraine'],
            ['Textiles and clothing', 'China • Turkey → Ukraine'],
            ['Marketplace goods', 'China → EU • Ukraine'],
            ['Equipment and components', 'Asia • Europe → Ukraine'],
            ['Industrial goods', 'China → Ukraine'],
            ['Large shipments', 'FCL • LCL worldwide'],
        ],
    },
    air: {
        eyebrow: 'Air',
        heading: 'What cargo air freight is suited for',
        headingHighlight: 'air freight is suited for',
        cards: [
            ['Electronics', 'EU • USA • Asia → Ukraine'],
            ['Expensive goods', 'Express door-to-door'],
            ['Urgent deliveries', '24–72 hours'],
            ['Spare parts', 'Europe → Ukraine'],
            ['Product samples', 'Small shipments • fast'],
            ['Small consignments', 'Consolidation at hubs'],
        ],
    },
    rail: {
        eyebrow: 'Rail',
        heading: 'What we ship by rail',
        headingHighlight: 'ship by rail',
        cards: [
            ['Industrial cargo', 'Europe • Asia → Ukraine'],
            ['Building materials', 'Regular shipments'],
            ['Equipment', 'Container trains'],
            ['Raw materials', 'Wagon shipments'],
            ['Large consignments of goods', 'Stable schedule'],
            ['Containers from China', 'China — Europe — Ukraine'],
        ],
    },
    oversized: {
        eyebrow: 'Project logistics',
        heading: 'What projects we support',
        headingHighlight: 'projects we support',
        cards: [
            ['Industrial equipment', 'Factory → installation site'],
            ['Construction machinery', 'Special permits • escort'],
            ['Metal structures', 'Lowboys • low-loaders'],
            ['Tanks', 'Oversized • project logistics'],
            ['Special vehicles', 'Route planned for the dimensions'],
            ['Large-dimension cargo', 'Lashing engineering'],
        ],
    },
    customs: {
        eyebrow: 'Customs',
        heading: 'What cargo we provide customs support for',
        headingHighlight: 'customs support',
        cards: [
            ['Goods from China', 'Import for free circulation'],
            ['Electronics', 'HS code classification'],
            ['Equipment', 'Certificates • permits'],
            ['Furniture', 'Import • export'],
            ['Textiles', 'Preferences • EUR.1'],
            ['Industrial goods', 'Customs payment forecast'],
        ],
    },
    multimodal: {
        eyebrow: 'Multimodal freight',
        heading: 'What cargo we ship multimodally',
        headingHighlight: 'ship multimodally',
        cards: [
            ['Large consignments of goods', 'Sea + rail + road'],
            ['Imports from China', 'Door-to-door'],
            ['Equipment', 'Optimal legs'],
            ['Electronics', 'Air + road if needed'],
            ['Furniture', 'Sea + last-mile road'],
            ['E-commerce goods', 'LCL • LTL • multimodal'],
        ],
    },
};

export const SERVICE_CARGO_SECTIONS_EN: Record<string, ServiceCargoSection> = Object.fromEntries(
    Object.entries(SERVICE_CARGO_SECTIONS).map(([key, section]) => {
        const text = TEXT[key];
        if (!text || text.cards.length !== section.cards.length) {
            throw new Error(`English cargo copy for "${key}" is missing or has a different card count`);
        }
        return [
            key,
            {
                eyebrow: text.eyebrow,
                heading: text.heading,
                headingHighlight: text.headingHighlight,
                cards: section.cards.map((card, index) => ({
                    ...card,
                    title: text.cards[index]![0],
                    route: text.cards[index]![1],
                })),
            },
        ];
    }),
);
