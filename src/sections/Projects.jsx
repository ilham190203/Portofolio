import { projectsData } from '../data';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Reveal from '../components/Reveal';
import GlowCard from '../components/GlowCard';

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 md:px-12 lg:px-24 relative">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-100 mb-16 text-center">
            Featured Projects
          </h2>
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
            <div 
              key={index}
              className={`
                ${index === 0 ? 'md:col-span-2' : ''} 
              `} 
            >
              <Reveal delay={index * 100} width="100%">
                <GlowCard className="h-full flex flex-col group">
                  <div className={`relative w-full overflow-hidden border-b border-slate-700/50 ${index === 0 ? 'h-64 md:h-96' : 'h-64'}`}>
                    <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-all duration-300 z-10"></div>
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  <div className="p-8 flex flex-col flex-grow bg-slate-900">
                    <h3 className="text-2xl font-bold text-slate-100 mb-3 group-hover:text-sky-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-300 mb-6 leading-relaxed flex-grow">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-slate-800 text-sky-400 border border-slate-700 text-xs font-semibold rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4 pt-4 border-t border-slate-800 mt-auto">
                      <a 
                        href={project.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-slate-400 hover:text-sky-400 font-medium transition-colors"
                      >
                        <FaGithub size={18} /> Code
                      </a>
                      <a 
                        href={project.demoLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-slate-400 hover:text-sky-400 font-medium transition-colors"
                      >
                        <FaExternalLinkAlt size={16} /> Live Demo
                      </a>
                    </div>
                  </div>
                </GlowCard>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
