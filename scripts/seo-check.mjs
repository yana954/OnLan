/**
 * Validates the exported site in `out/` against the SEO contract.
 *
 * Run after `npm run build:static`. Exits non-zero on any error; warnings are
 * printed but do not fail the build.
 */
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const OUT_DIR = path.resolve('out');

const errors = [];
const warnings = [];

const fail = (where, message) => errors.push(`${where}: ${message}`);
const warn = (where, message) => warnings.push(`${where}: ${message}`);

async function collectHtmlFiles(dir, base = '') {
    const entries = await readdir(dir, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
        if (entry.name.startsWith('_') || entry.name.startsWith('.')) continue;
        const abs = path.join(dir, entry.name);
        const rel = base ? `${base}/${entry.name}` : entry.name;

        if (entry.isDirectory()) {
            files.push(...(await collectHtmlFiles(abs, rel)));
        } else if (entry.name.endsWith('.html')) {
            files.push({ abs, rel });
        }
    }

    return files;
}

/** `index.html` → `/`, `services/air.html` → `/services/air`. */
function urlPathFromFile(rel) {
    if (rel === 'index.html') return '/';
    return `/${rel.replace(/\.html$/, '')}`;
}

function metaContent(html, attr, value) {
    const re = new RegExp(
        `<meta[^>]+${attr}=["']${value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*>`,
        'i',
    );
    const tag = html.match(re)?.[0];
    return tag?.match(/content=["']([^"']*)["']/i)?.[1] ?? null;
}

function decodeEntities(value) {
    return value
        .replace(/&quot;/g, '"')
        .replace(/&#x27;|&#39;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
}

function jsonLdBlocks(html) {
    return [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(
        (match) => match[1],
    );
}

function checkPage({ rel, html, origin, expectIndexable }) {
    const where = rel;
    const urlPath = urlPathFromFile(rel);
    const expectedCanonical = urlPath === '/' ? origin : `${origin}${urlPath}`;

    // --- title / description ------------------------------------------------
    const title = decodeEntities(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
    if (!title) fail(where, 'missing <title>');
    if (/\| OnLan Logistic \| OnLan Logistic/.test(title)) fail(where, `duplicated brand in title: ${title}`);
    if (title.length > 75) warn(where, `title is ${title.length} chars, may be truncated in SERPs`);

    const description = decodeEntities(metaContent(html, 'name', 'description') ?? '');
    if (!description) fail(where, 'missing meta description');
    else if (description.length < 50 || description.length > 200) {
        warn(where, `meta description length ${description.length} outside 50–200`);
    }

    // --- robots -------------------------------------------------------------
    const robots = metaContent(html, 'name', 'robots') ?? '';
    const isNoindex = /noindex/.test(robots);
    if (expectIndexable && isNoindex) fail(where, `unexpected noindex (robots="${robots}")`);
    if (!expectIndexable && !isNoindex) fail(where, 'expected a noindex directive');

    // --- canonical ----------------------------------------------------------
    const canonicals = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)].map((m) => m[1]);
    if (expectIndexable) {
        if (canonicals.length !== 1) fail(where, `expected 1 canonical, found ${canonicals.length}`);
        else if (canonicals[0] !== expectedCanonical) {
            fail(where, `canonical is ${canonicals[0]}, expected ${expectedCanonical}`);
        }
    } else if (canonicals.length > 0) {
        fail(where, `non-indexable page must not declare a canonical (${canonicals[0]})`);
    }

    // --- social cards -------------------------------------------------------
    if (expectIndexable) {
        const og = {
            title: metaContent(html, 'property', 'og:title'),
            description: metaContent(html, 'property', 'og:description'),
            url: metaContent(html, 'property', 'og:url'),
            type: metaContent(html, 'property', 'og:type'),
            siteName: metaContent(html, 'property', 'og:site_name'),
            image: metaContent(html, 'property', 'og:image'),
            width: metaContent(html, 'property', 'og:image:width'),
            height: metaContent(html, 'property', 'og:image:height'),
            alt: metaContent(html, 'property', 'og:image:alt'),
            locale: metaContent(html, 'property', 'og:locale'),
        };
        for (const [key, value] of Object.entries(og)) {
            if (!value) fail(where, `missing og:${key}`);
        }
        if (og.url && og.url !== expectedCanonical) {
            fail(where, `og:url ${og.url} does not match canonical ${expectedCanonical}`);
        }
        if (og.image && !og.image.startsWith(origin)) {
            fail(where, `og:image must be absolute on ${origin} (got ${og.image})`);
        }

        for (const name of ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image']) {
            if (!metaContent(html, 'name', name)) fail(where, `missing ${name}`);
        }
    }

    // --- headings -----------------------------------------------------------
    const h1Count = (html.match(/<h1[\s>]/g) ?? []).length;
    if (h1Count !== 1) fail(where, `expected exactly one <h1>, found ${h1Count}`);

    // --- images -------------------------------------------------------------
    for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
        if (!/\balt=/.test(tag)) fail(where, `<img> without alt: ${tag.slice(0, 120)}`);
    }

    // --- structured data ----------------------------------------------------
    const blocks = jsonLdBlocks(html);
    if (expectIndexable && blocks.length === 0) fail(where, 'no JSON-LD found');

    const types = [];
    for (const block of blocks) {
        let parsed;
        try {
            parsed = JSON.parse(block);
        } catch (error) {
            fail(where, `invalid JSON-LD: ${error.message}`);
            continue;
        }
        if (parsed['@context'] !== 'https://schema.org') {
            fail(where, `JSON-LD @context must be https://schema.org`);
        }
        for (const node of parsed['@graph'] ?? [parsed]) {
            types.push(node['@type']);
            const serialized = JSON.stringify(node);
            if (/aggregateRating|reviewCount|ratingValue|"price"/.test(serialized)) {
                fail(where, `JSON-LD contains rating/price claims the site does not make`);
            }
        }
        if (/</.test(block)) fail(where, 'JSON-LD contains an unescaped "<"');
    }

    return { urlPath, title, description, types, html };
}

