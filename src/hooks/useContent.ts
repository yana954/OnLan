'use client';

import { useLang } from '@/components/app/LangProvider';
import { getContent, type SiteContent } from '@/content';

/** Content for the current page language — for client components. */
export function useContent(): SiteContent {
    return getContent(useLang());
}
