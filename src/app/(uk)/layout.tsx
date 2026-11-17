import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import RootShell from '@/components/app/RootShell';
import { createRootMetadata } from '@/lib/seo';
import { THEME_COLOR } from '@/lib/site';

export const metadata: Metadata = createRootMetadata('uk');

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: THEME_COLOR,
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return <RootShell lang="uk">{children}</RootShell>;
}
