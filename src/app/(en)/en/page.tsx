import { HomeRoute, staticPageMetadata } from '@/lib/pageBuilders';

export const metadata = staticPageMetadata('/', 'en');

export default function Home() {
    return <HomeRoute lang="en" />;
}
