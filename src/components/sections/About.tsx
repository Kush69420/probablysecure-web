import { motion } from 'framer-motion';
import { TerminalWindow } from '../ui/TerminalWindow';
import { TerminalChat } from '../ui/TerminalChat';
import { SectionHeading } from '../ui/SectionHeading';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { cn } from '../../utils/cn';

export const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" });
    const [mode, setMode] = useState<'profile' | 'interactive'>('interactive');

    const points = [
        "Operating **nine containerized services** across a NAS and Raspberry Pi.",
        "Automating **power-loss recovery**, monitoring, and backup-restoration checks.",
        "Building reproducible **ML pipelines** and researching secure networked systems.",
        "Studying **Data Science and Artificial Intelligence** at IIIT Naya Raipur."
    ];

    return (
        <section id="about" className="min-h-screen py-20 relative flex items-center snap-start snap-always">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-12 items-start">
                    <div className="w-full md:w-1/2 pt-8">
                        <motion.div
                            ref={ref}
                            initial={{ opacity: 0, x: -50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                            transition={{ duration: 0.5 }}
                        >
                            <SectionHeading num="01." title="ABOUT ME" />
                            <p className="text-gray-400 leading-relaxed mb-6 font-light">
                                I build and operate Linux infrastructure with a focus on reliability,
                                recovery automation, and secure access. My work spans a self-hosted
                                production environment, container delivery pipelines, and security research.
                            </p>
                            <p className="text-gray-400 leading-relaxed font-light mb-8">
                                B.Tech in Data Science and Artificial Intelligence at the International
                                Institute of Information Technology, Naya Raipur (Aug 2024–Aug 2028).
                                CGPA: 8.22/10. My research includes EV-charging forecasting,
                                post-quantum IoT security, and network resource allocation.
                            </p>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setMode('profile')}
                                    className={cn("px-4 py-2 font-mono text-sm border rounded transition-colors",
                                        mode === 'profile' ? "border-cyber-blue text-cyber-blue bg-cyber-blue/10" : "border-gray-700 text-gray-500 hover:text-gray-300")}
                                >
                                    $ cat profile
                                </button>
                                <button
                                    onClick={() => setMode('interactive')}
                                    className={cn("px-4 py-2 font-mono text-sm border rounded transition-colors",
                                        mode === 'interactive' ? "border-cyber-green text-cyber-green bg-cyber-green/10" : "border-gray-700 text-gray-500 hover:text-gray-300")}
                                >
                                    $ ./chat_bot.sh
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    <div className="w-full md:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            {mode === 'profile' ? (
                                <TerminalWindow title="profile">
                                    <div className="space-y-4">
                                        <div className="flex gap-2 text-cyber-green">
                                            <span>$</span>
                                            <span className="text-white">cat profile.md</span>
                                        </div>
                                        <ul className="space-y-3 font-mono text-sm sm:text-base">
                                            {points.map((point, i) => (
                                                <motion.li
                                                    key={i}
                                                    initial={{ opacity: 0, x: 10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.3, delay: 0.1 + (i * 0.1) }}
                                                    className="flex gap-3"
                                                >
                                                    <span className="text-cyber-purple">➤</span>
                                                    <span dangerouslySetInnerHTML={{
                                                        __html: point.replace(/\*\*(.*?)\*\*/g, '<span class="text-cyber-blue">$1</span>')
                                                    }} />
                                                </motion.li>
                                            ))}
                                        </ul>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 1 }}
                                            className="animate-pulse text-cyber-blue mt-4"
                                        >
                                            _
                                        </motion.div>
                                    </div>
                                </TerminalWindow>
                            ) : (
                                <TerminalChat />
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};
