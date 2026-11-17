import type { MetadataRoute } from 'next';
import { localePath } from '@/lib/i18n';
import { getIndexableRoutes } from '@/lib/routes';
import { IS_INDEXABLE_ENVIRONMENT, absoluteUrl } from '@/lib/site';

export const dynamic = 'force-static';

/**
 * XML sitemap, generated from the route registry (`src/lib/routes.ts`) — the
 * same source the pages take their canonical URLs from, so `<loc>` always
 * matches `rel=canonical` exactly.
 *
 * Every page exists in Ukrainian (root) and English (`/en`); each `<url>`
 * carries `xhtml:link` alternates for both plus `x-default`, mirroring the
 * `hreflang` tags in the page `<head>`.
 *
 * Content lives in the repository (no CMS, no database), so there is nothing to
 * fail at build time and nothing to paginate: 22 URLs against a 50 000 URL /
 * 50 MB limit means no sitemap index is warranted.
 *
 * `changefreq`/`priority` are omitted deliberately — Google ignores both.
 * Non-production builds emit an empty sitemap to match their `Disallow: /`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    if (!IS_INDEXABLE_ENVIRONMENT) {
        return [];
    }

    const entries: MetadataRoute.Sitemap = [];

    for (const lang of ['uk', 'en'] as const) {
        for (const route of getIndexableRoutes(lang)) {
            const path = route.seo.path;
            entries.push({
                url: absoluteUrl(localePath(lang, path)),
                lastModified: route.lastModified,
                alternates: {
                    languages: {
                        uk: absoluteUrl(path),
                        en: absoluteUrl(localePath('en', path)),
                        'x-default': absoluteUrl(path),
                    },
                },
            });
        }
    }

    return entries;
}
