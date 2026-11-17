import localFont from 'next/font/local';

/** e-Ukraine / e-Ukrainian — project-wide UI font (see `e-Ukrainian/*.otf`) */
export const EUkraine = localFont({
    /*
     * Only the weights the UI actually uses are declared: next/font preloads
     * every listed file, and the unused 100/200 faces cost ~140 KB of blocking
     * font preloads on first paint.
     */
    src: [
        { path: './e-Ukrainian/e-Ukraine-Light.otf', weight: '300', style: 'normal' },
        { path: './e-Ukrainian/e-Ukraine-Regular.otf', weight: '400', style: 'normal' },
        { path: './e-Ukrainian/e-Ukraine-Medium.otf', weight: '500', style: 'normal' },
        /* No separate semibold file — map Tailwind `font-semibold` (600) to Medium */
        { path: './e-Ukrainian/e-Ukraine-Medium.otf', weight: '600', style: 'normal' },
        { path: './e-Ukrainian/e-Ukraine-Bold.otf', weight: '700', style: 'normal' },
        { path: './e-Ukrainian/e-Ukraine-Bold.otf', weight: '800', style: 'normal' },
        { path: './e-Ukrainian/e-Ukraine-Bold.otf', weight: '900', style: 'normal' },
    ],
    display: 'swap',
    variable: '--font-e-ukraine',
});
