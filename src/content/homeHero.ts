export const HOME_HERO = {
    badge: 'МІЖНАРОДНА ЛОГІСТИКА',
    titleLines: ['Міжнародні', 'перевезення'],
    titleHighlight: 'Європа, Китай',
    description:
        'Логістика для бізнесу, що рухається швидко. Митниця за 24 години, повний контроль маршруту, нульові затримки.',
    cta: 'Отримати розрахунок доставки',
    secondaryCta: 'Наші послуги',
    advantages: [
        {
            key: 'manager',
            title: '1 менеджер',
            description: 'на весь маршрут',
        },
        {
            key: 'support',
            title: '24/7',
            description: 'на зв’язку з Вами',
        },
        {
            key: 'predictable',
            title: '0 сюрпризів',
            description: 'по вартості та строках',
        },
    ],
    /** Види перевезень у візуальному блоці; `slug` збігається зі сторінкою послуги. */
    modes: [
        { key: 'sea', slug: 'sea-container', label: 'Море', alt: 'Контейнеровоз у порту' },
        { key: 'air', slug: 'air', label: 'Авіа', alt: 'Вантажний літак у небі' },
        { key: 'road', slug: 'automotive', label: 'Авто', alt: 'Вантажівка на гірській дорозі' },
    ],
} as const;
