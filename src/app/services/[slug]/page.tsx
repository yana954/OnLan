import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/app/JsonLd';
import ServiceDetailPage from '@/site-pages/ServiceDetailPage';
import { SERVICES, getServiceBySlug } from '@/content/services';
import { SERVICE_STEP_PANEL_IMAGE_BY_SLUG } from '@/components/widgets/ServicesHowItWorksSection/serviceStepPanelImages';
import { createServiceRoute, createServiceSeo, getBreadcrumbTrail } from '@/lib/routes';
import { createPageMetadata } from '@/lib/seo';
import {
    createBreadcrumbNode,
    createFaqNode,
    createGraph,
    createServiceNode,
    createWebPageNode,
} from '@/lib/structuredData';

type ServicePageProps = {
    params: Promise<{ slug: string }>;
};

/** Only the seven known slugs are pre-rendered; anything else 404s. */
export function generateStaticParams() {
    return SERVICES.map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
    const { slug } = await params;
    const service = getServiceBySlug(slug);

    if (!service) {
        // Unknown slug renders the 404 below; keep it out of the index.
        return { title: 'Сторінку не знайдено (404)', robots: { index: false, follow: false } };
    }

    return createPageMetadata(createServiceSeo(service));
}

export default async function ServicePage({ params }: ServicePageProps) {
    const { slug } = await params;
    const service = getServiceBySlug(slug);

    if (!service) {
        notFound();
    }

    const route = createServiceRoute(service);
    const trail = getBreadcrumbTrail(route);

    const jsonLd = createGraph([
        createWebPageNode(route.seo, { breadcrumbTrail: trail }),
        createBreadcrumbNode(route.seo.path, trail),
        createServiceNode(service, SERVICE_STEP_PANEL_IMAGE_BY_SLUG[service.slug]),
        createFaqNode(route.seo.path, service.faq),
    ]);

    return (
        <>
            <JsonLd data={jsonLd} />
            <ServiceDetailPage service={service} breadcrumbs={trail} />
        </>
    );
}
