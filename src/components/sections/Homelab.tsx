import { motion } from 'framer-motion';
import { Cpu, MemoryStick, HardDrive, Activity, Server, Globe, Thermometer } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { StatBar } from '../ui/StatBar';
import { Sparkline } from '../ui/Sparkline';
import { cn } from '../../utils/cn';
import { bytes, bitrate, duration } from '../../utils/format';
import type { Status } from '../../types/status';
import type { NetSample } from '../../hooks/useStatus';

interface Props {
    status: Status | null;
    error: boolean;
    history: NetSample[];
}

const Box = ({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) => (
    <div className={cn('rounded-lg border border-neutral-800 bg-[#101010] p-5', className)}>
        <h4 className="mb-4 font-mono text-[11px] uppercase tracking-wider text-neutral-500">{title}</h4>
        {children}
    </div>
);

const Row = ({ label, value, tone }: { label: string; value: string; tone?: string }) => (
    <div className="flex items-center justify-between border-b border-neutral-800/60 py-2 last:border-0">
        <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-600">{label}</span>
        <span className={cn('font-mono text-xs', tone ?? 'text-neutral-300')}>{value}</span>
    </div>
);

export const Homelab = ({ status, error, history }: Props) => {
    const healthy = !!status && !error;
    const stale = status ? Date.now() / 1000 - status.generated > 90 : false;

    return (
        <section id="homelab" className="px-5 py-16">
            <div className="mx-auto max-w-6xl">
                <SectionHeading num="02." title="HOMELAB MONITOR" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5 }}
                    className="overflow-hidden rounded-xl border border-neutral-800 bg-[#0c0c0c] shadow-2xl shadow-black/50"
                >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 bg-[#151515] px-5 py-3.5">
                        <div className="flex items-center gap-2">
                            <span
                                className={cn(
                                    'h-2.5 w-2.5 rounded-full',
                                    !healthy ? 'bg-red-500' : stale ? 'bg-yellow-500' : 'animate-pulse bg-cyber-green',
                                )}
                            />
                            <span className="font-mono text-xs tracking-wider text-neutral-400">
                                {!healthy ? 'TELEMETRY UNREACHABLE' : stale ? 'DATA STALE' : 'SYSTEM OPTIMAL'}
                            </span>
                        </div>
                        <div className="font-mono text-[11px] text-neutral-600">
                            {status?.os ?? '—'}
                            <span className="mx-2 text-neutral-800">│</span>
                            {status?.kernel ?? '—'}
                            <span className="mx-2 text-neutral-800">│</span>
                            UP {status ? duration(status.uptime_seconds) : '—'}
                        </div>
                    </div>

                    <div className="grid gap-4 p-5 sm:grid-cols-3">
                        <StatBar
                            label="CPU Load"
                            value={status ? `${status.cpu.percent}%` : '—'}
                            sub={status ? `${status.cpu.cores} cores · load ${status.cpu.load.join(' ')}` : '—'}
                            percent={status?.cpu.percent ?? 0}
                            accent="blue"
                            icon={<Cpu className="h-5 w-5" strokeWidth={1.5} />}
                        />
                        <StatBar
                            label="Memory"
                            value={status ? `${status.memory.percent}%` : '—'}
                            sub={status ? `${bytes(status.memory.used)} / ${bytes(status.memory.total)}` : '—'}
                            percent={status?.memory.percent ?? 0}
                            accent="purple"
                            icon={<MemoryStick className="h-5 w-5" strokeWidth={1.5} />}
                        />
                        <StatBar
                            label="Storage"
                            value={status ? `${status.storage.percent}%` : '—'}
                            sub={status ? `${bytes(status.storage.used)} / ${bytes(status.storage.total)} · ${bytes(status.storage.free)} free` : '—'}
                            percent={status?.storage.percent ?? 0}
                            accent="green"
                            icon={<HardDrive className="h-5 w-5" strokeWidth={1.5} />}
                        />
                    </div>

                    <div className="grid gap-4 px-5 pb-5 lg:grid-cols-3">
                        <Box title="Service Health">
                            <ul className="space-y-2.5">
                                {(status?.services ?? []).map((s) => (
                                    <li
                                        key={s.key}
                                        className="flex items-center gap-3 rounded border border-neutral-800 bg-[#0d0d0d] p-3 transition-colors hover:border-neutral-700"
                                    >
                                        <Server className={cn('h-4 w-4', s.up ? 'text-cyber-green' : 'text-red-500')} strokeWidth={1.5} />
                                        <div className="min-w-0 flex-1">
                                            <div className="truncate text-sm text-neutral-200">{s.name}</div>
                                            <div className="font-mono text-[10px] text-neutral-600">{s.role}</div>
                                        </div>
                                        <span className={cn('h-2 w-2 shrink-0 rounded-full', s.up ? 'animate-pulse bg-cyber-green' : 'bg-red-500')} />
                                    </li>
                                ))}
                                {!status && <li className="font-mono text-xs text-neutral-600">awaiting telemetry…</li>}
                            </ul>
                        </Box>

                        <Box title="Network Throughput">
                            <Sparkline history={history} />
                            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px]">
                                <span className="flex items-center gap-1.5 text-neutral-400">
                                    <i className="h-2 w-2 rounded-sm bg-cyber-blue" />
                                    DOWN <b className="text-white">{status ? bitrate(status.network.rx_bps) : '—'}</b>
                                </span>
                                <span className="flex items-center gap-1.5 text-neutral-400">
                                    <i className="h-2 w-2 rounded-sm bg-cyber-purple" />
                                    UP <b className="text-white">{status ? bitrate(status.network.tx_bps) : '—'}</b>
                                </span>
                                <span className="text-neutral-600">link {status?.network.link ?? '—'}</span>
                            </div>
                        </Box>

                        <Box title="Edge Tunnel">
                            <div className="space-y-0">
                                <Row
                                    label="State"
                                    value={status?.tunnel.active ? 'CONNECTED' : status ? 'DOWN' : '—'}
                                    tone={status?.tunnel.active ? 'text-cyber-green' : status ? 'text-red-400' : undefined}
                                />
                                <Row label="Edge conns" value={status ? String(status.tunnel.edge_connections) : '—'} />
                                <Row label="Inbound ports" value="0" tone="text-cyber-green" />
                                <Row
                                    label="Temp"
                                    value={status?.cpu.temp_c ? `${status.cpu.temp_c} °C` : 'n/a'}
                                />
                            </div>
                            <p className="mt-4 flex gap-2 font-mono text-[10px] leading-relaxed text-neutral-600">
                                <Globe className="mt-0.5 h-3 w-3 shrink-0" />
                                Origin has no routable address. Every request arrives
                                through the tunnel, outbound-only.
                            </p>
                        </Box>
                    </div>

                    <div className="flex items-center justify-between border-t border-neutral-800 bg-[#0a0a0a] px-5 py-3 font-mono text-[10px] text-neutral-600">
                        <span className="flex items-center gap-1.5">
                            <Activity className="h-3 w-3" /> telemetry refreshes every 20s
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Thermometer className="h-3 w-3" />
                            {status ? `sampled ${new Date(status.generated * 1000).toLocaleTimeString()}` : 'no sample yet'}
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
