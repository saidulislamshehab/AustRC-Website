import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Autonomous Navigation System',
    description: 'Developing an advanced navigation system for autonomous robots using SLAM and deep learning.',
    status: 'In Progress',
    tags: ['AI', 'Navigation', 'Deep Learning'],
    image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdCUyMGFybSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzYzNDU2ODExfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    title: 'Robotic Arm for Manufacturing',
    description: 'Building a precision robotic arm for automated assembly and quality control in manufacturing.',
    status: 'Completed',
    tags: ['Hardware', 'Automation', 'Manufacturing'],
    image: 'https://images.unsplash.com/photo-1760553120296-afe0e7692768?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMGlubm92YXRpb24lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2MzQ1NjgxMHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    title: 'Swarm Robotics Research',
    description: 'Investigating collaborative behaviors in multi-robot systems for efficient task completion.',
    status: 'In Progress',
    tags: ['Research', 'Swarm', 'AI'],
    image: 'https://images.unsplash.com/photo-1755053757912-a63da9d6e0e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMHdvcmtzaG9wJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzYzNDU2ODEwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 4,
    title: 'Medical Assistance Robot',
    description: 'Creating a robot to assist healthcare workers with patient care and medication delivery.',
    status: 'Planning',
    tags: ['Healthcare', 'Service Robot', 'Innovation'],
    image: 'https://images.unsplash.com/photo-1700936655767-7049129f1995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwZXZlbnQlMjBjb25mZXJlbmNlfGVufDF8fHx8MTc2MzQ1NjgxMHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

const statusColors: Record<string, string> = {
  'In Progress': 'bg-blue-500',
  'Completed': 'bg-[#2ECC71]',
  'Planning': 'bg-orange-500',
};

export function ResearchProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#2ECC71] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#27AE60] rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-[rgba(46,204,113,0.1)] to-[rgba(46,204,113,0.05)] rounded-full border border-[rgba(46,204,113,0.3)] mb-4">
            <span className="text-[#2ECC71] text-sm">Research & Innovation</span>
          </div>
          <h2 className="mb-4 tracking-tight text-white text-5xl">Built for Performance</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We push the limits with state-of-the-art research. Fast, scalable, and innovative solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group cursor-pointer overflow-hidden bg-gradient-to-br from-[rgba(46,204,113,0.05)] to-transparent border-[rgba(46,204,113,0.2)] hover:border-[rgba(46,204,113,0.5)] transition-all duration-300 hover:shadow-[0_0_40px_0_rgba(46,204,113,0.3)] h-full backdrop-blur-sm">
                <div className="relative overflow-hidden h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <div className="text-white flex items-center gap-2 bg-[#2ECC71] px-4 py-2 rounded-full shadow-[0_0_30px_0_rgba(46,204,113,0.8)]">
                      <span>View Details</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`${statusColors[project.status]} text-white px-3 py-1 rounded-full text-sm shadow-[0_0_20px_0_rgba(46,204,113,0.6)]`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="w-3 h-3 bg-[#2ECC71] rounded-full shadow-[0_0_20px_0_rgba(46,204,113,0.8)]" />
                  </div>
                </div>

                <CardContent className="p-4 space-y-3 bg-black/40 backdrop-blur-sm">
                  <h3 className="tracking-tight group-hover:text-[#2ECC71] transition-colors text-white">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 text-sm">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        className="bg-[#2ECC71]/10 text-[#2ECC71] hover:bg-[#2ECC71] hover:text-white transition-colors border border-[rgba(46,204,113,0.3)]"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
