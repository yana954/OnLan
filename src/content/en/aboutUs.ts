import type {
    ABOUT_US_ADVANTAGES_SECTION as UkAdvSection,
    AboutUsAdvantageItem,
} from '@/content/aboutUsAdvantages';
import type {
    ABOUT_US_HISTORY_SECTION as UkHistSection,
    HistoryMilestone,
} from '@/content/aboutUsHistory';
import type {
    ABOUT_US_STORYTELL_MAP as UkMap,
    ABOUT_US_STORYTELL_SCROLL as UkScroll,
    ABOUT_US_STORYTELL_SPLIT as UkSplit,
} from '@/content/aboutUsStorytell';
import type { AboutUsTeamMember, ABOUT_US_TEAM_SECTION as UkTeamSection } from '@/content/aboutUsTeam';
import type {
    AboutUsValueItem,
    ABOUT_US_VALUES_SECTION as UkValuesSection,
} from '@/content/aboutUsValues';
import type { Widen } from '@/types/Widen';

export const ABOUT_US_VALUES_SECTION_EN: Widen<typeof UkValuesSection> = {
    eyebrow: 'Corporate culture',
    heading: 'ONLAN values',
};

export const ABOUT_US_VALUES_EN: AboutUsValueItem[] = [
    { icon: 'partnership', title: 'Transparency', description: 'open dialogue with clients and partners.' },
    { icon: 'transparency', title: 'Responsibility', description: 'for every shipment — from loading to delivery.' },
    { icon: 'reliability', title: 'Innovation', description: 'constantly looking for new technologies and routes.' },
    { icon: 'growth', title: 'Support', description: 'in touch with you along the entire route.' },
];

export const ABOUT_US_HISTORY_SECTION_EN: Widen<typeof UkHistSection> = {
    eyebrow: 'Our journey: company history',
    heading: 'How it all began',
};

export const ABOUT_US_HISTORY_MILESTONES_EN: HistoryMilestone[] = [
    { year: 2012, text: 'ONLAN Logistic founded in Vinnytsia.', bgOpacityPercent: 20 },
    { year: 2015, text: 'Opened our own 2,000 m² warehouse.', bgOpacityPercent: 40 },
    { year: 2018, text: 'Launched multimodal shipping between Ukraine and Asia.', bgOpacityPercent: 60 },
    { year: 2021, text: 'Turnkey customs clearance for EU clients.', bgOpacityPercent: 80 },
    { year: 2023, text: '5,000 successful shipments and expansion into the Chinese and Asian markets.', bgOpacityPercent: 100 },
];

export const ABOUT_US_TEAM_SECTION_EN: Widen<typeof UkTeamSection> = {
    eyebrow: 'Our team',
    heading: 'ONLAN key experts',
};

export const ABOUT_US_TEAM_EN: AboutUsTeamMember[] = [
    { name: 'Yevhen', role: 'CEO, 15+ years in logistics', photo: 'men', profileHref: 'https://www.linkedin.com/' },
    { name: 'Maryna', role: 'Head of Customs Clearance', photo: 'girl', profileHref: 'https://www.linkedin.com/' },
    { name: 'Oleh', role: 'Head of Department', photo: 'men', profileHref: 'https://www.linkedin.com/' },
    { name: 'Yuliia', role: 'Head of Customer Success', photo: 'girl', profileHref: 'https://www.linkedin.com/' },
];

export const ABOUT_US_ADVANTAGES_SECTION_EN: Widen<typeof UkAdvSection> = {
    eyebrow: 'Advantages',
    heading: 'Why choose us?',
};

