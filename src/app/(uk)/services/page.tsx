import { ServicesRoute, staticPageMetadata } from '@/lib/pageBuilders';

export const metadata = staticPageMetadata('/services', 'uk');

export default function Services() {
    return <ServicesRoute lang="uk" />;
}
