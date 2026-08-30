import { motion } from 'framer-motion';
import { GlitchText } from '../ui/GlitchText';
import { useState } from 'react';
import { TerminalWindow } from '../ui/TerminalWindow';

export const Contact = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        // Construct mailto link
        const subject = `Portfolio Contact from ${formState.name}`;
        const body = `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`;
        const mailtoLink = `mailto:kushagr250@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Simulate encryption delay then open mail client
        setTimeout(() => {
            window.location.href = mailtoLink;
            setStatus('sent');
            setFormState({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        }, 1500);
    };

    return (
        <section id="contact" className="min-h-screen py-20 relative flex items-center snap-start snap-always">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-12 max-w-5xl mx-auto items-center">
                    <div className="w-full md:w-1/2">
                        <GlitchText text="INITIALIZE_CONTACT" className="text-3xl md:text-5xl font-bold text-white mb-6" />
                        <p className="text-gray-400 leading-relaxed mb-6 font-light">
                            Interested in collaborating on secure infrastructure, AI research, or blockchain systems?
                            Open a secure channel below.
                        </p>
                        <div className="space-y-4">
                            <a href="mailto:kushagr250@gmail.com" className="flex items-center gap-3 text-gray-300 hover:text-cyber-blue transition-colors group">
                                <span className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center group-hover:bg-cyber-blue/20">@</span>
                                <span className="font-mono">kushagr250@gmail.com</span>
                            </a>
                            <a href="https://www.linkedin.com/in/kush-agrawal-059b48203/" target="_blank" className="flex items-center gap-3 text-gray-300 hover:text-cyber-blue transition-colors group">
                                <span className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center group-hover:bg-cyber-blue/20">in</span>
                                <span className="font-mono">linkedin.com/in/kush-agrawal-059b48203</span>
                            </a>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2">
                        <TerminalWindow title="secure-transmission">
                            {status === 'sent' ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-cyber-green font-mono py-12 text-center"
                                >
                                    <div className="text-2xl mb-2">✓ TRANSMISSION PREPARED</div>
                                    <div className="text-sm">Secure Channel Opened. Please confirm transmission in your client.</div>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4 font-mono text-sm">
                                    <div>
                                        <label className="block text-cyber-blue mb-1">&gt; ENTITY_NAME</label>
                                        <input
                                            type="text"
                                            value={formState.name}
                                            onChange={e => setFormState({ ...formState, name: e.target.value })}
                                            required
                                            className="w-full bg-gray-900/50 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-cyber-blue transition-colors"
                                            placeholder="Enter your name..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-cyber-blue mb-1">&gt; CONTACT_VECTOR</label>
                                        <input
                                            type="email"
                                            value={formState.email}
                                            onChange={e => setFormState({ ...formState, email: e.target.value })}
                                            required
                                            className="w-full bg-gray-900/50 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-cyber-blue transition-colors"
                                            placeholder="Enter your email..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-cyber-blue mb-1">&gt; PAYLOAD</label>
                                        <textarea
                                            value={formState.message}
                                            onChange={e => setFormState({ ...formState, message: e.target.value })}
                                            required
                                            rows={4}
                                            className="w-full bg-gray-900/50 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-cyber-blue transition-colors resize-none"
                                            placeholder="Enter message content..."
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={status === 'sending'}
                                        className="w-full bg-cyber-blue/10 border border-cyber-blue text-cyber-blue py-2 rounded hover:bg-cyber-blue/20 transition-colors uppercase tracking-wider flex justify-center items-center gap-2"
                                    >
                                        {status === 'sending' ? (
                                            <>
                                                <span className="animate-spin rounded-full h-3 w-3 border-b-2 border-current"></span>
                                                ENCRYPTING...
                                            </>
                                        ) : (
                                            "[ INITIATE TRANSMISSION ]"
                                        )}
                                    </button>
                                </form>
                            )}
                        </TerminalWindow>
                    </div>
                </div>
            </div>
        </section>
    );
};
