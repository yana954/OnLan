'use client';

import type { BreadcrumbItem } from '@/lib/routes';
import type { ServiceContent } from '@/types/Service.interface';
import { useT } from '@/components/app/LangProvider';
import { useContent } from '@/hooks/useContent';
import { Link } from '@/lib/router';
import { Containers, Widgets } from '@components';

type Props = {
    service: ServiceContent;
    /** Full trail (Головна → Послуги → поточна послуга) */
    breadcrumbs: BreadcrumbItem[];
};

function RelatedLinks({ service }: { service: ServiceContent }) {
    const t = useT();
    const { services, directions } = useContent();
    const start = services.findIndex((item) => item.slug === service.slug);
    const related = [1, 2, 3].map((step) => services[(start + step) % services.length]).filter(Boolean);

    return (
        <section className="w-full bg-onlan-white pb-12 pt-4 md:pb-16 lg:pb-20" aria-label={t('Дивіться також', 'See also')}>
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold text-onlan-black md:text-3xl">{t('Дивіться також', 'See also')}</h2>
                <ul className="mt-5 flex list-none flex-wrap gap-3">
                    {related.map((item) => (
                        <li key={item.slug}>
                            <Link
                                to={`/services/${item.slug}`}
                                className="inline-flex rounded-full border border-onlan-blue/25 px-4 py-2 text-sm font-semibold text-onlan-blue transition-colors hover:bg-onlan-blue hover:text-onlan-white md:text-base"
                            >
                                {item.title}
                            </Link>
                        </li>
                    ))}
                    {directions.map((item) => (
                        <li key={item.slug}>
                            <Link
                                to={`/directions/${item.slug}`}
                                className="inline-flex rounded-full bg-onlan-lime px-4 py-2 text-sm font-semibold text-onlan-black transition-opacity hover:opacity-80 md:text-base"
                            >
                                {item.title}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <Link
                            to="/services"
                            className="inline-flex rounded-full border border-onlan-black/20 px-4 py-2 text-sm font-semibold text-onlan-black transition-colors hover:bg-onlan-black hover:text-onlan-white md:text-base"
                        >
                            {t('Усі послуги', 'All services')}
                        </Link>
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default function ServiceDetailPage({ service, breadcrumbs }: Props) {
    return (
        <>
            <Widgets.ServiceHero service={service} breadcrumbs={breadcrumbs} />
            <Widgets.ServiceBenefits service={service} />
            <Widgets.ServiceProcess service={service} />
            {/* <Widgets.ServiceCargoTypes service={service} /> */}
            <Widgets.ServiceCargoCards service={service} />
            <Widgets.ServiceCases service={service} />
            <Widgets.ServiceFaq service={service} />
            <RelatedLinks service={service} />
            <div className="bg-onlan-white">
                <Containers.Section el={<Widgets.ContactsGlowCardSection />} />
            </div>
        </>
    );
}
