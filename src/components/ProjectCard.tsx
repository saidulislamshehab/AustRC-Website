// src/components/ProjectCard.tsx
import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, ArrowRight } from 'lucide-react';

interface ResearchProject {
  id: string;
  Title: string;
  CoverPicture?: string;
  Subtitle?: string;
}

interface ProjectCardProps {
  project: ResearchProject;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <a href={`/research/${project.id}`} className="block h-full">
        <Card className="h-full bg-gradient-to-br from-[#1B5E20]/20 to-[#2E7D32]/10 backdrop-blur-sm border-white/20 hover:border-[#43A047]/50 hover:shadow-[0_20px_40px_rgba(46,125,50,0.3)] transition-all duration-500 overflow-hidden">
          <div className="h-56 relative overflow-hidden group-hover:scale-105 transition-transform duration-700">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            {project.CoverPicture ? (
              <img src={project.CoverPicture} alt={project.Title} className="w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1B5E20] to-[#2E7D32]">
                <Users className="w-20 h-20 text-white/70" />
              </div>
            )}
          </div>
          <CardContent className="p-8 pt-0">
            <h3 className="text-2xl font-bold text-white mb-4 line-clamp-2 group-hover:text-[#43A047]">
              {project.Title || project.id}
            </h3>
            {project.Subtitle && <p className="text-gray-300 mb-6 line-clamp-2">{project.Subtitle}</p>}
            <div className="flex items-center justify-between">
              <Badge className="bg-[#43A047]/20 text-[#43A047] border-[#43A047]/30">Active</Badge>
              <Button variant="ghost" size="sm" className="text-[#43A047] hover:text-white group-hover:translate-x-2 transition-all flex items-center gap-2">
                Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </a>
    </motion.div>
  );
};

export default ProjectCard;
