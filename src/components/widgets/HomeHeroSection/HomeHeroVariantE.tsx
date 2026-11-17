'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { Link } from 'react-router';
import imgContainers from '@images/aboutUsNew/containers.webp';
import imgPlane from '@images/aboutUsNew/plane.webp';
import imgTruck from '@images/aboutUsNew/truck.webp';
import imgWarehouse from '@images/aboutUsNew/warehouse.webp';

/** Напрямки. Тексти — з розділів «Послуги» та «Вантажі»; США — підтвердити з клієнтом. */
const DIRECTIONS = [
    {
        key: 'asia',
        label: 'Азія',
        route: 'Китай · Туреччина → Україна',
        text: 'Море, залізниця й авіа: меблі, електроніка, текстиль, товари для маркетплейсів.',
        slug: 'sea-container',
        image: imgContainers,
        alt: 'Контейнерний термінал',
    },
    {
        key: 'usa',
        label: 'США',
        route: 'США → Україна',
        text: 'Авіа для термінових партій і морські контейнери (FCL, LCL) з митним оформленням «під ключ».',
        slug: 'air',
        image: imgPlane,
        alt: 'Завантаження вантажу в літак',
    },
    {
        key: 'europe',
        label: 'Європа',
        route: 'ЄС → Україна',
        text: 'Повні (FTL) і збірні (LTL) вантажі, палети, рефрижератори — зі складів по всьому ЄС.',
        slug: 'automotive',
        image: imgTruck,
        alt: 'Вантажівка на трасі',
    },
    {
        key: 'ukraine',
        label: 'Україна',
        route: 'По всій Україні',
        text: 'Доставка від дверей до дверей і власний склад 2 000 м² у Вінниці.',
        slug: 'automotive',
        image: imgWarehouse,
        alt: 'Склад OnLan',
    },
] as const;

const ROTATE_MS = 5500;

/** Орбіта навколо заголовка: літачок летить по еліпсу (SMIL, масштабується з заголовком). */
const ORBIT_PATH = 'M 500 20 A 490 180 0 1 1 499.9 20 Z';

const Orbit = ({ animated }: { animated: boolean }) => (
    <svg
        viewBox="0 0 1000 400"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-1 h-[132%] w-[118%] max-w-none -translate-x-1/2 -translate-y-1/2 max-md:hidden"
        aria-hidden
    >
        <path d={ORBIT_PATH} fill="none" stroke="#bacf02" strokeWidth="2.5" strokeDasharray="3 12" strokeLinecap="round" transform="translate(0 20)" />
        <g transform="translate(0 20)">
            <g>
                <g transform="scale(2.2)">
                    <path d="M 14 0 C 14 -3 8 -4 2 -4 L -10 -4 L -13 -8 L -15 -8 L -13 0 L -15 8 L -13 8 L -10 4 L 2 4 C 8 4 14 3 14 0 Z" fill="#2c358c" />
                    <path d="M 3 -3 L -7 -19 L -10 -19 L -5 -3 Z M 3 3 L -7 19 L -10 19 L -5 3 Z" fill="#2c358c" />
                    <circle cx="9" cy="0" r="1.4" fill="#d5e82d" />
                </g>
                {animated ? (
                    <animateMotion dur="14s" repeatCount="indefinite" rotate="auto" path={ORBIT_PATH} />
                ) : (
                    <animateMotion dur="1s" fill="freeze" rotate="auto" path={ORBIT_PATH} keyPoints="0.1;0.1" keyTimes="0;1" calcMode="linear" />
                )}
            </g>
        </g>
    </svg>
);


