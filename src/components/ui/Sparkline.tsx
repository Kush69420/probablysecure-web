import type { NetSample } from '../../hooks/useStatus';

interface Props { history: NetSample[] }

const W = 300;
const H = 84;

const path = (values: number[], max: number) => {
    if (values.length < 2) return { line: '', area: '' };
    const step = W / (values.length - 1);
    const y = (v: number) => H - (v / max) * (H - 6) - 3;
    const line = values.map((v, i) => `${i === 0 ? 'M' : 'L'}${(i * step).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
    return { line, area: `${line} L${W},${H} L0,${H} Z` };
};

export const Sparkline = ({ history }: Props) => {
    const rx = history.map((h) => h.rx);
    const tx = history.map((h) => h.tx);
    // A floor on the scale stops idle noise from looking like a spike.
    const max = Math.max(...rx, ...tx, 64_000);
    const down = path(rx, max);
    const up = path(tx, max);

    return (
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-24 w-full" aria-hidden>
            <defs>
                <linearGradient id="g-down" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="g-up" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#bc13fe" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#bc13fe" stopOpacity="0" />
                </linearGradient>
            </defs>
            {[0.25, 0.5, 0.75].map((f) => (
                <line key={f} x1="0" x2={W} y1={H * f} y2={H * f} stroke="#ffffff" strokeOpacity="0.05" />
            ))}
            {down.area && <path d={down.area} fill="url(#g-down)" />}
            {down.line && <path d={down.line} fill="none" stroke="#00E5FF" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />}
            {up.area && <path d={up.area} fill="url(#g-up)" />}
            {up.line && <path d={up.line} fill="none" stroke="#bc13fe" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />}
            {history.length < 2 && (
                <text x={W / 2} y={H / 2} textAnchor="middle" fill="#404040" fontSize="11" fontFamily="monospace">
                    collecting samples…
                </text>
            )}
        </svg>
    );
};
