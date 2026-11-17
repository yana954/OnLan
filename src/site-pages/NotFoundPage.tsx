'use client';

import { Link } from 'react-router';
import { useContent } from '@/hooks/useContent';
import { useT } from '@/components/app/LangProvider';
import { servicePath } from '@/lib/routes';

/**
 * User-facing 404. Kept useful (real navigation back into the site) while the
 * route itself stays `noindex` — see `src/app/not-found.tsx`.
 */
export default function NotFoundPage() {
    const t = useT();
    const { services: SERVICES } = useContent();
    return (
        <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-24">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-onlan-blue">404</p>
            <h1 className="mt-3 text-3xl font-semibold text-onlan-black md:text-4xl xl:text-5xl">
                {t('Сторінку не знайдено', 'Page not found')}
            </h1>
            <p className="mt-4 max-w-xl text-balance text-base text-onlan-black/85 md:text-lg">
                {t(
                    'Можливо, адресу введено з помилкою або сторінку було переміщено. Оберіть потрібний розділ нижче або зв’яжіться з нами — підкажемо.',
                    'The address may be mistyped or the page may have been moved. Pick a section below or contact us — we’ll help.',
                )}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link to="/" className="btn btn-primary">
                    {t('На головну', 'Home')}
                </Link>
                <Link to="/services" className="btn btn-outline">
                    {t('Усі послуги', 'All services')}
                </Link>
                <Link to="/contacts" className="btn btn-outline">
                    {t('Контакти', 'Contacts')}
                </Link>
            </div>

            <nav aria-label={t('Послуги', 'Services')} className="mt-10 w-full max-w-3xl">
                <h2 className="text-lg font-semibold text-onlan-black">{t('Популярні напрямки', 'Popular services')}</h2>
                <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm md:text-base">
                    {SERVICES.map((service) => (
                        <li key={service.slug}>
                            <Link
                                to={servicePath(service.slug)}
                                className="text-onlan-blue underline-offset-4 hover:underline"
                            >
                                {service.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
