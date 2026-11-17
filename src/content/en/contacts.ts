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
    street: '12 Lohistychna St',
    locality: 'Vinnytsia',
    country: 'Ukraine',
    countryCode: 'UA',
};

export const CONTACTS_ADDRESS_TEXT_EN = `${CONTACTS_ADDRESS_EN.street}, ${CONTACTS_ADDRESS_EN.locality}, ${CONTACTS_ADDRESS_EN.country}`;

export const CONTACTS_OFFICES_SECTION_EN: Widen<typeof UkOffices> = {
    eyebrow: 'Office addresses and map',
    heading: 'Our offices',
    officeTitle: 'Head office (Vinnytsia)',
    address: CONTACTS_ADDRESS_TEXT_EN,
    mapEmbedUrl:
        'https://www.google.com/maps?q=%D0%B2%D1%83%D0%BB.%20%D0%9B%D0%BE%D0%B3%D1%96%D1%81%D1%82%D0%B8%D1%87%D0%BD%D0%B0%2C%2012%2C%20%D0%92%D1%96%D0%BD%D0%BD%D0%B8%D1%86%D1%8F%2C%20%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D0%B0&z=15&output=embed&hl=en',
};

export const CONTACTS_FAQ_SECTION_EN: Widen<typeof UkFaq> = {
    eyebrow: 'FAQ',
    heading: 'Frequently asked questions',
    placeholderAnswer: 'Answer coming soon.',
    items: [
        'What services do you provide?',
        'How do I choose the type of transport?',
        'Do you handle partial (groupage) loads?',
        'How is the delivery price calculated?',
        'Do you help prepare customs documents?',
        'How is the delivery price calculated?',
        'Do you work with carriers or look for partners?',
        'Can we sign a long-term service contract?',
    ],
};