export const ABOUT_US_ADVANTAGES_EN: AboutUsAdvantageItem[] = [
    {
        title: 'Full-service logistics',
        description:
            'From route planning to customs clearance — you get a turnkey solution without wasting time coordinating dozens of parties.',
    },
    {
        title: 'Control and safety',
        description:
            'We monitor every stage of delivery, vet our subcontractors and offer GPS tracking and insurance when needed.',
    },
    {
        title: 'Transparent communication',
        description:
            'Always in touch. No empty promises, only real information: where your cargo is, when it arrives, what has been done.',
    },
    {
        title: 'Flexibility and fast response',
        description:
            'Small and mid-sized businesses need quick decisions — and we deliver them. We adapt promptly to changes in routes, terms or documents.',
    },
    {
        title: 'Individual approach',
        description:
            'Every business is unique. We choose solutions that fit your processes, the specifics of your cargo and your customers’ needs.',
    },
    {
        title: 'Partnership approach',
        description:
            'We don’t work “one and done”. We care about your growth and a stable, long-term relationship.',
    },
];

export const ABOUT_US_STORYTELL_SCROLL_EN: Widen<typeof UkScroll> = {
    eyebrow: 'Our approach',
    quote: 'Logistics is not a system. It is people who make decisions',
    authorName: 'Maryna',
    authorRole: 'CEO ONLAN LOGISTIC',
    rightEyebrow: 'ABOUT ONLAN',
    subtitle: 'A Ukrainian logistics company where partnership matters more than formality',
    paragraphs: [
        'OnLan Logistic is a Ukrainian logistics company that builds delivery not only on routes, but on strong communication between everyone involved in the process.',
        'Our philosophy is partnership, responsibility and constant contact. Because logistics is always about people: at customs, in warehouses, in paperwork, on the road, behind the wheel and in touch with the client.',
        'That is why communication at OnLan is not an extra perk but the foundation of our work: when cargo matters to a business, it is not only the system that decides, but the people who guide the process.',
    ],
};

export const ABOUT_US_STORYTELL_SPLIT_EN: Widen<typeof UkSplit> = {
    eyebrow: 'About the company',
    heading: 'We build logistics in which the client never gets lost between routes, documents and people.',
    paragraphs: [
        'OnLan Logistic supports international shipments from Europe and Asia — from route to delivery.',
        'Road, sea, air, containers, customs clearance and warehouse logistics.',
    ],
    services: [
        { id: 'truck', label: 'Road' },
        { id: 'ship', label: 'Sea' },
        { id: 'plane', label: 'Air' },
        { id: 'box', label: 'Containers' },
        { id: 'customs', label: 'Customs' },
        { id: 'warehouse', label: 'Warehousing' },
    ],
    features: [
        { number: '01', id: 'handshake', label: 'Partnership' },
        { number: '02', id: 'comments', label: 'Communication' },
        { number: '03', id: 'shield', label: 'Delivery control' },
    ],
};

export const ABOUT_US_STORYTELL_MAP_EN: Widen<typeof UkMap> = {
    eyebrow: 'About the company',
    heading: 'Logistics is not just a system.',
    headingHighlight: 'It is people who make decisions.',
    textGroups: [
        {
            text: 'A Ukrainian logistics company that builds delivery not only on routes, but on strong communication between everyone involved in the process.',
            highlights: ['strong communication'],
        },
        {
            text: 'Our philosophy is partnership, responsibility and constant contact. Because logistics is always about people: at customs, in warehouses, in paperwork, on the road, behind the wheel and in touch with the client.',
            highlights: ['partnership, responsibility and constant contact.'],
        },
        {
            text: 'That is why communication at OnLan is not an extra perk but the first and most reliable pillar of our work. Because when cargo matters to a business, it is not only the system that decides, but the person next to you in the process.',
            highlights: ['communication at OnLan'],
        },
    ],
};

/** Alt texts for the About Us photo collage, by photo id. */
export const ABOUT_US_NEW_PHOTO_ALT_EN: Record<string, string> = {
    plane: 'Cargo being loaded onto a plane',
    truck: 'Truck at the port',
    containers: 'Container loading',
    warehouse: 'Warehouse logistics',
    office: 'ONLAN Logistic office',
    'truck-secondary': 'International road freight',
    'plane-secondary': 'Air cargo delivery',
};
