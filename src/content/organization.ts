import { CONTACTS_ADDRESS, CONTACTS_PRIMARY } from '@/content/contacts';
import { CONTACTS_ADDRESS_EN } from '@/content/en/contacts';
import type { Lang } from '@/lib/i18n';
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
        'Міжнародна логістика для бізнесу: доставка з Європи, Азії та США в Україну, митне оформлення, страхування. Працюємо з 2012 року, Літин, Вінницька область.',
    email: CONTACTS_PRIMARY.email,
    telephone: CONTACTS_PRIMARY.phone,
    address: CONTACTS_ADDRESS,
    /** Matches «Графік роботи» on the contacts page */
    openingHours: 'Mo-Fr 09:00-18:00',
    sameAs: [] as string[],
} as const;

const ORGANIZATION_EN = {
    ...ORGANIZATION,
    description:
        'International logistics for business: delivery from Europe, Asia and the USA to Ukraine, customs clearance, cargo insurance. Operating since 2012, based in Lytyn, Vinnytsia Oblast.',
    address: CONTACTS_ADDRESS_EN,
};

export function getOrganization(lang: Lang) {
    return lang === 'en' ? ORGANIZATION_EN : ORGANIZATION;
}
