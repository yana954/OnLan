'use client';

import Image from 'next/image';
import { Link } from 'react-router';
import imgTruck from '@images/aboutUsNew/truck.webp';
import { HOME_HERO } from '@/content/homeHero';

const FACT_STYLES = [
    'bg-onlan-lime text-onlan-black',
    'bg-onlan-blue text-onlan-white',
    'bg-onlan-white text-onlan-blue',
] as const;

const DOTS =
    'radial-gradient(circle, color-mix(in srgb, var(--onlan-blue) 14%, transparent) 1.5px, transparent 1.5px)';

/** Варіант C: світлий, по центру, кінематографічне фото, чипи видів доставки та картки-цифри на краю фото. */
export const HomeHeroVariantC = () => {
    const headingId = 'home-hero-heading-c';

    return (
        <section
            className="relative w-full overflow-hidden bg-linear-to-b from-onlan-lavender/45 via-onlan-white to-onlan-white"
            aria-labelledby={headingId}
        >
            <div
                className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent)]"
                style={{ backgroundImage: DOTS, backgroundSize: '24px 24px' }}
                aria-hidden
            />

            <div className="container relative mx-auto px-4 pt-10 md:pt-14 min-[1200px]:pt-12">
                <div className="mx-auto max-w-5xl text-center">
                    <h1
                        id={headingId}
                        style={{ ['--d' as string]: '100ms' }}
                        className="hero-rise mb-4 text-[clamp(1.875rem,4.1vw,3.25rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-onlan-blue"
                    >
                        <span className="md:whitespace-nowrap">
                            {HOME_HERO.titleLines[0]} {HOME_HERO.titleLines[1]}
                        </span>
                        <br />
                        <span className="relative inline-block text-onlan-blue">
                            <span
                                className="absolute inset-x-[-0.15em] bottom-[0.06em] -z-1 h-[0.42em] -skew-x-6 rounded-md bg-onlan-lime"
                                aria-hidden
                            />
                            {HOME_HERO.titleHighlight}
                        </span>
                    </h1>
                    <p
                        style={{ ['--d' as string]: '250ms' }}
                        className="hero-rise mx-auto mb-7 max-w-[620px] text-base font-medium leading-snug text-onlan-blue/80 md:text-lg"
                    >
                        {HOME_HERO.description}
                    </p>
                    <div style={{ ['--d' as string]: '400ms' }} className="hero-rise flex flex-col justify-center gap-3 sm:flex-row">
                        <Link to="/#contact" className="btn btn-primary btn-lg no-underline max-sm:w-full sm:btn-xl">
                            {HOME_HERO.cta}
                            <span aria-hidden>→</span>
                        </Link>
                        <Link
                            to="/services"
                            className="btn btn-lg border border-onlan-blue bg-transparent text-onlan-blue no-underline hover:bg-onlan-lavender max-sm:w-full sm:btn-xl"
                        >
                            {HOME_HERO.secondaryCta}
                        </Link>
                    </div>
                </div>

                <div className="hero-reveal relative mt-8 h-[15rem] overflow-hidden rounded-[24px] shadow-[0_24px_48px_-24px_rgba(44,53,140,0.45)] md:h-[22rem] md:rounded-[36px] min-[1200px]:h-[min(24rem,calc(100dvh-31rem))] min-[1200px]:min-h-[18rem]">
                    <Image
                        src={imgTruck}
                        alt={HOME_HERO.modes[0].alt}
                        fill
                        priority
                        sizes="100vw"
                        className="hero-kenburns object-cover object-[60%_55%]"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-onlan-blue/55 via-transparent to-transparent" aria-hidden />
                    <ul className="absolute left-3 top-3 m-0 flex list-none flex-wrap gap-2 p-0 md:left-6 md:top-6">
                        {HOME_HERO.modes.map((mode) => (
                            <li key={mode.key}>
                                <Link
                                    to={`/services/${mode.slug}`}
                                    className="inline-flex items-center gap-1.5 rounded-full bg-onlan-white/90 px-3 py-1.5 text-xs font-bold text-onlan-blue no-underline backdrop-blur transition-colors hover:bg-onlan-lime md:px-4 md:py-2 md:text-sm"
                                >
                                    {mode.label}
                                    <span aria-hidden>→</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <ul className="relative z-1 mx-auto -mt-9 grid max-w-4xl list-none grid-cols-3 gap-2 px-2 pb-10 md:-mt-12 md:gap-4 md:pb-14">
                    {HOME_HERO.facts.map((fact, index) => (
                        <li
                            key={fact.key}
                            style={{ ['--d' as string]: `${1100 + index * 150}ms` }}
                            className={`hero-rise rounded-2xl p-3 shadow-card md:rounded-3xl md:p-5 ${FACT_STYLES[index]}`}
                        >
                            <strong className="block text-lg font-extrabold leading-tight md:text-3xl">{fact.value}</strong>
                            <p className="m-0 mt-1 text-xs leading-snug opacity-90 md:text-sm">{fact.label}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};