function checkInternalLinks(pages, knownPaths) {
    for (const { rel, html } of pages) {
        for (const [, href] of html.matchAll(/<a\b[^>]*\shref="([^"]*)"/g)) {
            if (!href.startsWith('/') || href.startsWith('//')) continue;
            const [pathname] = href.split(/[?#]/);
            if (!pathname || pathname === '/') continue;
            if (/\.[a-z0-9]+$/i.test(pathname)) continue;
            if (!knownPaths.has(pathname.replace(/\/$/, ''))) {
                fail(rel, `internal link to a page that does not exist: ${href}`);
            }
        }
    }
}

async function main() {
    try {
        await stat(OUT_DIR);
    } catch {
        console.error('out/ not found — run `npm run build:static` first.');
        process.exit(1);
    }

    // --- robots.txt ---------------------------------------------------------
    const robotsTxt = await readFile(path.join(OUT_DIR, 'robots.txt'), 'utf8');
    const sitemapUrl = robotsTxt.match(/^Sitemap:\s*(\S+)$/m)?.[1];
    if (!sitemapUrl) fail('robots.txt', 'missing Sitemap directive');
    if (/^Disallow:\s*\/$/m.test(robotsTxt)) {
        fail('robots.txt', 'blanket "Disallow: /" in a production export');
    }
    const origin = sitemapUrl ? new URL(sitemapUrl).origin : null;
    if (!origin) {
        console.error('robots.txt has no usable Sitemap URL — cannot validate canonical URLs.');
        process.exit(1);
    }

    // --- sitemap.xml --------------------------------------------------------
    const sitemapXml = await readFile(path.join(OUT_DIR, 'sitemap.xml'), 'utf8');
    if (!/^<\?xml version="1\.0" encoding="UTF-8"\?>/.test(sitemapXml.trim())) {
        fail('sitemap.xml', 'missing XML declaration');
    }
    if (!/<urlset\s+xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/.test(sitemapXml)) {
        fail('sitemap.xml', 'missing/incorrect urlset namespace');
    }
    const locs = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    if (locs.length === 0) fail('sitemap.xml', 'contains no URLs');
    if (new Set(locs).size !== locs.length) fail('sitemap.xml', 'contains duplicate URLs');
    for (const loc of locs) {
        if (!loc.startsWith(origin)) fail('sitemap.xml', `URL outside canonical origin: ${loc}`);
        if (/[?#]/.test(loc)) fail('sitemap.xml', `URL with query/fragment: ${loc}`);
        if (loc !== origin && loc.endsWith('/')) fail('sitemap.xml', `trailing slash: ${loc}`);
    }
    for (const [, lastmod] of sitemapXml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)) {
        if (Number.isNaN(Date.parse(lastmod))) fail('sitemap.xml', `invalid lastmod: ${lastmod}`);
    }

    // --- pages --------------------------------------------------------------
    const files = await collectHtmlFiles(OUT_DIR);
    const pages = [];
    for (const file of files) {
        pages.push({ ...file, html: await readFile(file.abs, 'utf8') });
    }

    const results = [];
    for (const page of pages) {
        const expectIndexable = page.rel !== '404.html';
        results.push({
            rel: page.rel,
            ...checkPage({ rel: page.rel, html: page.html, origin, expectIndexable }),
            expectIndexable,
        });
    }

    // Canonical set must equal the sitemap set exactly.
    const canonicalPaths = results
        .filter((result) => result.expectIndexable)
        .map((result) => (result.urlPath === '/' ? origin : `${origin}${result.urlPath}`));
    for (const url of canonicalPaths) {
        if (!locs.includes(url)) fail('sitemap.xml', `indexable page missing from sitemap: ${url}`);
    }
    for (const loc of locs) {
        if (!canonicalPaths.includes(loc)) fail('sitemap.xml', `sitemap URL has no exported page: ${loc}`);
    }

    // Titles and descriptions must be unique across public pages.
    for (const key of ['title', 'description']) {
        const seen = new Map();
        for (const result of results.filter((item) => item.expectIndexable)) {
            const value = result[key];
            if (seen.has(value)) fail(result.rel, `duplicate ${key} (also on ${seen.get(value)})`);
            else seen.set(value, result.rel);
        }
    }

    const knownPaths = new Set(results.map((result) => result.urlPath));
    checkInternalLinks(pages, knownPaths);

    // --- report -------------------------------------------------------------
    const indexable = results.filter((result) => result.expectIndexable).length;
    console.log(`Checked ${results.length} pages (${indexable} indexable) against ${origin}`);
    console.log(`Sitemap URLs: ${locs.length}`);
    const schemaTypes = [...new Set(results.flatMap((result) => result.types))].sort();
    console.log(`Schema types: ${schemaTypes.join(', ')}`);

    for (const warning of warnings) console.log(`WARN  ${warning}`);
    for (const error of errors) console.error(`ERROR ${error}`);

    if (errors.length > 0) {
        console.error(`\n${errors.length} SEO error(s).`);
        process.exit(1);
    }
    console.log(`\nSEO checks passed${warnings.length ? ` with ${warnings.length} warning(s)` : ''}.`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
