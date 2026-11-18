import type { ServiceIconId } from '@/types/HowItWorks.interface';

export type ServiceBenefit = {
    title: string;
    description: string;
};

export type ServiceProcessStep = {
    number: string;
    title: string;
    description: string;
};

export type ServiceFaqItem = {
    question: string;
    answer: string;
};

export type ServiceCase = {
    title: string;
    situation: string;
    solution: string;
    result?: string;
    /** One-line takeaway shown under the story */
    takeaway?: string;
};

export type ServiceContent = {
    /** URL segment for `/services/[slug]` */
    slug: string;
    /** Two-digit ordering number, used on cards in the home stack */
    number: string;
    /** Tag label used in chips (sticky stack and service hero eyebrow) */
    tagLabel: string;
    /** Main heading on cards and h1 on service page */
    title: string;
    /** Short summary used on the home stack */
    description: string;
    /** Hero lead paragraph on service page (1–2 sentences) */
    lead: string;
    iconId: ServiceIconId;
    /** Hero highlights (check-mark list under the lead) */
    highlights: string[];
    /** Optional second line for each highlight (same order as `highlights`) */
    highlightNotes?: string[];
    /** Optional bold line between the h1 and the lead */
    heroTagline?: string;
    /** Optional override for the benefits section heading */
    benefitsHeading?: string;
    /** Real customer cases; the section shows a placeholder while empty */
    cases?: ServiceCase[];
    benefits: ServiceBenefit[];
    process: ServiceProcessStep[];
    /** Cargo types / directions chips */
    cargoTypes: string[];
    faq: ServiceFaqItem[];
    /** Optional SEO overrides; otherwise derived from title/lead */
    seo?: {
        title?: string;
        description?: string;
    };
};
