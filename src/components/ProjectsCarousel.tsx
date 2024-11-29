import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  technologies: string[];
}

interface ProjectsCarouselProps {
  projects: Project[];
  viewProjectText: string;
}

export const ProjectsCarousel: React.FC<ProjectsCarouselProps> = ({ projects, viewProjectText }) => {
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-6 min-w-max px-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="w-[300px] bg-purple-900/20 rounded-lg overflow-hidden backdrop-blur-sm"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 ">{project.title}</h3>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-purple-600/20 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300"
              >
                {viewProjectText}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};