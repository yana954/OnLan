'use client';

import { Link } from 'react-router';
import { FaEnvelope, FaInstagram, FaLinkedinIn, FaPhone } from 'react-icons/fa6';
import footerBackground from '@/assets/images/FooterBackground.webp';
import { useT } from '@/components/app/LangProvider';
import { useContent } from '@/hooks/useContent';
import Description from '@/components/elements/Description';
import { LogoFooter } from '@/assets/icons/LogoFooter';

/** Оновіть на реальні профілі компанії */
const SOCIAL_HREF = {
    instagram: 'https://www.instagram.com/',
    linkedin: 'https://www.linkedin.com/',
} as const;

const CONTACT = {
    email: 'maryna_onopenko@onlan.com.ua',
    phoneDisplay: '+380 98 659 16 71',
    phoneTel: '+380986591671',
} as const;

const socialIconClass =
    'inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-onlan-lime text-onlan-blue transition-colors hover:bg-onlan-lime-dark hover:text-onlan-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-onlan-white';

const linkClass =
    'text-onlan-white transition-colors hover:text-onlan-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-onlan-lime';

const sectionTitleClass =
    'text-lg font-semibold text-onlan-white md:text-xl';

const sectionLinksClass =
    'mt-4 flex flex-col gap-3 text-sm font-normal md:text-base';

export const Footer = () => {
    const t = useT();
    const { services, directions } = useContent();
    const location = t('Літин, Вінницька область, Україна', 'Lytyn, Vinnytsia Oblast, Ukraine');
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative mt-auto w-full overflow-hidden">
            <div className="pointer-events-none absolute inset-0" aria-hidden>
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${footerBackground})` }}
                />
                <div className="absolute inset-0 bg-onlan-blue/82" />
                <div className="absolute inset-0 bg-gradient-to-t from-onlan-black/35 to-transparent" />
            </div>

            <div className="relative z-10 container mx-auto w-full px-4 py-10 md:py-14 lg:py-20">
                {/* Mobile: stacked · Tablet: brand + 2-col links · Desktop: row + 3-col links */}
                <div className="flex min-w-0 flex-col gap-10 md:gap-12 lg:flex-row lg:items-start lg:gap-8 xl:gap-10">
                    <div className="max-w-md shrink-0 md:max-w-none lg:max-w-md">
                        <Link
                            to="/"
                            className="group block w-full max-w-[min(100%,520px)] md:max-w-[420px] lg:max-w-[min(100%,520px)]"
                            onClick={() =>
                                window.scrollTo({
                                    top: 0,
                                    left: 0,
                                    behavior: 'smooth',
                                })
                            }
                        >
                            <span className="sr-only">{t('ONLAN — на головну', 'ONLAN — home')}</span>
                            <div className="[&_path]:fill-onlan-white [&_path]:transition-colors group-hover:[&_path]:fill-onlan-lime">
                                <LogoFooter className="h-auto w-full" />
                            </div>
                        </Link>
                        <Description
                            description={t(
                                'Міжнародна логістика для бізнесу. Доставка вантажів по всьому світу, митне оформлення, страхування та супровід 24/7.',
                                'International logistics for business. Worldwide cargo delivery, customs clearance, insurance and 24/7 support.',
                            )}
                            type="small"
                            className="mt-5 w-full max-w-full text-onlan-white/90 md:mt-6"
                        />

                        <div className="mt-4 flex items-center gap-4 md:mt-5">
                            <a
                                href={SOCIAL_HREF.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={socialIconClass}
                                aria-label={t('ONLAN в Instagram', 'ONLAN on Instagram')}
                            >
                                <FaInstagram className="size-4.5" aria-hidden />
                            </a>
                            <a
                                href={SOCIAL_HREF.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={socialIconClass}
                                aria-label={t('ONLAN у LinkedIn', 'ONLAN on LinkedIn')}
                            >
                                <FaLinkedinIn className="size-4.5" aria-hidden />
                            </a>
                        </div>
                    </div>

                    <div className="grid min-w-0 flex-1 grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3 lg:gap-6 lg:pl-10 xl:gap-8">
                        <nav aria-labelledby="footer-nav-heading">
                            <h3 id="footer-nav-heading" className={sectionTitleClass}>
                                {t('Навігація', 'Navigation')}
                            </h3>
                            <div className={sectionLinksClass}>
                                <Link to="/" className={linkClass}>
                                    {t('Головна', 'Home')}
                                </Link>
                                <Link to="/about-us" className={linkClass}>
                                    {t('Про нас', 'About us')}
                                </Link>
                                <Link to="/services" className={linkClass}>
                                    {t('Послуги', 'Services')}
                                </Link>
                                <Link to="/contacts" className={linkClass}>
                                    {t('Контакти', 'Contacts')}
                                </Link>
                            </div>
                        </nav>

                        <nav aria-labelledby="footer-services-heading">
                            <h3 id="footer-services-heading" className={sectionTitleClass}>
                                {t('Напрямки перевезень', 'Shipping services and routes')}
                            </h3>
                            <div className={sectionLinksClass}>
                                {services.map((service) => (
                                    <Link
                                        key={service.slug}
                                        to={`/services/${service.slug}`}
                                        className={linkClass}
                                    >
                                        {service.title}
                                    </Link>
                                ))}
                                {directions.map((direction) => (
                                    <Link
                                        key={direction.slug}
                                        to={`/directions/${direction.slug}`}
                                        className={linkClass}
                                    >
                                        {direction.title}
                                    </Link>
                                ))}
                            </div>
                        </nav>

                        <address className="not-italic min-w-0 max-w-full md:col-span-2 lg:col-span-1">
                            <h3 className={sectionTitleClass}>{t('Контакти', 'Contacts')}</h3>
                            <div
                                className={`${sectionLinksClass} not-italic text-onlan-white/90`}
                            >
                                <p className="min-w-0 wrap-break-word">{location}</p>
                                <a
                                    href={`mailto:${CONTACT.email}`}
                                    className={`${linkClass} flex min-w-0 max-w-full items-center gap-2 overflow-x-auto`}
                                    title={CONTACT.email}
                                >
                                    <FaEnvelope
                                        className="size-4 shrink-0 text-onlan-lime"
                                        aria-hidden
                                    />
                                    <span className="min-w-0 break-all sm:break-normal">{CONTACT.email}</span>
                                </a>
                                <a
                                    href={`tel:${CONTACT.phoneTel}`}
                                    className={`${linkClass} flex min-w-0 max-w-full items-start gap-2`}
                                >
                                    <FaPhone
                                        className="mt-0.5 size-4 shrink-0 text-onlan-lime"
                                        aria-hidden
                                    />
                                    <span className="min-w-0 wrap-break-word">
                                        {CONTACT.phoneDisplay}
                                    </span>
                                </a>
                            </div>
                        </address>
                    </div>
                </div>

                <div className="mt-8 h-px w-full bg-white/20 md:mt-10 lg:mt-12" />

                <div className="mt-6 flex flex-col gap-4 text-sm leading-snug text-white/70 md:mt-8 md:flex-row md:items-center md:justify-between md:text-base lg:mt-10">
                    <p className="text-center md:text-left">
                        © {currentYear} ONLAN. {t('Усі права захищені.', 'All rights reserved.')}
                    </p>
                    <div className="flex items-center justify-center gap-6 md:justify-end">
                        <Link to="/services" className={`${linkClass} text-center text-sm md:text-base`}>
                            {t('Послуги', 'Services')}
                        </Link>
                        <Link to="/contacts" className={`${linkClass} text-center text-sm md:text-base`}>
                            {t('Контакти', 'Contacts')}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
