'use client';

import { useContent } from '@/hooks/useContent';
import { HowItWork } from '@/components/widgets/HowItWork/HowItWork';
import { SERVICE_STEP_BACKGROUND_BY_SLUG } from '@/components/widgets/ServicesHowItWorksSection/serviceStepBackgrounds';
import { SERVICE_STEP_PANEL_IMAGE_BY_SLUG } from '@/components/widgets/ServicesHowItWorksSection/serviceStepPanelImages';

export function ServicesHowItWorksSection() {
    const { services } = useContent();
    const items = services.map(({ number, slug, tagLabel, title, description, iconId }) => ({
        number,
        slug,
        tagLabel,
        title,
        description,
        iconId,
    }));
    const total = items.length;

    return (
        <div className="relative w-full">
            {items.map((item, index) => (
                <HowItWork
                    key={item.number}
                    {...item}
                    index={index}
                    total={total}
                    backgroundImageSrc={SERVICE_STEP_BACKGROUND_BY_SLUG[item.slug]}
                    panelImageSrc={SERVICE_STEP_PANEL_IMAGE_BY_SLUG[item.slug]}
                />
            ))}
        </div>
    );
}
