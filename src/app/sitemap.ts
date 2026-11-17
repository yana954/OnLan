import type { MetadataRoute } from 'next';
import { getIndexableRoutes } from '@/lib/routes';
import { IS_INDEXABLE_ENVIRONMENT, absoluteUrl } from '@/lib/site';

export const dynamic = 'force-static';

/**
 * XML sitemap, generated from the route registry (`src/lib/routes.ts`) — the
 * same source the pages take their canonical URLs from, so `<loc>` always
 * matches `rel=canonical` exactly.
 *
 * Content lives in the repository (no CMS, no database), so there is nothing to
 * fail at build time and nothing to paginate: eleven URLs against a 50 000 URL /
 * 50 MB limit means no sitemap index is warranted. Should the catalogue ever
 * grow past that, split here by chunking `getIndexableRoutes()`.
 *
 * `changefreq`/`priority` are omitted deliberately — Google ignores both.
 * Non-production builds emit an empty sitemap to match their `Disallow: /`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    if (!IS_INDEXABLE_ENVIRONMENT) {
        return [];
    }

    return getIndexableRoutes().map((route) => ({
        url: absoluteUrl(route.seo.path),
        lastModified: route.lastModified,
    }));
}
