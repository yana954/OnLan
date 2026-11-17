import { CONTACTS_ADDRESS, CONTACTS_PRIMARY } from '@/content/contacts';
import { SITE_NAME } from '@/lib/site';

/**
 * Publicly verifiable facts about the company, reused for Organization
 * structured data. Everything here is also visible somewhere on the site —
 * nothing is invented for search engines.
 *
 * `sameAs` is intentionally empty: the social links in the footer still point at
 * the networks' home pages, not at owned company profiles. Add the real profile
 * URLs here (and in the footer) once they exist.
 */
export const ORGANIZATION = {
    name: SITE_NAME,
    /** Brand spelling used in the UI */
    alternateName: 'ONLAN Logistic',
    description:
        'Міжнародна логістика для бізнесу: доставка з Європи, Азії та США в Україну, митне оформлення, страхування. Працюємо з 2012 року, Вінниця.',
    email: CONTACTS_PRIMARY.email,
    telephone: CONTACTS_PRIMARY.phone,
    address: CONTACTS_ADDRESS,
    /** Matches «Графік роботи» on the contacts page */
    openingHours: 'Mo-Fr 09:00-18:00',
    sameAs: [] as string[],
} as const;
