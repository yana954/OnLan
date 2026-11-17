import type { Metadata } from 'next';
import { ServiceRoute, serviceMetadata, serviceSlugs } from '@/lib/pageBuilders';

type Props = { params: Promise<{ slug: string }> };

/** Only the known slugs are pre-rendered; anything else 404s. */
export function generateStaticParams() {
    return serviceSlugs('en');
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    return serviceMetadata((await params).slug, 'en');
}

export default async function ServicePage({ params }: Props) {
    return <ServiceRoute slug={(await params).slug} lang="en" />;
}
