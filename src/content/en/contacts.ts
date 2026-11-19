import {
    CONTACTS_PRIMARY,
    type CONTACTS_DETAILS_SECTION as UkDetails,
    type CONTACTS_FAQ_SECTION as UkFaq,
    type CONTACTS_HERO as UkHero,
    type CONTACTS_OFFICES_SECTION as UkOffices,
    type CONTACTS_QUOTE_FORM as UkForm,
} from '@/content/contacts';
import type { Widen } from '@/types/Widen';

export const CONTACTS_HERO_EN: Widen<typeof UkHero> = {
    title: 'Contacts',
    brandTitle: 'ONLAN Logistic',
    description:
        'Have a question or ready to discuss your shipment? Get in touch whichever way suits you best.',
};

export const CONTACTS_PRIMARY_EN = {
    ...CONTACTS_PRIMARY,
    hours: 'Mon–Fri 9:00–18:00 (Kyiv time)',
};

export const CONTACTS_QUOTE_FORM_EN: Widen<typeof UkForm> = {
    title: 'Request a quote or a consultation',
    fields: {
        name: 'Your name',
        company: 'Company',
        email: 'Email',
        phone: 'Phone',
        message: 'Message / comment',
        file: 'Attach a file (optional)',
    },
    submit: 'Send',
};

export const CONTACTS_DETAILS_SECTION_EN: Widen<typeof UkDetails> = {
    eyebrow: 'Key contact details',
    heading: 'How to reach us',
    columns: [
        {
            title: 'Department',
            items: [{ label: 'General enquiries' }, { label: 'Sales' }, { label: 'Customer support' }],
        },
        {
            title: 'Phone',
            items: [
                { label: CONTACTS_PRIMARY.phoneDisplay, href: `tel:${CONTACTS_PRIMARY.phone}` },
                { label: CONTACTS_PRIMARY.phoneDisplay, href: `tel:${CONTACTS_PRIMARY.phone}` },
                { label: CONTACTS_PRIMARY.phoneDisplay, href: `tel:${CONTACTS_PRIMARY.phone}` },
            ],
        },
        {
            title: 'Email',
            items: [
                { label: CONTACTS_PRIMARY.email, href: `mailto:${CONTACTS_PRIMARY.email}` },
                { label: 'sales@onlan.com.ua', href: 'mailto:sales@onlan.com.ua' },
                { label: 'support@onlan.ua', href: 'mailto:support@onlan.ua' },
            ],
        },
        {
            title: 'Working hours',
            items: [
                { label: CONTACTS_PRIMARY_EN.hours },
                { label: CONTACTS_PRIMARY_EN.hours },
                { label: '24/7' },
            ],
        },
    ],
};

export const CONTACTS_ADDRESS_EN = {
    street: '',
    locality: 'Lytyn',
    region: 'Vinnytsia Oblast',
    country: 'Ukraine',
    countryCode: 'UA',
};

export const CONTACTS_ADDRESS_TEXT_EN = [CONTACTS_ADDRESS_EN.street, CONTACTS_ADDRESS_EN.locality, CONTACTS_ADDRESS_EN.region, CONTACTS_ADDRESS_EN.country]
    .filter(Boolean)
    .join(', ');

export const CONTACTS_OFFICES_SECTION_EN: Widen<typeof UkOffices> = {
    eyebrow: 'Office addresses and map',
    heading: 'Our offices',
    officeTitle: 'Head office (Lytyn)',
    address: CONTACTS_ADDRESS_TEXT_EN,
    mapEmbedUrl:
        'https://www.google.com/maps?q=%D0%9B%D1%96%D1%82%D0%B8%D0%BD%2C%20%D0%92%D1%96%D0%BD%D0%BD%D0%B8%D1%86%D1%8C%D0%BA%D0%B0%20%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C%2C%20%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D0%B0&z=14&output=embed&hl=en',
};

export const CONTACTS_FAQ_SECTION_EN: Widen<typeof UkFaq> = {
    eyebrow: 'FAQ',
    heading: 'Frequently asked questions',
    items: [
        {
            question: 'What services do you provide?',
            answer:
                'We organise road, sea and container, air and rail freight, oversized and multimodal routes, and customs clearance. We work on routes from Asia, the USA, Europe and within Ukraine. Choose a service in the “Services” section or write to us.',
        },
        {
            question: 'How do I choose the type of transport?',
            answer:
                'It depends on the deadline, weight, volume and value of the cargo. Road usually suits Europe and Ukraine, sea suits large shipments from Asia, air suits urgent and valuable cargo, and rail balances price and speed. A manager will help you choose for your shipment.',
        },
        {
            question: 'Do you handle partial (groupage) loads?',
            answer:
                'Yes. On road routes we handle LTL, consolidating groupage from several shippers, and by sea we handle LCL. This way you pay only for your own space. Send us the cargo details and we will propose the best scheme.',
        },
        {
            question: 'How is the delivery price calculated?',
            answer:
                'We calculate the cost individually. It depends on the route, mode of transport, weight and volume, cargo type, deadlines and extra services such as customs clearance. Send a request with your cargo details and we will prepare a quote.',
        },
        {
            question: 'Do you help prepare customs documents?',
            answer:
                'Yes. We prepare and check documents before dispatch: CMR, invoices, packing lists and certificates. We also classify the cargo by HS code and support customs clearance to minimise stops at the border.',
        },
        {
            question: 'How long does delivery take?',
            answer:
                'Transit times depend on the route, mode of transport, season and customs clearance. Direct road trips from most EU countries take 3–7 days. For sea, rail and air we give indicative times for your specific shipment after the quote.',
        },
        {
            question: 'Do you work with carriers or look for partners?',
            answer:
                'We work with vetted European and Ukrainian carriers and consider partnership proposals. Write to info@onlan.com.ua with your routes and type of transport, and we will get back to you.',
        },
        {
            question: 'Can we sign a long-term service contract?',
            answer:
                'Yes. For regular shipments we can agree standing service terms. Tell us about your volumes and routes, and a manager will discuss the cooperation format.',
        },
    ],
};
