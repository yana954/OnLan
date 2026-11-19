import { DIRECTIONS, type DirectionContent } from '@/content/directions';
import { DIRECTIONS_EN } from '@/content/en/directions';
import { SERVICES_EN } from '@/content/en/services';
import { SERVICES, getServiceBySlug } from '@/content/services';
import type { Lang } from '@/lib/i18n';
import type { ServiceContent } from '@/types/Service.interface';
import { SITE_NAME } from '@/lib/site';

/**
 * Route registry — the single source of truth for public, indexable routes.
 * Consumed by page metadata, the XML sitemap and the breadcrumb trail so those
 * three can never drift apart.
 *
 * Private/never-indexable surfaces (the 404 page) are deliberately absent: if a
 * route is not listed here it does not end up in the sitemap.
 */

/**
 * Bump when page copy changes so `lastmod` stays truthful. Deliberately a fixed
 * date rather than `new Date()` — otherwise every rebuild would claim that all
 * pages changed.
 */
const CONTENT_LAST_MODIFIED = '2026-11-19';

export type BreadcrumbItem = {
    name: string;
    path: string;
};

export type PageSeo = {
    /** Full <title>, brand included. */
    title: string;
    /** Short human name for breadcrumbs and structured data (no brand suffix). */
    name: string;
    description: string;
    /** Canonical pathname, without query or trailing slash. */
    path: string;
    /** Open Graph type; defaults to `website`. */
    ogType?: 'website' | 'article' | 'profile';
    noIndex?: boolean;
};

export type SiteRoute = {
    seo: PageSeo;
    /** ISO date (YYYY-MM-DD) used for sitemap `lastmod`. */
    lastModified: string;
    /** Trail excluding the current page; empty for top-level pages. */
    breadcrumbs: BreadcrumbItem[];
};

export const HOME_SEO: PageSeo = {
    name: 'Головна',
    title: `Вантажні перевезення з Європи, Азії та США | ${SITE_NAME}`,
    description:
        'Вантажні перевезення з Європи, Азії та США в Україну: авто, море, авіа, залізниця. Митне оформлення «під ключ» і єдиний менеджер на всьому маршруті.',
    path: '/',
};

export const ABOUT_US_SEO: PageSeo = {
    name: 'Про нас',
    title: `Про компанію — логістичний партнер для бізнесу | ${SITE_NAME}`,
    description:
        'OnLan Logistic — надійний логістичний партнер для бізнесу: 10+ років досвіду в міжнародних, мультимодальних та авіаперевезеннях, історія та цінності компанії.',
    path: '/about-us',
};

export const SERVICES_SEO: PageSeo = {
    name: 'Послуги',
    title: `Послуги логістики: авто, море, авіа, залізниця | ${SITE_NAME}`,
    description:
        'Усі напрямки OnLan Logistic в одному місці: автомобільні, морські, авіа- та залізничні перевезення, негабарит, митне оформлення й мультимодальні рішення.',
    path: '/services',
};

export const CONTACTS_SEO: PageSeo = {
    name: 'Контакти',
    title: `Контакти — телефон, email та офіс у Літині | ${SITE_NAME}`,
    description:
        'Зв’яжіться з ONLAN Logistic: телефон, email, головний офіс у Літині та форма заявки на прорахунок доставки. Відповідаємо в робочі години Пн–Пт 9:00–18:00.',
    path: '/contacts',
};

export const NOT_FOUND_SEO: PageSeo = {
    name: 'Сторінку не знайдено',
    title: `Сторінку не знайдено (404) | ${SITE_NAME}`,
    description: 'Такої сторінки не існує. Перейдіть на головну або оберіть потрібну послугу.',
    path: '/404',
    noIndex: true,
};

export const HOME_SEO_EN: PageSeo = {
    name: 'Home',
    title: `Freight from Europe, Asia and the USA to Ukraine | ${SITE_NAME}`,
    description:
        'International freight from Europe, Asia and the USA to Ukraine: road, sea, air and rail. Turnkey customs clearance and one manager along the whole route.',
    path: '/',
};

export const ABOUT_US_SEO_EN: PageSeo = {
    name: 'About us',
    title: `About OnLan — a logistics partner for business | ${SITE_NAME}`,
    description:
        'OnLan Logistic is a reliable logistics partner for business: 10+ years in international, multimodal and air freight. Read our story and company values.',
    path: '/about-us',
};

export const SERVICES_SEO_EN: PageSeo = {
    name: 'Services',
    title: `Logistics services: road, sea, air, rail | ${SITE_NAME}`,
    description:
        'All OnLan Logistic services in one place: road, sea, air and rail freight, oversized cargo, customs clearance and multimodal solutions for your business.',
    path: '/services',
};

