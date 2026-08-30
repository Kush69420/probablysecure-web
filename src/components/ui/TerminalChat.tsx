import React, { useState, useEffect, useRef } from 'react';
import { TerminalWindow } from './TerminalWindow';
import { cn } from '../../utils/cn';

interface Message {
    type: 'user' | 'system';
    content: React.ReactNode;
}

const COMMANDS = {
    help: "Available commands: help, about, experience, skills, projects, contact, clear",
    about: "I am a Cybersecurity & Systems-Focused Engineer specializing in Linux, IoT, and Core Networking.",
    experience: "Recent work: Research Intern at IIIT Nagpur (AI/6G Optimization), Self-Hosted Homelab (Proxmox/WireGuard).",
    skills: "Languages: Python, TypeScript, Rust, C++\nSecurity: Burp Suite, Metasploit, Wireshark\nSystems: Linux, Docker, Kubernetes, Proxmox",
    projects: "Check out the projects section or ask about: 'monitor', 'media', 'honeypot'",
    contact: "Email: kushagr250@gmail.com | GitHub: github.com/Kush69420",
    monitor: "Quantum-Based IoT Pollution Monitor: Uses QKD + AES-256 for secure data transmission.",
    media: "'Media Server' -> Now running a full Proxmox Homelab with Pi-hole, WireGuard, and NAS.",
    honeypot: "AI-Enhanced Adaptive Honeypot: Uses Gemini API to classify threats and adaptively block attackers.",
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
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-gray-200 font-mono placeholder-gray-600 focus:ring-0"
                    placeholder="Type a command..."
                />
            </form>
        </TerminalWindow>
    );
};
