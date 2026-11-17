'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useLang, useT } from '@/components/app/LangProvider';
import { useContent } from '@/hooks/useContent';
import { stripLang, switchLangPath } from '@/lib/i18n';
import Button from '@elements/Button/Button';
import Icon from '@elements/Icon/Icon';
import menuIcon from '@/assets/icons/menu.svg';
import closeIcon from '@/assets/icons/close.svg';
import OnlanLogo from '@/assets/icons/Onlan.svg';
import { useViewportMode } from '@/hooks/useViewportMode';

const SCROLL_TOP_THRESHOLD = 56;
const SCROLL_DIRECTION_DELTA = 8;

const langLinkClass = 'min-w-11 rounded-md px-2 py-2 text-center text-sm text-onlan-black transition-colors';

/**
 * Language switch: real links to the same page in the other language, so it
 * works without JS and crawlers can follow it (hreflang counterpart).
 */
function LangSwitch() {
    const lang = useLang();
    const t = useT();
    const pathname = usePathname() ?? '/';
    const otherLang = lang === 'uk' ? 'en' : 'uk';
    const otherHref = switchLangPath(pathname, otherLang);
    const ukHref = switchLangPath(pathname, 'uk');
    const enHref = switchLangPath(pathname, 'en');

    return (
        <>
            {/* Tablet + narrow desktop: one label, click switches language */}
            <NextLink
                href={otherHref}
                hrefLang={otherLang}
                className={`${langLinkClass} font-semibold xl:hidden`}
                aria-label={t(
                    'Мова: UA. Перейти на англійську версію',
                    'Language: EN. Switch to the Ukrainian version',
                )}
            >
                {lang === 'uk' ? 'UA' : 'EN'}
            </NextLink>

            {/* Wide desktop: both options visible */}
            <div
                className="hidden items-center gap-2 xl:flex"
                role="group"
                aria-label={t('Мова сайту', 'Site language')}
            >
                <NextLink
                    href={ukHref}
                    hrefLang="uk"
                    className={`${langLinkClass} ${lang === 'uk' ? 'font-semibold' : 'font-medium'}`}
                    aria-current={lang === 'uk' ? 'true' : undefined}
                >
                    UA
                </NextLink>
                <NextLink
                    href={enHref}
                    hrefLang="en"
                    className={`${langLinkClass} ${lang === 'en' ? 'font-semibold' : 'font-medium'}`}
                    aria-current={lang === 'en' ? 'true' : undefined}
                >
                    EN
                </NextLink>
            </div>
        </>
    );
}

