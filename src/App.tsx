import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Services } from './components/sections/Services';
import { Homelab } from './components/sections/Homelab';
import { Skills } from './components/sections/Skills';
import { Contact } from './components/sections/Contact';
import { useStatus } from './hooks/useStatus';

export default function App() {
    const { data, error, history } = useStatus();

    return (
        <div className="relative min-h-screen">
            <div className="grid-bg pointer-events-none fixed inset-0 -z-10" aria-hidden />
            <div
                className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(0,229,255,0.10),transparent)]"
                aria-hidden
            />
            <Navbar />
            <main>
                <Hero />
                <About />
                <Experience />
                <Projects />
                <Services status={data} />
                <Homelab status={data} error={error} history={history} />
                <Skills />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}
