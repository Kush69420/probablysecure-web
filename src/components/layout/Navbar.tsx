import { useState, useEffect } from 'react';
import { Menu, X, User, Briefcase, Network, Server, HardDrive, Sparkles } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useActiveSection } from '../../hooks/useActiveSection';

const navItems = [
    { name: 'About', href: '#about', icon: User },
    { name: 'Experience', href: '#experience', icon: Briefcase },
    { name: 'Projects', href: '#projects', icon: Network },
    { name: 'Services', href: '#services', icon: Server },
    { name: 'Homelab', href: '#homelab', icon: HardDrive },
    { name: 'Skills', href: '#skills', icon: Sparkles },
    { name: 'Contact', href: '#contact' },
];

const RESUME_URL = 'https://drive.google.com/file/d/1tnFw0vQluZiwyRSO9QtF6XuPog3h8wAv/view?usp=sharing';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const activeSection = useActiveSection(['home', ...navItems.map((item) => item.href.slice(1))]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const activeSectionName = navItems.find((item) => item.href === `#${activeSection}`)?.name || 'Home';

    return (
        <nav className={cn(
            'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
            scrolled ? 'bg-cyber-dark/80 backdrop-blur-md border-cyber-blue/20' : 'bg-transparent',
        )}>
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <a href="#home" className="flex-shrink-0 flex items-center gap-3">
                        <span className="text-cyber-blue font-mono font-bold text-xl tracking-tighter">
                            &lt;KA /&gt;
                        </span>
                    </a>

                    <div className="hidden md:block">
                        <div className="flex items-center space-x-8">
                            <a
                                href={RESUME_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono text-cyber-green border border-cyber-green/50 hover:bg-cyber-green/10 px-6 py-2 rounded text-sm font-bold tracking-wider transition-all duration-300"
                            >
                                Resume
                            </a>
                        </div>
                    </div>

                    <div className="md:hidden flex items-center gap-4">
                        <div className="flex items-center gap-1 text-xs font-mono text-gray-400">
                            <span className="text-cyber-green">./</span>
                            <span className="uppercase">{activeSectionName}</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-white focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-cyber-dark/95 border-b border-cyber-blue/20 backdrop-blur-xl">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    'flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium font-mono',
                                    activeSection === item.href.slice(1)
                                        ? 'text-cyber-blue bg-cyber-blue/10'
                                        : 'text-gray-300 hover:text-cyber-blue',
                                )}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.icon && <item.icon className="h-4 w-4" />}
                                {item.name}
                            </a>
                        ))}
                        <a
                            href={RESUME_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyber-green block px-3 py-2 rounded-md text-base font-medium font-mono"
                        >
                            View Resume
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};
