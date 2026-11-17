import type { ReactNode } from 'react';
import '@/app/globals.css';
import ClientShell from '@/components/app/ClientShell';
import JsonLd from '@/components/app/JsonLd';
import { LangProvider } from '@/components/app/LangProvider';
import { HTML_LANG, type Lang } from '@/lib/i18n';
import { createGraph, createOrganizationNode, createWebsiteNode } from '@/lib/structuredData';
import { EUkraine } from '@/styles/fonts';

/**
 * Shared `<html>`/`<body>` for both root layouts (`(uk)` and `(en)/en`), so the
 * document language, the site-wide JSON-LD and the shell are localized in the
 * server-rendered HTML — not patched in after hydration.
 */
export default function RootShell({ lang, children }: { lang: Lang; children: ReactNode }) {
    const siteJsonLd = createGraph([createOrganizationNode(lang), createWebsiteNode(lang)]);

    return (
        <html lang={HTML_LANG[lang]} className={`${EUkraine.variable} ${EUkraine.className}`}>
            <body>
                <LangProvider lang={lang}>
                    <JsonLd data={siteJsonLd} />
                    <ClientShell>{children}</ClientShell>
                </LangProvider>
            </body>
        </html>
    );
}
