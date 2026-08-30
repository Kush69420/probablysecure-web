import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
    {
        title: "Cybersecurity Research Intern",
        company: "Indian Institute of Technology (IIT), Patna",
        period: "May 2026 - Jul 2026",
        description: [
            "Designed and implemented **PQC-DLST-MQTT**, a broker-blind post-quantum security framework for MQTT using ML-KEM, ML-DSA, AES-GCM, and SHAKE-256.",
            "Developed a **deterministic multi-publisher nonce architecture** and out-of-band key management protocol to achieve quantum-resistant end-to-end secure IoT communication."
        ],
        tech: ["ML-KEM", "ML-DSA", "AES-GCM", "MQTT", "Post-Quantum Crypto"]
    },
    {
        title: "Network Research Intern",
        company: "Indian Institute of Information Technology (IIIT), Nagpur",
        period: "Nov 2025 - Feb 2026",
        description: [
            "Researching **AI-assisted optimization** of next-generation (6G) network infrastructure, focusing on energy-efficient, resilient, and scalable communication systems while minimizing carbon footprint across distributed network components.",
            "Analyzing **Deep Reinforcement Learning (DRL, PPO)** and game-theoretic models for secure and efficient workload orchestration across edge, cloud, and endpoint systems."
        ],
        tech: ["Python", "TensorFlow", "DRL / PPO", "6G Networks"]
    }
];

export const Experience = () => {
    return (
        <section id="experience" className="min-h-screen py-20 relative flex items-center snap-start snap-always">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <SectionHeading num="02." title="EXPERIENCE" />

                    <div className="relative border-l border-gray-800 ml-3 md:ml-6 space-y-12">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false, margin: "-50px" }}
                                transition={{ duration: 0.5 }}
                                className="relative pl-8 md:pl-12"
                            >
                                {/* Timeline Node */}
                                <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-cyber-blue ring-4 ring-cyber-blue/20"></span>

                                <div className="bg-[#0c0c0c] border border-gray-800 p-6 rounded-lg hover:border-cyber-blue/30 transition-all duration-300 hover:-translate-y-2 group">
                                    <header className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                                        <div>
                                            <h3 className="text-xl font-bold text-white group-hover:text-cyber-blue transition-colors flex items-center gap-2">
                                                {exp.title}
                                                <Briefcase className="w-4 h-4 text-cyber-purple" />
                                            </h3>
                                            <p className="text-cyber-green font-mono text-sm">{exp.company}</p>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-500 font-mono text-xs bg-gray-900/50 px-3 py-1 rounded-full border border-gray-800">
                                            <Calendar className="w-3 h-3" />
                                            {exp.period}
                                        </div>
                                    </header>

                                    <ul className="space-y-2 mb-6 text-gray-400 text-sm leading-relaxed list-disc list-inside marker:text-cyber-purple">
                                        {exp.description.map((desc, i) => (
                                            <li key={i} dangerouslySetInnerHTML={{
                                                __html: desc.replace(/\*\*(.*?)\*\*/g, '<span class="text-white font-medium">$1</span>')
                                            }} />
                                        ))}
                                    </ul>

                                    <div className="flex flex-wrap gap-2">
                                        {exp.tech.map((t, i) => (
                                            <span key={i} className="px-2 py-1 bg-cyber-blue/5 border border-cyber-blue/20 text-cyber-blue text-xs rounded font-mono">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
