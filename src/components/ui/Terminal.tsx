import { useEffect, useState } from 'react';

interface Line { prompt?: string; text: string; tone?: 'ok' | 'dim' | 'accent' }

const SCRIPT: Line[] = [
    { prompt: '$', text: 'whoami' },
    { text: 'nas — fanless box, one hostel room, zero open ports', tone: 'dim' },
    { prompt: '$', text: 'ss -lntp | grep -c 0.0.0.0:443' },
    { text: '0', tone: 'ok' },
    { prompt: '$', text: 'cloudflared tunnel info nas' },
    { text: '4 edge connections registered · bom09 bom10 maa04', tone: 'accent' },
    { prompt: '$', text: 'systemctl is-system-running' },
    { text: 'running', tone: 'ok' },
];

const TYPE_MS = 26;
const HOLD_MS = 380;

/** Types the script out once on mount, then leaves a blinking cursor. */
export const Terminal = () => {
    const [shown, setShown] = useState<Line[]>([]);
    const [typing, setTyping] = useState('');
    const [done, setDone] = useState(false);

    useEffect(() => {
        let cancelled = false;
        let i = 0;

        const runLine = () => {
            if (cancelled || i >= SCRIPT.length) { setDone(true); return; }
            const line = SCRIPT[i];
            // Only command lines type out; output lines appear at once.
            if (!line.prompt) {
                setShown((s) => [...s, line]);
                i += 1;
                setTimeout(runLine, HOLD_MS);
                return;
            }
            let c = 0;
            const tick = () => {
                if (cancelled) return;
                c += 1;
                setTyping(line.text.slice(0, c));
                if (c < line.text.length) {
                    setTimeout(tick, TYPE_MS);
                } else {
                    setShown((s) => [...s, line]);
                    setTyping('');
                    i += 1;
                    setTimeout(runLine, HOLD_MS);
                }
            };
            tick();
        };

        const start = setTimeout(runLine, 500);
        return () => { cancelled = true; clearTimeout(start); };
    }, []);

    const tone = (t?: Line['tone']) =>
        t === 'ok' ? 'text-cyber-green'
            : t === 'accent' ? 'text-cyber-blue'
                : t === 'dim' ? 'text-neutral-500'
                    : 'text-neutral-300';

    return (
        <div className="w-full max-w-2xl rounded-lg border border-neutral-800 bg-[#0b0b0b] shadow-2xl shadow-black/60 overflow-hidden">
            <div className="flex items-center gap-2 border-b border-neutral-800 bg-[#141414] px-4 py-2.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <span className="ml-2 font-mono text-xs text-neutral-500">root@nas — /srv/blue</span>
            </div>
            <div className="p-4 font-mono text-[13px] leading-relaxed min-h-[210px]">
                {shown.map((l, idx) => (
                    <div key={idx} className="flex gap-2">
                        {l.prompt && <span className="text-cyber-green shrink-0">{l.prompt}</span>}
                        <span className={tone(l.tone)}>{l.text}</span>
                    </div>
                ))}
                {typing && (
                    <div className="flex gap-2">
                        <span className="text-cyber-green shrink-0">$</span>
                        <span className="text-neutral-300">{typing}</span>
                    </div>
                )}
                {done && (
                    <div className="flex gap-2">
                        <span className="text-cyber-green shrink-0">$</span>
                        <span className="inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-cyber-green/80" />
                    </div>
                )}
            </div>
        </div>
    );
};
