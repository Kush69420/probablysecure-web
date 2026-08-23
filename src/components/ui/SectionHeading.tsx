import { motion } from 'framer-motion';
import { GlitchText } from './GlitchText';

interface Props { num: string; title: string }

export const SectionHeading = ({ num, title }: Props) => (
    <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-10"
    >
        <span className="text-cyber-blue font-mono text-lg md:text-xl">{num}</span>
        <GlitchText
            as="h2"
            text={title}
            className="text-2xl md:text-3xl font-bold text-white tracking-tight"
        />
        <span className="h-px bg-neutral-800 flex-1 ml-2" />
    </motion.div>
);
