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
    items: [
        {
            question: 'Які послуги ви надаєте?',
            answer:
                'Ми організовуємо автомобільні, морські та контейнерні, авіа- і залізничні перевезення, негабаритні та мультимодальні маршрути, а також митне оформлення. Працюємо за напрямками Азія, США, Європа та Україна. Оберіть потрібну послугу в розділі «Послуги» або напишіть нам.',
        },
        {
            question: 'Як обрати тип перевезення?',
            answer:
                'Вибір залежить від терміну, ваги, об’єму та вартості вантажу. Авто зазвичай підходить для Європи та України, море — для великих партій з Азії, авіа — для термінових і цінних вантажів, залізниця — для балансу ціни й швидкості. Менеджер допоможе підібрати варіант під вашу партію.',
        },
        {
            question: 'Ви працюєте з частковими вантажами (збірними)?',
            answer:
                'Так. Автомобільними маршрутами працюємо з LTL — збираємо групаж від кількох відправників, а морем — із LCL. Так ви платите лише за своє місце. Надішліть параметри вантажу, і ми підберемо оптимальну схему.',
        },
        {
            question: 'Як формується вартість доставки?',
            answer:
                'Вартість розраховуємо індивідуально. Вона залежить від маршруту, виду транспорту, ваги й об’єму, типу вантажу, термінів і додаткових послуг, наприклад митного оформлення. Надішліть заявку з даними про вантаж, і ми підготуємо розрахунок.',
        },
        {
            question: 'Чи допомагаєте ви з підготовкою документів для митниці?',
            answer:
                'Так. Ми готуємо й перевіряємо документи до відправлення: CMR, інвойси, пакувальні листи, сертифікати. Також класифікуємо вантаж за УКТ ЗЕД і супроводжуємо митне оформлення, щоб мінімізувати зупинки на кордоні.',
        },
        {
            question: 'Скільки часу триває доставка?',
            answer:
                'Строки залежать від маршруту, виду транспорту, сезону та митного оформлення. Прямі авторейси з більшості країн ЄС займають 3–7 днів. Для моря, залізниці й авіа орієнтовні терміни називаємо під конкретну партію після розрахунку.',
        },
        {
            question: 'Ви працюєте з перевізниками або шукаєте партнерів?',
            answer:
                'Ми працюємо з перевіреними європейськими та українськими перевізниками й розглядаємо пропозиції щодо співпраці. Напишіть на info@onlan.com.ua, вкажіть напрямки та тип транспорту, і ми зв’яжемося з вами.',
        },
        {
            question: 'Чи можна укласти довгостроковий контракт на обслуговування?',
            answer:
                'Так, для регулярних відправлень можна домовитися про постійні умови обслуговування. Напишіть нам про обсяги та напрямки, і менеджер обговорить формат співпраці.',
        },
    ],
} as const;