export const CONTACTS_SEO_EN: PageSeo = {
    name: 'Contacts',
    title: `Contacts — phone, email and office in Lytyn | ${SITE_NAME}`,
    description:
        'Contact ONLAN Logistic: phone, email, head office in Lytyn and a quote request form. We reply during working hours, Mon–Fri 9:00–18:00 (Kyiv time).',
    path: '/contacts',
};

export const NOT_FOUND_SEO_EN: PageSeo = {
    name: 'Page not found',
    title: `Page not found (404) | ${SITE_NAME}`,
    description: 'This page does not exist. Go to the home page or choose the service you need.',
    path: '/404',
    noIndex: true,
};

/** Static page SEO by language, keyed by logical path. */
export function getStaticSeo(lang: Lang): Record<string, PageSeo> {
    const list =
        lang === 'en'
            ? [HOME_SEO_EN, ABOUT_US_SEO_EN, SERVICES_SEO_EN, CONTACTS_SEO_EN]
            : [HOME_SEO, ABOUT_US_SEO, SERVICES_SEO, CONTACTS_SEO];
    return Object.fromEntries(list.map((seo) => [seo.path, seo]));
}

const crumbs = (lang: Lang) => {
    const seo = getStaticSeo(lang);
    return {
        home: { name: seo['/']!.name, path: '/' },
        services: { name: seo['/services']!.name, path: '/services' },
    };
};

/** Static, hand-authored routes. */
export function getStaticRoutes(lang: Lang = 'uk'): SiteRoute[] {
    const seo = getStaticSeo(lang);
    const { home } = crumbs(lang);
    return [
        { seo: seo['/']!, lastModified: CONTENT_LAST_MODIFIED, breadcrumbs: [] },
        { seo: seo['/about-us']!, lastModified: CONTENT_LAST_MODIFIED, breadcrumbs: [home] },
        { seo: seo['/services']!, lastModified: CONTENT_LAST_MODIFIED, breadcrumbs: [home] },
        { seo: seo['/contacts']!, lastModified: CONTENT_LAST_MODIFIED, breadcrumbs: [home] },
    ];
}

export const STATIC_ROUTES: SiteRoute[] = getStaticRoutes('uk');

export function directionPath(slug: string): string {
    return `/directions/${slug}`;
}

/** Metadata for one `/directions/[slug]` landing page. */
export function createDirectionRoute(direction: DirectionContent, lang: Lang = 'uk'): SiteRoute {
    const { home, services } = crumbs(lang);
    return {
        seo: {
            name: direction.title,
            title: direction.seo.title,
            description: direction.seo.description,
            path: directionPath(direction.slug),
        },
        lastModified: CONTENT_LAST_MODIFIED,
        breadcrumbs: [home, services],
    };
}

export function servicePath(slug: string): string {
    return `/services/${slug}`;
}

/** Metadata for one `/services/[slug]` page, derived from the service content. */
export function createServiceSeo(service: ServiceContent, lang: Lang = 'uk'): PageSeo {
    void lang; // copy is already language-specific; kept for a symmetrical API
    return {
        name: service.title,
        title: service.seo?.title ?? `${service.title} — ${service.tagLabel} | ${SITE_NAME}`,
        description: service.seo?.description ?? service.lead,
        path: servicePath(service.slug),
    };
}

export function createServiceRoute(service: ServiceContent, lang: Lang = 'uk'): SiteRoute {
    const { home, services } = crumbs(lang);
    return {
        seo: createServiceSeo(service, lang),
        lastModified: CONTENT_LAST_MODIFIED,
        breadcrumbs: [home, services],
    };
}

export function getServiceRouteBySlug(slug: string): SiteRoute | undefined {
    const service = getServiceBySlug(slug);
    return service ? createServiceRoute(service) : undefined;
}

/** Every publicly indexable route for a language (logical paths). */
export function getIndexableRoutes(lang: Lang = 'uk'): SiteRoute[] {
    const services = lang === 'en' ? SERVICES_EN : SERVICES;
    const directions = lang === 'en' ? DIRECTIONS_EN : DIRECTIONS;
    return [
        ...getStaticRoutes(lang),
        ...services.map((service) => createServiceRoute(service, lang)),
        ...directions.map((direction) => createDirectionRoute(direction, lang)),
    ].filter((route) => !route.seo.noIndex);
}

/** Breadcrumb trail including the current page, for schema + visible nav. */
export function getBreadcrumbTrail(route: SiteRoute): BreadcrumbItem[] {
    return [...route.breadcrumbs, { name: route.seo.name, path: route.seo.path }];
}

/** Looks up a static route by its logical path. */
export function getStaticRoute(path: string, lang: Lang = 'uk'): SiteRoute {
    const route = getStaticRoutes(lang).find((item) => item.seo.path === path);
    if (!route) {
        throw new Error(`Unknown static route: ${path}`);
    }
    return route;
}
