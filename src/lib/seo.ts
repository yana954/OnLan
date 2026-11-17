import type { Metadata } from 'next';
import { OG_LOCALE, localePath, type Lang } from '@/lib/i18n';
import type { PageSeo } from '@/lib/routes';
import {
    IS_INDEXABLE_ENVIRONMENT,
    OG_IMAGE,
    SITE_NAME,
    SITE_URL_OBJECT,
    absoluteUrl,
} from '@/lib/site';

const DEFAULT_SITE_DESCRIPTION: Record<Lang, string> = {
    uk: 'Вантажні перевезення з Європи, Азії та США: авто, море, авіа, залізниця. Митне оформлення «під ключ» і єдиний менеджер на маршруті.',
    en: 'Freight from Europe, Asia and the USA to Ukraine: road, sea, air, rail. Turnkey customs clearance and one manager along the route.',
};

/**
 * The social card is the same brand asset on every page, so its alt text
 * describes the image rather than the page it happens to be attached to.
 */
const ogImages = (lang: Lang) => [
    {
        url: OG_IMAGE.path,
        width: OG_IMAGE.width,
        height: OG_IMAGE.height,
        type: OG_IMAGE.type,
        alt: OG_IMAGE.alt[lang],
    },
];

const twitterImages = (lang: Lang) => [{ url: OG_IMAGE.path, alt: OG_IMAGE.alt[lang] }];

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
export function createRootMetadata(lang: Lang = 'uk'): Metadata {
    return {
        metadataBase: SITE_URL_OBJECT,
        title: {
            default: SITE_NAME,
            template: `%s | ${SITE_NAME}`,
        },
        description: DEFAULT_SITE_DESCRIPTION[lang],
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
            description: DEFAULT_SITE_DESCRIPTION[lang],
            url: absoluteUrl(localePath(lang, '/')),
            siteName: SITE_NAME,
            locale: OG_LOCALE[lang],
            type: 'website',
            images: ogImages(lang),
        },
        twitter: {
            card: 'summary_large_image',
            title: SITE_NAME,
            description: DEFAULT_SITE_DESCRIPTION[lang],
            images: twitterImages(lang),
        },
    };
}

/**
 * Per-page metadata: title, description, canonical, robots, Open Graph and
 * Twitter cards. Titles are absolute so the root template can never double the
 * brand name.
 */
export function createPageMetadata(config: PageSeo, lang: Lang = 'uk'): Metadata {
    const pageUrl = absoluteUrl(localePath(lang, config.path));

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
        alternates: {
            canonical: pageUrl,
            // Every page exists in both languages under the same logical path.
            languages: {
                uk: absoluteUrl(config.path),
                en: absoluteUrl(localePath('en', config.path)),
                'x-default': absoluteUrl(config.path),
            },
        },
        robots: createRobots(),
        openGraph: {
            title: config.title,
            description: config.description,
            url: pageUrl,
            siteName: SITE_NAME,
            locale: OG_LOCALE[lang],
            alternateLocale: OG_LOCALE[lang === 'en' ? 'uk' : 'en'],
            type: config.ogType ?? 'website',
            images: ogImages(lang),
        },
        twitter: {
            card: 'summary_large_image',
            title: config.title,
            description: config.description,
            images: twitterImages(lang),
        },
    };
}
