'use client';

import { Link } from 'react-router';
import { HOME_HERO } from '@/content/homeHero';

const FAR = 'url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%221200%22%20height%3D%22120%22%20viewBox%3D%220%200%201200%20120%22%3E%3Crect%20x%3D%220%22%20y%3D%2260%22%20width%3D%2240%22%20height%3D%2260%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.10%22/%3E%3Crect%20x%3D%2248%22%20y%3D%2235%22%20width%3D%2257%22%20height%3D%2285%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.10%22/%3E%3Crect%20x%3D%22118%22%20y%3D%2270%22%20width%3D%2244%22%20height%3D%2250%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.10%22/%3E%3Crect%20x%3D%22180%22%20y%3D%2225%22%20width%3D%2261%22%20height%3D%2295%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.10%22/%3E%3Crect%20x%3D%22250%22%20y%3D%2250%22%20width%3D%2248%22%20height%3D%2270%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.10%22/%3E%3Crect%20x%3D%22312%22%20y%3D%2265%22%20width%3D%2265%22%20height%3D%2255%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.10%22/%3E%3Crect%20x%3D%22396%22%20y%3D%2230%22%20width%3D%2252%22%20height%3D%2290%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.10%22/%3E%3Crect%20x%3D%22458%22%20y%3D%2255%22%20width%3D%2269%22%20height%3D%2265%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.10%22/%3E%3Crect%20x%3D%22542%22%20y%3D%2240%22%20width%3D%2256%22%20height%3D%2280%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.10%22/%3E%3Crect%20x%3D%22618%22%20y%3D%2275%22%20width%3D%2243%22%20height%3D%2245%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.10%22/%3E%3Crect%20x%3D%22672%22%20y%3D%2245%22%20width%3D%2260%22%20height%3D%2275%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.10%22/%3E%3Crect%20x%3D%22748%22%20y%3D%2220%22%20width%3D%2247%22%20height%3D%22100%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.10%22/%3E%3Crect%20x%3D%22816%22%20y%3D%2260%22%20width%3D%2264%22%20height%3D%2260%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.10%22/%3E%3Crect%20x%3D%22892%22%20y%3D%2250%22%20width%3D%2251%22%20height%3D%2270%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.10%22/%3E%3Crect%20x%3D%22960%22%20y%3D%2232%22%20width%3D%2268%22%20height%3D%2288%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.10%22/%3E%3Crect%20x%3D%221036%22%20y%3D%2268%22%20width%3D%2255%22%20height%3D%2252%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.10%22/%3E%3Crect%20x%3D%221104%22%20y%3D%2254%22%20width%3D%2242%22%20height%3D%2266%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.10%22/%3E%3Crect%20x%3D%221164%22%20y%3D%2228%22%20width%3D%2259%22%20height%3D%2292%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.10%22/%3E%3Crect%20x%3D%221232%22%20y%3D%2262%22%20width%3D%2246%22%20height%3D%2258%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.10%22/%3E%3Crect%20x%3D%221292%22%20y%3D%2242%22%20width%3D%2263%22%20height%3D%2278%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.10%22/%3E%3Crect%20x%3D%221374%22%20y%3D%2272%22%20width%3D%2250%22%20height%3D%2248%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.10%22/%3E%3Crect%20x%3D%221434%22%20y%3D%2236%22%20width%3D%2267%22%20height%3D%2284%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.10%22/%3E%3Crect%20x%3D%221516%22%20y%3D%2258%22%20width%3D%2254%22%20height%3D%2262%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.10%22/%3E%3Crect%20x%3D%221590%22%20y%3D%2224%22%20width%3D%2241%22%20height%3D%2296%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.10%22/%3E%3Crect%20x%3D%221642%22%20y%3D%2266%22%20width%3D%2258%22%20height%3D%2254%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.10%22/%3E%3C/svg%3E")';
const NEAR = 'url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%221200%22%20height%3D%22120%22%20viewBox%3D%220%200%201200%20120%22%3E%3Crect%20x%3D%220%22%20y%3D%2285%22%20width%3D%2240%22%20height%3D%2235%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.18%22/%3E%3Crect%20x%3D%2248%22%20y%3D%2265%22%20width%3D%2257%22%20height%3D%2255%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.18%22/%3E%3Crect%20x%3D%22118%22%20y%3D%2292%22%20width%3D%2244%22%20height%3D%2228%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.18%22/%3E%3Crect%20x%3D%22180%22%20y%3D%2272%22%20width%3D%2261%22%20height%3D%2248%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.18%22/%3E%3Crect%20x%3D%22250%22%20y%3D%2258%22%20width%3D%2248%22%20height%3D%2262%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.18%22/%3E%3Crect%20x%3D%22312%22%20y%3D%2290%22%20width%3D%2265%22%20height%3D%2230%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.18%22/%3E%3Crect%20x%3D%22396%22%20y%3D%2270%22%20width%3D%2252%22%20height%3D%2250%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.18%22/%3E%3Crect%20x%3D%22458%22%20y%3D%2280%22%20width%3D%2269%22%20height%3D%2240%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.18%22/%3E%3Crect%20x%3D%22542%22%20y%3D%2262%22%20width%3D%2256%22%20height%3D%2258%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.18%22/%3E%3Crect%20x%3D%22618%22%20y%3D%2288%22%20width%3D%2243%22%20height%3D%2232%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.18%22/%3E%3Crect%20x%3D%22672%22%20y%3D%2275%22%20width%3D%2260%22%20height%3D%2245%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.18%22/%3E%3Crect%20x%3D%22748%22%20y%3D%2254%22%20width%3D%2247%22%20height%3D%2266%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.18%22/%3E%3Crect%20x%3D%22816%22%20y%3D%2284%22%20width%3D%2264%22%20height%3D%2236%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.18%22/%3E%3Crect%20x%3D%22892%22%20y%3D%2268%22%20width%3D%2251%22%20height%3D%2252%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.18%22/%3E%3Crect%20x%3D%22960%22%20y%3D%2278%22%20width%3D%2268%22%20height%3D%2242%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.18%22/%3E%3Crect%20x%3D%221036%22%20y%3D%2260%22%20width%3D%2255%22%20height%3D%2260%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.18%22/%3E%3Crect%20x%3D%221104%22%20y%3D%2290%22%20width%3D%2242%22%20height%3D%2230%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.18%22/%3E%3Crect%20x%3D%221164%22%20y%3D%2266%22%20width%3D%2259%22%20height%3D%2254%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.18%22/%3E%3Crect%20x%3D%221232%22%20y%3D%2274%22%20width%3D%2246%22%20height%3D%2246%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.18%22/%3E%3Crect%20x%3D%221292%22%20y%3D%2282%22%20width%3D%2263%22%20height%3D%2238%22%20fill%3D%22%23cfd2f4%22%20fill-opacity%3D%220.18%22/%3E%3C/svg%3E")';