/** Варіант E: «Привеземо ваш товар будь-куди» — інтерактивний вибір напрямку (авто-перемикання до першого кліку). */
export const HomeHeroVariantE = () => {
    const headingId = 'home-hero-heading-e';
    const [active, setActive] = useState(0);
    const [auto, setAuto] = useState(true);
    const [motion, setMotion] = useState(true);

    useEffect(() => {
        setMotion(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }, []);

    useEffect(() => {
        if (!auto) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const id = window.setInterval(() => setActive((i) => (i + 1) % DIRECTIONS.length), ROTATE_MS);
        return () => window.clearInterval(id);
    }, [auto]);

    const current = DIRECTIONS[active];

    return (
        <section
            className="relative w-full overflow-hidden bg-onlan-white"
            aria-labelledby={headingId}
        >
            <div className="container relative mx-auto px-4 pb-10 pt-10 md:pb-14 md:pt-14 min-[1200px]:pt-12">
                <div className="relative isolate mx-auto max-w-4xl text-center">
                    <Orbit animated={motion} />
                    <p
                        style={{ ['--d' as string]: '0ms' }}
                        className="hero-rise mb-3 text-xs font-bold uppercase tracking-[0.14em] text-onlan-blue/70 md:text-sm"
                    >
                        Міжнародні вантажні перевезення
                    </p>
                    <h1
                        id={headingId}
                        style={{ ['--d' as string]: '100ms' }}
                        className="hero-rise mb-3 text-[clamp(2rem,4.8vw,3.75rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-onlan-blue"
                    >
                        Привеземо ваш товар{' '}
                        <span className="inline-block">
                            будь-куди
                        </span>
                    </h1>
                    <p
                        style={{ ['--d' as string]: '250ms' }}
                        className="hero-rise mb-6 text-base font-medium text-onlan-blue/80 md:text-lg"
                    >
                        Обери напрямок — покажемо, як це працює
                    </p>

                    <div
                        role="tablist"
                        aria-label="Напрямок доставки"
                        style={{ ['--d' as string]: '400ms' }}
                        className="hero-rise mx-auto flex max-w-2xl flex-wrap justify-center gap-2 md:gap-3"
                    >
                        {DIRECTIONS.map((d, i) => (
                            <button
                                key={d.key}
                                type="button"
                                role="tab"
                                id={`dir-tab-${d.key}`}
                                aria-selected={i === active}
                                aria-controls="dir-panel"
                                onClick={() => {
                                    setAuto(false);
                                    setActive(i);
                                }}
                                className={clsx(
                                    'rounded-full border px-5 py-2.5 text-base font-bold transition-all md:px-7 md:py-3 md:text-lg',
                                    i === active
                                        ? 'border-onlan-blue bg-onlan-blue text-onlan-white shadow-[0_8px_20px_-8px_rgba(44,53,140,0.6)]'
                                        : 'border-onlan-blue/30 bg-onlan-white text-onlan-blue hover:border-onlan-blue',
                                )}
                            >
                                {d.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div
                    id="dir-panel"
                    role="tabpanel"
                    aria-labelledby={`dir-tab-${current.key}`}
                    className="hero-reveal relative mt-8 h-[20rem] overflow-hidden rounded-[24px] shadow-[0_24px_48px_-24px_rgba(44,53,140,0.45)] md:h-[26rem] md:rounded-[36px] min-[1200px]:h-[min(27rem,calc(100dvh-27rem))] min-[1200px]:min-h-[20rem]"
                >
                    {DIRECTIONS.map((d, i) => (
                        <Image
                            key={d.key}
                            src={d.image}
                            alt={i === active ? d.alt : ''}
                            fill
                            priority={i === 0}
                            sizes="100vw"
                            className={clsx(
                                'object-cover transition-all duration-1000 ease-out',
                                i === active ? 'scale-100 opacity-100' : 'scale-110 opacity-0',
                            )}
                        />
                    ))}
                    <div className="absolute inset-0 bg-linear-to-t from-onlan-blue/90 via-onlan-blue/25 to-transparent md:bg-linear-to-tr md:from-onlan-blue/90 md:via-onlan-blue/35 md:to-transparent" aria-hidden />

                    <div key={current.key} className="hero-rise absolute inset-x-4 bottom-4 md:inset-x-8 md:bottom-8 md:max-w-[560px]">
                        <p className="mb-2 inline-block rounded-full bg-onlan-lime px-3 py-1 text-xs font-bold text-onlan-black md:text-sm">
                            {current.route}
                        </p>
                        <p className="mb-4 text-base font-semibold leading-snug text-onlan-white md:text-xl">{current.text}</p>
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <Link to="/#contact" className="btn btn-lime btn-lg no-underline max-sm:w-full">
                                Розрахувати доставку
                                <span aria-hidden>→</span>
                            </Link>
                            <Link
                                to={`/services/${current.slug}`}
                                className="btn btn-lg border border-onlan-white bg-transparent text-onlan-white no-underline hover:bg-onlan-white/10 max-sm:w-full"
                            >
                                Детальніше
                            </Link>
                        </div>
                    </div>

                    <ul className="absolute right-4 top-4 m-0 flex list-none gap-1.5 p-0 md:right-8 md:top-8" aria-hidden>
                        {DIRECTIONS.map((d, i) => (
                            <li
                                key={d.key}
                                className={clsx('h-1.5 rounded-full bg-onlan-white transition-all', i === active ? 'w-8 opacity-100' : 'w-3 opacity-50')}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};
