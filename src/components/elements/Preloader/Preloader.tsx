/**
 * Fullscreen logistics preloader — dotted world map, dotted route with a plane
 * flying along the arc and leaving a comet trail, the OnLan wordmark, and a
 * loading progress bar. Server-rendered for an instant first paint.
 *
 * Init timing is handled by the inlined `PRELOADER_INIT_SCRIPT` (see
 * preloader-init.ts). The overlay uses `#site-preloader` + `.is-hidden`.
 */

import './preloader.css';

import onlanLogo from '@icons/Onlan.svg';
import { PreloaderRoute } from './PreloaderRoute';
import { PreloaderWorldMap } from './PreloaderWorldMap';
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
                    <PreloaderWorldMap />
                    <PreloaderRoute />

                    <div className="preloader__center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={onlanLogo}
                            alt="OnLan Logistic"
                            className="preloader__logo-img"
                            width={278}
                            height={126}
                        />

                        <p className="preloader__loading-text">Привеземо ваш товар будь-куди</p>

                        <div className="preloader__progress" aria-hidden>
                            <div className="preloader__progress-fill" />
                            <div className="preloader__progress-dot" />
                        </div>
                    </div>
                </div>
            </div>

            <script
                dangerouslySetInnerHTML={{ __html: PRELOADER_INIT_SCRIPT }}
            />
        </>
    );
}
