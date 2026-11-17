import { ORGANIZATION } from '@/content/organization';
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
function nodeId(path: string, fragment: string): string {
    const url = absoluteUrl(path);
    return `${url === SITE_URL ? `${url}/` : url}#${fragment}`;
}

const ORGANIZATION_ID = nodeId('/', 'organization');
const WEBSITE_ID = nodeId('/', 'website');

export const organizationRef = { '@id': ORGANIZATION_ID };
export const websiteRef = { '@id': WEBSITE_ID };

export function createOrganizationNode(): JsonLdNode {
    const node: JsonLdNode = {
        '@type': 'Organization',
        '@id': ORGANIZATION_ID,
        name: ORGANIZATION.name,
        alternateName: ORGANIZATION.alternateName,
        description: ORGANIZATION.description,
        url: absoluteUrl('/'),
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
            streetAddress: ORGANIZATION.address.street,
            addressLocality: ORGANIZATION.address.locality,
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
export function createWebsiteNode(): JsonLdNode {
    return {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: SITE_NAME,
        url: absoluteUrl('/'),
        inLanguage: 'uk-UA',
        publisher: organizationRef,
    };
}

type WebPageType = 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';

export function createWebPageNode(
    config: PageSeo,
    options: { type?: WebPageType; breadcrumbTrail?: BreadcrumbItem[] } = {},
): JsonLdNode {
    const url = absoluteUrl(config.path);
    const node: JsonLdNode = {
        '@type': options.type ?? 'WebPage',
        '@id': nodeId(config.path, 'webpage'),
        url,
        name: config.name,
        description: config.description,
        inLanguage: 'uk-UA',
        isPartOf: websiteRef,
        about: organizationRef,
        primaryImageOfPage: {
            '@type': 'ImageObject',
            url: absoluteUrl(OG_IMAGE.path),
            width: OG_IMAGE.width,
            height: OG_IMAGE.height,
        },
    };

    if (options.breadcrumbTrail && options.breadcrumbTrail.length > 1) {
        node.breadcrumb = { '@id': nodeId(config.path, 'breadcrumb') };
    }

    return node;
}

export function createBreadcrumbNode(pagePath: string, trail: BreadcrumbItem[]): JsonLdNode {
    return {
        '@type': 'BreadcrumbList',
        '@id': nodeId(pagePath, 'breadcrumb'),
        itemListElement: trail.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: absoluteUrl(item.path),
        })),
    };
}

/** Географія з бігучого рядка регіонів на головній. */
const SERVICE_AREA = ['Україна', 'Європа', 'Азія', 'США', 'Велика Британія'].map((name) => ({ '@type': 'Place', name }));

export function createServiceNode(service: ServiceContent, imagePath?: string): JsonLdNode {
    const url = absoluteUrl(`/services/${service.slug}`);

    const node: JsonLdNode = {
        '@type': 'Service',
        '@id': nodeId(`/services/${service.slug}`, 'service'),
        name: service.title,
        serviceType: service.tagLabel,
        description: service.lead,
        provider: organizationRef,
        areaServed: SERVICE_AREA,
        url,
        mainEntityOfPage: { '@id': nodeId(`/services/${service.slug}`, 'webpage') },
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
): JsonLdNode | null {
    const answered = faq.filter((item) => item.question.trim() && item.answer.trim());
    if (answered.length === 0) {
        return null;
    }

    return {
        '@type': 'FAQPage',
        '@id': nodeId(pagePath, 'faq'),
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
): JsonLdNode {
    return {
        '@type': 'ItemList',
        '@id': nodeId(pagePath, 'services'),
        name: 'Послуги OnLan Logistic',
        numberOfItems: services.length,
        itemListElement: services.map((service, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: service.title,
            url: absoluteUrl(`/services/${service.slug}`),
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
