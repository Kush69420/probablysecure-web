import { motion } from 'framer-motion';
import { GlitchText } from '../ui/GlitchText';
import { Terminal, ArrowRight, Download } from 'lucide-react';

export const Hero = () => {
    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 snap-start snap-always">
            <div className="max-w-4xl mx-auto text-center z-10 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyber-green/30 bg-cyber-green/5 text-cyber-green text-sm font-mono"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-green"></span>
                    </span>
                    System Online
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-6"
                >
                    <GlitchText
                        text="KUSH AGRAWAL"
                        as="h1"
                        className="text-4xl md:text-7xl font-bold font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue via-white to-cyber-purple drop-shadow-[0_0_15px_rgba(0,229,255,0.5)]"
                    />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto font-light leading-relaxed"
                >
                    Cybersecurity & Systems-Focused Engineer specializing in
                    <span className="text-cyber-blue font-mono"> Linux</span>,
                    <span className="text-cyber-purple font-mono"> IoT</span>, and
                    <span className="text-cyber-green font-mono"> Network</span> infrastructure.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <a
                        href="#projects"
                        className="group relative px-8 py-3 bg-cyber-blue/10 border border-cyber-blue text-cyber-blue font-mono rounded hover:bg-cyber-blue/20 transition-all duration-300 flex items-center gap-2 overflow-hidden"
                    >
                        <span className="absolute inset-0 w-full h-full bg-cyber-blue/5 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                        <span className="relative">View Projects</span>
                        <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
                    </a>

                    <a
                        href="https://drive.google.com/file/d/1tnFw0vQluZiwyRSO9QtF6XuPog3h8wAv/view?usp=sharing"
                        target="_blank"
                        className="px-8 py-3 border border-gray-700 text-gray-300 font-mono rounded hover:border-gray-500 hover:text-white transition-all duration-300 flex items-center gap-2"
                    >
                        <Download className="w-4 h-4" />
                        View Resume
                    </a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="mt-20 flex justify-center gap-8 text-gray-500 font-mono text-sm"
                >
                    <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4" />
                        <span>Building Secure Infrastructure</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-current rounded-sm flex items-center justify-center text-[10px] font-bold">42</span>
                        <span>Systems Hardening</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
