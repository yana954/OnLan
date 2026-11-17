import type { Metadata } from 'next';
import NotFoundPage from '@/site-pages/NotFoundPage';
import { NOT_FOUND_SEO } from '@/lib/routes';
import { createPageMetadata } from '@/lib/seo';

/**
 * 404 handling. The page is `noindex` and carries no canonical, no Open Graph
 * card and no structured data — it is an error state, not a document worth
 * indexing or sharing.
 */
export const metadata: Metadata = createPageMetadata(NOT_FOUND_SEO);

export default function NotFound() {
    return <NotFoundPage />;
}
