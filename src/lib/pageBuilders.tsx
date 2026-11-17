import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/app/JsonLd';
import { getContent } from '@/content';
import { SERVICE_STEP_PANEL_IMAGE_BY_SLUG } from '@/components/widgets/ServicesHowItWorksSection/serviceStepPanelImages';
import type { Lang } from '@/lib/i18n';
import {
    createDirectionRoute,
    createServiceRoute,
    getBreadcrumbTrail,
    getStaticRoute,
} from '@/lib/routes';
import { createPageMetadata } from '@/lib/seo';
import {
    createBreadcrumbNode,
    createFaqNode,
    createGraph,
    createServiceListNode,
    createServiceNode,
    createWebPageNode,
} from '@/lib/structuredData';
import AboutUsPage from '@/site-pages/AboutUsPage';
import ContactsPage from '@/site-pages/ContactsPage';
import DirectionDetailPage from '@/site-pages/DirectionDetailPage';
import HomePage from '@/site-pages/HomePage';
import ServiceDetailPage from '@/site-pages/ServiceDetailPage';
import ServicesPage from '@/site-pages/ServicesPage';

/**
 * One builder per page, parameterised by language. The `(uk)` and `(en)/en`
 * route files are thin wrappers around these, so the two language versions can
 * never drift apart in structure, metadata or structured data.
 */

type StaticPath = '/' | '/about-us' | '/services' | '/contacts';

export function staticPageMetadata(path: StaticPath, lang: Lang): Metadata {
    return createPageMetadata(getStaticRoute(path, lang).seo, lang);
}

export function HomeRoute({ lang }: { lang: Lang }) {
    const seo = getStaticRoute('/', lang).seo;
    const { services } = getContent(lang);
    const jsonLd = createGraph([
        createWebPageNode(seo, { lang }),
        // The home page renders the full service stack, so the list is visible content.
        createServiceListNode(seo.path, services, lang),
    ]);
    return (
        <>
            <JsonLd data={jsonLd} />
            <HomePage />
        </>
    );
}

export function AboutUsRoute({ lang }: { lang: Lang }) {
    const route = getStaticRoute('/about-us', lang);
    const trail = getBreadcrumbTrail(route);
    const jsonLd = createGraph([
        createWebPageNode(route.seo, { type: 'AboutPage', breadcrumbTrail: trail, lang }),
        createBreadcrumbNode(route.seo.path, trail, lang),
    ]);
    return (
        <>
            <JsonLd data={jsonLd} />
            <AboutUsPage />
        </>
    );
}

export function ContactsRoute({ lang }: { lang: Lang }) {
    const route = getStaticRoute('/contacts', lang);
    const trail = getBreadcrumbTrail(route);
    // No FAQPage node here: the contacts FAQ answers are still placeholders.
    const jsonLd = createGraph([
        createWebPageNode(route.seo, { type: 'ContactPage', breadcrumbTrail: trail, lang }),
        createBreadcrumbNode(route.seo.path, trail, lang),
    ]);
    return (
        <>
            <JsonLd data={jsonLd} />
            <ContactsPage />
        </>
    );
}

export function ServicesRoute({ lang }: { lang: Lang }) {
    const route = getStaticRoute('/services', lang);
    const trail = getBreadcrumbTrail(route);
    const { services } = getContent(lang);
    const jsonLd = createGraph([
        createWebPageNode(route.seo, { type: 'CollectionPage', breadcrumbTrail: trail, lang }),
        createBreadcrumbNode(route.seo.path, trail, lang),
        createServiceListNode(route.seo.path, services, lang),
    ]);
    return (
        <>
            <JsonLd data={jsonLd} />
            <ServicesPage breadcrumbs={trail} lang={lang} />
        </>
    );
}

const NOT_FOUND_TITLE: Record<Lang, string> = {
    uk: 'Сторінку не знайдено (404)',
    en: 'Page not found (404)',
};

export function serviceSlugs(lang: Lang): { slug: string }[] {
    return getContent(lang).services.map((service) => ({ slug: service.slug }));
}

export function serviceMetadata(slug: string, lang: Lang): Metadata {
    const service = getContent(lang).services.find((item) => item.slug === slug);
    if (!service) {
        // Unknown slug renders the 404; keep it out of the index.
        return { title: NOT_FOUND_TITLE[lang], robots: { index: false, follow: false } };
    }
    return createPageMetadata(createServiceRoute(service, lang).seo, lang);
}

export function ServiceRoute({ slug, lang }: { slug: string; lang: Lang }) {
    const service = getContent(lang).services.find((item) => item.slug === slug);
    if (!service) {
        notFound();
    }
    const route = createServiceRoute(service, lang);
    const trail = getBreadcrumbTrail(route);
    const jsonLd = createGraph([
        createWebPageNode(route.seo, { breadcrumbTrail: trail, lang }),
        createBreadcrumbNode(route.seo.path, trail, lang),
        createServiceNode(service, SERVICE_STEP_PANEL_IMAGE_BY_SLUG[service.slug], lang),
        createFaqNode(route.seo.path, service.faq, lang),
    ]);
    return (
        <>
            <JsonLd data={jsonLd} />
            <ServiceDetailPage service={service} breadcrumbs={trail} />
        </>
    );
}

export function directionSlugs(lang: Lang): { slug: string }[] {
    return getContent(lang).directions.map((direction) => ({ slug: direction.slug }));
}

export function directionMetadata(slug: string, lang: Lang): Metadata {
    const direction = getContent(lang).directions.find((item) => item.slug === slug);
    if (!direction) {
        return { title: NOT_FOUND_TITLE[lang], robots: { index: false, follow: false } };
    }
    return createPageMetadata(createDirectionRoute(direction, lang).seo, lang);
}

export function DirectionRoute({ slug, lang }: { slug: string; lang: Lang }) {
    const direction = getContent(lang).directions.find((item) => item.slug === slug);
    if (!direction) {
        notFound();
    }
    const route = createDirectionRoute(direction, lang);
    const trail = getBreadcrumbTrail(route);
    const jsonLd = createGraph([
        createWebPageNode(route.seo, { breadcrumbTrail: trail, lang }),
        createBreadcrumbNode(route.seo.path, trail, lang),
        createFaqNode(route.seo.path, direction.faq, lang),
    ]);
    return (
        <>
            <JsonLd data={jsonLd} />
            <DirectionDetailPage direction={direction} breadcrumbs={trail} />
        </>
    );
}
