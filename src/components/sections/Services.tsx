import { motion } from 'framer-motion';
import { Music4, Clapperboard, FolderOpen, ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { cn } from '../../utils/cn';
import { sinceNow } from '../../utils/format';
import type { Status } from '../../types/status';

interface Props { status: Status | null }

const CARDS = [
    {
        key: 'navidrome',
        name: 'Navidrome',
        role: 'Music streaming · Subsonic API',
        host: 'music.probablysecure.tech',
        url: 'https://music.probablysecure.tech',
        icon: Music4,
        accent: 'blue' as const,
        blurb: 'Full library, transcoding on demand, and any Subsonic client you already use.',
    },
    {
        key: 'jellyfin',
        name: 'Jellyfin',
        role: 'Film & television · Direct play',
        host: 'media.probablysecure.tech',
        url: 'https://media.probablysecure.tech',
        icon: Clapperboard,
        accent: 'green' as const,
        blurb: 'Everything on the array, with hardware-free direct play to browser and TV apps.',
    },
    {
        key: 'filebrowser',
        name: 'File Manager',
        role: 'NAS Storage',
        host: 'probablysecure.tech/files',
        url: 'https://probablysecure.tech/files/',
        icon: FolderOpen,
        accent: 'blue' as const,
        blurb: 'Upload and manage files on the NAS.',
    },
];

const ACCENT = {
    blue: { ring: 'hover:border-cyber-blue/50', text: 'text-cyber-blue', glow: 'group-hover:shadow-[0_0_40px_-12px_#00E5FF]' },
    green: { ring: 'hover:border-cyber-green/50', text: 'text-cyber-green', glow: 'group-hover:shadow-[0_0_40px_-12px_#39FF14]' },
};

export const Services = ({ status }: Props) => (
    <section id="services" className="px-5 py-16">
        <div className="mx-auto max-w-6xl">
            <SectionHeading num="04." title="SERVICES" />

            <div className="grid gap-5 md:grid-cols-2">
                {CARDS.map((card, i) => {
                    const svc = status?.services.find((s) => s.key === card.key);
                    const up = svc?.up ?? null;
                    const a = ACCENT[card.accent];

                    return (
                        <motion.a
                            key={card.key}
                            href={card.url}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.5, delay: i * 0.12 }}
                            className={cn(
                                'group relative flex flex-col rounded-xl border border-neutral-800 bg-[#0c0c0c] p-6 transition-all duration-300',
                                'hover:-translate-y-1', a.ring, a.glow,
                            )}
                        >
                            <div className="flex items-start justify-between">
                                <card.icon className={cn('h-8 w-8', a.text)} strokeWidth={1.5} />
                                <span
                                    className={cn(
                                        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-wider',
                                        up === null && 'border-neutral-700 text-neutral-500',
                                        up === true && 'border-cyber-green/30 bg-cyber-green/5 text-cyber-green',
                                        up === false && 'border-red-500/30 bg-red-500/5 text-red-400',
                                    )}
                                >
                                    <span
                                        className={cn(
                                            'h-1.5 w-1.5 rounded-full',
                                            up === null && 'bg-neutral-600',
                                            up === true && 'animate-pulse bg-cyber-green',
                                            up === false && 'bg-red-500',
                                        )}
                                    />
                                    {up === null ? 'CHECKING' : up ? 'ONLINE' : 'OFFLINE'}
                                </span>
                            </div>

                            <h3 className="mt-5 text-xl font-semibold text-white">{card.name}</h3>
                            <p className="mt-1 font-mono text-[11px] tracking-wide text-neutral-500">{card.role}</p>
                            <p className="mt-3 text-sm leading-relaxed text-neutral-400">{card.blurb}</p>

                            <div className="mt-6 flex items-center justify-between border-t border-neutral-800/80 pt-4">
                                <span className="font-mono text-[11px] text-neutral-600">
                                    {svc ? `up ${sinceNow(svc.since)}` : '—'}
                                </span>
                                <span className={cn('flex items-center gap-1 font-mono text-[11px]', a.text)}>
                                    {card.host}
                                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </span>
                            </div>
                        </motion.a>
                    );
                })}
            </div>
        </div>
    </section>
);
