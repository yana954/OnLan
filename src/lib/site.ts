/**
 * Single source of truth for the canonical site origin, brand constants and
 * environment-aware indexing.
 *
 * The origin is resolved once, at build time, from `NEXT_PUBLIC_SITE_URL` and
 * never from request headers — the site ships as a static export, so there is
 * no request context that could poison canonical URLs via a spoofed `Host`.
 */

/** Production domain, used when `NEXT_PUBLIC_SITE_URL` is absent or invalid. */
const DEFAULT_SITE_URL = 'https://onlan.com.ua';

function resolveSiteOrigin(): URL {
    const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();

    if (raw) {
        try {
            const parsed = new URL(raw);
            if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
                // Only the origin is kept: any path/query/hash in the env value
                // would otherwise leak into every canonical URL.
                return new URL(parsed.origin);
            }
        } catch {
            /* falls through to the default below */
        }

        console.warn(
            `[seo] Ignoring invalid NEXT_PUBLIC_SITE_URL="${raw}", using ${DEFAULT_SITE_URL}.`,
        );
    }

    return new URL(DEFAULT_SITE_URL);
}

export const SITE_URL_OBJECT = resolveSiteOrigin();

/** Canonical origin without a trailing slash, e.g. `https://onlan.com.ua`. */
export const SITE_URL = SITE_URL_OBJECT.origin;

export const SITE_NAME = 'OnLan Logistic';
export const SITE_LANG = 'uk';
export const SITE_LOCALE = 'uk_UA';
export const THEME_COLOR = '#2c358c';

export const OG_IMAGE = {
    path: '/og-image.png',
    width: 1200,
    height: 630,
    type: 'image/png',
    alt: 'OnLan Logistic — міжнародні вантажні перевезення та митне оформлення',
} as const;

export const LOGO_IMAGE = {
    path: '/web-app-manifest-512x512.png',
    width: 512,
    height: 512,
} as const;

function resolveIndexingEnabled(): boolean {
    const flag = process.env.NEXT_PUBLIC_SEO_INDEXING?.trim().toLowerCase();
    if (flag === 'true' || flag === '1') {
        return true;
    }
    if (flag === 'false' || flag === '0') {
        return false;
    }

    // Vercel-style preview/staging deployments must never be indexed.
    const deploymentEnv = process.env.VERCEL_ENV ?? process.env.DEPLOY_ENV;
    if (deploymentEnv && deploymentEnv !== 'production') {
        return false;
    }

    // `next dev` and any non-production build stay out of the index.
    return process.env.NODE_ENV === 'production';
}

/**
 * Whether this build may be indexed. Production builds are indexable;
 * development, staging and preview builds are not, and `NEXT_PUBLIC_SEO_INDEXING`
 * overrides the detection explicitly.
 */
export const IS_INDEXABLE_ENVIRONMENT = resolveIndexingEnabled();

/**
 * Normalizes a pathname to its canonical form: no query, no hash, no duplicate
 * or trailing slashes (matching `trailingSlash: false` in `next.config.mjs`).
 * File-like paths (`/og-image.png`) keep their extension untouched.
 */
export function canonicalPathname(path: string): string {
    const [pathOnly = ''] = path.split(/[?#]/);
    if (!pathOnly || pathOnly === '/') {
        return '/';
    }

    const prefixed = pathOnly.startsWith('/') ? pathOnly : `/${pathOnly}`;
    const collapsed = prefixed.replace(/\/{2,}/g, '/');

    if (/\/[^/]+\.[^/]+$/.test(collapsed)) {
        return collapsed;
    }

    return collapsed.replace(/\/+$/, '') || '/';
}

/**
 * Absolute canonical URL for an internal path.
 *
 * The home page resolves to the bare origin (`https://onlan.com.ua`), which is
 * exactly what Next.js emits for `alternates.canonical: '/'`; keeping the same
 * shape everywhere avoids canonical/sitemap mismatches.
 */
export function absoluteUrl(path: string): string {
    const pathname = canonicalPathname(path);
    return pathname === '/' ? SITE_URL : new URL(pathname, SITE_URL_OBJECT).toString();
}
