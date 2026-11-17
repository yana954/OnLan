import type { Metadata } from 'next';
import JsonLd from '@/components/app/JsonLd';
import { CONTACTS_SEO, getBreadcrumbTrail, getStaticRoute } from '@/lib/routes';
import { createPageMetadata } from '@/lib/seo';
import { createBreadcrumbNode, createGraph, createWebPageNode } from '@/lib/structuredData';
import ContactsPage from '@/site-pages/ContactsPage';

export const metadata: Metadata = createPageMetadata(CONTACTS_SEO);

const trail = getBreadcrumbTrail(getStaticRoute(CONTACTS_SEO.path));

// No FAQPage node here: the contacts FAQ answers are still placeholders.
const contactsJsonLd = createGraph([
    createWebPageNode(CONTACTS_SEO, { type: 'ContactPage', breadcrumbTrail: trail }),
    createBreadcrumbNode(CONTACTS_SEO.path, trail),
]);

export default function Contacts() {
    return (
        <>
            <JsonLd data={contactsJsonLd} />
            <ContactsPage />
        </>
    );
}
