import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

type Accent = 'blue' | 'purple' | 'green';

interface Props {
    label: string;
    value: string;
    sub: string;
    percent: number;
    accent: Accent;
    icon: React.ReactNode;
}

const ACCENT: Record<Accent, { text: string; bar: string; glow: string }> = {
    blue: { text: 'text-cyber-blue', bar: 'bg-cyber-blue', glow: 'shadow-[0_0_12px_#00E5FF80]' },
    purple: { text: 'text-cyber-purple', bar: 'bg-cyber-purple', glow: 'shadow-[0_0_12px_#bc13fe80]' },
    green: { text: 'text-cyber-green', bar: 'bg-cyber-green', glow: 'shadow-[0_0_12px_#39FF1480]' },
};

export const StatBar = ({ label, value, sub, percent, accent, icon }: Props) => {
    const a = ACCENT[accent];
    // Anything above 90% is worth flagging regardless of which metric it is.
    const critical = percent >= 90;

    return (
        <div className="rounded-lg border border-neutral-800 bg-[#101010] p-4 transition-colors hover:border-neutral-700">
            <div className="flex items-center gap-3">
                <span className={cn('shrink-0', critical ? 'text-red-500' : a.text)}>{icon}</span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">{label}</span>
                <span className={cn('ml-auto font-mono text-sm font-bold', critical ? 'text-red-400' : 'text-white')}>
                    {value}
                </span>
            </div>
            <div className="mt-3 h-1 w-full overflow-hidden rounded bg-neutral-800">
                <motion.i
                    className={cn('block h-full rounded', critical ? 'bg-red-500' : a.bar, a.glow)}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, percent)}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                />
            </div>
            <div className="mt-2 font-mono text-[11px] text-neutral-600">{sub}</div>
        </div>
    );
};
