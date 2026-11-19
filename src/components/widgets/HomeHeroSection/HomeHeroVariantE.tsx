'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { Link } from 'react-router';
import { useLang, useT } from '@/components/app/LangProvider';
import imgContainers from '@images/aboutUsNew/containers.webp';
import imgPlane from '@images/aboutUsNew/plane.webp';
import imgTruck from '@images/aboutUsNew/truck.webp';
import imgWarehouse from '@images/aboutUsNew/warehouse.webp';

/** Напрямки. Тексти — з розділів «Послуги» та «Вантажі»; США — підтвердити з клієнтом. */
const DIRECTIONS = [
    { key: 'asia', slug: 'china', image: imgContainers },
    { key: 'usa', slug: 'usa', image: imgPlane },
    { key: 'europe', slug: 'europe', image: imgTruck },
    { key: 'ukraine', slug: 'ukraine', image: imgWarehouse },
] as const;

type DirectionKey = (typeof DIRECTIONS)[number]['key'];

type DirectionCopy = { label: string; route: string; text: string; alt: string };

const COPY: Record<'uk' | 'en', Record<DirectionKey, DirectionCopy>> = {
    uk: {
        asia: {
            label: 'Азія',
            route: 'Китай · Туреччина → Україна',
            text: 'Море, залізниця й авіа: меблі, електроніка, текстиль, товари для маркетплейсів.',
            alt: 'Контейнерний термінал',
        },
        usa: {
            label: 'США',
            route: 'США → Україна',
            text: 'Авіа для термінових партій і морські контейнери (FCL, LCL) з митним оформленням «під ключ».',
            alt: 'Завантаження вантажу в літак',
        },
        europe: {
            label: 'Європа',
            route: 'ЄС → Україна',
            text: 'Повні (FTL) і збірні (LTL) вантажі, палети, рефрижератори — зі складів по всьому ЄС.',
            alt: 'Вантажівка на трасі',
        },
        ukraine: {
            label: 'Україна',
            route: 'По всій Україні',
            text: 'Доставка від дверей до дверей і власний склад 2 000 м².',
            alt: 'Склад OnLan',
        },
    },
    en: {
        asia: {
            label: 'Asia',
            route: 'China · Turkey → Ukraine',
            text: 'Sea, rail and air: furniture, electronics, textiles, marketplace goods.',
            alt: 'Container terminal',
        },
        usa: {
            label: 'USA',
            route: 'USA → Ukraine',
            text: 'Air for urgent shipments and sea containers (FCL, LCL) with turnkey customs clearance.',
            alt: 'Cargo being loaded onto a plane',
        },
        europe: {
            label: 'Europe',
            route: 'EU → Ukraine',
            text: 'Full (FTL) and groupage (LTL) loads, pallets, reefers — from warehouses across the EU.',
            alt: 'Truck on the highway',
        },
        ukraine: {
            label: 'Ukraine',
            route: 'Across Ukraine',
            text: 'Door-to-door delivery and our own 2,000 m² warehouse.',
            alt: 'OnLan warehouse',
        },
    },
};

const ROTATE_MS = 5500;

/** Тривалість прольоту в секундах (змінити тут). Після нього літачок вилітає з екрана; за ним тягнеться лише короткий м’який шлейф, що зникає разом із ним. */
const FLIGHT_SECONDS = 11;

/** Хаотична траєкторія в координатах viewBox 1000×400: заліт, петлі навколо заголовка, виліт угору праворуч. */
const FLIGHT_PATH =
    'M -140 360 C 60 380 120 120 260 100 S 470 330 640 300 S 960 330 900 160 S 640 -10 460 40 S 300 200 520 -40 S 900 60 1180 -160';

const Flight = ({ animated }: { animated: boolean }) => {
    if (!animated) {
        return null;
    }

    return (
        <svg
            viewBox="0 0 1000 400"
            className="pointer-events-none absolute left-1/2 top-1/2 -z-1 h-[124%] w-[118%] max-w-none -translate-x-1/2 -translate-y-1/2 overflow-visible max-md:hidden"
            aria-hidden
        >
            {/* М'який шлейф-«комета»: коротка смуга за літачком, не залишає слідів на сторінці */}
            <path
                d={FLIGHT_PATH}
                pathLength="1"
                fill="none"
                stroke="#2c358c"
                strokeOpacity="0.28"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="0.16 2"
                strokeDashoffset="0.16"
            >
                <animate attributeName="stroke-dashoffset" from="0.16" to="-1" dur={`${FLIGHT_SECONDS}s`} fill="freeze" />
            </path>
            <g>
                <g transform="scale(2.2)">
                    <path d="M 14 0 C 14 -3 8 -4 2 -4 L -10 -4 L -13 -8 L -15 -8 L -13 0 L -15 8 L -13 8 L -10 4 L 2 4 C 8 4 14 3 14 0 Z" fill="#2c358c" />
                    <path d="M 3 -3 L -7 -19 L -10 -19 L -5 -3 Z M 3 3 L -7 19 L -10 19 L -5 3 Z" fill="#2c358c" />
                    <circle cx="9" cy="0" r="1.4" fill="#d5e82d" />
                </g>
                <animateMotion dur={`${FLIGHT_SECONDS}s`} rotate="auto" path={FLIGHT_PATH} fill="freeze" />
                <animate attributeName="opacity" values="1;1;0" keyTimes="0;0.99;1" dur={`${FLIGHT_SECONDS}s`} fill="freeze" />
            </g>
        </svg>
    );
};

