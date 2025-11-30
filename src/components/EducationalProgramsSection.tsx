import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { BookOpen, Code, Cpu, Users } from 'lucide-react';

const programs = [
  {
    icon: BookOpen,
    title: 'Robotics Fundamentals',
    description: 'Learn the basics of robotics, from mechanics to programming.',
  },
  {
    icon: Code,
    title: 'Advanced Programming',
    description: 'Master Python, C++, and ROS for robotics applications.',
  },
  {
    icon: Cpu,
    title: 'AI & Machine Learning',
    description: 'Explore AI integration in robotics and autonomous systems.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Work on real-world projects in collaborative teams.',
  },
];

const commands = [
  { cmd: '/robotics_basics', desc: 'Start with fundamentals' },
  { cmd: '/advanced_ai', desc: 'Learn AI integration' },
  { cmd: '/build_project', desc: 'Create your first robot' },
  { cmd: '/join_team', desc: 'Collaborate with peers' },
];

export function EducationalProgramsSection() {
  return (
    <section id="programs" className="py-20 bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(46,204,113,0.1)] via-transparent to-[rgba(46,204,113,0.1)] blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-[rgba(46,204,113,0.1)] to-[rgba(46,204,113,0.05)] rounded-full border border-[rgba(46,204,113,0.3)] mb-4">
            <span className="text-[#2ECC71] text-sm">Learn & Grow</span>
          </div>
          <h2 className="mb-4 tracking-tight text-white text-5xl">Educational Programs</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Simple steps to mastery. No technical background required.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Automation Essentials Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="overflow-hidden bg-gradient-to-br from-[rgba(46,204,113,0.1)] to-transparent border-[rgba(46,204,113,0.3)] hover:border-[rgba(46,204,113,0.6)] transition-all hover:shadow-[0_0_40px_0_rgba(46,204,113,0.4)] backdrop-blur-sm">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1760894942780-2b4b82a42ac3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMGF1dG9tYXRpb24lMjB3b3Jrc2hvcHxlbnwxfHx8fDE3NjM0NjgwNDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Automation Essentials"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-white mb-2 tracking-tight">Automation Essentials</h3>
                <p className="text-gray-400 text-sm">Master the fundamentals of automation and robotics systems</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Hands on Workshop Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="overflow-hidden bg-gradient-to-br from-[rgba(46,204,113,0.1)] to-transparent border-[rgba(46,204,113,0.3)] hover:border-[rgba(46,204,113,0.6)] transition-all hover:shadow-[0_0_40px_0_rgba(46,204,113,0.4)] backdrop-blur-sm">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1745571479662-54a2ad1c747f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kcyUyMG9uJTIwZWxlY3Ryb25pY3MlMjB0cmFpbmluZ3xlbnwxfHx8fDE3NjM0NjgwNDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Hands on Workshop"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-white mb-2 tracking-tight">Hands on Workshop</h3>
                <p className="text-gray-400 text-sm">Practical experience with real-world robotics projects and tools</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
