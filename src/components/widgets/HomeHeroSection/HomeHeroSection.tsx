'use client';

import Image from 'next/image';
import { Link } from 'react-router';
import heroImage from '@images/onlan-hero-logistics.webp';
import { HOME_HERO } from '@/content/homeHero';

const iconClassName =
    'size-5 fill-none stroke-onlan-blue stroke-2 [stroke-linecap:round] [stroke-linejoin:round]';

function ManagerIcon() {
    return (
        <svg viewBox="0 0 24 24" className={iconClassName} aria-hidden>
            <path d="M12 12C14.76 12 17 9.76 17 7C17 4.24 14.76 2 12 2C9.24 2 7 4.24 7 7C7 9.76 9.24 12 12 12Z" />
            <path d="M4 21C4 17.69 7.58 15 12 15C16.42 15 20 17.69 20 21" />
        </svg>
    );
}

function ClockIcon() {
    return (
        <svg viewBox="0 0 24 24" className={iconClassName} aria-hidden>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7V12L15 15" />
        </svg>
    );
}

function ShieldIcon() {
    return (
        <svg viewBox="0 0 24 24" className={iconClassName} aria-hidden>
            <path d="M12 3L19 6V11C19 16 15.5 19.5 12 21C8.5 19.5 5 16 5 11V6L12 3Z" />
        </svg>
    );
}

const ADVANTAGE_ICONS = {
    manager: ManagerIcon,
    support: ClockIcon,
    predictable: ShieldIcon,
} as const;

export const HomeHeroSection = () => {
    const headingId = 'home-hero-heading';

    return (
        <section
            className="w-full bg-onlan-white min-[1200px]:h-[calc(100dvh-96px)]"
            aria-labelledby={headingId}
        >
            <div className="container mx-auto flex h-full px-4 py-10 min-[1200px]:items-center min-[1200px]:py-6">
                <div className="grid w-full items-center gap-10 min-[1200px]:grid-cols-[0.85fr_1.15fr] min-[1200px]:gap-10">
                    <div className="min-w-0">
                        <div className="mb-4 inline-flex rounded-full bg-onlan-blue/12 px-4 py-2 text-sm font-bold text-onlan-blue">
                            {HOME_HERO.badge}
                        </div>

                        <h1
                            id={headingId}
                            className="mb-4 text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-onlan-black"
                        >
                            {HOME_HERO.titleLines[0]}
                            <br />
                            {HOME_HERO.titleLines[1]}
                            <br />
                            <span className="text-onlan-blue">{HOME_HERO.titleHighlight}</span>
                        </h1>

                        <p className="mb-5 max-w-[520px] text-base font-medium leading-snug text-[#33395f] min-[1200px]:text-[17px] min-[1200px]:leading-[1.4]">
                            {HOME_HERO.description}
                        </p>

                        <Link
                            to="/#contact"
                            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-onlan-blue px-6 text-base font-bold text-onlan-white no-underline transition-colors hover:bg-onlan-blue/90 min-[768px]:w-auto min-[768px]:px-8"
                        >
                            {HOME_HERO.cta}
                            <span aria-hidden>→</span>
                        </Link>

                        <ul className="mt-6 grid max-w-[560px] list-none gap-5 sm:grid-cols-2 min-[1200px]:mt-8 min-[1200px]:grid-cols-3 min-[1200px]:gap-4">
                            {HOME_HERO.advantages.map((advantage) => {
                                const Icon = ADVANTAGE_ICONS[advantage.key];

                                return (
                                    <li key={advantage.key} className="flex items-start gap-2.5">
                                        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-onlan-blue/8">
                                            <Icon />
                                        </span>
                                        <div>
                                            <strong className="mb-0.5 block text-sm font-extrabold text-onlan-blue">
                                                {advantage.title}
                                            </strong>
                                            <p className="m-0 text-[13px] leading-snug text-[#2f3150]">
                                                {advantage.description}
                                            </p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="relative min-h-0 min-[1200px]:flex min-[1200px]:h-full min-[1200px]:items-center">
                        <div className="relative w-full overflow-hidden rounded-[24px] bg-[#f4f7ff] min-[1200px]:max-h-[calc(100dvh-128px)]">
                            <Image
                                src={heroImage}
                                alt="Міжнародна логістика OnLan"
                                width={1200}
                                height={720}
                                className="block h-auto w-full object-contain"
                                priority
                                sizes="(max-width: 1200px) 100vw, 58vw"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
