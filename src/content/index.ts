import { ABOUT_US_ADVANTAGES, ABOUT_US_ADVANTAGES_SECTION } from '@/content/aboutUsAdvantages';
import { ABOUT_US_HISTORY_MILESTONES, ABOUT_US_HISTORY_SECTION } from '@/content/aboutUsHistory';
import { ABOUT_US_NEW_PHOTOS } from '@/content/aboutUsNewPhotos';
import {
    ABOUT_US_STORYTELL_MAP,
    ABOUT_US_STORYTELL_SCROLL,
    ABOUT_US_STORYTELL_SPLIT,
} from '@/content/aboutUsStorytell';
import { ABOUT_US_TEAM, ABOUT_US_TEAM_SECTION } from '@/content/aboutUsTeam';
import { ABOUT_US_VALUES, ABOUT_US_VALUES_SECTION } from '@/content/aboutUsValues';
import {
    CONTACTS_DETAILS_SECTION,
    CONTACTS_FAQ_SECTION,
    CONTACTS_HERO,
    CONTACTS_OFFICES_SECTION,
    CONTACTS_PRIMARY,
    CONTACTS_QUOTE_FORM,
} from '@/content/contacts';
import { DIRECTIONS, TERMS_DISCLAIMER } from '@/content/directions';
import {
    ABOUT_US_ADVANTAGES_EN,
    ABOUT_US_ADVANTAGES_SECTION_EN,
    ABOUT_US_HISTORY_MILESTONES_EN,
    ABOUT_US_HISTORY_SECTION_EN,
    ABOUT_US_NEW_PHOTO_ALT_EN,
    ABOUT_US_STORYTELL_MAP_EN,
    ABOUT_US_STORYTELL_SCROLL_EN,
    ABOUT_US_STORYTELL_SPLIT_EN,
    ABOUT_US_TEAM_EN,
    ABOUT_US_TEAM_SECTION_EN,
    ABOUT_US_VALUES_EN,
    ABOUT_US_VALUES_SECTION_EN,
} from '@/content/en/aboutUs';
import {
    CONTACTS_DETAILS_SECTION_EN,
    CONTACTS_FAQ_SECTION_EN,
    CONTACTS_HERO_EN,
    CONTACTS_OFFICES_SECTION_EN,
    CONTACTS_PRIMARY_EN,
    CONTACTS_QUOTE_FORM_EN,
} from '@/content/en/contacts';
import { DIRECTIONS_EN, TERMS_DISCLAIMER_EN } from '@/content/en/directions';
import { HOME_HERO_EN } from '@/content/en/homeHero';
import { SERVICE_CARGO_SECTIONS_EN } from '@/content/en/serviceCargoCards';
import { SERVICES_EN } from '@/content/en/services';
import { HOME_HERO } from '@/content/homeHero';
import { SERVICE_CARGO_SECTIONS } from '@/content/serviceCargoCards';
import { SERVICES } from '@/content/services';
import type { AboutUsAdvantageItem } from '@/content/aboutUsAdvantages';
import type { HistoryMilestone } from '@/content/aboutUsHistory';
import type { AboutUsNewPhoto } from '@/content/aboutUsNewPhotos';
import type { AboutUsTeamMember } from '@/content/aboutUsTeam';
import type { AboutUsValueItem } from '@/content/aboutUsValues';
import type { DirectionContent } from '@/content/directions';
import type { ServiceCargoSection } from '@/content/serviceCargoCards';
import type { ServiceContent } from '@/types/Service.interface';
import type { Lang } from '@/lib/i18n';
import type { Widen } from '@/types/Widen';

