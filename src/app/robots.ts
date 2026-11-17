import type { MetadataRoute } from 'next';
import { IS_INDEXABLE_ENVIRONMENT, SITE_URL, absoluteUrl } from '@/lib/site';

export const dynamic = 'force-static';

/**
 * robots.txt
 *
 * The site is a fully public marketing export: there is no admin area, no
 * authenticated section and no API surface to hide, so crawling is allowed
 * everywhere. `/_next/` stays crawlable on purpose — blocking it would stop
 * Google from rendering CSS/JS and hurt every page.
 *
 * The RSC payload twins (`/about-us.txt`, …) that the static export emits are
 * kept out of the index with `X-Robots-Tag: noindex` from the generated
 * `out/.htaccess` (see `scripts/generate-htaccess.mjs`), not from here: they
 * must stay crawlable for that header to be seen.
 */
export default function robots(): MetadataRoute.Robots {
    if (!IS_INDEXABLE_ENVIRONMENT) {
        // Staging / preview / local builds: keep the whole host out of search.
        return {
            rules: [{ userAgent: '*', disallow: '/' }],
        };
    }

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
        sitemap: absoluteUrl('/sitemap.xml'),
        host: SITE_URL,
    };
}
