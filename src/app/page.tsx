import type { Metadata } from 'next';
import JsonLd from '@/components/app/JsonLd';
import HomePage from '@/site-pages/HomePage';
import { HOME_SEO } from '@/lib/routes';
import { createPageMetadata } from '@/lib/seo';
import { SERVICES } from '@/content/services';
import { createGraph, createServiceListNode, createWebPageNode } from '@/lib/structuredData';

export const metadata: Metadata = createPageMetadata(HOME_SEO);

const homeJsonLd = createGraph([
    createWebPageNode(HOME_SEO),
    // The home page renders the full service stack, so the list is visible content.
    createServiceListNode(HOME_SEO.path, SERVICES),
]);

export default function Home() {
    return (
        <>
            <JsonLd data={homeJsonLd} />
            <HomePage />
        </>
    );
}
