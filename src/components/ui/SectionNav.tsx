import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'services', label: 'Services' },
    { id: 'homelab', label: 'Homelab' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
];

export const SectionNav = () => {
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-20% 0px -80% 0px" // Trigger when section is near top
            }
        );

        sections.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden md:flex flex-col gap-6 items-end">
            {sections.map(({ id, label }) => (
                <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className="group flex items-center gap-4 relative"
                >
                    {/* Label appearing on hover */}
                    {/* Label appearing on hover or when active */}
                    <span
                        className={cn(
                            "text-xs font-mono transition-all duration-300",
                            activeSection === id
                                ? "opacity-100 translate-x-0 text-cyber-blue font-bold tracking-widest scale-110"
                                : "opacity-0 -translate-x-4 text-gray-500 group-hover:opacity-100 group-hover:translate-x-0"
                        )}
                    >
                        {label}
                    </span>

                    {/* Dot/Line Indicator */}
                    <motion.div
                        className={cn(
                            "w-2 h-2 rounded-full transition-all duration-300",
                            activeSection === id
                                ? "bg-cyber-blue shadow-[0_0_10px_rgba(0,229,255,0.8)] scale-125"
                                : "bg-gray-700 hover:bg-gray-500"
                        )}
                        layoutId="activeSection"
                    />

                    {/* Connection Line segment (visual only, complicated so skipping) */}
                </button>
            ))}

            {/* Continuous Line Background */}
            <div className="absolute right-[3px] top-0 bottom-0 w-px bg-gray-800 -z-10 h-full" />
        </div>
    );
};