function ServicesDropdown({ onNavigate }: { onNavigate?: () => void }) {
    const t = useT();
    const { services } = useContent();
    const [isOpen, setIsOpen] = useState(false);
    const pathname = stripLang(usePathname() ?? '/');
    const wrapperRef = useRef<HTMLDivElement>(null);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const isOnServicesPage = pathname.startsWith('/services');

    useEffect(() => {
        if (!isOpen) return;
        const handleClickOutside = (e: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKey);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKey);
        };
    }, [isOpen]);

    const openWithDelay = () => {
        if (closeTimer.current) {
            clearTimeout(closeTimer.current);
            closeTimer.current = null;
        }
        setIsOpen(true);
    };

    const closeWithDelay = () => {
        if (closeTimer.current) {
            clearTimeout(closeTimer.current);
        }
        closeTimer.current = setTimeout(() => setIsOpen(false), 120);
    };

    return (
        <div
            ref={wrapperRef}
            className="relative shrink-0"
            onMouseEnter={openWithDelay}
            onMouseLeave={closeWithDelay}
            onFocus={openWithDelay}
            onBlur={closeWithDelay}
        >
            <button
                type="button"
                className={`flex shrink-0 items-center gap-1 whitespace-nowrap px-2 py-2 uppercase text-onlan-blue transition-all rounded-lg hover:text-onlan-black lg:px-3 ${
                    isOnServicesPage ? 'text-onlan-black' : ''
                }`}
                aria-haspopup="true"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {t('Послуги', 'Services')}
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden
                >
                    <path
                        d="M3 4.5l3 3 3-3"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            {isOpen && (
                <div
                    role="menu"
                    aria-label={t('Послуги', 'Services')}
                    className="absolute left-1/2 top-full z-50 mt-2.5 w-[min(92vw,420px)] -translate-x-1/2 rounded-2xl border border-onlan-black/8 bg-onlan-white/96 p-1.5 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.2)] backdrop-blur-md"
                >
                    <ul className="flex flex-col gap-0.5">
                        <li>
                            <Link
                                to="/services"
                                role="menuitem"
                                onClick={() => {
                                    setIsOpen(false);
                                    onNavigate?.();
                                }}
                                className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-onlan-blue transition-all hover:bg-onlan-lavender/35 ${
                                    pathname === '/services' ? 'bg-onlan-lavender/35' : ''
                                }`}
                            >
                                {t('Усі послуги', 'All services')}
                                <span aria-hidden>→</span>
                            </Link>
                        </li>
                        {services.map((service) => {
                            const href = `/services/${service.slug}`;
                            const isActive = pathname === href;
                            return (
                                <li key={service.slug}>
                                    <Link
                                        to={href}
                                        role="menuitem"
                                        onClick={() => {
                                            setIsOpen(false);
                                            onNavigate?.();
                                        }}
                                        className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all hover:bg-onlan-lavender/35 ${
                                            isActive ? 'bg-onlan-lavender/35' : ''
                                        }`}
                                    >
                                        <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-onlan-lime text-[11px] font-bold text-onlan-blue">
                                            {service.number}
                                        </span>
                                        <span className="min-w-0 flex-1">
                                            <span className="block truncate text-sm font-semibold text-onlan-black">
                                                {service.title}
                                            </span>
                                            <span className="mt-0.5 block truncate text-[11px] font-medium uppercase tracking-[0.12em] text-onlan-blue/75">
                                                {service.tagLabel}
                                            </span>
                                        </span>
                                        <span
                                            aria-hidden
                                            className="text-sm text-onlan-blue/45 transition-transform group-hover:translate-x-0.5"
                                        >
                                            →
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}

function MobileServicesGroup({ onClose }: { onClose: () => void }) {
    const t = useT();
    const { services } = useContent();
    const [isOpen, setIsOpen] = useState(false);
    const pathname = stripLang(usePathname() ?? '/');

    return (
        <div className="flex w-full flex-col items-center">
            <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg uppercase transition-all hover:bg-onlan-white hover:text-onlan-blue"
            >
                {t('Послуги', 'Services')}
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden
                >
                    <path
                        d="M3 4.5l3 3 3-3"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
            {isOpen && (
                <ul className="mt-2 flex w-full max-w-sm flex-col gap-0.5 rounded-2xl border border-onlan-black/8 bg-onlan-white/96 p-1.5 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.18)] backdrop-blur-md">
                    <li>
                        <Link
                            to="/services"
                            onClick={onClose}
                            className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-onlan-blue transition-all hover:bg-onlan-lavender/35 ${
                                pathname === '/services' ? 'bg-onlan-lavender/35' : ''
                            }`}
                        >
                            {t('Усі послуги', 'All services')}
                            <span aria-hidden>→</span>
                        </Link>
                    </li>
                    {services.map((service) => {
                        const href = `/services/${service.slug}`;
                        const isActive = pathname === href;

                        return (
                            <li key={service.slug}>
                                <Link
                                    to={href}
                                    onClick={onClose}
                                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all hover:bg-onlan-lavender/35 ${
                                        isActive ? 'bg-onlan-lavender/35' : ''
                                    }`}
                                >
                                    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-onlan-lime text-[11px] font-bold text-onlan-blue">
                                        {service.number}
                                    </span>
                                    <span className="min-w-0 flex-1 text-left">
                                        <span className="block truncate text-sm font-semibold text-onlan-black">
                                            {service.title}
                                        </span>
                                        <span className="mt-0.5 block truncate text-[11px] font-medium uppercase tracking-[0.12em] text-onlan-blue/75">
                                            {service.tagLabel}
                                        </span>
                                    </span>
                                    <span aria-hidden className="text-sm text-onlan-blue/45">
                                        →
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

export function Header() {
    const t = useT();
    const viewportMode = useViewportMode();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [headerBarVisible, setHeaderBarVisible] = useState(true);
    const [spacerHeight, setSpacerHeight] = useState(96);
    const navigate = useNavigate();
    const headerRef = useRef<HTMLElement>(null);
    const lastScrollY = useRef(0);
    const prefersReducedMotion = useRef(false);

    useLayoutEffect(() => {
        try {
            prefersReducedMotion.current =
                window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
        } catch {
            prefersReducedMotion.current = false;
        }
        lastScrollY.current = typeof window !== 'undefined' ? window.scrollY : 0;
    }, []);

    useLayoutEffect(() => {
        const el = headerRef.current;
        if (!el) {
            return;
        }
        const syncHeight = () => {
            setSpacerHeight(el.offsetHeight);
        };
        syncHeight();
        const ro = new ResizeObserver(syncHeight);
        ro.observe(el);
        return () => ro.disconnect();
    }, [isMenuOpen]);

    useEffect(() => {
        if (viewportMode !== 'mobile' && isMenuOpen) {
            setIsMenuOpen(false);
        }
    }, [viewportMode, isMenuOpen]);

    useEffect(() => {
        if (prefersReducedMotion.current || isMenuOpen) {
            setHeaderBarVisible(true);
            return;
        }

        lastScrollY.current = window.scrollY;

        const onScroll = () => {
            const y = window.scrollY;
            const delta = y - lastScrollY.current;
            lastScrollY.current = y;

            if (y < SCROLL_TOP_THRESHOLD) {
                setHeaderBarVisible(true);
                return;
            }
            if (delta > SCROLL_DIRECTION_DELTA) {
                setHeaderBarVisible(false);
            } else if (delta < -SCROLL_DIRECTION_DELTA) {
                setHeaderBarVisible(true);
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleCompanyTabNavigation = (tab: string) => {
        if (tab === 'overview') {
            navigate('/company/overview');
        } else if (tab === 'founders') {
            navigate('/company/founders');
        } else if (tab === 'advisory-board') {
            navigate('/company/advisors');
        } else if (tab === 'press') {
            navigate('/company/press-pr-media-kit');
        }
    };

    void handleCompanyTabNavigation;

    const headerHidden = !headerBarVisible && !isMenuOpen;

    return (
        <>
            {/* Preserves layout height while the bar is `fixed` */}
            <div
                className="w-full shrink-0"
                style={{ height: spacerHeight }}
                aria-hidden
            />
            <header
                ref={headerRef}
                className={`fixed inset-x-0 top-0 z-50 bg-onlan-white shadow-sm transition-transform duration-300 ease-out motion-reduce:transform-none ${
                    headerHidden ? '-translate-y-full pointer-events-none' : 'translate-y-0'
                }`}
            >
            <div className="container mx-auto px-4 py-4 md:py-5 lg:py-6">
                {/* Mobile: logo + burger */}
                <div className="flex items-center justify-between md:hidden">
                    <Link
                        to="/"
                        className="shrink-0 text-xl font-bold"
                        aria-label={t('OnLan Logistic — на головну', 'OnLan Logistic — home')}
                        onClick={closeMenu}
                    >
                        <Icon src={OnlanLogo} className="h-10 w-10" />
                    </Link>
                    <button
                        onClick={toggleMenu}
                        className="shrink-0 p-2 text-onlan-blue transition-colors border border-onlan-lavender rounded-lg hover:text-blue-600"
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                    >
                        <Icon src={isMenuOpen ? closeIcon : menuIcon} className="size-6" />
                    </button>
                </div>

                {/* Tablet + desktop: equal side columns keep center nav from overlapping logo/CTA */}
                <div className="hidden md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center md:gap-x-4 lg:gap-x-8">
                    <div className="flex min-w-0 items-center justify-start">
                        <Link
                            to="/"
                            className="shrink-0 text-xl font-bold"
                            aria-label={t('OnLan Logistic — на головну', 'OnLan Logistic — home')}
                            onClick={closeMenu}
                        >
                            <Icon
                                src={OnlanLogo}
                                className="h-10 w-10 lg:h-12 lg:w-12"
                            />
                        </Link>
                    </div>

                    <nav
                        className="flex shrink-0 items-center justify-center gap-3 px-2 text-sm uppercase lg:gap-5 lg:px-4 lg:text-base"
                        aria-label={t('Основна навігація', 'Main navigation')}
                    >
                        <Link
                            to="/"
                            className="whitespace-nowrap px-1 py-2 text-onlan-blue transition-all rounded-lg hover:text-onlan-black lg:px-2"
                        >
                            {t('Головна', 'Home')}
                        </Link>
                        <Link
                            to="/about-us"
                            className="whitespace-nowrap px-1 py-2 text-onlan-blue transition-all rounded-lg hover:text-onlan-black lg:px-2"
                        >
                            {t('Про Нас', 'About us')}
                        </Link>
                        <ServicesDropdown />
                            <Link
                                to="/contacts"
                                className="whitespace-nowrap px-1 py-2 text-onlan-blue transition-all rounded-lg hover:text-onlan-black lg:px-2"
                            >
                                {t('Контакти', 'Contacts')}
                            </Link>
                    </nav>

                    <div className="flex min-w-0 items-center justify-end gap-2 lg:gap-3">
                        <Link to="/contacts" className="shrink-0">
                            <Button
                                variant="primary"
                                type="button"
                                size={viewportMode === 'tablet' ? 'sm' : 'md'}
                                className="whitespace-nowrap"
                            >
                                {viewportMode === 'desktop'
                                    ? t('Зв\'язатись з нами', 'Get in touch')
                                    : t('Зв\'язок', 'Contact')}
                            </Button>
                        </Link>
                        <div className="shrink-0">
                            <LangSwitch />
                        </div>
                    </div>
                </div>

                {/* Mobile: collapsible menu */}
                {isMenuOpen && (
                    <nav className="relative mt-4 pb-5 md:hidden" aria-label={t('Основна навігація', 'Main navigation')}>
                        <div className="flex flex-col gap-4 pt-4 mt-[10px] items-center">
                            <Link
                                to="/"
                                className="px-3 py-2 rounded-lg uppercase transition-all hover:bg-onlan-white hover:text-onlan-blue text-center"
                                onClick={closeMenu}
                            >
                                {t('Головна', 'Home')}
                            </Link>

                            <Link
                                to="/about-us"
                                className="px-3 py-2 rounded-lg uppercase transition-all hover:bg-onlan-white hover:text-onlan-blue text-center"
                                onClick={closeMenu}
                            >
                                {t('Про Нас', 'About us')}
                            </Link>

                            <MobileServicesGroup onClose={closeMenu} />

                            <Link
                                to="/contacts"
                                className="px-3 py-2 rounded-lg uppercase transition-all hover:bg-onlan-white hover:text-onlan-blue text-center"
                                onClick={closeMenu}
                            >
                                {t('Контакти', 'Contacts')}
                            </Link>

                            <div className="flex w-full flex-row items-stretch gap-3 pt-2">
                                <Link to="/contacts" onClick={closeMenu} className="min-w-0 flex-1">
                                    <Button
                                        variant="primary"
                                        type="button"
                                        size="md"
                                        className="w-full"
                                    >
                                        {t('Зв\'язатись з нами', 'Get in touch')}
                                    </Button>
                                </Link>
                                <div className="flex items-center">
                                    <LangSwitch />
                                </div>
                            </div>
                        </div>
                    </nav>
                )}
            </div>
        </header>
        </>
    );
}
