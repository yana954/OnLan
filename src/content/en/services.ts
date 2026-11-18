import { SERVICES } from '@/content/services';
import type { ServiceContent } from '@/types/Service.interface';

/**
 * English copy for each service. Structural fields (`slug`, `number`, `iconId`)
 * come from the Ukrainian source of truth in `@/content/services`, so a slug or
 * icon can never drift between languages.
 */
type ServiceText = Omit<ServiceContent, 'slug' | 'number' | 'iconId'>;

const TEXT: Record<string, ServiceText> = {
    automotive: {
        tagLabel: 'Road freight',
        title: 'Road freight',
        description:
            'FTL and LTL shipping on international routes. We match the vehicle to your cargo type, plan the route and monitor delivery all the way.',
        lead: 'Fast road freight between Ukraine and Europe with full control at every stage: FTL and LTL, curtain-siders, reefers and isothermal trucks. GPS tracking, a clear schedule and a personal route manager.',
        highlights: [
            'FTL and LTL shipments with firmly agreed delivery times',
            'Vetted European and Ukrainian carriers selected for every route',
            'Real-time GPS tracking',
            'CMR insurance',
        ],
        benefitsHeading: 'Why choose ONLAN for road freight',
        benefits: [
            {
                title: 'A wide choice of vehicles',
                description: 'From light-duty vans to curtain-siders, reefers, container trucks and tankers.',
            },
            {
                title: 'Own and partner fleet',
                description: 'A broad network of carriers for fast, flexible shipment organisation.',
            },
            {
                title: 'Complex cargo — handled',
                description: 'ADR, temperature-controlled, high-value and container cargo.',
            },
            {
                title: 'Wide geography',
                description: 'Ukraine, Europe, Turkey and other international routes.',
            },
        ],
        process: [
            {
                number: '01',
                title: 'Request and quote',
                description:
                    'We receive the cargo and route details, calculate the cost and agree the shipping terms.',
            },
            {
                number: '02',
                title: 'Organising the shipment',
                description: 'We select the vehicle and agree the pickup date, route and loading details.',
            },
            {
                number: '03',
                title: 'Loading and dispatch',
                description:
                    'We oversee the truck’s arrival and check the CMR and accompanying documents. If needed, we get photos of the loaded cargo.',
            },
            {
                number: '04',
                title: 'Control and delivery',
                description:
                    'We track the shipment along the route, keep you informed on its status and coordinate the truck’s arrival for unloading.',
            },
        ],
        cases: [
            {
                title: 'Turkey → Ukraine: T1 cleared in 1 day',
                situation:
                    'Three curtain-sider trucks carrying equipment, up to 22 t each, stood idle in Turkey for five days because the supplier could not arrange the T1 transit declaration.',
                solution:
                    'OnLan brought in its partner broker in Turkey, who quickly arranged the T1 and prepared the trucks for onward transit.',
                result:
                    'An issue that had gone unresolved for five days was closed in one. All three trucks continued their journey to Ukraine.',
                takeaway: '5 days of downtime → 1 day to resolve',
            },
            {
                title: 'Italy → Ukraine: when a groupage shipment became urgent',
                situation:
                    'A client ordered a batch of components from Italy to Kyiv as part of a groupage load. After loading, it turned out the cargo had to reach customs clearance by a fixed date. Had the critical deadline been known in advance, a separate truck would have been sent straight away.',
                solution:
                    'We did not change the whole international delivery. After crossing the border at Krakovets, the groupage truck arrived in Lviv, where the cargo was promptly transferred at an OnLan partner warehouse. We then arranged a separate truck that took the cargo straight to the client’s customs point without waiting for other drop-offs.',
                result:
                    'The cargo arrived on time, and the client did not have to pay for a separate truck over the whole route.',
                takeaway: 'We changed the logistics mid-journey — and kept both the deadline and the budget.',
            },
        ],
        cargoTypes: [
            'Pallets and boxed cargo',
            'Reefer cargo and food products',
            'Industrial equipment',
            'Groupage cargo (LTL)',
            'Full truckloads (FTL)',
        ],
        faq: [
            {
                question: 'How long does delivery from the EU to Ukraine take?',
                answer:
                    'Direct trips from most EU countries take 3–7 days depending on the route, border conditions and unloading windows.',
            },
            {
                question: 'Can several shipments be combined in one truck?',
                answer:
                    'Yes, we work with LTL: we consolidate groupage from several senders and optimise the rate for each of them.',
            },
            {
                question: 'What about cargo insurance?',
                answer:
                    'CMR liability applies as standard. If needed, we arrange an additional policy for the full value.',
            },
            {
                question: 'Do you ship furniture and home goods from Europe?',
                answer:
                    'Yes, it is one of our most popular routes: Italy, Poland, Germany and other EU countries → Ukraine.',
            },
            {
                question: 'What truck types are available for my cargo?',
                answer:
                    'Curtain-sider, reefer, isothermal, ADR — we choose according to temperature requirements, dimensions and delivery SLA.',
            },
            {
                question: 'Can I track my cargo during the trip?',
                answer: 'Yes, we provide GPS monitoring and regular status updates at key points along the route.',
            },
        ],
        seo: {
            title: 'Road Freight Ukraine — Europe: FTL and LTL | OnLan Logistic',
            description:
                'Road freight between Ukraine and the EU: FTL and LTL, curtain-sider, reefer, isothermal. GPS monitoring, fixed rate, one dedicated manager.',
        },
    },
    'sea-container': {
        tagLabel: 'Sea lines',
        title: 'Sea and container freight',
        description:
            'FCL and LCL from key ports, work with different container types and a handover to last-mile road delivery.',
        heroTagline: 'Global routes. Precision in every detail.',
        lead: 'We organise FCL and LCL shipments through the world’s key ports, coordinating the entire logistics chain: ocean freight, port handling, customs procedures and onward delivery by road or rail.',
        highlights: [
            'FCL • LCL',
            '20′ • 40′ • 40′HC • Reefer • OOG',
            'Port-to-Port • Port-to-Door • Door-to-Door',
            'Multimodal logistics',
        ],
        highlightNotes: [
            'Full and groupage container shipments',
            'Standard and specialised container solutions',
            'Flexible delivery schemes',
            'Sea • rail • road',
        ],
        benefitsHeading: 'Why choose ONLAN?',
        benefits: [
            {
                title: 'FCL and LCL to match your cargo',
                description:
                    'Full and groupage container shipping — we choose the format based on volume, weight, route and budget.',
            },
            {
                title: 'Direct shipping line rates',
                description:
                    'We work with leading container lines and compare the available routes, transit times and freight terms for your specific shipment.',
            },
            {
                title: 'ETD, ETA and free time control',
                description:
                    'We follow the schedule, the container’s movement and ETA changes, and monitor demurrage/detention terms and the available free time.',
            },
            {
                title: 'Container delivery to the final point',
                description:
                    'We arrange the onward leg from the port by road or rail — within one logistics solution.',
            },
        ],
        cases: [
            {
                title: 'How switching from CIF to FOB optimised sea freight from Vietnam',
                situation:
                    'A client regularly imported frozen seafood from Vietnam in reefer containers on CIF terms. They came to ONLAN for delivery of a container from a European port to Ukraine. During the first shipment it turned out that, because of limited free time, document delays and extra port charges, the real logistics cost was far above the original estimate.',
                solution:
                    'We proposed switching to FOB and took control of ocean freight from the port of departure. We chose the best line terms, checked the documents in advance and prepared the inland delivery before the container arrived.',
                result:
                    'The client got a predictable cost structure and control of the whole route, and handed ONLAN their next container shipments.',
            },
        ],
        process: [
            {
                number: '01',
                title: 'Booking and preparation',
                description:
                    'We select the line, fix the rate and confirm the booking. We agree packing and document requirements.',
            },
            {
                number: '02',
                title: 'Loading at origin',
                description:
                    'We coordinate container delivery or the consolidation warehouse and oversee stuffing and photo documentation.',
            },
            {
                number: '03',
                title: 'Sea voyage',
                description:
                    'We track the vessel and account for possible schedule changes caused by weather and port operations.',
            },
            {
                number: '04',
                title: 'Destination port and delivery',
                description:
                    'We organise the full cycle: customs clearance, truck pickup at the terminal and prompt delivery of the container straight to your warehouse.',
            },
        ],
        cargoTypes: [
            'FCL 20′/40′/40′HC',
            'LCL — groupage sea cargo',
            'Reefer and temperature control',
            'OOG / Out-of-Gauge',
            'Imports from China and Southeast Asia',
        ],
        faq: [
            {
                question: 'Which ports do you work with?',
                answer:
                    'Main ones: Odesa, Chornomorsk, Rotterdam, Koper, Gdańsk, Gdynia, Constanța, Bremerhaven. We pick the port with the best connection to the unloading address.',
            },
            {
                question: 'Can I ship LCL without my own container?',
                answer:
                    'Yes, we build consolidated shipments and you pay only for the actual volume in m³.',
            },
            {
                question: 'How long does delivery from China take?',
                answer:
                    'Up to 60 days door-to-door, including booking, the voyage, transshipment and last-mile trucking.',
            },
            {
                question: 'Do you deliver furniture from China?',
                answer:
                    'Yes, furniture from China is one of our key routes. We work with FCL and LCL and handle documents and door delivery.',
            },
            {
                question: 'Can sea freight be combined with road delivery in Ukraine?',
                answer: 'Yes, we organise the full chain: port → customs → truck to your warehouse.',
            },
            {
                question: 'Which containers are available?',
                answer:
                    "20' / 40' / 40'HC • Reefer • Out-of-gauge cargo (OOG) — chosen to match the cargo type and volume.",
            },
        ],
        seo: {
            title: 'Sea and Container Freight FCL and LCL | OnLan Logistic',
            description:
                'Sea freight from China, Southeast Asia, Turkey and Europe. FCL and LCL with top lines, booking, documents and last-mile trucking.',
        },
    },
    air: {
        tagLabel: 'Air',
        title: 'Air freight',
        description:
            'Accelerated delivery for urgent consignments and high-value cargo — direct flights and minimal handling time at hubs.',
        lead: 'Air delivery for urgent and high-value cargo. Direct and consolidated flights from Europe, Asia and the USA. Minimal hub handling time and real-time status confirmation.',
        highlights: [
            'Express and General Cargo',
            'Special handling approvals for DGR, high-value goods, pharma, IT equipment',
            'Door-to-door with a road leg',
            'Constant flight and AWB status monitoring',
        ],
        benefits: [
            {
                title: 'Speed as the main KPI',
                description:
                    'We work in windows where every hour counts: product launches, production-line replacements, healthcare.',
            },
            {
                title: 'Flexible schemes',
                description:
                    'Direct flight, consolidation, charter — we choose the solution for your real urgency and budget.',
            },
            {
                title: 'DGR and special cargo',
                description:
                    'Document preparation and packing for dangerous, temperature-controlled and high-value cargo.',
            },
            {
                title: 'Transparent status',
                description:
                    'We confirm the AWB, report status by stage and notify you of any deviation from the plan.',
            },
        ],
        process: [
            {
                number: '01',
                title: 'Preliminary assessment',
                description:
                    'We clarify weight, dimensions, value and temperature requirements, then calculate the rate and the best flight.',
            },
            {
                number: '02',
                title: 'Booking and documents',
                description:
                    'We book space on the flight and prepare the AWB, invoice, packing list and permits (DGR if needed).',
            },
            {
                number: '03',
                title: 'Hub and transfer',
                description:
                    'We oversee handling at the hub and transfers between aircraft, minimising idle time between flights.',
            },
            {
                number: '04',
                title: 'Handover to the consignee',
                description:
                    'Customs clearance at the destination airport and a road leg to the warehouse door or pickup point.',
            },
        ],
        cargoTypes: [
            'Express parcels and samples',
            'Electronics and IT equipment',
            'Temperature-controlled pharmaceuticals',
            'High-value and jewellery cargo',
            'Production-line spare parts',
        ],
        faq: [
            {
                question: 'How much does air freight cost?',
                answer:
                    'The rate depends on weight, dimensions, route, cargo type and urgency. We send a quote within one business day.',
            },
            {
                question: 'Do you handle DGR?',
                answer:
                    'Yes, we work with dangerous goods in the categories permitted on a given flight. We prepare the full document package.',
            },
            {
                question: 'Is door-to-door available?',
                answer:
                    'Yes, we combine air with a road leg in the origin and destination countries so you receive the cargo at your own warehouse.',
            },
            {
                question: 'What cargo is air freight best for?',
                answer: 'Electronics, expensive goods, urgent deliveries, spare parts, samples and small consignments.',
            },
            {
                question: 'What is the minimum delivery time?',
                answer:
                    'It depends on the route and flight. For urgent shipments — from 24–72 hours door-to-door.',
            },
            {
                question: 'Can I track the AWB status?',
                answer:
                    'Yes, we provide the AWB number and updates by stage: acceptance, departure, transit, arrival, release.',
            },
        ],
        seo: {
            title: 'Air Freight | Express and DGR | OnLan Logistic',
            description:
                'Air delivery of urgent and high-value cargo. Express and General Cargo, DGR, pharma, electronics. Door-to-door across Ukraine.',
        },
    },
    rail: {
        tagLabel: 'Rail',
        title: 'Rail freight',
        description:
            'Container and wagon shipments, routes from Europe and Asia with a clear schedule and coordination at track gauge changes.',
        lead: 'Container and wagon rail freight from Europe and Asia. Stable transit times, large volumes and reliable coordination at track-gauge interchanges.',
        highlights: [
            'China — Europe container trains',
            'Boxcars, flatcars, tank cars, fittings',
            'Work with border stations and terminals',
            'Documentary support at 1520/1435 interchanges',
        ],
        benefits: [
            {
                title: 'Volume without losing control',
                description:
                    'Convenient for regular large shipments: materials, raw materials, finished goods.',
            },
            {
                title: 'Predictable schedule',
                description:
                    'Regular routes and fixed windows let you plan warehouse and production.',
            },
            {
                title: 'Route economics',
                description: 'Often cheaper than road on long legs and faster than sea on Asian routes.',
            },
            {
                title: 'Coordination at interchanges',
                description:
                    'We close documentary and technical questions at transshipment points between rail systems.',
            },
        ],
        process: [
            {
                number: '01',
                title: 'Route calculation',
                description:
                    'We analyse departure and destination stations, transshipment points and the wagon or container type.',
            },
            {
                number: '02',
                title: 'Booking and loading',
                description:
                    'We book rolling stock and coordinate its placement and loading supervision at the station.',
            },
            {
                number: '03',
                title: 'Transit and interchanges',
                description:
                    'We accompany the train’s movement and coordinate handover between railway administrations and transshipment terminals.',
            },
            {
                number: '04',
                title: 'Release and road leg',
                description:
                    'Customs clearance, removal of the container or wagon from the terminal and road delivery to the final point.',
            },
        ],
        cargoTypes: [
            'Containers on a train',
            'Boxcars and flatcars',
            'Tank cars',
            'Raw materials and supplies',
            'Regular industrial shipments',
        ],
        faq: [
            {
                question: 'Can you arrange a train from China?',
                answer:
                    'Yes, we work with regular China — Europe container services with a fixed schedule and transparent booking.',
            },
            {
                question: 'How do you handle the track-gauge difference?',
                answer:
                    'At 1435/1520 interchanges we use transshipment terminals, prepare the documents and monitor storage time.',
            },
            {
                question: 'Is insurance available?',
                answer: 'Yes, we arrange insurance matching the real value and nature of the cargo.',
            },
            {
                question: 'What do we ship by rail most often?',
                answer:
                    'Industrial cargo, building materials, equipment, raw materials, large consignments and containers from China.',
            },
            {
                question: 'Is rail cheaper than road on long legs?',
                answer:
                    'Often yes — especially for regular large shipments between Europe, Asia and Ukraine.',
            },
            {
                question: 'Do you arrange a road leg after rail?',
                answer: 'Yes, we deliver the container or wagon to the final point by road.',
            },
        ],
        seo: {
            title: 'Rail Freight from Europe and Asia | OnLan Logistic',
            description:
                'Container and wagon rail freight. China — Europe trains, transshipment, documents and road delivery to the door.',
        },
    },
    oversized: {
        tagLabel: 'Project logistics',
        title: 'Oversized cargo',
        description:
            'Dedicated lashing schemes, special permits and escort for oversized cargo from the factory to the installation site — with risk assessment at the request stage.',
        lead: 'Transport of oversized and project cargo: lowboys, tractor units, special permits and escort. We plan the route taking bridges, tunnels and night restrictions into account.',
        highlights: [
            'Lowboy trailers, low-loaders, modular platforms',
            'Special permits and route assessment',
            'Traffic police escort if required',
            'Engineering calculation of lashing',
        ],
        benefits: [
            {
                title: 'A route built around the cargo',
                description:
                    'We check bridge load capacity, tunnel clearances, night restrictions and detours in advance.',
            },
            {
                title: 'The legal side',
                description:
                    'We prepare and obtain special permits and liaise with road authorities and the police.',
            },
            {
                title: 'Lashing engineering',
                description:
                    'Securing schemes for the weight and geometry of the cargo, with no risk of shifting on the road.',
            },
            {
                title: 'On-site coordination',
                description:
                    'We agree the time window and equipment for unloading at the installation site.',
            },
        ],
        process: [
            {
                number: '01',
                title: 'Technical assessment',
                description:
                    'We collect drawings, dimensions and weight, and assess risks and route requirements.',
            },
            {
                number: '02',
                title: 'Permits and route',
                description:
                    'We prepare the oversized-load documentation and agree the route and travel time windows.',
            },
            {
                number: '03',
                title: 'Loading and escort',
                description:
                    'Lashing control, photo documentation, and movement with technical escort where necessary.',
            },
            {
                number: '04',
                title: 'Delivery and unloading',
                description:
                    'Coordination at the installation site, cargo handover and closing of documents.',
            },
        ],
        cargoTypes: [
            'Industrial equipment',
            'Power equipment and transformers',
            'Construction machinery',
            'Structures and metalwork',
            'Project oversized cargo',
        ],
        faq: [
            {
                question: 'How long does it take to obtain permits?',
                answer:
                    'It depends on the country and route. We normally plan 5–15 business days; complex routes take longer.',
            },
            {
                question: 'Is an escort required?',
                answer:
                    'For a number of routes and dimensions — yes. We clarify the requirements for specific countries and roads.',
            },
            {
                question: 'Can you design the lashing?',
                answer:
                    'Yes, we provide securing schemes that take the weight, centre of mass and geometry of the cargo into account.',
            },
            {
                question: 'What projects do you handle?',
                answer:
                    'Industrial equipment, construction machinery, metal structures, tanks, special vehicles and large-dimension cargo.',
            },
            {
                question: 'Do you assess the route before the request is submitted?',
                answer:
                    'Yes, we check bridges, tunnels, night restrictions and detours at the technical assessment stage.',
            },
            {
                question: 'Who prepares the special permits?',
                answer:
                    'Our team coordinates the documents and approvals with road authorities and the police.',
            },
        ],
        seo: {
            title: 'Oversized Cargo and Project Logistics | OnLan Logistic',
            description:
                'Oversized cargo transport: lowboys, special permits, lashing engineering and route escort from the factory to installation.',
        },
    },
    customs: {
        tagLabel: 'Customs',
        title: 'Customs clearance',
        description:
            'HS code classification, document package preparation and liaison with customs to minimise stops and extra charges.',
        lead: 'Turnkey import and export customs clearance. Classification, documents and communication with customs — so your cargo keeps moving without stops or unexpected charges.',
        highlights: [
            'HS code classification and duty rate determination',
            'Import, export, re-export, transit',
            'Preparation and checking of the document package',
            'Work with preferences and certificates of origin',
        ],
        benefits: [
            {
                title: 'Fewer stops at customs',
                description:
                    'We check documents and codes in advance, reducing the risk of re-inspections and queries.',
            },
            {
                title: 'Payment forecast',
                description:
                    'We calculate duties, VAT and fees before the cargo crosses the border so you see the real cost.',
            },
            {
                title: 'Work with preferences',
                description:
                    'EUR.1, Form A and others — applied to reduce duties on permitted routes.',
            },
            {
                title: 'One partner',
                description:
                    'The whole chain: transport + customs + documents in one window, with no hand-offs between contractors.',
            },
        ],
        process: [
            {
                number: '01',
                title: 'Preparation',
                description:
                    'We collect the invoice, packing list, contract and certificates, and classify the cargo by HS code.',
            },
            {
                number: '02',
                title: 'Filing the declaration',
                description:
                    'We prepare the customs declaration and supporting documents and file them electronically with the customs authority.',
            },
            {
                number: '03',
                title: 'Control',
                description:
                    'We accompany the customs control process and respond to the inspector’s queries.',
            },
            {
                number: '04',
                title: 'Release and handover',
                description:
                    'We obtain release for free circulation and hand the cargo to the next leg or straight to the client.',
            },
        ],
        cargoTypes: [
            'Import for free circulation',
            'Export',
            'Re-export and re-import',
            'Transit',
            'Temporary import',
        ],
        faq: [
            {
                question: 'Can you clear cargo without using your transport?',
                answer:
                    'Yes, we work as a standalone customs service — even if the cargo travels with another carrier.',
            },
            {
                question: 'What documents are needed for import?',
                answer:
                    'Basics: contract, invoice, packing list, CMR / bill of lading / AWB. In addition — certificates and permits depending on the goods.',
            },
            {
                question: 'How quickly is clearance done?',
                answer:
                    'With a complete document package — within one customs working shift. For complex goods — longer.',
            },
            {
                question: 'Do you help with goods from China?',
                answer:
                    'Yes, we support imports of furniture, electronics, equipment, textiles and industrial goods.',
            },
            {
                question: 'Can customs payments be calculated in advance?',
                answer: 'Yes, we forecast duties, VAT and fees before the cargo crosses the border.',
            },
            {
                question: 'Do you work with origin preferences?',
                answer: 'Yes, we apply EUR.1, Form A and other mechanisms where permitted.',
            },
        ],
        seo: {
            title: 'Customs Clearance: Import and Export | OnLan Logistic',
            description:
                'Turnkey customs clearance: HS code classification, documents, preferences and liaison with customs. No stops, no surprise charges.',
        },
    },
    multimodal: {
        tagLabel: 'Multimodal freight',
        title: 'Multimodal freight',
        description:
            'We combine road, sea, air and rail — building the best route for your deadlines, budget and cargo type.',
        lead: 'Combined routes: road + sea + air + rail. One contractor, single responsibility and transparent cost across the whole chain — from the sender to your warehouse.',
        highlights: [
            'One contract for the entire chain',
            'The best balance of time and price',
            'Transshipment at EU ports and terminals',
            'One manager along the route',
        ],
        benefits: [
            {
                title: 'Savings through leg selection',
                description:
                    'Sea or rail for long legs, road for the last mile. This lowers cost without losing speed.',
            },
            {
                title: 'Flexibility',
                description:
                    'If deadlines change, we switch to a faster leg (for example, air) on the section that is under pressure.',
            },
            {
                title: 'Single responsibility',
                description:
                    'You work with one manager and one contract instead of five contractors along the chain.',
            },
            {
                title: 'Document integrity',
                description:
                    'We make sure documents match at the transitions between transport modes and do not block customs clearance.',
            },
        ],
        process: [
            {
                number: '01',
                title: 'Requirements audit',
                description:
                    'We gather the inputs: cargo, volume, budget, deadline. We propose 1–3 scheme options.',
            },
            {
                number: '02',
                title: 'Building the route',
                description:
                    'We book the legs (road, sea, air, rail) and fix the connections and terminal timings.',
            },
            {
                number: '03',
                title: 'Execution',
                description:
                    'We monitor movement, respond to delays and switch schemes if the window is at risk.',
            },
            {
                number: '04',
                title: 'Delivery and closing',
                description:
                    'Customs clearance, door delivery, closing of documents and final reporting on the route.',
            },
        ],
        cargoTypes: [
            'Imports from China and Southeast Asia',
            'Europe — Ukraine',
            'Regular industrial shipments',
            'Groupage cargo (LCL/LTL)',
            'Project multimodal legs',
        ],
        faq: [
            {
                question: 'How is multimodal freight different from regular shipping?',
                answer:
                    'It combines several transport modes in a single chain under one contract — this lowers the price and speeds up reaction to changes.',
            },
            {
                question: 'How much does it cost?',
                answer:
                    'The calculation is individual: it depends on the legs, volume and timing. We prepare 1–3 scheme options with prices.',
            },
            {
                question: 'Who is responsible for the cargo?',
                answer:
                    'OnLan Logistic, as the single forwarder for the route. All communication goes through one manager.',
            },
            {
                question: 'What cargo is most often shipped multimodally?',
                answer:
                    'Imports from China, large shipments, equipment, electronics, furniture and e-commerce goods.',
            },
            {
                question: 'Can a leg be changed during the route?',
                answer:
                    'Yes, if deadlines change we switch — for example, to air on a critical section.',
            },
            {
                question: 'Is customs included in the single chain?',
                answer:
                    'Yes, we coordinate documents at the transitions between transport modes and customs clearance.',
            },
        ],
        seo: {
            title: 'Multimodal Freight: Road, Sea, Air | OnLan Logistic',
            description:
                'Combined routes for the best transit time and price. One contract, one manager, transparent cost across the whole chain.',
        },
    },
};

export const SERVICES_EN: ServiceContent[] = SERVICES.map((service) => {
    const text = TEXT[service.slug];
    if (!text) {
        throw new Error(`Missing English copy for service "${service.slug}"`);
    }
    return { slug: service.slug, number: service.number, iconId: service.iconId, ...text };
});

export function getServiceBySlugEn(slug: string): ServiceContent | undefined {
    return SERVICES_EN.find((service) => service.slug === slug);
}
