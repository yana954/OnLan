'use client';

import Image from 'next/image';
import { Link } from 'react-router';
import clsx from 'clsx';
import imgAir from '@images/Avia.webp';
import imgSea from '@images/Morski.webp';
import imgRoad from '@images/MultiModals.webp';
import { HOME_HERO } from '@/content/homeHero';

type ModeKey = (typeof HOME_HERO.modes)[number]['key'];

const MODE_IMAGES: Record<ModeKey, string> = {
    sea: imgSea,
    air: imgAir,
    road: imgRoad,
};

/** Морський блок займає обидва ряди, решта — по одному. */
const MODE_LAYOUT: Record<ModeKey, string> = {
    sea: 'row-span-2',
    air: '',
    road: '',
};

export const HomeHeroSection = () => {
    const headingId = 'home-hero-heading';

    return (
        <section
            className="relative w-full overflow-hidden bg-onlan-blue min-[1200px]:flex min-[1200px]:min-h-[calc(100dvh-96px)] min-[1200px]:items-center"
            aria-labelledby={headingId}
        >
            {/* Декор: м’яке сяйво лайму та точкова сітка — лише кольори палітри */}
            <div className="pointer-events-none absolute inset-0" aria-hidden>
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            'radial-gradient(60rem 36rem at 100% 0%, color-mix(in srgb, var(--onlan-lime) 14%, transparent), transparent 70%)',
                    }}
                />
                <div
                    className="absolute inset-0 opacity-60"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle, color-mix(in srgb, var(--onlan-lavender) 22%, transparent) 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                        maskImage: 'linear-gradient(to bottom right, black, transparent 70%)',
                        WebkitMaskImage: 'linear-gradient(to bottom right, black, transparent 70%)',
                    }}
                />
            </div>

            <div className="container relative z-1 mx-auto px-4 py-12 md:py-16 min-[1200px]:py-10">
                <div className="grid w-full items-center gap-10 min-[1200px]:grid-cols-[1.05fr_0.95fr] min-[1200px]:gap-14">
                    <div className="min-w-0">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-onlan-lime/40 bg-onlan-white/10 px-4 py-2 text-sm font-bold tracking-wide text-onlan-lime backdrop-blur-sm">
                            <span className="size-2 rounded-full bg-onlan-lime" aria-hidden />
                            {HOME_HERO.badge}
                        </div>

                        <h1
                            id={headingId}
                            className="mb-5 text-[clamp(2.25rem,4.2vw,3.75rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-onlan-white"
                        >
                            {HOME_HERO.titleLines[0]}
                            <br />
                            {HOME_HERO.titleLines[1]}
                            <br />
                            <span className="text-onlan-lime">{HOME_HERO.titleHighlight}</span>
                        </h1>

                        <p className="mb-8 max-w-[540px] text-base font-medium leading-snug text-onlan-lavender min-[1200px]:text-lg min-[1200px]:leading-[1.4]">
                            {HOME_HERO.description}
                        </p>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Link to="/#contact" className="btn btn-lime btn-lg no-underline max-sm:w-full sm:btn-xl">
                                {HOME_HERO.cta}
                                <span aria-hidden>→</span>
                            </Link>
                            <Link
                                to="/services"
                                className="btn btn-lg border border-onlan-white/40 bg-transparent text-onlan-white no-underline hover:border-onlan-white hover:bg-onlan-white/10 max-sm:w-full sm:btn-xl"
                            >
                                {HOME_HERO.secondaryCta}
                            </Link>
                        </div>

                        <ul className="mt-10 grid max-w-[600px] list-none grid-cols-3 gap-3 border-t md:gap-4 border-onlan-lavender/25 pt-6 min-[1200px]:mt-12">
                            {HOME_HERO.advantages.map((advantage) => (
                                <li key={advantage.key}>
                                    <strong className="mb-1 block text-base font-extrabold leading-tight text-onlan-lime md:text-2xl">
                                        {advantage.title}
                                    </strong>
                                    <p className="m-0 text-xs leading-snug text-onlan-lavender md:text-sm">
                                        {advantage.description}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <ul className="m-0 grid h-[22rem] list-none grid-cols-2 grid-rows-2 gap-3 p-0 sm:h-[30rem] md:gap-4 min-[1200px]:h-[min(35rem,calc(100dvh-14rem))]">
                        {HOME_HERO.modes.map((mode, index) => (
                            <li
                                key={mode.key}
                                className={clsx(
                                    'relative overflow-hidden rounded-[20px] bg-onlan-black md:rounded-[28px]',
                                    MODE_LAYOUT[mode.key],
                                )}
                            >
                                <Link
                                    to={`/services/${mode.slug}`}
                                    className="group absolute inset-0 block no-underline"
                                    aria-label={`${mode.label}: детальніше про послугу`}
                                >
                                    <Image
                                        src={MODE_IMAGES[mode.key]}
                                        alt={mode.alt}
                                        fill
                                        priority={index === 0}
                                        sizes="(max-width: 1200px) 50vw, 28vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <span
                                        className="absolute inset-0 bg-linear-to-t from-onlan-black/60 via-onlan-black/0 to-onlan-black/0"
                                        aria-hidden
                                    />
                                    <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-onlan-lime px-4 py-2 text-sm font-bold text-onlan-black transition-colors group-hover:bg-onlan-white md:bottom-4 md:left-4 md:text-base">
                                        {mode.label}
                                        <span aria-hidden>→</span>
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};
