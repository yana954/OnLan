export const CONTACTS_HERO = {
    title: 'Контакти',
    brandTitle: 'ONLAN Logistic',
    description:
        'Маєте запитання або готові обговорити логістику? Зв’яжіться з нами зручним для вас способом.',
} as const;

/**
 * Primary, publicly listed contact details. Single source of truth: rendered on
 * the contacts page and reused for Organization / ContactPoint structured data,
 * so schema can never claim something the page does not show.
 */
export const CONTACTS_PRIMARY = {
    phoneDisplay: '+38 096 523 73 55',
    /** E.164, used for `tel:` links and structured data */
    phone: '+380965237355',
    email: 'info@onlan.com.ua',
    hours: 'Пн–Пт 9:00–18:00',
} as const;

export const CONTACTS_QUOTE_FORM = {
    title: 'Заявка на прорахунок або консультацію',
    fields: {
        name: 'Ваше ім’я',
        company: 'Компанія',
        email: 'Email',
        phone: 'Телефон',
        message: 'Повідомлення/коментар',
        file: 'Прикріпити файл (не обов’язково)',
    },
    submit: 'Надіслати',
} as const;

export const CONTACTS_DETAILS_SECTION = {
    eyebrow: 'Основні контактні дані',
    heading: 'Як з нами зв’язатися',
    columns: [
        {
            title: 'Відділ',
            items: [
                { label: 'Загальні запити' },
                { label: 'Відділ продажів' },
                { label: 'Підтримка клієнтів' },
            ],
        },
        {
            title: 'Телефон',
            items: [
                {
                    label: CONTACTS_PRIMARY.phoneDisplay,
                    href: `tel:${CONTACTS_PRIMARY.phone}`,
                },
                {
                    label: CONTACTS_PRIMARY.phoneDisplay,
                    href: `tel:${CONTACTS_PRIMARY.phone}`,
                },
                {
                    label: CONTACTS_PRIMARY.phoneDisplay,
                    href: `tel:${CONTACTS_PRIMARY.phone}`,
                },
            ],
        },
        {
            title: 'Email',
            items: [
                {
                    label: CONTACTS_PRIMARY.email,
                    href: `mailto:${CONTACTS_PRIMARY.email}`,
                },
                { label: 'sales@onlan.com.ua', href: 'mailto:sales@onlan.com.ua' },
                { label: 'support@onlan.ua', href: 'mailto:support@onlan.ua' },
            ],
        },
        {
            title: 'Графік роботи',
            items: [
                { label: CONTACTS_PRIMARY.hours },
                { label: CONTACTS_PRIMARY.hours },
                { label: '24/7' },
            ],
        },
    ],
} as const;

/**
 * Head-office address. Kept as structured parts so the visible text and the
 * PostalAddress in structured data always describe the same place.
 */
export const CONTACTS_ADDRESS = {
    street: 'вул. Логістична, 12',
    locality: 'Вінниця',
    country: 'Україна',
    /** ISO 3166-1 alpha-2, required by schema.org PostalAddress */
    countryCode: 'UA',
} as const;

export const CONTACTS_ADDRESS_TEXT = `${CONTACTS_ADDRESS.street}, ${CONTACTS_ADDRESS.locality}, ${CONTACTS_ADDRESS.country}`;

export const CONTACTS_OFFICES_SECTION = {
    eyebrow: 'Адреси офісів та мапа',
    heading: 'Наші офіси',
    officeTitle: 'Головний офіс (Вінниця)',
    address: CONTACTS_ADDRESS_TEXT,
    mapEmbedUrl:
        'https://www.google.com/maps?q=%D0%B2%D1%83%D0%BB.%20%D0%9B%D0%BE%D0%B3%D1%96%D1%81%D1%82%D0%B8%D1%87%D0%BD%D0%B0%2C%2012%2C%20%D0%92%D1%96%D0%BD%D0%BD%D0%B8%D1%86%D1%8F%2C%20%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D0%B0&z=15&output=embed',
} as const;

export const CONTACTS_FAQ_SECTION = {
    eyebrow: 'FAQ',
    heading: 'Часті запитання',
    placeholderAnswer: 'Відповідь буде додана.',
    items: [
        'Які послуги ви надаєте?',
        'Як обрати тип перевезення?',
        'Ви працюєте з частковими вантажами (збірними)?',
        'Як формується вартість доставки?',
        'Чи допомагаєте ви з підготовкою документів для митниці?',
        'Як формується вартість доставки?',
        'Ви працюєте з перевізниками або шукаєте партнерів?',
        'Чи можна укласти довгостроковий контракт на обслуговування?',
    ],
} as const;
