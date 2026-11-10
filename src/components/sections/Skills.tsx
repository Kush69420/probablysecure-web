import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Cloud, Code2, Database, Network, ShieldCheck } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { cn } from '../../utils/cn';

const skillsData = [
    { category: 'Programming', icon: Code2, skills: ['Python', 'Bash', 'TypeScript', 'SQL', 'C++', 'Data structures and algorithms'] },
    { category: 'Systems & networking', icon: Network, skills: ['Linux / Debian', 'systemd', 'Proxmox VE', 'TCP/IP', 'DNS', 'HTTP/HTTPS', 'SSH', 'Nginx', 'Cloudflare Tunnel'] },
    { category: 'Cloud & platform', icon: Cloud, skills: ['Docker', 'Docker Compose', 'Kubernetes', 'AWS', 'GitHub Actions', 'Terraform', 'Ansible'] },
    { category: 'Observability', icon: Activity, skills: ['Prometheus', 'Grafana', 'Monit', 'collectd', 'Monitoring and alerting'] },
    { category: 'Reliability', icon: ShieldCheck, skills: ['SLIs / SLOs', 'Error budgets', 'Incident response', 'Root cause analysis'] },
    { category: 'Data & storage', icon: Database, skills: ['PostgreSQL', 'MySQL', 'SMB/CIFS', 'rsync', 'Btrfs RAID1'] },
];

// Identical neighbors on either side let the track re-center without a visible jump.
const slides = [...skillsData, ...skillsData, ...skillsData];

export const Skills = () => {
    const trackRef = useRef<HTMLDivElement>(null);
    const currentIndex = useRef(skillsData.length);
    const [activeCategory, setActiveCategory] = useState(0);
    const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    useEffect(() => {
        const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
        const onChange = () => setReducedMotion(preference.matches);
        preference.addEventListener('change', onChange);
        return () => preference.removeEventListener('change', onChange);
    }, []);

    const centerCard = useCallback((index: number, behavior: ScrollBehavior = 'auto') => {
        const track = trackRef.current;
        const card = track?.children[index];
        if (!track || !(card instanceof HTMLElement)) return;
        currentIndex.current = index;
        track.scrollTo({ left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2, behavior });
    }, []);

    useLayoutEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        let settleTimer: number | undefined;
        const onScroll = () => {
            const card = track.firstElementChild;
            if (!(card instanceof HTMLElement)) return;
            const step = card.offsetWidth + parseFloat(getComputedStyle(track).columnGap);
            const index = Math.max(0, Math.min(slides.length - 1, Math.round((track.scrollLeft + (track.clientWidth - card.offsetWidth) / 2) / step)));
            currentIndex.current = index;
            setActiveCategory(index % skillsData.length);
            clearTimeout(settleTimer);
            settleTimer = window.setTimeout(() => {
                if (index < skillsData.length || index >= skillsData.length * 2) {
                    centerCard(skillsData.length + index % skillsData.length, 'instant');
                }
            }, 150);
        };

        centerCard(skillsData.length, 'instant');
        const observer = new ResizeObserver(() => centerCard(currentIndex.current, 'instant'));
        observer.observe(track);
        track.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            clearTimeout(settleTimer);
            observer.disconnect();
            track.removeEventListener('scroll', onScroll);
        };
    }, [centerCard]);

    return (
        <section id="skills" className="py-20 relative bg-[#050505]">
            <div className="max-w-4xl mx-auto px-4">
                <SectionHeading num="05." title="TECHNICAL SKILLS" />
                <p className="text-gray-400 leading-relaxed mb-8">The tools and practices I use to build, operate, and recover systems.</p>

                <div
                    id="skills-carousel"
                    ref={trackRef}
                    role="region"
                    aria-label="Technical skill categories"
                    aria-roledescription="carousel"
                    tabIndex={0}
                    onKeyDown={event => {
                        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                            event.preventDefault();
                            centerCard(currentIndex.current + (event.key === 'ArrowLeft' ? -1 : 1));
                        } else if (event.key === 'Home' || event.key === 'End') {
                            event.preventDefault();
                            centerCard(event.key === 'Home' ? skillsData.length : skillsData.length * 2 - 1);
                        }
                    }}
                    className="skills-carousel relative flex items-stretch gap-6 overflow-x-auto overscroll-x-contain snap-x snap-mandatory motion-safe:scroll-smooth py-4 rounded-xl"
                >
                    {slides.map(({ category, skills, icon: Icon }, index) => {
                        const active = index % skillsData.length === activeCategory;
                        const side = (index % skillsData.length - activeCategory + skillsData.length) % skillsData.length > skillsData.length / 2 ? -1 : 1;

                        return (
                            <article
                                key={`${category}-${index}`}
                                role="group"
                                aria-roledescription="slide"
                                aria-label={`${category}, ${index % skillsData.length + 1} of ${skillsData.length}`}
                                aria-hidden={index < skillsData.length || index >= skillsData.length * 2 ? true : undefined}
                                className="min-w-0 shrink-0 basis-[78%] sm:basis-[64%] snap-center"
                            >
                                <motion.div
                                    initial={false}
                                    animate={{
                                        scale: reducedMotion || active ? 1 : 0.88,
                                        rotateY: reducedMotion || active ? 0 : side * -8,
                                        y: reducedMotion || active ? 0 : 12,
                                        opacity: active ? 1 : 0.45,
                                    }}
                                    transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 28, opacity: { duration: 0.25 } }}
                                    style={{ transformPerspective: 1200 }}
                                    className={cn(
                                        'flex h-full min-h-[20rem] flex-col rounded-xl border bg-[#0c0c0c] p-6 sm:p-8',
                                        active ? 'border-cyber-blue/50' : 'border-gray-800',
                                    )}
                                >
                                    <div className="flex items-start justify-between gap-4 border-b border-cyber-blue/20 pb-5 mb-2">
                                        <h3 className="text-2xl font-semibold text-white leading-tight">{category}</h3>
                                        <Icon className="h-6 w-6 shrink-0 text-cyber-blue" strokeWidth={1.5} aria-hidden="true" />
                                    </div>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                                        {skills.map((skill, skillIndex) => (
                                            <motion.li
                                                key={skill}
                                                initial={false}
                                                animate={{ x: reducedMotion || active ? 0 : side * 12, opacity: active ? 1 : 0.65 }}
                                                transition={{
                                                    duration: reducedMotion ? 0 : 0.3,
                                                    delay: reducedMotion || !active ? 0 : Math.min(skillIndex * 0.035, 0.2),
                                                    ease: [0.16, 1, 0.3, 1],
                                                }}
                                                className="border-b border-neutral-800/70 py-2 sm:py-3 text-sm sm:text-base font-medium leading-relaxed text-neutral-200"
                                            >{skill}</motion.li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </article>
                        );
                    })}
                </div>

                <p aria-live="polite" aria-atomic="true" className="sr-only">{skillsData[activeCategory].category}, slide {activeCategory + 1} of {skillsData.length}</p>
            </div>
        </section>
    );
};
