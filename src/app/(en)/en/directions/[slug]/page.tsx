import type { Metadata } from 'next';
import { DirectionRoute, directionMetadata, directionSlugs } from '@/lib/pageBuilders';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return directionSlugs('en');
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    return directionMetadata((await params).slug, 'en');
}

export default async function DirectionPage({ params }: Props) {
    return <DirectionRoute slug={(await params).slug} lang="en" />;
}
