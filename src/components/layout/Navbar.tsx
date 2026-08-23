import { useEffect, useState } from 'react';
import { cn } from '../../utils/cn';

interface Props { online: boolean | null }

const LINKS = [
    { href: '#services', label: 'SERVICES' },
    { href: '#homelab', label: 'MONITOR' },
];

export const Navbar = ({ online }: Props) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={cn(
                'fixed inset-x-0 top-0 z-50 transition-all duration-300',
                scrolled ? 'border-b border-neutral-800/80 bg-cyber-dark/85 backdrop-blur-md' : 'border-b border-transparent',
            )}
        >
            <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
                <a href="#" className="group flex items-center gap-2">
                    <span className="text-cyber-blue transition-transform group-hover:rotate-90">◆</span>
                    <span className="font-mono text-sm tracking-tight text-white">
                        probably<span className="text-cyber-blue">secure</span>
                        <span className="text-neutral-600">.tech</span>
                    </span>
                </a>

                <nav className="flex items-center gap-6">
                    {LINKS.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            className="hidden font-mono text-[11px] tracking-wider text-neutral-500 transition-colors hover:text-cyber-blue sm:block"
                        >
                            {l.label}
                        </a>
                    ))}
                    <span className="flex items-center gap-2">
                        <span
                            className={cn(
                                'h-2 w-2 rounded-full',
                                online === null ? 'bg-neutral-600' : online ? 'animate-pulse bg-cyber-green' : 'bg-red-500',
                            )}
                        />
                        <span className="font-mono text-[11px] tracking-wider text-neutral-500">
                            {online === null ? 'SYNC' : online ? 'ONLINE' : 'DEGRADED'}
                        </span>
                    </span>
                </nav>
            </div>
        </header>
    );
};
