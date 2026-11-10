import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useActiveSection } from '../../hooks/useActiveSection';

const navItems = [
    { name: 'About', href: '/#about' },
    { name: 'Experience', href: '/#experience' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Homelab', href: '/homelab' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Contact', href: '/#contact' },
];

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const isHomelab = window.location.pathname.replace(/\/$/, '') === '/homelab';
    const activeSection = useActiveSection(['home', 'about', 'experience', 'projects', 'homelab', 'skills', 'contact']);
    const activeSectionName = isHomelab || activeSection === 'homelab' ? 'Homelab' : navItems.find(item => item.href === `/#${activeSection}`)?.name || 'Home';

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav aria-label="Main navigation" className={cn(
            'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
            scrolled || isOpen ? 'bg-cyber-dark/95 border-cyber-blue/20' : 'bg-cyber-dark/80',
        )}>
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <a href="/#home" aria-label="Kush Agrawal home" className="text-cyber-blue font-mono font-bold text-xl tracking-tighter">&lt;KA /&gt;</a>
                    <div className="hidden md:flex items-center gap-6">
                        <a href="/#projects" className="font-mono text-sm text-gray-300 hover:text-cyber-blue">Projects</a>
                        <a href="/homelab" aria-current={isHomelab ? 'page' : undefined} className={cn('font-mono text-sm hover:text-cyber-blue', isHomelab ? 'text-cyber-blue' : 'text-gray-300')}>Homelab</a>
                        <a href="/resume" target="_blank" rel="noopener noreferrer" className="font-mono text-cyber-green border border-cyber-green/50 hover:bg-cyber-green/10 px-6 py-2 rounded text-sm font-bold tracking-wider transition-colors">Resume</a>
                    </div>
                    <div className="md:hidden flex items-center gap-4">
                        <span className="uppercase text-xs font-mono text-gray-400">{activeSectionName}</span>
                        <button onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={isOpen} aria-controls="mobile-navigation" className="p-2 text-gray-300 hover:text-white">
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div id="mobile-navigation" className="md:hidden bg-cyber-dark border-b border-cyber-blue/20 px-4 py-3 space-y-1">
                    {navItems.map(item => (
                        <a key={item.name} href={item.href} onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded text-gray-300 font-mono hover:text-cyber-blue">{item.name}</a>
                    ))}
                    <a href="/resume" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)} className="text-cyber-green block px-3 py-3 font-mono">View Resume</a>
                </div>
            )}
        </nav>
    );
};
