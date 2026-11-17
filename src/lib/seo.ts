import type { Metadata } from 'next';
import type { PageSeo } from '@/lib/routes';
import {
    IS_INDEXABLE_ENVIRONMENT,
    OG_IMAGE,
    SITE_LOCALE,
    SITE_NAME,
    SITE_URL_OBJECT,
    absoluteUrl,
} from '@/lib/site';

const DEFAULT_SITE_DESCRIPTION =
    'Логістика для бізнесу, що рухається швидко. Митниця за 24 години, повний контроль маршруту, нульові затримки.';

/**
 * The social card is the same brand asset on every page, so its alt text
 * describes the image rather than the page it happens to be attached to.
 */
const OG_IMAGES = [
    {
        url: OG_IMAGE.path,
        width: OG_IMAGE.width,
        height: OG_IMAGE.height,
        type: OG_IMAGE.type,
        alt: OG_IMAGE.alt,
    },
];

const TWITTER_IMAGES = [{ url: OG_IMAGE.path, alt: OG_IMAGE.alt }];

/**
 * Robots directives. Anything outside production is kept out of the index
 * regardless of the page, so staging/preview builds can never be crawled in.
 */
function createRobots(noIndex = false): Metadata['robots'] {
    if (noIndex || !IS_INDEXABLE_ENVIRONMENT) {
        // A page that is noindex by design (404) still wants its links followed;
        // a whole non-production host does not.
        const follow = noIndex && IS_INDEXABLE_ENVIRONMENT;

        return {
            index: false,
            follow,
            nocache: true,
            googleBot: { index: false, follow },
        };
    }

    return {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
        },
    };
}

/**
 * Site-wide defaults: `metadataBase`, icons, manifest and the fallback social
 * card. Page-level metadata always overrides title/description/canonical.
 */
export function createRootMetadata(): Metadata {
    return {
        metadataBase: SITE_URL_OBJECT,
        title: {
            default: SITE_NAME,
            template: `%s | ${SITE_NAME}`,
        },
        description: DEFAULT_SITE_DESCRIPTION,
        applicationName: SITE_NAME,
        manifest: '/site.webmanifest',
        formatDetection: { telephone: false },
        icons: {
            icon: [
                { url: '/favicon.ico', sizes: 'any' },
                { url: '/favicon.png', type: 'image/png' },
                { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
            ],
            apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
        },
        openGraph: {
            title: SITE_NAME,
            description: DEFAULT_SITE_DESCRIPTION,
            url: absoluteUrl('/'),
            siteName: SITE_NAME,
            locale: SITE_LOCALE,
            type: 'website',
            images: OG_IMAGES,
        },
        twitter: {
            card: 'summary_large_image',
            title: SITE_NAME,
            description: DEFAULT_SITE_DESCRIPTION,
            images: TWITTER_IMAGES,
        },
    };
}

/**
 * Per-page metadata: title, description, canonical, robots, Open Graph and
 * Twitter cards. Titles are absolute so the root template can never double the
 * brand name.
 */
export function createPageMetadata(config: PageSeo): Metadata {
    const pageUrl = absoluteUrl(config.path);

    if (config.noIndex) {
        // Error/utility pages get no canonical and no social card: they are not
        // documents worth indexing or sharing.
        return {
            title: { absolute: config.title },
            description: config.description,
            robots: createRobots(true),
        };
    }

    return {
        title: { absolute: config.title },
        description: config.description,
        alternates: { canonical: pageUrl },
        robots: createRobots(),
        openGraph: {
            title: config.title,
            description: config.description,
            url: pageUrl,
            siteName: SITE_NAME,
            locale: SITE_LOCALE,
            type: config.ogType ?? 'website',
            images: OG_IMAGES,
        },
        twitter: {
            card: 'summary_large_image',
            title: config.title,
            description: config.description,
            images: TWITTER_IMAGES,
        },
    };
}
