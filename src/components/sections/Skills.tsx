import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { useState } from 'react';
import { cn } from '../../utils/cn';

const skillsData = [
    { category: "Systems", value: 95, skills: ["Linux (Arch/Debian)", "Proxmox VE", "Docker/K8s", "Bash/Shell"] },
    { category: "Security", value: 90, skills: ["Penetration Testing", "Cryptography", "Network Forensics", "Burp Suite"] },
    { category: "Research", value: 85, skills: ["Deep Learning (TF/PyTorch)", "6G Networks", "DQL", "DRL PPO"] },
    { category: "Dev", value: 88, skills: ["Python", "TypeScript/React", "C/C++", "Rust", "Solidity"] },
    { category: "Network", value: 92, skills: ["Wireshark", "Cisco Packet Tracer", "VPNs (WireGuard)", "SDN"] },
    { category: "Protocols", value: 88, skills: ["TCP/IP", "BGP", "OSPF", "eBPF", "XDP", "QUIC"] },
];

const RadarChart = ({ data, hoveredIndex }: { data: typeof skillsData; hoveredIndex: number | null }) => {
    const size = 300;
    const radius = size / 2;
    const angleStep = (Math.PI * 2) / data.length;

    const getPoint = (value: number, index: number) => {
        const angle = index * angleStep - Math.PI / 2;
        const distance = (value / 100) * (radius - 40); // 40px padding
        return {
            x: radius + distance * Math.cos(angle),
            y: radius + distance * Math.sin(angle)
        };
    };

    const points = data.map((d, i) => getPoint(d.value, i));
    const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ') + ' Z';

    return (
        <div className="relative w-[300px] h-[300px] mx-auto">
            <svg width={size} height={size} className="overflow-visible">
                {/* Grid Circles */}
                {[20, 40, 60, 80, 100].map((r, i) => (
                    <circle
                        key={i}
                        cx={radius}
                        cy={radius}
                        r={(r / 100) * (radius - 40)}
                        fill="none"
                        stroke="#39ff14"
                        strokeOpacity={0.1}
                    />
                ))}

                {/* Axes */}
                {data.map((_, i) => {
                    const angle = i * angleStep - Math.PI / 2;
                    const x = radius + (radius - 40) * Math.cos(angle);
                    const y = radius + (radius - 40) * Math.sin(angle);
                    return <line key={i} x1={radius} y1={radius} x2={x} y2={y} stroke="#39ff14" strokeOpacity={0.2} />;
                })}

                {/* Data Path */}
                <motion.path
                    d={pathData}
                    fill="rgba(0, 229, 255, 0.2)"
                    stroke="#00E5FF"
                    strokeWidth={2}
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />

                {/* Points */}
                {points.map((p, i) => (
                    <motion.circle
                        key={i}
                        cx={p.x}
                        cy={p.y}
                        r={hoveredIndex === i ? 6 : 4}
                        fill={hoveredIndex === i ? "#fff" : "#39FF14"}
                        initial={{ scale: 0 }}
                        animate={{ scale: hoveredIndex === i ? 1.5 : 1 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                    />
                ))}

                {/* Labels */}
                {data.map((d, i) => {
                    const angle = i * angleStep - Math.PI / 2;
                    const x = radius + (radius - 20) * Math.cos(angle);
                    const y = radius + (radius - 20) * Math.sin(angle);
                    return (
                        <text
                            key={i}
                            x={x}
                            y={y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill={hoveredIndex === i ? "#00E5FF" : "#fff"}
                            fontSize="12"
                            fontFamily="monospace"
                            className={cn("uppercase tracking-wider transition-colors duration-300", hoveredIndex === i && "font-bold")}
                        >
                            {d.category}
                        </text>
                    );
                })}
            </svg>
        </div>
    );
};

export const Skills = () => {
    const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

    return (
        <section id="skills" className="min-h-screen py-20 relative bg-[#050505] flex items-center snap-start snap-always">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <SectionHeading num="06." title="SKILL MATRIX" />
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-center gap-16 max-w-6xl mx-auto">
                    <div className="w-full lg:w-1/3 flex justify-center scale-75 md:scale-100 origin-center">
                        <RadarChart data={skillsData} hoveredIndex={hoveredSkill} />
                    </div>

                    <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {skillsData.map((category, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                                className={cn(
                                    "bg-[#0c0c0c] border p-4 rounded transition-all duration-300",
                                    hoveredSkill === idx ? "border-cyber-green/50 bg-[#111] translate-x-2" : "border-gray-800"
                                )}
                                onMouseEnter={() => setHoveredSkill(idx)}
                                onMouseLeave={() => setHoveredSkill(null)}
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className={cn("font-mono font-bold text-lg transition-colors", hoveredSkill === idx ? "text-cyber-green" : "text-white")}>
                                        {category.category}
                                    </h3>
                                    <div className="h-1.5 w-24 bg-gray-800 rounded-full overflow-hidden">
                                        <motion.div
                                            className={cn("h-full", hoveredSkill === idx ? "bg-cyber-blue" : "bg-cyber-green")}
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${category.value}%` }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill, sIdx) => (
                                        <span key={sIdx} className="px-2 py-1 text-xs font-mono text-gray-400 bg-gray-900 border border-gray-800 rounded">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
