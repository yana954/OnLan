import { Link } from '@/lib/router';
import Breadcrumbs from '@/components/elements/Breadcrumbs';
import { DIRECTIONS } from '@/content/directions';
import { SERVICES } from '@/content/services';
import type { BreadcrumbItem } from '@/lib/routes';
import { directionPath, servicePath } from '@/lib/routes';

type Props = {
    breadcrumbs: BreadcrumbItem[];
};

/**
 * `/services` — hub page for the seven service pages. Server-rendered: it adds
 * no client JavaScript and gives every service page a crawlable, descriptive
 * internal link from a single parent page.
 */
export default function ServicesPage({ breadcrumbs }: Props) {
    return (
        <>
            <section className="w-full bg-onlan-white py-10 md:py-14 lg:py-20">
                <div className="container mx-auto px-4">
                    <Breadcrumbs items={breadcrumbs} className="text-onlan-black" />

                    <div className="mt-6 flex w-full items-center justify-start gap-2">
                        <div className="size-2 shrink-0 rounded-full bg-onlan-lime" />
                        <div className="rounded-full border border-onlan-black px-3 py-1.5 md:px-4 md:py-2">
                            <p className="text-left text-xs font-semibold uppercase tracking-[0.14em] text-onlan-black md:text-sm">
                                Наші послуги
                            </p>
                        </div>
                    </div>

                    <h1 className="mt-4 max-w-4xl text-balance text-3xl font-bold leading-tight text-onlan-black md:mt-6 md:text-4xl lg:text-5xl">
                        Послуги міжнародної логістики
                    </h1>

                    <p className="mt-4 max-w-3xl text-base leading-relaxed text-onlan-black/85 md:mt-6 md:text-lg">
                        Автомобільні, морські, авіа- та залізничні перевезення, негабаритні вантажі,
                        митне оформлення й мультимодальні маршрути — оберіть напрямок, щоб побачити
                        умови, етапи роботи та типи вантажів.
                    </p>

                    <ul className="mt-10 grid list-none grid-cols-1 gap-5 md:mt-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                        {SERVICES.map((service) => (
                            <li key={service.slug} className="h-full">
                                <article className="flex h-full flex-col rounded-2xl border border-onlan-black/10 bg-onlan-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_12px_36px_rgba(25,30,70,0.16)] md:p-7">
                                    <div className="flex items-center gap-3">
                                        <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-onlan-lime text-xs font-bold text-onlan-blue">
                                            {service.number}
                                        </span>
                                        <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-onlan-blue/75 md:text-xs">
                                            {service.tagLabel}
                                        </span>
                                    </div>

                                    <h2 className="mt-4 text-xl font-semibold leading-snug text-onlan-black md:text-2xl">
                                        <Link
                                            to={servicePath(service.slug)}
                                            className="transition-colors hover:text-onlan-blue"
                                        >
                                            {service.title}
                                        </Link>
                                    </h2>

                                    <p className="mt-3 flex-1 text-sm leading-relaxed text-onlan-black/85 md:text-base">
                                        {service.description}
                                    </p>

                                    <Link
                                        to={servicePath(service.slug)}
                                        className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-onlan-blue underline-offset-4 hover:underline md:text-base"
                                    >
                                        Детальніше про {service.title.toLowerCase()}
                                        <span aria-hidden>→</span>
                                    </Link>
                                </article>
                            </li>
                        ))}
                    </ul>

                    <h2 className="mt-12 text-2xl font-bold text-onlan-black md:text-3xl">Напрямки доставки</h2>
                    <ul className="mt-5 flex list-none flex-wrap gap-3 p-0">
                        {DIRECTIONS.map((direction) => (
                            <li key={direction.slug}>
                                <Link
                                    to={directionPath(direction.slug)}
                                    className="inline-block rounded-full bg-onlan-lime px-5 py-2.5 text-sm font-semibold text-onlan-black no-underline hover:opacity-90 md:text-base"
                                >
                                    {direction.title}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <p className="mt-10 text-base text-onlan-black/85 md:mt-12 md:text-lg">
                        Не знайшли потрібний напрямок?{' '}
                        <Link
                            to="/contacts"
                            className="font-semibold text-onlan-blue underline underline-offset-4"
                        >
                            Напишіть нам
                        </Link>{' '}
                        — підберемо маршрут під ваш вантаж.
                    </p>
                </div>
            </section>
        </>
    );
}
