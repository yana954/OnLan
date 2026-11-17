'use client';

import Image from 'next/image';
import { Link } from 'react-router';
import imgPort from '@images/aboutUsNew/containers.webp';
import { HOME_HERO } from '@/content/homeHero';
import { SERVICES } from '@/content/services';

const PICK_SLUGS = ['automotive', 'sea-container', 'air', 'rail'];

const PICKED = PICK_SLUGS.map((slug) => SERVICES.find((s) => s.slug === slug)).filter(
    (s): s is (typeof SERVICES)[number] => Boolean(s),
);

/** Варіант B: фото-фон із синім градієнтом і «меню» способів доставки. */
export const HomeHeroVariantB = () => {
    const headingId = 'home-hero-heading-b';

    return (
        <section
            className="relative w-full overflow-hidden bg-onlan-blue min-[1200px]:flex min-[1200px]:min-h-[calc(100dvh-96px)] min-[1200px]:items-center"
            aria-labelledby={headingId}
        >
            <Image
                src={imgPort}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
                aria-hidden
            />
            <div
                className="absolute inset-0 bg-linear-to-r from-onlan-blue from-35% via-onlan-blue/85 to-onlan-blue/40 max-[1199px]:bg-linear-to-b max-[1199px]:from-onlan-blue/95 max-[1199px]:to-onlan-blue/80"
                aria-hidden
            />

            <div className="container relative z-1 mx-auto px-4 py-12 md:py-16 min-[1200px]:py-10">
                <div className="grid items-center gap-10 min-[1200px]:grid-cols-[1.05fr_0.95fr] min-[1200px]:gap-14">
                    <div className="min-w-0">
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
                        </div>
                        <ul className="mt-10 grid max-w-[600px] list-none grid-cols-3 gap-3 border-t border-onlan-lavender/25 pt-6 md:gap-4">
                            {HOME_HERO.facts.map((fact) => (
                                <li key={fact.key}>
                                    <strong className="mb-1 block text-base font-extrabold leading-tight text-onlan-lime md:text-2xl">
                                        {fact.value}
                                    </strong>
                                    <p className="m-0 text-xs leading-snug text-onlan-lavender md:text-sm">{fact.label}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <nav
                        aria-label="Способи доставки"
                        className="rounded-[20px] border border-onlan-lime bg-onlan-white/10 p-4 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.35)] backdrop-blur-[17px] md:rounded-[28px] md:p-6"
                    >
                        <p className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-onlan-lime">
                            Оберіть спосіб доставки
                        </p>
                        <ul className="m-0 list-none p-0">
                            {PICKED.map((service) => (
                                <li key={service.slug} className="border-t border-onlan-lavender/25 first:border-t-0">
                                    <Link
                                        to={`/services/${service.slug}`}
                                        className="group flex items-center gap-4 rounded-xl px-2 py-4 no-underline transition-colors hover:bg-onlan-white/10"
                                    >
                                        <span className="text-sm font-bold text-onlan-lime">{service.number}</span>
                                        <span className="min-w-0 flex-1">
                                            <strong className="block text-base font-bold text-onlan-white md:text-lg">
                                                {service.title}
                                            </strong>
                                            <span className="mt-1 line-clamp-2 hidden text-sm leading-snug text-onlan-lavender sm:block">
                                                {service.description}
                                            </span>
                                        </span>
                                        <span
                                            className="grid size-9 shrink-0 place-items-center rounded-full bg-onlan-lime text-onlan-black transition-transform group-hover:translate-x-1"
                                            aria-hidden
                                        >
                                            →
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </section>
    );
};
