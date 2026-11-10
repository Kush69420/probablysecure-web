import React, { useState, useEffect, useRef } from 'react';
import { TerminalWindow } from './TerminalWindow';
import { cn } from '../../utils/cn';

interface Message {
    type: 'user' | 'system';
    content: React.ReactNode;
}

const COMMANDS = {
    help: "Available commands: help, about, experience, skills, projects, homelab, resume, contact, monitor, media, honeypot, sentinel, clear",
    about: "I build reliable Linux infrastructure, recovery automation, and secure platforms. B.Tech in Data Science and Artificial Intelligence, IIIT Naya Raipur (2024–2028); CGPA: 8.22/10.",
    experience: "Université Polytechnique Hauts-de-France: ML Research Intern (Jun 2026–Present), EV-charging forecasting across 7 datasets and 261K+ hourly observations.\nIIT Patna: Cybersecurity Research Intern (May–Jul 2026), PQC-DLST-MQTT.\nIIIT Nagpur: Network Research Intern (Nov 2025–Feb 2026), Gymnasium and PPO.",
    skills: "Programming: Python, Bash, TypeScript, SQL, C++\nSystems: Debian, systemd, Proxmox VE, TCP/IP, Nginx, Cloudflare Tunnel\nPlatform: Docker, Kubernetes, AWS, GitHub Actions, Terraform, Ansible\nReliability: Prometheus, Grafana, Monit, collectd, SLIs/SLOs, error budgets, incident response\nStorage: PostgreSQL, MySQL, SMB/CIFS, rsync, Btrfs RAID1",
    projects: "Projects: Quantum-Based IoT Air Pollution Monitoring System (granted patent), Self-Hosted Homelab, AI-Enhanced Adaptive Honeypot, SENTINEL OSINT Platform.",
    homelab: <a href="/homelab" className="text-cyber-blue underline">Explore the public homelab showcase and live telemetry →</a>,
    resume: <a href="/resume" target="_blank" rel="noopener noreferrer" className="text-cyber-blue underline">Open the updated resume PDF →</a>,
    contact: "Email: kushagr250@gmail.com | Phone: +91 9131452145 | GitHub: github.com/Kush69420",
    monitor: "Quantum-Secured IoT Air-Pollution Monitoring: Indian Patent No. 589285, granted 13 May 2026. Co-inventor; hybrid blockchain/IPFS storage with QKD and AES.",
    media: "Nine containerized services across a NAS and Raspberry Pi, behind authenticated web access. Automated power-loss recovery: about 20 minutes manual intervention → 150 seconds.",
    honeypot: "Adaptive SSH decoy using Python and Paramiko, deployed with Kubernetes on Proxmox VE. Grafana dashboards, Implicit Q-Learning, and Gemini API with bounded retries, validation, and fallback responses.",
    sentinel: "SENTINEL: Python/Flask/MySQL OSINT platform with resumable imports, database checkpoints, streaming reads, batched inserts, dry-run validation, and AWS delivery via GitHub Actions, OIDC, ECR, and SSM.",
    clear: "CLEAR_ACTION"
};

export const TerminalChat = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<Message[]>([
        { type: 'system', content: "Welcome to Kush's Interactive Terminal. Type 'help' for commands." }
    ]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (cmd: string) => {
        const normalizeCmd = cmd.toLowerCase().trim();
        let response: React.ReactNode = `Command not found: ${cmd}. Type 'help' for options.`;

        if (normalizeCmd === 'clear') {
            setHistory([]);
            return;
        }

        if (COMMANDS[normalizeCmd as keyof typeof COMMANDS]) {
            response = COMMANDS[normalizeCmd as keyof typeof COMMANDS];
        }

        // Keyword matching for basic NLP feel
        if (normalizeCmd.includes('who are you')) response = COMMANDS.about;
        if (normalizeCmd.includes('work') || normalizeCmd.includes('job')) response = COMMANDS.experience;
        if (normalizeCmd.includes('stack') || normalizeCmd.includes('tech')) response = COMMANDS.skills;

        setHistory(prev => [
            ...prev,
            { type: 'user', content: cmd },
            { type: 'system', content: <div className="whitespace-pre-wrap">{response}</div> }
        ]);
    };

    const cleanInput = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        handleCommand(input);
        setInput('');
    };

    return (
        <TerminalWindow title="interactive-chat" className="h-[550px] flex flex-col">
            <div className="flex-1 overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-cyber-blue/20 scrollbar-track-transparent" ref={scrollRef}>
                <div className="space-y-4">
                    {history.map((msg, idx) => (
                        <div key={idx} className={cn("text-sm font-mono", msg.type === 'user' ? "text-cyber-blue" : "text-gray-300")}>
                            {msg.type === 'user' ? (
                                <div className="flex gap-2">
                                    <span className="text-cyber-green">➜</span>
                                    <span>{msg.content}</span>
                                </div>
                            ) : (
                                msg.content
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <form onSubmit={cleanInput} className="flex gap-2 items-center border-t border-gray-800 pt-3">
                <span className="text-cyber-green">➜</span>
                <input
                    type="text"
                    value={input}
                    aria-label="Terminal command"
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-gray-200 font-mono placeholder-gray-600 focus:ring-0"
                    placeholder="Type a command..."
                />
            </form>
        </TerminalWindow>
    );
};
