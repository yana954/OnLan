'use client';

import { useCallback, useEffect, useState } from 'react';
import { HomeHeroSection } from './HomeHeroSection';
import { HomeHeroVariantB } from './HomeHeroVariantB';
import { HomeHeroVariantC } from './HomeHeroVariantC';
import { HomeHeroVariantD } from './HomeHeroVariantD';
import { HomeHeroVariantE } from './HomeHeroVariantE';

/** ПРОТОТИП: перемикач варіантів hero (?variant=A|B|C). Прибрати після вибору переможця. */
const VARIANTS = [
    { key: 'A', name: 'Синій + фото-сітка', Component: HomeHeroSection },
    { key: 'B', name: 'Фото-фон + меню доставки', Component: HomeHeroVariantB },
    { key: 'C', name: 'Світлий + кінематографічне фото', Component: HomeHeroVariantC },
    { key: 'D', name: 'Синій + фура їде (SVG-анімація)', Component: HomeHeroVariantD },
    { key: 'E', name: 'Обери напрямок (інтерактив)', Component: HomeHeroVariantE },
] as const;

type VariantKey = (typeof VARIANTS)[number]['key'];

const isVariantKey = (value: string | null): value is VariantKey => VARIANTS.some((v) => v.key === value);

export const HomeHeroVariants = () => {
    const [variant, setVariant] = useState<VariantKey>('A');

    useEffect(() => {
        const fromUrl = new URLSearchParams(window.location.search).get('variant');
        if (isVariantKey(fromUrl)) setVariant(fromUrl);
    }, []);

    const select = useCallback((next: VariantKey) => {
        setVariant(next);
        const url = new URL(window.location.href);
        url.searchParams.set('variant', next);
        window.history.replaceState(null, '', url);
    }, []);

    const step = useCallback(
        (delta: number) => {
            const index = VARIANTS.findIndex((v) => v.key === variant);
            select(VARIANTS[(index + delta + VARIANTS.length) % VARIANTS.length].key);
        },
        [select, variant],
    );

    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            const target = event.target as HTMLElement | null;
            if (target?.closest('input, textarea, [contenteditable]')) return;
            if (event.key === 'ArrowLeft') step(-1);
            if (event.key === 'ArrowRight') step(1);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [step]);

    const current = VARIANTS.find((v) => v.key === variant) ?? VARIANTS[0];
    const Current = current.Component;

    return (
        <>
            <Current />
            {process.env.NODE_ENV !== 'production' && (
                <div className="fixed bottom-4 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-3 rounded-full bg-onlan-black px-3 py-2 text-onlan-white shadow-actions">
                    <button type="button" aria-label="Попередній варіант" onClick={() => step(-1)} className="px-2">
                        ←
                    </button>
                    <span className="text-sm font-bold">
                        {current.key} ({current.name})
                    </span>
                    <button type="button" aria-label="Наступний варіант" onClick={() => step(1)} className="px-2">
                        →
                    </button>
                </div>
            )}
        </>
    );
};
