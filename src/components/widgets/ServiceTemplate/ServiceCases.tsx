'use client';

import { Elements } from '@/components/elements';
import type { ServiceContent } from '@/types/Service.interface';
import { useT } from '@/components/app/LangProvider';

interface ServiceCasesProps {
    service: ServiceContent;
}

export const ServiceCases = ({ service }: ServiceCasesProps) => {
    const t = useT();
    const headingId = `service-cases-${service.slug}`;

    return (
        <section
            className="relative w-full bg-onlan-white py-12 md:py-16 lg:py-20"
            aria-labelledby={headingId}
        >
            <div className="container mx-auto px-4">
                <div className="flex w-full items-center justify-start gap-2">
                    <div className="size-2 shrink-0 rounded-full bg-onlan-lime" />
                    <div className="rounded-full border border-onlan-black px-3 py-1.5 md:px-4 md:py-2">
                        <p className="text-left text-xs font-semibold uppercase tracking-[0.14em] text-onlan-black md:text-sm">
                            {t('Кейси', 'Case studies')}
                        </p>
                    </div>
                </div>

                <Elements.Title
                    id={headingId}
                    title={t('Реальні приклади доставок', 'Real delivery examples')}
                    type="h2"
                    className="mt-4 max-w-3xl text-balance text-onlan-black md:mt-6"
                />

                <p className="mt-4 max-w-2xl text-base leading-relaxed text-onlan-black/75 md:text-lg">
                    {t(
                        `Готуємо кейси для напрямку «${service.title}»: маршрути, строки, тип вантажу та рішення для клієнта. Розділ з’явиться найближчим часом.`,
                        `We’re preparing case studies for “${service.title}”: routes, timelines, cargo types and client solutions. This section is coming soon.`,
                    )}
                </p>

                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-10">
                    {[t('Кейс 1', 'Case 1'), t('Кейс 2', 'Case 2')].map((label) => (
                        <article
                            key={label}
                            className="rounded-2xl border border-dashed border-onlan-black/15 bg-onlan-white p-6 md:p-8"
                        >
                            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-onlan-blue">
                                {label}
                            </p>
                            <p className="mt-3 text-sm leading-relaxed text-onlan-black/60 md:text-base">
                                {t('Опис кейсу буде додано після узгодження з командою.', 'The case description will be added once agreed with the team.')}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};
