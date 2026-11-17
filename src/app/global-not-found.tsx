import type { Metadata } from 'next';
import '@/app/globals.css';
import ClientShell from '@/components/app/ClientShell';
import { LangProvider } from '@/components/app/LangProvider';
import { HTML_LANG } from '@/lib/i18n';
import { NOT_FOUND_SEO } from '@/lib/routes';
import { createPageMetadata } from '@/lib/seo';
import NotFoundPage from '@/site-pages/NotFoundPage';
import { EUkraine } from '@/styles/fonts';

/**
 * Global 404 (there are two root layouts, so Next needs this one to own
 * `<html>`). `noindex`, no canonical, no structured data — an error state, not
 * a document worth indexing. Language: Ukrainian, the site default.
 */
export const metadata: Metadata = createPageMetadata(NOT_FOUND_SEO, 'uk');

export default function GlobalNotFound() {
    return (
        <html lang={HTML_LANG.uk} className={`${EUkraine.variable} ${EUkraine.className}`}>
            <body>
                <LangProvider lang="uk">
                    <ClientShell>
                        <NotFoundPage />
                    </ClientShell>
                </LangProvider>
            </body>
        </html>
    );
}
