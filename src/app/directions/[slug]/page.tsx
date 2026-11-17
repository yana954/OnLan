import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/app/JsonLd';
import DirectionDetailPage from '@/site-pages/DirectionDetailPage';
import { DIRECTIONS, getDirectionBySlug } from '@/content/directions';
import { createDirectionRoute, getBreadcrumbTrail } from '@/lib/routes';
import { createPageMetadata } from '@/lib/seo';
import { createBreadcrumbNode, createFaqNode, createGraph, createWebPageNode } from '@/lib/structuredData';

type DirectionPageProps = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return DIRECTIONS.map((direction) => ({ slug: direction.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: DirectionPageProps): Promise<Metadata> {
    const { slug } = await params;
    const direction = getDirectionBySlug(slug);

    if (!direction) {
        return { title: 'Сторінку не знайдено (404)', robots: { index: false, follow: false } };
    }

    return createPageMetadata(createDirectionRoute(direction).seo);
}

export default async function DirectionPage({ params }: DirectionPageProps) {
    const { slug } = await params;
    const direction = getDirectionBySlug(slug);

    if (!direction) {
        notFound();
    }

    const route = createDirectionRoute(direction);
    const trail = getBreadcrumbTrail(route);

    const jsonLd = createGraph([
        createWebPageNode(route.seo, { breadcrumbTrail: trail }),
        createBreadcrumbNode(route.seo.path, trail),
        createFaqNode(route.seo.path, direction.faq),
    ]);

    return (
        <>
            <JsonLd data={jsonLd} />
            <DirectionDetailPage direction={direction} breadcrumbs={trail} />
        </>
    );
}