const UK = {
    homeHero: HOME_HERO,
    services: SERVICES,
    directions: DIRECTIONS,
    termsDisclaimer: TERMS_DISCLAIMER,
    cargoSections: SERVICE_CARGO_SECTIONS,
    contactsHero: CONTACTS_HERO,
    contactsPrimary: CONTACTS_PRIMARY,
    contactsQuoteForm: CONTACTS_QUOTE_FORM,
    contactsDetails: CONTACTS_DETAILS_SECTION,
    contactsOffices: CONTACTS_OFFICES_SECTION,
    contactsFaq: CONTACTS_FAQ_SECTION,
    aboutValuesSection: ABOUT_US_VALUES_SECTION,
    aboutValues: ABOUT_US_VALUES,
    aboutHistorySection: ABOUT_US_HISTORY_SECTION,
    aboutHistory: ABOUT_US_HISTORY_MILESTONES,
    aboutTeamSection: ABOUT_US_TEAM_SECTION,
    aboutTeam: ABOUT_US_TEAM,
    aboutAdvantagesSection: ABOUT_US_ADVANTAGES_SECTION,
    aboutAdvantages: ABOUT_US_ADVANTAGES,
    storytellScroll: ABOUT_US_STORYTELL_SCROLL,
    storytellSplit: ABOUT_US_STORYTELL_SPLIT,
    storytellMap: ABOUT_US_STORYTELL_MAP,
    aboutPhotos: ABOUT_US_NEW_PHOTOS,
};

/** Same shape in every language; list-like content keeps its exact (mutable) types. */
export type SiteContent = Omit<
    Widen<typeof UK>,
    | 'services'
    | 'directions'
    | 'cargoSections'
    | 'aboutValues'
    | 'aboutHistory'
    | 'aboutTeam'
    | 'aboutAdvantages'
    | 'aboutPhotos'
> & {
    services: ServiceContent[];
    directions: DirectionContent[];
    cargoSections: Record<string, ServiceCargoSection>;
    aboutValues: AboutUsValueItem[];
    aboutHistory: HistoryMilestone[];
    aboutTeam: AboutUsTeamMember[];
    aboutAdvantages: AboutUsAdvantageItem[];
    aboutPhotos: AboutUsNewPhoto[];
};

const EN: SiteContent = {
    homeHero: HOME_HERO_EN,
    services: SERVICES_EN,
    directions: DIRECTIONS_EN,
    termsDisclaimer: TERMS_DISCLAIMER_EN,
    cargoSections: SERVICE_CARGO_SECTIONS_EN,
    contactsHero: CONTACTS_HERO_EN,
    contactsPrimary: CONTACTS_PRIMARY_EN,
    contactsQuoteForm: CONTACTS_QUOTE_FORM_EN,
    contactsDetails: CONTACTS_DETAILS_SECTION_EN,
    contactsOffices: CONTACTS_OFFICES_SECTION_EN,
    contactsFaq: CONTACTS_FAQ_SECTION_EN,
    aboutValuesSection: ABOUT_US_VALUES_SECTION_EN,
    aboutValues: ABOUT_US_VALUES_EN,
    aboutHistorySection: ABOUT_US_HISTORY_SECTION_EN,
    aboutHistory: ABOUT_US_HISTORY_MILESTONES_EN,
    aboutTeamSection: ABOUT_US_TEAM_SECTION_EN,
    aboutTeam: ABOUT_US_TEAM_EN,
    aboutAdvantagesSection: ABOUT_US_ADVANTAGES_SECTION_EN,
    aboutAdvantages: ABOUT_US_ADVANTAGES_EN,
    storytellScroll: ABOUT_US_STORYTELL_SCROLL_EN,
    storytellSplit: ABOUT_US_STORYTELL_SPLIT_EN,
    storytellMap: ABOUT_US_STORYTELL_MAP_EN,
    aboutPhotos: ABOUT_US_NEW_PHOTOS.map((photo) => ({
        ...photo,
        alt: ABOUT_US_NEW_PHOTO_ALT_EN[photo.id] ?? photo.alt,
    })),
};

const CONTENT: Record<Lang, SiteContent> = { uk: UK as SiteContent, en: EN };

/** Content for a language — for server code (page metadata, JSON-LD). */
export function getContent(lang: Lang): SiteContent {
    return CONTENT[lang];
}
