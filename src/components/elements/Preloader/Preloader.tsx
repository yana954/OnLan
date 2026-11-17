/**
 * Minimal preloader: "Ви обрали" → a plane sweeps across the screen and
 * reveals the OnLan logo behind it. ~1.1s, first visit per session only
 * (see preloader-init.ts). Overlay contract: `#site-preloader` + `.is-hidden`.
 */

import './preloader.css';

import onlanLogo from '@icons/Onlan.svg';
import { PreloaderPlane } from './PreloaderPlane';
import { PRELOADER_INIT_SCRIPT } from './preloader-init';

export function Preloader() {
    return (
        <>
            <div
                id="site-preloader"
                className="preloader"
                role="status"
                aria-live="polite"
                aria-label="Завантаження"
            >
                <div className="preloader__stage">
                    <p className="preloader__eyebrow">Ви обрали</p>
                    <div className="preloader__reveal">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={onlanLogo}
                            alt="OnLan Logistic"
                            className="preloader__logo-img"
                            width={278}
                            height={126}
                        />
                        <PreloaderPlane />
                    </div>
                </div>
            </div>

            <script dangerouslySetInnerHTML={{ __html: PRELOADER_INIT_SCRIPT }} />
        </>
    );
}
