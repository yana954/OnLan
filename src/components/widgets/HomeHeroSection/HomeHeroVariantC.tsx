'use client';

import Image from 'next/image';
import { Link } from 'react-router';
import imgTruck from '@images/aboutUsNew/truck.webp';
import { HOME_HERO } from '@/content/homeHero';

const FACT_STYLES = [
    'bg-onlan-lime text-onlan-black',
    'bg-onlan-blue text-onlan-white',
    'bg-onlan-lavender text-onlan-blue',
] as const;

/** Варіант C: світлий, по центру, кінематографічне фото та картки-цифри на його краю. */
export const HomeHeroVariantC = () => {
    const headingId = 'home-hero-heading-c';

    return (
        <section className="relative w-full overflow-hidden bg-onlan-white" aria-labelledby={headingId}>
            <div className="container mx-auto px-4 pt-12 md:pt-16 min-[1200px]:pt-14">
                <div className="mx-auto max-w-5xl text-center">
                    <h1
                        id={headingId}
                        className="mb-5 text-[clamp(2.25rem,4.6vw,3.75rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-onlan-blue"
                    >
                        {HOME_HERO.titleLines[0]} {HOME_HERO.titleLines[1]}
                        <br />
                        <span className="inline-block rounded-2xl bg-onlan-lime px-4 text-onlan-black">
                            {HOME_HERO.titleHighlight}
                        </span>
                    </h1>
                    <p className="mx-auto mb-8 max-w-[640px] text-base font-medium leading-snug text-onlan-blue md:text-lg">
                        {HOME_HERO.description}
                    </p>
                    <div className="flex flex-col justify-center gap-3 sm:flex-row">
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

                <div className="relative mt-10 h-[17rem] overflow-hidden rounded-[24px] md:h-[26rem] md:rounded-[36px] min-[1200px]:h-[min(28rem,calc(100dvh-32rem))] min-[1200px]:min-h-[20rem]">
                    <Image
                        src={imgTruck}
                        alt={HOME_HERO.modes[0].alt}
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-[60%_55%]"
                    />
                </div>

                <ul className="relative z-1 mx-auto -mt-10 grid max-w-4xl list-none grid-cols-3 gap-2 px-2 pb-10 md:-mt-14 md:gap-4 md:pb-14">
                    {HOME_HERO.facts.map((fact, index) => (
                        <li
                            key={fact.key}
                            className={`rounded-2xl p-3 shadow-card md:rounded-3xl md:p-6 ${FACT_STYLES[index]}`}
                        >
                            <strong className="block text-lg font-extrabold leading-tight md:text-3xl">
                                {fact.value}
                            </strong>
                            <p className="m-0 mt-1 text-xs leading-snug opacity-90 md:text-base">{fact.label}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};
