import type { Metadata } from 'next';
import JsonLd from '@/components/app/JsonLd';
import ServicesPage from '@/site-pages/ServicesPage';
import { SERVICES } from '@/content/services';
import { SERVICES_SEO, getBreadcrumbTrail, getStaticRoute } from '@/lib/routes';
import { createPageMetadata } from '@/lib/seo';
import {
    createBreadcrumbNode,
    createGraph,
    createServiceListNode,
    createWebPageNode,
} from '@/lib/structuredData';

export const metadata: Metadata = createPageMetadata(SERVICES_SEO);

const trail = getBreadcrumbTrail(getStaticRoute(SERVICES_SEO.path));

const servicesJsonLd = createGraph([
    createWebPageNode(SERVICES_SEO, { type: 'CollectionPage', breadcrumbTrail: trail }),
    createBreadcrumbNode(SERVICES_SEO.path, trail),
    createServiceListNode(SERVICES_SEO.path, SERVICES),
]);

export default function Services() {
    return (
        <>
            <JsonLd data={servicesJsonLd} />
            <ServicesPage breadcrumbs={trail} />
        </>
    );
}
