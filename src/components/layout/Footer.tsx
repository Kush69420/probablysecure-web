const SOURCE = 'https://github.com/Kush69420/probablysecure-web';

export const Footer = () => (
    <footer className="border-t border-neutral-800/80 px-5 py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-neutral-600">
            <span>probablysecure.tech</span>
            <span>self-hosted · no cloud storage · no third-party analytics</span>
            <a
                href={SOURCE}
                className="transition-colors hover:text-cyber-blue"
                title="Commit currently deployed"
            >
                build {__BUILD_SHA__}
            </a>
        </div>
    </footer>
);
