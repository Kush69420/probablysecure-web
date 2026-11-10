import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
    {
        title: "Machine Learning Research Intern",
        company: "Université Polytechnique Hauts-de-France",
        period: "Jun 2026 - Present",
        description: [
            "Built a Python/Pandas pipeline integrating **7 EV-charging datasets into 261K+ hourly observations**.",
            "Developed a **two-stage XGBoost forecasting model** using chronological holdout evaluation and time-series cross-validation. Campus visit: France."
        ],
        tech: ["Python", "Pandas", "XGBoost", "Time-Series Cross-Validation"]
    },
    {
        title: "Cybersecurity Research Intern",
        company: "Indian Institute of Technology (IIT), Patna",
        period: "May 2026 - Jul 2026",
        description: [
            "Implemented the **PQC-DLST-MQTT prototype** using ML-KEM, ML-DSA, AES-GCM, and SHAKE-256.",
            "Used **deterministic multi-publisher nonces** and out-of-band key management."
        ],
        tech: ["ML-KEM", "ML-DSA", "AES-GCM", "MQTT", "Post-Quantum Crypto"]
    },
    {
        title: "Network Research Intern",
        company: "Indian Institute of Information Technology (IIIT), Nagpur",
        period: "Nov 2025 - Feb 2026",
        description: [
            "Built **Gymnasium environments and PPO policies** for network resource allocation.",
            "Modeled **finite-buffer packet loss and energy/carbon trade-offs** using Python and Stable-Baselines3."
        ],
        tech: ["Python", "Gymnasium", "PPO", "Stable-Baselines3"]
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