/** Варіант E: «Привеземо ваш товар будь-куди» — інтерактивний вибір напрямку (авто-перемикання до першого кліку). */
export const HomeHeroVariantE = () => {
    const headingId = 'home-hero-heading-e';
    const lang = useLang();
    const t = useT();
    const copy = COPY[lang];
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

    const current = DIRECTIONS[active]!;
    const currentCopy = copy[current.key];

    return (
        <section
            className="relative w-full overflow-hidden bg-onlan-white"
            aria-labelledby={headingId}
        >
            <div className="container relative mx-auto px-4 pb-10 pt-10 md:pb-14 md:pt-20 min-[1200px]:pt-16">
                <div className="relative isolate mx-auto max-w-4xl text-center">
                    <Flight animated={motion} />
                    <h1
                        id={headingId}
                        style={{ ['--d' as string]: '100ms' }}
                        className="hero-rise mb-3 text-[clamp(2rem,4.8vw,3.75rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-onlan-blue"
                    >
                        <span className="mb-4 flex items-center justify-center gap-2">
                            <span className="size-2 shrink-0 rounded-full bg-onlan-lime" aria-hidden />
                            <span className="rounded-full border border-onlan-blue/40 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-onlan-blue md:px-4 md:py-2 md:text-sm">
                                {t('Міжнародні вантажні перевезення', 'International freight shipping')}
                                <span className="sr-only">: </span>
                            </span>
                        </span>
                        <span className="font-semibold">{t('Привеземо ваш товар', 'We’ll bring your goods')}</span>{' '}
                        <span className="inline-block text-[1.12em] font-extrabold leading-none">
                            {t('будь-куди', 'anywhere')}
                        </span>
                    </h1>
                    <p
                        style={{ ['--d' as string]: '250ms' }}
                        className="hero-rise mx-auto mb-7 max-w-[720px] text-balance text-base font-medium leading-snug text-onlan-blue/80 md:text-lg"
                    >
                        <span className="font-bold text-onlan-blue">
                            {t('Розмитнимо й доставимо до дверей:', 'We clear customs and deliver to your door:')}
                        </span>{' '}
                        {t(
                            'авто, море, авіа, залізниця. Оберіть напрямок — покажемо маршрут і орієнтовні терміни.',
                            'road, sea, air, rail. Choose a direction — we’ll show the route and approximate transit times.',
                        )}
                    </p>

                    <div
                        role="tablist"
                        aria-label={t('Напрямок доставки', 'Delivery direction')}
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
                                        ? 'border-onlan-blue bg-onlan-blue text-onlan-white shadow-[0_10px_24px_-8px_rgba(44,53,140,0.65)]'
                                        : 'border-onlan-blue/25 bg-onlan-white text-onlan-blue hover:border-onlan-blue hover:bg-onlan-lavender/50',
                                )}
                            >
                                <span className="inline-flex items-center gap-2">
                                    {i === active && <span className="size-2 rounded-full bg-onlan-lime" aria-hidden />}
                                    {copy[d.key].label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <div
                    id="dir-panel"
                    role="tabpanel"
                    aria-labelledby={`dir-tab-${current.key}`}
                    className="hero-reveal relative mt-8 md:mt-14 h-[20rem] overflow-hidden rounded-[24px] shadow-[0_24px_48px_-24px_rgba(44,53,140,0.45)] md:h-[26rem] md:rounded-[36px] min-[1200px]:h-[min(27rem,calc(100dvh-27rem))] min-[1200px]:min-h-[20rem]"
                >
                    {DIRECTIONS.map((d, i) => (
                        <Image
                            key={d.key}
                            src={d.image}
                            alt={i === active ? copy[d.key].alt : ''}
                            fill
                            priority={i === 0}
                            loading={i === 0 ? undefined : 'eager'}
                            sizes="100vw"
                            className={clsx(
                                'object-cover transition-all duration-1000 ease-out',
                                i === active ? 'scale-100 opacity-100' : 'scale-110 opacity-0',
                            )}
                        />
                    ))}
                    <div className="absolute inset-0 bg-linear-to-t from-onlan-blue/70 via-transparent to-transparent" aria-hidden />

                    <div key={current.key} className="hero-rise absolute inset-x-3 bottom-3 rounded-[20px] border border-onlan-lime/80 bg-onlan-blue/55 p-4 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.35)] backdrop-blur-[14px] md:inset-x-auto md:bottom-8 md:left-8 md:max-w-[520px] md:rounded-[28px] md:p-6">
                        <p className="mb-2 inline-block rounded-full bg-onlan-lime px-3 py-1 text-xs font-bold text-onlan-black md:text-sm">
                            {currentCopy.route}
                        </p>
                        <p className="mb-4 text-base font-semibold leading-snug text-onlan-white md:text-xl">{currentCopy.text}</p>
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <Link to="/#contact" className="btn btn-lime btn-lg no-underline max-sm:w-full">
                                {t('Розрахувати доставку', 'Get a delivery quote')}
                                <span aria-hidden>→</span>
                            </Link>
                            <Link
                                to={`/directions/${current.slug}`}
                                className="btn btn-lg border border-onlan-white bg-transparent text-onlan-white no-underline hover:bg-onlan-white/10 max-sm:w-full"
                            >
                                {t('Детальніше', 'Learn more')}
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
