/**
 * Minimal fullscreen preloader: "Ви обрали" → OnLan logo → a short route with
 * a plane flying along it. Shown on the first visit of a session only; the
 * inlined init script (preloader-init.ts) decides when it leaves.
 * Overlay contract: `#site-preloader` + `.is-hidden`.
 */

import './preloader.css';

import onlanLogo from '@icons/Onlan.svg';
import { PreloaderRoute } from './PreloaderRoute';
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
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={onlanLogo}
                        alt="OnLan Logistic"
                        className="preloader__logo-img"
                        width={278}
                        height={126}
                    />
                    <PreloaderRoute />
                    <p className="preloader__tagline">Привеземо ваш товар будь-куди</p>
                </div>
            </div>

            <script dangerouslySetInnerHTML={{ __html: PRELOADER_INIT_SCRIPT }} />
        </>
    );
}
