'use client';

import { Link } from 'react-router';
import { SERVICES } from '@/content/services';
import { servicePath } from '@/lib/routes';

/**
 * User-facing 404. Kept useful (real navigation back into the site) while the
 * route itself stays `noindex` — see `src/app/not-found.tsx`.
 */
export default function NotFoundPage() {
    return (
        <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-24">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-onlan-blue">404</p>
            <h1 className="mt-3 text-3xl font-semibold text-onlan-black md:text-4xl xl:text-5xl">
                Сторінку не знайдено
            </h1>
            <p className="mt-4 max-w-xl text-balance text-base text-onlan-black/85 md:text-lg">
                Можливо, адресу введено з помилкою або сторінку було переміщено. Оберіть потрібний
                розділ нижче або зв’яжіться з нами — підкажемо.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link to="/" className="btn btn-primary">
                    На головну
                </Link>
                <Link to="/services" className="btn btn-outline">
                    Усі послуги
                </Link>
                <Link to="/contacts" className="btn btn-outline">
                    Контакти
                </Link>
            </div>

            <nav aria-label="Послуги" className="mt-10 w-full max-w-3xl">
                <h2 className="text-lg font-semibold text-onlan-black">Популярні напрямки</h2>
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
