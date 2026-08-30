import { motion } from 'framer-motion';
import { GitBranch, ExternalLink, Code } from 'lucide-react';

interface ProjectProps {
    project: {
        title: string;
        description: string;
        tech: string[];
        tags: string[];
        links: {
            github: string;
            demo: string;
        };
    };
    index: number;
}

export const ProjectCard: React.FC<ProjectProps> = ({ project, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-[#0c0c0c] border border-gray-800 rounded-xl overflow-hidden hover:border-cyber-blue/50 transition-all duration-300 flex flex-col min-h-[24rem]"
        >
            {/* Holographic Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/5 to-cyber-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

            <div className="p-6 relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-2 flex-wrap">
                        {project.tags.map((tag, i) => (
                            <span key={i} className="text-[10px] uppercase tracking-wider font-bold text-cyber-green border border-cyber-green/20 px-2 py-0.5 rounded-full bg-cyber-green/5">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-3">
                        {project.links.github && (
                            <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <GitBranch className="w-5 h-5" />
                            </a>
                        )}
                        {project.links.demo && (
                            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <ExternalLink className="w-5 h-5" />
                            </a>
                        )}
                    </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyber-blue transition-colors">
                    {project.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((t, i) => (
                        <span key={i} className="flex items-center gap-1 text-xs font-mono text-gray-500">
                            <Code className="w-3 h-3" />
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};
