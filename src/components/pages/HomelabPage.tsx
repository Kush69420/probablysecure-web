import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Homelab } from '../sections/Homelab';
import { Services } from '../sections/Services';
import { useStatus } from '../../hooks/useStatus';

export const HomelabPage = () => {
    const { data, error, history } = useStatus();

    return (
        <>
            <section className="mx-auto max-w-6xl px-5 pt-28 pb-16">
                <a href="/#projects" className="inline-flex items-center gap-2 text-sm text-cyber-blue hover:underline"><ArrowLeft className="h-4 w-4" />Back to portfolio</a>
                <h1 className="mt-8 text-4xl sm:text-6xl font-bold text-white tracking-tight">Homelab, built to recover.</h1>
                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-neutral-300">I operate a self-hosted production environment for remote media streaming and file access: nine containerized services across a NAS and Raspberry Pi, behind authenticated web access.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                    <a href="#recovery" className="inline-flex items-center gap-2 rounded border border-cyber-blue px-4 py-3 text-cyber-blue hover:bg-cyber-blue/10">How recovery works<ArrowRight className="h-4 w-4" /></a>
                    <a href="#homelab" className="rounded border border-neutral-700 px-4 py-3 text-neutral-300 hover:border-neutral-500">View live telemetry</a>
                </div>
                <div className="mt-12 border-y border-neutral-800 py-6 grid gap-4 sm:grid-cols-[12rem_1fr]">
                    <h2 className="font-mono text-cyber-blue">Platform & access</h2>
                    <div className="max-w-3xl space-y-3 text-neutral-400 leading-relaxed">
                        <p>Debian and Docker Compose run the workloads. Nginx, OAuth2 Proxy, and Cloudflare Tunnel provide authenticated web access without inbound port forwarding.</p>
                        <p>Python and systemd automate recovery and connectivity checks. This public showcase shares operating practices, sanitized telemetry, and links to the authenticated services, not internal addresses or credentials.</p>
                    </div>
                </div>
            </section>
            <section id="recovery" className="mx-auto max-w-6xl px-5 pb-16">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">From power loss to service recovery</h2>
                <p className="max-w-3xl text-neutral-400 leading-relaxed mb-8">Recovery previously required about 20 minutes of manual intervention. Automating the full stack with systemd, Wake-on-LAN, and campus-session renewal brought service recovery to 150 seconds.</p>
                <dl className="grid gap-8 md:grid-cols-2">
                    <div><dt className="text-cyber-blue font-mono mb-3">Recovery automation</dt><dd className="text-neutral-400 leading-relaxed">Coordinate host startup, network access, and service recovery using systemd, Wake-on-LAN, and campus-session renewal. Regularly test power-loss recovery and backup restoration.</dd></div>
                    <div><dt className="text-cyber-blue font-mono mb-3">Monitoring & alerting</dt><dd className="text-neutral-400 leading-relaxed">Monitor service availability, disk utilization, and TLS certificate expiry. The live monitor below reports only the telemetry currently available from the existing collector.</dd></div>
                </dl>
                <h3 className="text-xl font-semibold text-white mt-12 mb-5">Failures that shaped the system</h3>
                <dl className="divide-y divide-neutral-800 border-y border-neutral-800">
                    <div className="grid gap-3 py-6 sm:grid-cols-[12rem_1fr]"><dt className="text-neutral-200 font-medium">Duplicate-IP outages</dt><dd className="max-w-3xl text-neutral-400 leading-relaxed">Diagnosed conflicting addresses using ARP responses and moved campus addressing to DHCP.</dd></div>
                    <div className="grid gap-3 py-6 sm:grid-cols-[12rem_1fr]"><dt className="text-neutral-200 font-medium">x86 client on ARM64</dt><dd className="max-w-3xl text-neutral-400 leading-relaxed">Ran an x86-only authentication client on ARM64 using QEMU and added scheduled connectivity checks.</dd></div>
                </dl>
            </section>
            <Services />
            <Homelab status={data} error={error} history={history} />
            <div className="mx-auto max-w-6xl px-5 pb-16"><a href="/resume" target="_blank" rel="noopener noreferrer" className="text-cyber-blue hover:underline">Read the full resume →</a></div>
        </>
    );
};
