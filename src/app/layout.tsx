import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import ClientShell from '@/components/app/ClientShell';
import JsonLd from '@/components/app/JsonLd';
import { createRootMetadata } from '@/lib/seo';
import { SITE_LANG, THEME_COLOR } from '@/lib/site';
import { createGraph, createOrganizationNode, createWebsiteNode } from '@/lib/structuredData';
import { EUkraine } from '@/styles/fonts';

export const metadata: Metadata = createRootMetadata();

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: THEME_COLOR,
};

/** Site-wide entities; page-level graphs reference these by `@id`. */
const siteJsonLd = createGraph([createOrganizationNode(), createWebsiteNode()]);

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang={SITE_LANG} className={`${EUkraine.variable} ${EUkraine.className}`}>
            <body>
                {/* Preloader is parked for now (components/elements/Preloader); re-enable: <Preloader /> */}
                <JsonLd data={siteJsonLd} />
                <ClientShell>{children}</ClientShell>
            </body>
        </html>
    );
}
