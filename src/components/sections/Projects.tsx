import { SectionHeading } from '../ui/SectionHeading';
import { ProjectCard } from '../ui/ProjectCard';
import { projects } from '../../data/projects';

export const Projects = () => {
    return (
        <section id="projects" className="min-h-screen py-20 relative bg-black/20 flex items-center snap-start snap-always">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <SectionHeading num="03." title="FEATURED PROJECTS" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto pb-12">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};
