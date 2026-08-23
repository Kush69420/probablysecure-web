import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { GlitchText } from '../ui/GlitchText';
import { Terminal } from '../ui/Terminal';

const CHIPS = ['CLOUDFLARE TUNNEL', 'DEBIAN 13', 'OPENMEDIAVAULT', 'ZERO OPEN PORTS'];

export const Hero = () => (
    <section className="relative flex min-h-[92vh] items-center px-5 pt-24 pb-16">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyber-green/25 bg-cyber-green/5 px-3 py-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-cyber-green" />
                    <span className="font-mono text-[11px] tracking-wider text-cyber-green">SELF-HOSTED · OUTBOUND ONLY</span>
                </div>

                <GlitchText
                    text="PROBABLY SECURE"
                    className="block text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
                />

                <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-neutral-400">
                    One fanless box on a campus network it does not control, publishing
                    music and media through an encrypted tunnel. No port forward, no public
                    address, no inbound firewall rule to get wrong.
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                    {CHIPS.map((c, i) => (
                        <motion.span
                            key={c}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + i * 0.08 }}
                            className="rounded border border-neutral-800 bg-neutral-900/60 px-2.5 py-1 font-mono text-[10px] tracking-wider text-neutral-500"
                        >
                            {c}
                        </motion.span>
                    ))}
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="flex justify-center lg:justify-end"
            >
                <Terminal />
            </motion.div>
        </div>
    </section>
);
