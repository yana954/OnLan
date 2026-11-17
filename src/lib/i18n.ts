/**
 * Minimal i18n for the static export. Two languages:
 *  - `uk` (default) lives at the root: `/`, `/services`, …
 *  - `en` lives under `/en`: `/en`, `/en/services`, …
 *
 * Route registries and content keep one *logical* path per page (the Ukrainian
 * one); `localePath` turns it into the real URL for a language, and
 * `switchLangPath` maps the current URL to the same page in the other language.
 */

export type Lang = 'uk' | 'en';

export const LANGS: readonly Lang[] = ['uk', 'en'] as const;
export const DEFAULT_LANG: Lang = 'uk';
export const EN_PREFIX = '/en';

/** `hreflang` / `<html lang>` values. */
export const HTML_LANG: Record<Lang, string> = { uk: 'uk', en: 'en' };
export const OG_LOCALE: Record<Lang, string> = { uk: 'uk_UA', en: 'en_US' };
/** BCP-47 tags for schema.org `inLanguage`. */
export const OG_LOCALE_TAG: Record<Lang, string> = { uk: 'uk-UA', en: 'en-US' };

export function isEnPath(pathname: string): boolean {
    return pathname === EN_PREFIX || pathname.startsWith(`${EN_PREFIX}/`);
}

export function langFromPath(pathname: string | null | undefined): Lang {
    return pathname && isEnPath(pathname) ? 'en' : 'uk';
}

/** Removes the `/en` prefix: `/en/services` → `/services`, `/en` → `/`. */
export function stripLang(pathname: string): string {
    if (!isEnPath(pathname)) return pathname;
    return pathname.slice(EN_PREFIX.length) || '/';
}

/**
 * Logical path (`/services`, `/#contact`, `/directions/china?x=1`) → real path
 * for `lang`. Hash and query are kept; external / hash-only links are untouched.
 */
export function localePath(lang: Lang, href: string): string {
    if (lang !== 'en') return href;
    if (!href.startsWith('/') || href.startsWith('//')) return href;
    if (isEnPath(href.split(/[?#]/)[0] ?? '')) return href;

    const match = /^([^?#]*)(.*)$/.exec(href);
    const pathOnly = match?.[1] ?? href;
    const rest = match?.[2] ?? '';
    const base = pathOnly === '/' || pathOnly === '' ? EN_PREFIX : `${EN_PREFIX}${pathOnly}`;
    return `${base}${rest}`;
}

/** Same page in the other language (hash/query dropped). */
export function switchLangPath(pathname: string, target: Lang): string {
    const logical = stripLang(pathname) || '/';
    return localePath(target, logical);
}

/** Picks the string for a language: `pick(lang, 'Привіт', 'Hello')`. */
export function pick<T>(lang: Lang, uk: T, en: T): T {
    return lang === 'en' ? en : uk;
}
