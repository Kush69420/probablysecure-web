import React from 'react';
import { cn } from '../../utils/cn';

interface TerminalWindowProps {
    children: React.ReactNode;
    title?: string;
    className?: string;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({ children, title = "bash", className }) => {
    return (
        <div className={cn("bg-[#0c0c0c]/80 backdrop-blur-md rounded-lg border border-gray-800 shadow-2xl overflow-hidden font-mono text-sm", className)}>
            <div className="bg-[#1a1a1a]/90 px-4 py-2 flex items-center gap-2 border-b border-gray-800">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="ml-2 text-gray-500 text-xs select-none">root@kush-agrawal:~/{title}</div>
            </div>
            <div className="p-6 text-gray-300">
                {children}
            </div>
        </div>
    );
};
