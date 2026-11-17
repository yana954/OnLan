'use client';

import { Link } from '@/lib/router';
import Breadcrumbs from '@/components/elements/Breadcrumbs';
import { Containers, Widgets } from '@components';
import type { DirectionContent } from '@/content/directions';
import { useContent } from '@/hooks/useContent';
import { useT } from '@/components/app/LangProvider';
import type { BreadcrumbItem } from '@/lib/routes';
import { directionPath, servicePath } from '@/lib/routes';

type Props = {
    direction: DirectionContent;
    breadcrumbs: BreadcrumbItem[];
};

/**
 * `/directions/[slug]` — посадкова сторінка напрямку. Серверний рендер: увесь
 * текст, таблиця та FAQ є в HTML без JavaScript (FAQ — нативні <details>).
 */
export default function DirectionDetailPage({ direction, breadcrumbs }: Props) {
    const t = useT();
    const { services: SERVICES, directions: DIRECTIONS, termsDisclaimer: TERMS_DISCLAIMER } = useContent();
    const related = direction.related
        .map((slug) => SERVICES.find((service) => service.slug === slug))
        .filter((service): service is (typeof SERVICES)[number] => Boolean(service));
    const otherDirections = DIRECTIONS.filter((item) => item.slug !== direction.slug);

    return (
        <>
            <section className="w-full bg-onlan-blue py-10 text-onlan-white md:py-14 lg:py-20">
                <div className="container mx-auto px-4">
                    <Breadcrumbs items={breadcrumbs} className="text-onlan-white" />
                    <h1 className="mt-6 max-w-4xl text-balance text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
                        {direction.title}
                    </h1>
                    <p className="mt-4 max-w-3xl text-base leading-relaxed text-onlan-lavender md:mt-6 md:text-lg">
                        {direction.lead}
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link to="/#contact" className="btn btn-lime btn-lg no-underline max-sm:w-full sm:btn-xl">
                            {t('Отримати розрахунок доставки', 'Get a delivery quote')}
                            <span aria-hidden>→</span>
                        </Link>
                    </div>

                    <div className="mt-10 max-w-3xl rounded-2xl border border-onlan-lime bg-onlan-white/10 p-5 md:p-6">
                        <p className="text-sm font-bold uppercase tracking-[0.12em] text-onlan-lime">{t('Коротко', 'At a glance')}</p>
                        <ul className="mt-3 grid list-none gap-2 p-0 text-base md:text-lg">
                            {direction.quick.map((fact) => (
                                <li key={fact} className="flex gap-2">
                                    <span className="text-onlan-lime" aria-hidden>
                                        ✓
                                    </span>
                                    {fact}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <article className="w-full bg-onlan-white py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-3xl">
                        {direction.sections.map((section) => (
                            <section key={section.heading} className="mb-10">
                                <h2 className="text-2xl font-bold leading-snug text-onlan-blue md:text-3xl">
                                    {section.heading}
                                </h2>
                                {section.paragraphs.map((paragraph) => (
                                    <p key={paragraph} className="mt-4 text-base leading-relaxed text-onlan-black/90 md:text-lg">
                                        {paragraph}
                                    </p>
                                ))}
                            </section>
                        ))}

                        <section className="mb-10">
                            <h2 className="text-2xl font-bold leading-snug text-onlan-blue md:text-3xl">
                                {t('Орієнтовні терміни доставки', 'Estimated delivery times')}
                            </h2>
                            <div className="mt-4 overflow-x-auto rounded-2xl border border-onlan-black/10">
                                <table className="w-full min-w-[520px] border-collapse text-left text-sm md:text-base">
                                    <thead className="bg-onlan-lavender/60 text-onlan-blue">
                                        <tr>
                                            <th scope="col" className="px-4 py-3 font-semibold">{t('Спосіб', 'Mode')}</th>
                                            <th scope="col" className="px-4 py-3 font-semibold">{t('Орієнтовний термін', 'Estimated time')}</th>
                                            <th scope="col" className="px-4 py-3 font-semibold">{t('Коли підходить', 'Best for')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {direction.terms.map((term) => (
                                            <tr key={term.mode} className="border-t border-onlan-black/10">
                                                <th scope="row" className="px-4 py-3 font-semibold">
                                                    <Link to={servicePath(term.serviceSlug)} className="text-onlan-blue underline-offset-4 hover:underline">
                                                        {term.mode}
                                                    </Link>
                                                </th>
                                                <td className="px-4 py-3">{term.time}</td>
                                                <td className="px-4 py-3 text-onlan-black/80">{term.note}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-3 text-sm text-onlan-black/70">{TERMS_DISCLAIMER} {t('Вартість розраховуємо індивідуально.', 'We calculate the cost individually.')}</p>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-2xl font-bold leading-snug text-onlan-blue md:text-3xl">
                                {t('Які документи зазвичай потрібні?', 'Which documents are usually required?')}
                            </h2>
                            <ul className="mt-4 list-disc space-y-1 pl-6 text-base text-onlan-black/90 md:text-lg">
                                {direction.documents.map((doc) => (
                                    <li key={doc}>{doc}</li>
                                ))}
                            </ul>
                        </section>

                        <section className="mb-10" aria-labelledby="dir-faq">
                            <h2 id="dir-faq" className="text-2xl font-bold leading-snug text-onlan-blue md:text-3xl">
                                {t('Часті запитання', 'Frequently asked questions')}
                            </h2>
                            <div className="mt-4 divide-y divide-onlan-black/10 rounded-2xl border border-onlan-black/10">
                                {direction.faq.map((item) => (
                                    <details key={item.question} className="group p-4 md:p-5">
                                        <summary className="cursor-pointer list-none text-base font-semibold text-onlan-black md:text-lg">
                                            {item.question}
                                        </summary>
                                        <p className="mt-3 text-base leading-relaxed text-onlan-black/85">{item.answer}</p>
                                    </details>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-onlan-blue md:text-2xl">{t('Послуги для цього напрямку', 'Services for this route')}</h2>
                            <ul className="mt-3 flex list-none flex-wrap gap-2 p-0">
                                {related.map((service) => (
                                    <li key={service.slug}>
                                        <Link
                                            to={servicePath(service.slug)}
                                            className="inline-block rounded-full border border-onlan-blue px-4 py-2 text-sm font-semibold text-onlan-blue no-underline hover:bg-onlan-lavender"
                                        >
                                            {service.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <h2 className="mt-8 text-xl font-bold text-onlan-blue md:text-2xl">{t('Інші напрямки', 'Other routes')}</h2>
                            <ul className="mt-3 flex list-none flex-wrap gap-2 p-0">
                                {otherDirections.map((item) => (
                                    <li key={item.slug}>
                                        <Link
                                            to={directionPath(item.slug)}
                                            className="inline-block rounded-full bg-onlan-lime px-4 py-2 text-sm font-semibold text-onlan-black no-underline"
                                        >
                                            {item.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                </div>
            </article>

            <div className="bg-onlan-white">
                <Containers.Section el={<Widgets.ContactsGlowCardSection />} />
            </div>
        </>
    );
}
