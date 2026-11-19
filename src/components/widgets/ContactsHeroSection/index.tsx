'use client';

import { ContactsHeroShape } from '@/assets/icons/ContactsHeroShape';
import { Elements } from '@/components/elements';
import { useContent } from '@/hooks/useContent';
import { useT } from '@/components/app/LangProvider';

const HERO_CIRCLES = [
    {
        key: 'phone',
        bg: 'bg-onlan-blue',
        fg: 'text-onlan-white',
        path: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />,
    },
    {
        key: 'email',
        bg: 'bg-onlan-lime',
        fg: 'text-onlan-black',
        path: (
            <>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
            </>
        ),
    },
    {
        key: 'location',
        bg: 'bg-onlan-blue',
        fg: 'text-onlan-white',
        path: (
            <>
                <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" />
                <circle cx="12" cy="10" r="3" />
            </>
        ),
    },
    {
        key: 'hours',
        bg: 'bg-onlan-lime',
        fg: 'text-onlan-black',
        path: (
            <>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
            </>
        ),
    },
] as const;

export function ContactsHeroSection() {
    const c = useContent();
    const t = useT();
    const headingId = 'contacts-hero-heading';

    return (
        <section
            className="relative z-0 mx-auto min-h-[75vh] w-full max-w-7xl overflow-hidden bg-onlan-white md:min-h-[90vh]"
            aria-labelledby={headingId}
        >
            <div className="container relative mx-auto flex min-h-[75vh] items-center px-4 py-8 md:min-h-[90vh] md:py-10 lg:py-12">
                <div
                    className="pointer-events-none absolute right-0 top-0 z-0 aspect-[830/890] h-[45vh] w-auto max-w-[min(85vw,calc(100%-1rem))] sm:h-[55vh] md:h-[70vh] md:max-w-[min(70vw,900px)] lg:h-[90vh]"
                    aria-hidden
                >
                    <ContactsHeroShape className="h-full w-full -rotate-6 md:-rotate-8 lg:-rotate-12" />
                </div>

                <div className="relative z-10 flex w-full max-w-2xl flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-5">
                        <Elements.Title
                            id={headingId}
                            title={c.contactsHero.title}
                            type="h1"
                            className="font-bold text-[clamp(1.75rem,7vw,3.75rem)] leading-[1.05] text-onlan-black"
                        />

                        <ul
                            className="flex list-none items-center"
                            aria-label={t('Способи зв’язку', 'Ways to get in touch')}
                        >
                            {HERO_CIRCLES.map(({ key, bg, fg, path }, index) => (
                                <li
                                    key={key}
                                    className={`relative shrink-0${index > 0 ? ' -ml-2' : ''}`}
                                    style={{ zIndex: index + 1 }}
                                >
                                    <span
                                        className={`flex size-11 shrink-0 items-center justify-center rounded-full ring-2 ring-onlan-white ${bg} ${fg}`}
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="size-5"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            aria-hidden
                                        >
                                            {path}
                                        </svg>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <Elements.Title
                        title={c.contactsHero.brandTitle}
                        type="p"
                        className="font-bold text-[clamp(1.75rem,7vw,3.75rem)] leading-[1.05] text-onlan-black"
                        highlights={[
                            { text: 'ONLAN', className: 'uppercase' },
                            { text: 'Logistic', className: 'normal-case' },
                        ]}
                    />

                    <p className="mt-4 max-w-lg text-sm leading-relaxed text-onlan-black/85 md:mt-5 md:text-base lg:text-lg">
                        {c.contactsHero.description}
                    </p>
                </div>
            </div>
        </section>
    );
}
