import type { Metadata } from 'next';
import JsonLd from '@/components/app/JsonLd';
import { ABOUT_US_SEO, getBreadcrumbTrail, getStaticRoute } from '@/lib/routes';
import { createPageMetadata } from '@/lib/seo';
import { createBreadcrumbNode, createGraph, createWebPageNode } from '@/lib/structuredData';
import AboutUsPage from '@/site-pages/AboutUsPage';

export const metadata: Metadata = createPageMetadata(ABOUT_US_SEO);

const trail = getBreadcrumbTrail(getStaticRoute(ABOUT_US_SEO.path));

const aboutUsJsonLd = createGraph([
    createWebPageNode(ABOUT_US_SEO, { type: 'AboutPage', breadcrumbTrail: trail }),
    createBreadcrumbNode(ABOUT_US_SEO.path, trail),
]);

export default function AboutUs() {
    return (
        <>
            <JsonLd data={aboutUsJsonLd} />
            <AboutUsPage />
        </>
    );
}
