'use client';

import type { BreadcrumbItem } from '@/lib/routes';
import type { ServiceContent } from '@/types/Service.interface';
import { Containers, Widgets } from '@components';

type Props = {
    service: ServiceContent;
    /** Full trail (Головна → Послуги → поточна послуга) */
    breadcrumbs: BreadcrumbItem[];
};

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
            <div className="bg-onlan-white">
                <Containers.Section el={<Widgets.ContactsGlowCardSection />} />
            </div>
        </>
    );
}
