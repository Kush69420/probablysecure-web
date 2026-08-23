import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
import { Homelab } from './components/sections/Homelab';
import { useStatus } from './hooks/useStatus';

export default function App() {
    const { data, error, history } = useStatus();
    const online = data ? !error && data.services.every((s) => s.up) : null;

    return (
        <div className="relative min-h-screen">
            <div className="grid-bg pointer-events-none fixed inset-0 -z-10" aria-hidden />
            <div
                className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(0,229,255,0.10),transparent)]"
                aria-hidden
            />
            <Navbar online={online} />
            <main>
                <Hero />
                <Services status={data} />
                <Homelab status={data} error={error} history={history} />
            </main>
            <Footer />
        </div>
    );
}
