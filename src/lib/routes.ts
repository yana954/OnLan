import { SERVICES, getServiceBySlug } from '@/content/services';
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
const CONTENT_LAST_MODIFIED = '2026-11-17';

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
    title: `Міжнародні вантажні перевезення з Європи, Азії та США | ${SITE_NAME}`,
    description:
        'Логістика для бізнесу, що рухається швидко: авто, море, авіа та залізниця, митне оформлення за 24 години, повний контроль маршруту та нульові затримки.',
    path: '/',
};

export const ABOUT_US_SEO: PageSeo = {
    name: 'Про нас',
    title: `Про компанію — логістичний партнер для бізнесу | ${SITE_NAME}`,
    description:
        'OnLan Logistic — надійний логістичний партнер для бізнесу: 10+ років досвіду в міжнародних, мультимодальних та авіаперевезеннях, команда та цінності компанії.',
    path: '/about-us',
};

export const SERVICES_SEO: PageSeo = {
    name: 'Послуги',
    title: `Послуги логістики: авто, море, авіа, залізниця, митниця | ${SITE_NAME}`,
    description:
        'Усі напрямки OnLan Logistic в одному місці: автомобільні, морські, авіа- та залізничні перевезення, негабарит, митне оформлення й мультимодальні рішення.',
    path: '/services',
};

export const CONTACTS_SEO: PageSeo = {
    name: 'Контакти',
    title: `Контакти — телефон, email та офіс у Вінниці | ${SITE_NAME}`,
    description:
        'Зв’яжіться з ONLAN Logistic: телефон, email, головний офіс у Вінниці та форма заявки на прорахунок доставки. Відповідаємо в робочі години Пн–Пт 9:00–18:00.',
    path: '/contacts',
};

export const NOT_FOUND_SEO: PageSeo = {
    name: 'Сторінку не знайдено',
    title: `Сторінку не знайдено (404) | ${SITE_NAME}`,
    description: 'Такої сторінки не існує. Перейдіть на головну або оберіть потрібну послугу.',
    path: '/404',
    noIndex: true,
};

const HOME_CRUMB: BreadcrumbItem = { name: HOME_SEO.name, path: HOME_SEO.path };
const SERVICES_CRUMB: BreadcrumbItem = { name: SERVICES_SEO.name, path: SERVICES_SEO.path };

/** Static, hand-authored routes. */
export const STATIC_ROUTES: SiteRoute[] = [
    { seo: HOME_SEO, lastModified: CONTENT_LAST_MODIFIED, breadcrumbs: [] },
    { seo: ABOUT_US_SEO, lastModified: CONTENT_LAST_MODIFIED, breadcrumbs: [HOME_CRUMB] },
    { seo: SERVICES_SEO, lastModified: CONTENT_LAST_MODIFIED, breadcrumbs: [HOME_CRUMB] },
    { seo: CONTACTS_SEO, lastModified: CONTENT_LAST_MODIFIED, breadcrumbs: [HOME_CRUMB] },
];

export function servicePath(slug: string): string {
    return `/services/${slug}`;
}

/** Metadata for one `/services/[slug]` page, derived from the service content. */
export function createServiceSeo(service: ServiceContent): PageSeo {
    return {
        name: service.title,
        title: service.seo?.title ?? `${service.title} — ${service.tagLabel} | ${SITE_NAME}`,
        description: service.seo?.description ?? service.lead,
        path: servicePath(service.slug),
    };
}

export function createServiceRoute(service: ServiceContent): SiteRoute {
    return {
        seo: createServiceSeo(service),
        lastModified: CONTENT_LAST_MODIFIED,
        breadcrumbs: [HOME_CRUMB, SERVICES_CRUMB],
    };
}

export function getServiceRouteBySlug(slug: string): SiteRoute | undefined {
    const service = getServiceBySlug(slug);
    return service ? createServiceRoute(service) : undefined;
}

/** Every publicly indexable route on the site. */
export function getIndexableRoutes(): SiteRoute[] {
    return [...STATIC_ROUTES, ...SERVICES.map(createServiceRoute)].filter(
        (route) => !route.seo.noIndex,
    );
}

/** Breadcrumb trail including the current page, for schema + visible nav. */
export function getBreadcrumbTrail(route: SiteRoute): BreadcrumbItem[] {
    return [...route.breadcrumbs, { name: route.seo.name, path: route.seo.path }];
}

/** Looks up a static route by its canonical path. */
export function getStaticRoute(path: string): SiteRoute {
    const route = STATIC_ROUTES.find((item) => item.seo.path === path);
    if (!route) {
        throw new Error(`Unknown static route: ${path}`);
    }
    return route;
}
