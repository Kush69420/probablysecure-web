import { ArrowUpRight, Clapperboard, FolderOpen, Music4 } from 'lucide-react';

const services = [
    { name: 'Navidrome', role: 'Music streaming', url: 'https://music.probablysecure.tech', host: 'music.probablysecure.tech', icon: Music4, description: 'Self-hosted music streaming, with Subsonic-compatible clients and on-demand transcoding.' },
    { name: 'Jellyfin', role: 'Film & television', url: 'https://media.probablysecure.tech', host: 'media.probablysecure.tech', icon: Clapperboard, description: 'Remote access to the media library for playback in the browser and TV apps.' },
    { name: 'File Manager', role: 'NAS file access', url: 'https://probablysecure.tech/files/', host: 'probablysecure.tech/files', icon: FolderOpen, description: 'Authenticated access to upload, browse, and manage files on the NAS.' },
];

export const Services = () => (
    <section id="services" className="px-5 py-12 border-y border-neutral-800 bg-[#0c0c0c]">
        <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Self-hosted services</h2>
            <p className="text-neutral-400 leading-relaxed mb-8">Open a service below. Access remains subject to its authentication requirements.</p>
            <div className="grid gap-5 md:grid-cols-3">
                {services.map(service => (
                    <a key={service.name} href={service.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col rounded-xl border border-neutral-800 bg-[#101010] p-6 transition-colors hover:border-cyber-blue/50">
                        <div className="flex items-center justify-between text-cyber-blue">
                            <service.icon className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
                            <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <h3 className="mt-6 text-xl font-semibold text-white group-hover:text-cyber-blue">{service.name}</h3>
                        <p className="mt-1 text-sm text-cyber-green">{service.role}</p>
                        <p className="mt-4 mb-6 text-sm text-neutral-400 leading-relaxed">{service.description}</p>
                        <span className="mt-auto border-t border-neutral-800 pt-4 font-mono text-xs text-cyber-blue break-all">{service.host}</span>
                    </a>
                ))}
            </div>
        </div>
    </section>
);
