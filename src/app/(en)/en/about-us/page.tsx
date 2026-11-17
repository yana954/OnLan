import { AboutUsRoute, staticPageMetadata } from '@/lib/pageBuilders';

export const metadata = staticPageMetadata('/about-us', 'en');

export default function AboutUs() {
    return <AboutUsRoute lang="en" />;
}
