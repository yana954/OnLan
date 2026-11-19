import { DIRECTIONS, type DirectionContent } from '@/content/directions';

/**
 * English landing-page copy for `/en/directions/[slug]`. `slug`, `serviceSlug`
 * and `related` are shared with the Ukrainian source so links never diverge.
 *
 * As in the Ukrainian version, transit times are APPROXIMATE ranges, not
 * guarantees, and no prices are quoted.
 */
export const TERMS_DISCLAIMER_EN =
    'Transit times are approximate: they depend on the route, season, line capacity and customs clearance. We give exact timings for each specific shipment.';

type DirectionText = Omit<DirectionContent, 'slug' | 'related'>;

const TEXT: Record<string, DirectionText> = {
    china: {
        label: 'Asia',
        title: 'Shipping from China and Asia to Ukraine',
        lead: 'We deliver cargo from China, Turkey and other Asian countries by sea, rail or air — with documents and turnkey customs clearance.',
        quick: [
            'Three ways to ship: sea (FCL and LCL), rail and air',
            'Main origin countries: China, Turkey, other Asian countries',
            'Approximate transit: air — from 5 days, rail — from 20, sea — from 35',
            'One manager handles the cargo from the sender’s warehouse to handover',
        ],
        seo: {
            title: 'Shipping from China to Ukraine: Sea, Rail, Air | OnLan',
            description:
                'Freight from China and Asia to Ukraine: sea FCL/LCL, rail, air. Turnkey customs clearance and one manager along the route. Quote on request.',
        },
        sections: [
            {
                heading: 'What is the best way to ship cargo from China: sea, rail or air?',
                paragraphs: [
                    'The best option depends on deadline, weight and value of the goods, so we choose it for each shipment. Sea suits large, non-urgent cargo, rail balances price and speed, and air is for urgent and expensive goods.',
                    'If the route needs several modes of transport, we build a multimodal scheme with one contract and one manager along the whole way.',
                ],
            },
            {
                heading: 'Which goods from Asia do we ship most often?',
                paragraphs: [
                    'From China and Turkey we most often bring furniture, electronics and home appliances, textiles and clothing, marketplace goods, equipment and components.',
                    'Large shipments go in full containers (FCL), smaller ones as groupage (LCL) consolidated at the origin warehouse.',
                ],
            },
            {
                heading: 'What does turnkey delivery include?',
                paragraphs: [
                    'Turnkey delivery covers route selection, booking, document support, customs clearance in Ukraine and a road leg to your warehouse.',
                    'We follow every stage and report the status: where the cargo is, when we expect arrival, what has been done.',
                ],
            },
        ],
        terms: [
            { mode: 'Air', time: '5 to 10 days', note: 'Urgent and high-value shipments', serviceSlug: 'air' },
            { mode: 'Rail', time: '20 to 35 days', note: 'Containers from China via European terminals', serviceSlug: 'rail' },
            { mode: 'Sea (FCL / LCL)', time: '35 to 60 days', note: 'Large shipments; plus time for customs and the road leg', serviceSlug: 'sea-container' },
        ],
        documents: [
            'Invoice and packing list',
            'Contract or specification',
            'Certificate of origin (if required)',
            'Carrier’s transport documents',
            'Data to determine the HS code',
        ],
        faq: [
            {
                question: 'How long does shipping from China to Ukraine take?',
                answer: 'Approximately 5–10 days by air, 20–35 days by rail and 35–60 days by sea. The exact time depends on the route, season and customs clearance, so we give it for each specific shipment.',
            },
            {
                question: 'What is the difference between FCL and LCL for sea freight from Asia?',
                answer: 'FCL is a full container for your cargo only; LCL is groupage, where you take part of a container. LCL suits small shipments, while FCL is usually better value for large volumes.',
            },
            {
                question: 'Can cargo be shipped from China by rail?',
                answer: 'Yes, we arrange container and wagon rail freight from China to Europe with transshipment at terminals and a road leg to the consignee’s door.',
            },
            {
                question: 'Who handles customs clearance for cargo from Asia?',
                answer: 'We take customs clearance in Ukraine on ourselves: goods classification, document preparation and communication with customs. You do not need to look for a separate broker.',
            },
            {
                question: 'Do you ship marketplace goods from China?',
                answer: 'Yes, it is one of our frequent routes. We help consolidate cargo from several suppliers and deliver it to a warehouse in Ukraine or the EU.',
            },
            {
                question: 'How can I find out the cost of delivery from China?',
                answer: 'We calculate the cost individually: it depends on weight, volume, mode of transport and route. Leave a request and we will prepare a quote.',
            },
        ],
    },
    europe: {
        label: 'Europe',
        title: 'Freight from Europe to Ukraine',
        lead: 'We deliver groupage and full loads from EU warehouses by road and, if needed, by rail or air. We take customs clearance on ourselves.',
        quick: [
            'Road freight: FTL (full truck) and LTL (groupage)',
            'Body types: curtain-sider, reefer, isothermal',
            'Approximate transit: full truck — from 3 days, groupage — from 7',
            'GPS monitoring and regular status updates at key points',
        ],
        seo: {
            title: 'Shipping from Europe to Ukraine: FTL and LTL, Groupage | OnLan',
            description:
                'Freight from EU countries to Ukraine: FTL and LTL, curtain-sider, reefer, isothermal, pallets. GPS monitoring, turnkey customs clearance. Quote on request.',
        },
        sections: [
            {
                heading: 'How to ship from Europe: full truck or groupage?',
                paragraphs: [
                    'If your shipment fills a truck, a full truckload (FTL) is better value: it travels in one trip with no transshipment. For smaller volumes, groupage (LTL) lets you pay only for your own space.',
                    'For temperature-sensitive goods, reefers and isothermal bodies are available.',
                ],
            },
            {
                heading: 'Where in the EU do we collect cargo?',
                paragraphs: [
                    'We work with warehouses across the EU: furniture and home goods come from Italy, Poland and Germany, equipment and spare parts from the Netherlands and Belgium, building materials from Poland, Czechia and Germany.',
                    'Palletised cargo and goods for retail chains are consolidated and sent on regular groupage trips.',
                ],
            },
            {
                heading: 'How do we track cargo on the road?',
                paragraphs: [
                    'We use GPS monitoring and send statuses at key points along the route, so you see where the cargo is and when to expect it.',
                    'The rate is fixed before loading, and one manager guides you along the route.',
                ],
            },
        ],
        terms: [
            { mode: 'Road freight FTL', time: '3 to 7 days', note: 'Full truck, one trip with no transshipment', serviceSlug: 'automotive' },
            { mode: 'Groupage LTL', time: '7 to 14 days', note: 'Consolidation at the warehouse, then dispatch', serviceSlug: 'automotive' },
            { mode: 'Air', time: '3 to 7 days', note: 'Urgent and high-value shipments', serviceSlug: 'air' },
        ],
        documents: [
            'CMR (international consignment note)',
            'Invoice and packing list',
            'EUR.1 / certificate of origin (if required)',
            'Documents for cargo needing special conditions (reefer, ADR)',
        ],
        faq: [
            {
                question: 'How long does road freight from Europe to Ukraine take?',
                answer: 'Approximately 3 to 7 days for a full truck (FTL) and 7 to 14 days for groupage (LTL). The time depends on the origin country, loading and border crossing.',
            },
            {
                question: 'What are FTL and LTL in freight?',
                answer: 'FTL is transport by a full truck for one customer. LTL is groupage, where your cargo takes part of a truck together with other clients’ cargo.',
            },
            {
                question: 'Can temperature-controlled goods be shipped from Europe?',
                answer: 'Yes, we use reefers and isothermal bodies. We agree the transport temperature in advance, at the quotation stage.',
            },
            {
                question: 'Is cargo tracked during transport from the EU?',
                answer: 'Yes, we provide GPS monitoring and regular statuses at key points along the route, so you always know where the cargo is.',
            },
            {
                question: 'Do you handle customs clearance for cargo from the EU?',
                answer: 'Yes, turnkey customs clearance is part of our services: documents, goods classification and communication with customs.',
            },
            {
                question: 'Can you collect cargo from several suppliers in different EU countries?',
                answer: 'Yes, we gather cargo from several senders at a consolidation warehouse and deliver it on a single groupage trip.',
            },
        ],
    },
    usa: {
        label: 'USA',
        title: 'Shipping cargo from the USA to Ukraine',
        lead: 'We arrange delivery from the USA by air for urgent shipments and in sea containers for large cargo, with customs clearance in Ukraine.',
        quick: [
            'Air for urgent and high-value cargo',
            'FCL and LCL sea containers for large shipments',
            'Approximate transit: air — from 5 days, sea — from 40',
            'Customs clearance in Ukraine and door delivery',
        ],
        seo: {
            title: 'Shipping from the USA to Ukraine: Air and Sea Containers | OnLan',
            description:
                'Freight from the USA to Ukraine: air for urgent shipments, FCL and LCL sea containers. Turnkey customs clearance and one manager. Quote on request.',
        },
        sections: [
            {
                heading: 'How to ship cargo from the USA to Ukraine fast?',
                paragraphs: [
                    'The fastest way is air freight: it suits urgent and expensive goods, equipment and spare parts. Our team arranges a route with minimal handling time at hubs.',
                    'For large volumes where cost matters more than speed, we choose a sea route in containers.',
                ],
            },
            {
                heading: 'When is it better to ship from the USA by sea?',
                paragraphs: [
                    'Sea is a good choice for large, non-urgent shipments, bulky goods and equipment. The cargo travels in a full container (FCL) or as groupage (LCL), and we handle booking and documents.',
                    'After arrival at a European port, road transport completes delivery to your warehouse.',
                ],
            },
            {
                heading: 'Who handles customs clearance for cargo from the USA?',
                paragraphs: [
                    'We handle customs clearance in Ukraine: we prepare the documents, determine the goods code and agree the procedure with customs.',
                    'You get a status at every stage and a single point of contact.',
                ],
            },
        ],
        terms: [
            { mode: 'Air', time: '5 to 10 days', note: 'Urgent and expensive cargo', serviceSlug: 'air' },
            { mode: 'Sea (FCL / LCL)', time: '40 to 65 days', note: 'Large shipments; plus customs and the road leg', serviceSlug: 'sea-container' },
        ],
        documents: [
            'Commercial invoice and packing list',
            'Contract or specification',
            'Documents for cargo requiring special conditions',
            'Carrier’s air waybill or sea bill of lading',
        ],
        faq: [
            {
                question: 'How long does shipping from the USA to Ukraine take?',
                answer: 'Approximately 5 to 10 days by air and 40 to 65 days by sea. Exact times depend on the route, line capacity and customs clearance.',
            },
            {
                question: 'Can I send a small urgent shipment from the USA?',
                answer: 'Yes, for urgent shipments we choose air freight with minimal hub handling time and document support.',
            },
            {
                question: 'What is the difference between FCL and LCL sea freight from the USA?',
                answer: 'FCL is a separate container for your cargo; LCL is groupage, where you take part of a container. LCL is more convenient for small volumes.',
            },
            {
                question: 'Do you clear cargo from the USA through customs?',
                answer: 'Yes, customs clearance in Ukraine is part of our services: documents, goods classification and communication with customs.',
            },
            {
                question: 'Can you deliver cargo from the USA to my door?',
                answer: 'Yes, we do the last leg by road to your warehouse, so you receive the cargo at the address you specify.',
            },
            {
                question: 'How can I find out the cost of delivery from the USA?',
                answer: 'We calculate the cost individually by weight, volume, mode of transport and route. Leave a request and we will prepare a quote.',
            },
        ],
    },
    ukraine: {
        label: 'Ukraine',
        title: 'Freight within Ukraine',
        lead: 'We deliver cargo across Ukraine door to door by road and, if needed, store it in our own 2,000 m² warehouse.',
        quick: [
            'Road freight in Ukraine: full truck (FTL) and groupage (LTL)',
            'Own 2,000 m² warehouse',
            'Operating since 2012, head office in Lytyn',
            'GPS monitoring and agreed unloading times',
        ],
        seo: {
            title: 'Freight within Ukraine: FTL, LTL, Warehousing | OnLan',
            description:
                'Freight within Ukraine door to door: FTL and LTL, GPS monitoring, a 2,000 m² warehouse, customs support. Quote on request.',
        },
        sections: [
            {
                heading: 'What cargo do we ship within Ukraine?',
                paragraphs: [
                    'We carry palletised and groupage cargo, goods for retail chains, building materials, equipment and temperature-controlled goods in reefers.',
                    'For large shipments we offer a full truck (FTL), for smaller ones — groupage trips (LTL).',
                ],
            },
            {
                heading: 'Do you have your own warehouse?',
                paragraphs: [
                    'Yes, we have our own 2,000 m² warehouse. It has operated since 2015 and helps consolidate and temporarily store cargo before dispatch.',
                    'The warehouse is convenient when cargo arrives from abroad and has to be distributed to addresses across Ukraine.',
                ],
            },
            {
                heading: 'How do we control delivery within Ukraine?',
                paragraphs: [
                    'We agree unloading times in advance, use GPS monitoring and report statuses at key points along the route.',
                    'One manager is in touch and knows everything about your cargo.',
                ],
            },
        ],
        terms: [
            { mode: 'Full truck FTL', time: '1 to 3 days', note: 'Depends on distance and loading date', serviceSlug: 'automotive' },
            { mode: 'Groupage LTL', time: '2 to 5 days', note: 'Depends on consolidation and route', serviceSlug: 'automotive' },
        ],
        documents: [
            'Consignment note (TTN)',
            'Documents for cargo requiring special conditions',
            'Power of attorney for receipt (if required)',
        ],
        faq: [
            {
                question: 'How long does freight within Ukraine take?',
                answer: 'Approximately 1 to 3 days by full truck and 2 to 5 days as groupage. The exact time depends on distance and loading date.',
            },
            {
                question: 'Can I send groupage cargo within Ukraine?',
                answer: 'Yes, we carry groupage cargo (LTL) on regular trips: you pay only for your part of the truck body.',
            },
            {
                question: 'Do you have a warehouse for storing cargo?',
                answer: 'Yes, we have our own 2,000 m² warehouse. Cargo can be stored temporarily and sent to your addresses.',
            },
            {
                question: 'Do you ship temperature-controlled goods within Ukraine?',
                answer: 'Yes, we use reefers and isothermal bodies. We agree the temperature regime in advance.',
            },
            {
                question: 'Can I track the cargo on the road?',
                answer: 'Yes, we provide GPS monitoring and regular statuses at key points along the route.',
            },
            {
                question: 'How do I order freight within Ukraine?',
                answer: 'Leave a request on the website or call us. We will clarify the details and prepare a quote.',
            },
        ],
    },
};

export const DIRECTIONS_EN: DirectionContent[] = DIRECTIONS.map((direction) => {
    const text = TEXT[direction.slug];
    if (!text) {
        throw new Error(`Missing English copy for direction "${direction.slug}"`);
    }
    return { slug: direction.slug, related: direction.related, ...text };
});

export function getDirectionBySlugEn(slug: string): DirectionContent | undefined {
    return DIRECTIONS_EN.find((direction) => direction.slug === slug);
}
