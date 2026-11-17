import { AboutUsRoute, staticPageMetadata } from '@/lib/pageBuilders';

export const metadata = staticPageMetadata('/about-us', 'uk');

export default function AboutUs() {
    return <AboutUsRoute lang="uk" />;
}
