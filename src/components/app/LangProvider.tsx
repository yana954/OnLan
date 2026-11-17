'use client';

import type { ReactNode } from 'react';
import { createContext, useCallback, useContext } from 'react';
import type { Lang } from '@/lib/i18n';

const LangContext = createContext<Lang>('uk');

/** Set once per root layout (`(uk)` / `(en)`), so SSR output is already localized. */
export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
    return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useLang(): Lang {
    return useContext(LangContext);
}

/** `const t = useT(); t('Українською', 'In English')` */
export function useT() {
    const lang = useLang();
    return useCallback(<T,>(uk: T, en: T): T => (lang === 'en' ? en : uk), [lang]);
}
