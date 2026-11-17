/**
 * Route artwork for the preloader: a dotted great-circle arc between two
 * hubs and one plane flying along it, leaving a short fading comet trail —
 * the same visual language as the home hero. Everything lives in one SVG
 * coordinate space, so the plane stays glued to the arc at any size.
 * Motion: SVG SMIL: `animateMotion` (plane) + `animate` dashoffset (trail), on
 * the same 2.6s loop (all SMIL, so plane, trail and fade share one clock). See preloader.css; reduced-motion shows a static plane.
 */
const ARC = 'M60 300 Q500 -180 940 300';
const LOOP = '2.6s';

export function PreloaderRoute() {
    return (
        <svg
            className="preloader__route-svg"
            viewBox="0 0 1000 370"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
        >
            <path
                d={ARC}
                stroke="#2C358C"
                strokeOpacity="0.35"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeDasharray="0.1 13"
            />
            <path
                className="preloader__trail"
                d={ARC}
                stroke="#2C358C"
                strokeWidth="3.4"
                strokeLinecap="round"
                pathLength="1"
                strokeDasharray="0.16 2"
                strokeOpacity="0.32"
            >
                <animate attributeName="stroke-dashoffset" from="0.16" to="-0.84" dur={LOOP} repeatCount="indefinite" />
            </path>

            <g transform="translate(60 300)">
                <circle className="preloader__halo preloader__halo--left" r="30" fill="#2C358C" />
                <circle r="15" fill="#ffffff" stroke="#2C358C" strokeOpacity="0.18" strokeWidth="1.5" />
                <circle r="6.5" fill="#2C358C" />
            </g>
            <g transform="translate(940 300)">
                <circle className="preloader__halo preloader__halo--right" r="30" fill="#2C358C" />
                <circle r="15" fill="#ffffff" stroke="#2C358C" strokeOpacity="0.18" strokeWidth="1.5" />
                <circle r="6.5" fill="#D5E82D" stroke="#2C358C" strokeWidth="2" />
            </g>

            <g fontFamily="inherit" fontWeight="700" fontSize="17" fill="#2C358C" textAnchor="middle" letterSpacing="1.5">
                <text x="60" y="352" fillOpacity="0.6">СВІТ</text>
                <text x="940" y="352">УКРАЇНА</text>
            </g>

            <g className="preloader__plane">
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur={LOOP} repeatCount="indefinite" />
                <g transform="rotate(90) scale(1.5) translate(-19 -19)">
                    <path d="M19.0006 1.07621C17.1399 1.09181 15.7882 3.62085 15.7882 6.65881L15.7882 13.0679C15.7882 13.9582 15.645 14.2927 15.0404 14.8173L3.38258 25.5048C3.00123 25.8386 2.81055 26.2526 2.81055 26.7296L2.81055 28.5746C2.81055 28.9879 3.1763 29.2261 3.62144 29.0198L15.7882 23.5166L16.7104 31.5963L11.4304 34.4748C11.0328 34.6811 10.8577 35.0312 10.8577 35.5565L10.8577 36.2391C10.8577 36.653 11.1278 36.9231 11.5417 36.9231L26.4594 36.9231C26.8734 36.9231 27.1278 36.653 27.1278 36.2391L27.1278 35.5551C27.1278 35.0306 26.9528 34.6804 26.5714 34.4741L21.2908 31.5956L22.2136 23.5159L34.3804 29.0191C34.8093 29.2254 35.1906 28.9872 35.1906 28.574L35.1906 26.7282C35.1906 26.2519 34.9843 25.838 34.6186 25.5041L22.9451 14.8166C22.3561 14.2921 22.2129 13.9575 22.2129 13.0672L22.2129 6.65814C22.2129 3.62017 20.8456 1.09181 19.0006 1.07621Z" fill="#2C358C" />
                    <circle cx="19" cy="9" r="2.6" fill="#D5E82D" />
                </g>
                <animateMotion dur={LOOP} repeatCount="indefinite" rotate="auto" path={ARC} />
            </g>
        </svg>
    );
}