/** Фура в кольорах бренду; колеса крутяться, кузов злегка підстрибує. */
const Truck = () => (
    <svg viewBox="0 0 260 110" className="truck-bob h-auto w-[190px] md:w-[400px]" role="img" aria-label={HOME_HERO.modes[0].alt}>
        <rect x="4" y="14" width="168" height="62" rx="6" fill="#ffffff" />
        <rect x="4" y="60" width="168" height="8" fill="#cfd2f4" />
        <text x="88" y="46" textAnchor="middle" fontSize="20" fontWeight="800" fill="#2c358c">OnLan</text>
        <path d="M176 30h42l22 26v20h-64z" fill="#d5e82d" />
        <path d="M200 36h14l14 18h-28z" fill="#2c358c" fillOpacity="0.85" />
        <rect x="4" y="76" width="236" height="8" rx="3" fill="#2c358c" />
        {[48, 78, 124, 200].map((cx) => (
            <g key={cx}>
                <circle cx={cx} cy="88" r="15" fill="#1a1a1a" />
                <g className="wheel-spin">
                    <circle cx={cx} cy="88" r="7" fill="#cfd2f4" />
                    <rect x={cx - 1.5} y="82" width="3" height="12" fill="#2c358c" />
                </g>
            </g>
        ))}
        <circle cx="238" cy="68" r="3" fill="#d5e82d" />
    </svg>
);

/** Варіант D: синій hero з анімованою «їзденою» — світ їде повз нерухому фуру. */
export const HomeHeroVariantD = () => {
    const headingId = 'home-hero-heading-d';

    return (
        <section className="relative flex w-full flex-col overflow-hidden bg-onlan-blue min-[1200px]:min-h-[calc(100dvh-96px)]" aria-labelledby={headingId}>
            <div className="container relative z-2 mx-auto px-4 pt-12 md:pt-16 min-[1200px]:pt-14">
                <div className="max-w-3xl">
                    <h1
                        id={headingId}
                        style={{ ['--d' as string]: '100ms' }}
                        className="hero-rise mb-5 text-[clamp(2.25rem,4.6vw,3.75rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-onlan-white"
                    >
                        {HOME_HERO.titleLines[0]} {HOME_HERO.titleLines[1]}
                        <br />
                        <span className="text-onlan-lime">{HOME_HERO.titleHighlight}</span>
                    </h1>
                    <p
                        style={{ ['--d' as string]: '250ms' }}
                        className="hero-rise mb-8 max-w-[600px] text-base font-medium leading-snug text-onlan-lavender md:text-lg"
                    >
                        {HOME_HERO.description}
                    </p>
                    <div style={{ ['--d' as string]: '400ms' }} className="hero-rise flex flex-col gap-3 sm:flex-row">
                        <Link to="/#contact" className="btn btn-lime btn-lg no-underline max-sm:w-full sm:btn-xl">
                            {HOME_HERO.cta}
                            <span aria-hidden>→</span>
                        </Link>
                        <Link
                            to="/services"
                            className="btn btn-lg border border-onlan-white bg-transparent text-onlan-white no-underline hover:bg-onlan-white/10 max-sm:w-full sm:btn-xl"
                        >
                            {HOME_HERO.secondaryCta}
                        </Link>
                    </div>
                </div>
            </div>

            <div className="relative mt-auto h-[200px] pt-8 md:h-[300px]" aria-hidden>
                <div className="scene-far absolute inset-x-0 bottom-[56px] h-[120px] bg-repeat-x md:bottom-[64px]" style={{ backgroundImage: FAR }} />
                <div className="scene-near absolute inset-x-0 bottom-[56px] h-[120px] bg-repeat-x md:bottom-[64px]" style={{ backgroundImage: NEAR }} />
                <div className="absolute inset-x-0 bottom-0 h-[56px] bg-onlan-black/45 md:h-[64px]">
                    <div
                        className="scene-road absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2"
                        style={{ backgroundImage: 'repeating-linear-gradient(90deg, #d5e82d 0 60px, transparent 60px 120px)' }}
                    />
                </div>
                <div className="hero-rise absolute bottom-[36px] left-[6%] z-1 md:bottom-[40px] min-[1200px]:left-[48%]" style={{ ['--d' as string]: '700ms' }}>
                    <Truck />
                </div>
            </div>
        </section>
    );
};
