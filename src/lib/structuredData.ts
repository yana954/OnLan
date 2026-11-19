import { getOrganization } from '@/content/organization';
import { OG_LOCALE_TAG, localePath, type Lang } from '@/lib/i18n';
import type { BreadcrumbItem, PageSeo } from '@/lib/routes';
import type { ServiceContent } from '@/types/Service.interface';
import { LOGO_IMAGE, OG_IMAGE, SITE_NAME, SITE_URL, absoluteUrl } from '@/lib/site';

/**
 * JSON-LD builders. Every node is emitted inside a single `@graph` per page and
 * cross-referenced by `@id`, so the Organization/WebSite entities are described
 * once and reused instead of being duplicated on every page.
 *
 * Only facts that are visible on the rendered page are described here.
 */

export type JsonLdNode = Record<string, unknown>;

/** Stable `@id` for a page-scoped node, e.g. `https://onlan.com.ua/services/air#webpage`. */
function nodeId(path: string, fragment: string, lang: Lang = 'uk'): string {
    const url = absoluteUrl(localePath(lang, path));
    return `${url === SITE_URL ? `${url}/` : url}#${fragment}`;
}

/** One organization entity for both languages; the website entity is per language. */
const ORGANIZATION_ID = nodeId('/', 'organization');
const websiteId = (lang: Lang) => nodeId('/', 'website', lang);

export const organizationRef = { '@id': ORGANIZATION_ID };
const websiteRef = (lang: Lang) => ({ '@id': websiteId(lang) });

export function createOrganizationNode(lang: Lang = 'uk'): JsonLdNode {
    const ORGANIZATION = getOrganization(lang);
    const node: JsonLdNode = {
        '@type': 'Organization',
        '@id': ORGANIZATION_ID,
        name: ORGANIZATION.name,
        alternateName: ORGANIZATION.alternateName,
        description: ORGANIZATION.description,
        url: absoluteUrl(localePath(lang, '/')),
        logo: {
            '@type': 'ImageObject',
            url: absoluteUrl(LOGO_IMAGE.path),
            width: LOGO_IMAGE.width,
            height: LOGO_IMAGE.height,
        },
        image: absoluteUrl(OG_IMAGE.path),
        email: ORGANIZATION.email,
        telephone: ORGANIZATION.telephone,
        address: {
            '@type': 'PostalAddress',
            ...(ORGANIZATION.address.street ? { streetAddress: ORGANIZATION.address.street } : {}),
            addressLocality: ORGANIZATION.address.locality,
            addressRegion: ORGANIZATION.address.region,
            addressCountry: ORGANIZATION.address.countryCode,
        },
        contactPoint: [
            {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                telephone: ORGANIZATION.telephone,
                email: ORGANIZATION.email,
                availableLanguage: ['uk', 'en'],
                hoursAvailable: {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                    opens: '09:00',
                    closes: '18:00',
                },
            },
        ],
    };

    if (ORGANIZATION.sameAs.length > 0) {
        node.sameAs = ORGANIZATION.sameAs;
    }

    return node;
}

/**
 * No `SearchAction` — the site has no on-site search endpoint, and declaring one
 * that does not exist is exactly the kind of fiction Google ignores at best.
 */
export function createWebsiteNode(lang: Lang = 'uk'): JsonLdNode {
    return {
        '@type': 'WebSite',
        '@id': websiteId(lang),
        name: SITE_NAME,
        url: absoluteUrl(localePath(lang, '/')),
        inLanguage: OG_LOCALE_TAG[lang],
        publisher: organizationRef,
    };
}

type WebPageType = 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';

export function createWebPageNode(
    config: PageSeo,
    options: { type?: WebPageType; breadcrumbTrail?: BreadcrumbItem[]; lang?: Lang } = {},
): JsonLdNode {
    const lang = options.lang ?? 'uk';
    const url = absoluteUrl(localePath(lang, config.path));
    const node: JsonLdNode = {
        '@type': options.type ?? 'WebPage',
        '@id': nodeId(config.path, 'webpage', lang),
        url,
        name: config.name,
        description: config.description,
        inLanguage: OG_LOCALE_TAG[lang],
        isPartOf: websiteRef(lang),
        about: organizationRef,
        primaryImageOfPage: {
            '@type': 'ImageObject',
            url: absoluteUrl(OG_IMAGE.path),
            width: OG_IMAGE.width,
            height: OG_IMAGE.height,
        },
    };

    if (options.breadcrumbTrail && options.breadcrumbTrail.length > 1) {
        node.breadcrumb = { '@id': nodeId(config.path, 'breadcrumb', lang) };
    }

    return node;
}

export function createBreadcrumbNode(
    pagePath: string,
    trail: BreadcrumbItem[],
    lang: Lang = 'uk',
): JsonLdNode {
    return {
        '@type': 'BreadcrumbList',
        '@id': nodeId(pagePath, 'breadcrumb', lang),
        itemListElement: trail.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: absoluteUrl(localePath(lang, item.path)),
        })),
    };
}

/** Географія з бігучого рядка регіонів на головній. */
const SERVICE_AREA_NAMES: Record<Lang, string[]> = {
    uk: ['Україна', 'Європа', 'Азія', 'США', 'Велика Британія'],
    en: ['Ukraine', 'Europe', 'Asia', 'USA', 'United Kingdom'],
};
const serviceArea = (lang: Lang) => SERVICE_AREA_NAMES[lang].map((name) => ({ '@type': 'Place', name }));

export function createServiceNode(
    service: ServiceContent,
    imagePath?: string,
    lang: Lang = 'uk',
): JsonLdNode {
    const url = absoluteUrl(localePath(lang, `/services/${service.slug}`));

    const node: JsonLdNode = {
        '@type': 'Service',
        '@id': nodeId(`/services/${service.slug}`, 'service', lang),
        name: service.title,
        serviceType: service.tagLabel,
        description: service.lead,
        provider: organizationRef,
        areaServed: serviceArea(lang),
        url,
        mainEntityOfPage: { '@id': nodeId(`/services/${service.slug}`, 'webpage', lang) },
    };

    if (imagePath) {
        node.image = absoluteUrl(imagePath);
    }

    return node;
}

/**
 * FAQ schema is only ever built from question/answer pairs that are rendered in
 * the page markup (the service accordions). The contacts page FAQ has no real
 * answers yet, so it deliberately gets no FAQPage node.
 */
export function createFaqNode(
    pagePath: string,
    faq: { question: string; answer: string }[],
    lang: Lang = 'uk',
): JsonLdNode | null {
    const answered = faq.filter((item) => item.question.trim() && item.answer.trim());
    if (answered.length === 0) {
        return null;
    }

    return {
        '@type': 'FAQPage',
        '@id': nodeId(pagePath, 'faq', lang),
        mainEntity: answered.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
            },
        })),
    };
}

export function createServiceListNode(
    pagePath: string,
    services: ServiceContent[],
    lang: Lang = 'uk',
): JsonLdNode {
    return {
        '@type': 'ItemList',
        '@id': nodeId(pagePath, 'services', lang),
        name: lang === 'en' ? 'OnLan Logistic services' : 'Послуги OnLan Logistic',
        numberOfItems: services.length,
        itemListElement: services.map((service, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: service.title,
            url: absoluteUrl(localePath(lang, `/services/${service.slug}`)),
        })),
    };
}

/** Wraps nodes into one `@graph` document. */
export function createGraph(nodes: (JsonLdNode | null | undefined)[]): JsonLdNode {
    return {
        '@context': 'https://schema.org',
        '@graph': nodes.filter((node): node is JsonLdNode => Boolean(node)),
    };
}
