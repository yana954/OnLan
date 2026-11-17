import type { HOME_HERO as UkHero } from '@/content/homeHero';
import type { Widen } from '@/types/Widen';

export const HOME_HERO_EN: Widen<typeof UkHero> = {
    titleLines: ['International freight', 'shipping'],
    titleHighlight: 'from Europe, Asia and the USA, turnkey',
    description:
        'You choose the goods — we take care of the rest: route, transport, customs and delivery. You know where your cargo is at every stage.',
    cta: 'Get a delivery quote',
    secondaryCta: 'Our services',
    facts: [
        { key: 'since', value: 'since 2012', label: 'based in Vinnytsia' },
        { key: 'shipments', value: '5,000', label: 'successful shipments' },
        { key: 'warehouse', value: '2,000 m²', label: 'own warehouse' },
    ],
    modes: [
        { key: 'road', slug: 'automotive', label: 'Road', alt: 'Truck on the highway' },
        { key: 'air', slug: 'air', label: 'Air', alt: 'Cargo being loaded onto a plane' },
        { key: 'sea', slug: 'sea-container', label: 'Sea', alt: 'Container terminal' },
    ],
};
