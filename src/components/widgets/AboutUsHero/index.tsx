'use client';

import TruckIcon from '@/assets/icons/Truck.svg';
import PlaneIcon from '@/assets/icons/Plane.svg';
import ShipIcon from '@/assets/icons/Ship.svg';
import ButtonArrowRightIcon from '@/assets/icons/ButtonArrow.svg';
import heroPhoto from '@/assets/images/AboutUsHero.webp';
import Image from 'next/image';
import { Elements } from '@/components/elements';
import Description from '@/components/elements/Description';
import { useT } from '@/components/app/LangProvider';
import { Link } from '@/lib/router';

const ICON_CIRCLE = 'flex size-14 shrink-0 items-center justify-center rounded-full md:size-[78px]';

/**
 * The hero headline is laid out as four lines, but it is a single sentence and
 * therefore a single `h1`: «ONLAN Logistic — надійний логістичний партнер для
 * бізнесу». The line wrappers are inline elements so the markup stays valid.
 */
const HEADLINE_LINE = 'font-semibold leading-tight text-4xl md:text-5xl lg:text-[56px]';

export const AboutUsHero = () => {
    const t = useT();

    return (
        <section className="relative w-full overflow-x-hidden bg-onlan-white/90 py-10 md:min-h-[calc(100dvh-5rem)] md:py-16 lg:py-20">
            <div className="relative z-10 container mx-auto flex flex-col items-center justify-center gap-10 px-4 md:gap-16 lg:gap-20">
                <div className="flex w-full max-w-[1200px] flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
                    <div className="flex w-full max-w-[700px] flex-col items-center lg:items-start">
                        <h1 className="m-0 flex w-full flex-col">
                            <span className="flex flex-wrap items-center justify-center gap-2 sm:justify-end lg:justify-end">
                                <span className="flex items-center justify-center">
                                    <span className={`${ICON_CIRCLE} -mr-4 md:-mr-[30px] bg-[#EAEAEA]`}>
                                        <Image src={PlaneIcon} alt="" width={38} height={38} className="size-7 md:size-[38px]" aria-hidden />
                                    </span>
                                    <span className={`${ICON_CIRCLE} bg-onlan-blue`}>
                                        <Image src={TruckIcon} alt="" width={38} height={38} className="size-7 md:size-[38px]" aria-hidden />
                                    </span>
                                </span>

                                <span
                                    className={`${HEADLINE_LINE} text-balance text-center uppercase font-bold! text-onlan-black sm:text-left lg:text-left`}
                                >
                                    ONLAN Logistic
                                </span>
                            </span>

                            <span className="mt-1 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                                <span
                                    className={`${HEADLINE_LINE} text-balance uppercase font-bold! tracking-tight text-onlan-black`}
                                >
                                    {t('— надійний', '— a reliable')}
                                </span>
                                <span className={`${ICON_CIRCLE} bg-onlan-lime`}>
                                    <Image src={ShipIcon} alt="" width={38} height={38} className="size-7 md:size-[38px]" aria-hidden />
                                </span>
                            </span>

                            <span className="mt-1 flex min-w-0 items-center justify-center sm:justify-start">
                                <span className={`${HEADLINE_LINE} text-balance uppercase font-bold! text-onlan-black`}>
                                    {t('логістичний партнер', 'logistics partner')}
                                </span>
                            </span>
                            <span className="mt-1 flex items-center justify-center sm:justify-end">
                                <span className={`${HEADLINE_LINE} text-balance uppercase font-bold! text-onlan-blue`}>
                                    {t('для бізнесу', 'for business')}
                                </span>
                            </span>
                        </h1>
                    </div>

                    <Image
                        src={heroPhoto}
                        alt={t('Вантажівка OnLan на міжнародному маршруті — нічний перевіз вантажу', 'OnLan truck on an international route — night cargo transport')}
                        width={400}
                        height={300}
                        className="order-first h-[220px] w-full max-w-full rounded-2xl border border-onlan-black/10 object-cover object-center shadow-[0_20px_50px_rgba(0,0,0,0.12)] sm:h-[260px] lg:order-0 lg:h-[300px] lg:max-w-[400px]"
                        sizes="(max-width: 1024px) 100vw, 400px"
                        priority
                    />
                </div>

                <div className="flex flex-col items-center justify-center gap-5 text-center">
                    <Description
                        description={t('10+ років досвіду в контейнерних, мультимодальних та авіаперевезеннях', '10+ years of experience in container, multimodal and air freight')}
                        type="medium"
                    />

                    <Link to="/contacts" className="flex items-center justify-center gap-1">
                        <Elements.Button variant="lime" size="xl">
                            <span className="text-base font-semibold uppercase md:text-lg lg:text-[19px]">
                                {t('Дізнатися більше про нас', 'Learn more about us')}
                            </span>
                        </Elements.Button>
                        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-onlan-lime md:size-[60px]">
                            <Image src={ButtonArrowRightIcon} alt="" width={24} height={24} aria-hidden />
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
};
