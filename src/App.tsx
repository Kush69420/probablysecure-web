import { Navbar } from './components/layout/Navbar';
import { SectionNav } from './components/ui/SectionNav';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Contact } from './components/sections/Contact';
import { HomelabPage } from './components/pages/HomelabPage';

export default function App() {
    const isHomelab = window.location.pathname.replace(/\/$/, '') === '/homelab';

    return (
        <div className="relative min-h-screen">
            <div className="grid-bg pointer-events-none fixed inset-0 -z-10" aria-hidden />
            <div
                className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(0,229,255,0.10),transparent)]"
                aria-hidden
            />
            <Navbar />
            {!isHomelab && <SectionNav />}
            <main>
                {isHomelab ? <HomelabPage /> : <>
                <Hero />
                <About />
                <Experience />
                <Projects />
                <section id="homelab" className="px-5 py-20 border-y border-neutral-800">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-white mb-5">Infrastructure I actually operate.</h2>
                        <p className="text-gray-400 leading-relaxed max-w-3xl">Nine containerized services across a NAS and Raspberry Pi. Automated power-loss recovery in 150 seconds, with service monitoring, alerting, and regular backup-restoration checks.</p>
                        <a href="/homelab" className="mt-6 inline-block text-cyber-blue border border-cyber-blue/50 rounded px-5 py-3 hover:bg-cyber-blue/10">Explore the homelab &amp; live monitor →</a>
                    </div>
                </section>
                <Skills />
                <Contact />
                </>}
            </main>
            <Footer />
        </div>
    );
}
