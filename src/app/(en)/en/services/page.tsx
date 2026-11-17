import { ServicesRoute, staticPageMetadata } from '@/lib/pageBuilders';

export const metadata = staticPageMetadata('/services', 'en');

export default function Services() {
    return <ServicesRoute lang="en" />;
}
