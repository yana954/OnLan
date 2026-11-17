import { HomeRoute, staticPageMetadata } from '@/lib/pageBuilders';

export const metadata = staticPageMetadata('/', 'uk');

export default function Home() {
    return <HomeRoute lang="uk" />;
}
