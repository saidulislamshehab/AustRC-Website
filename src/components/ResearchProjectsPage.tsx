import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight, Calendar, User } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  summary: string;
  image: string;
  author: string;
  authorRole: string;
  authorDepartment: string;
  category: string;
  date: string;
}

export function ResearchProjectsPage() {
  const navigate = useNavigate();

  const projects: Project[] = [
    {
      id: 'autonomous-navigation-robot',
      title: 'Autonomous Navigation Robot with AI Vision',
      summary: 'Developed an intelligent robot capable of autonomous navigation using computer vision and machine learning algorithms for obstacle detection and path planning.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
      author: 'Khalid Hasan Drobo',
      authorRole: 'Member of AUST Robotics Club',
      authorDepartment: 'Student of Department of Electrical & Electronic Engineering, AUST',
      category: 'Robotics',
      date: 'March 2024'
    },
    {
      id: 'smart-home-automation',
      title: 'IoT-Based Smart Home Automation System',
      summary: 'A comprehensive smart home solution integrating IoT devices for automated control of lighting, temperature, and security systems with mobile app integration.',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800',
      author: 'Sarah Ahmed',
      authorRole: 'Research Lead, AUST Robotics Club',
      authorDepartment: 'Student of Department of Computer Science & Engineering, AUST',
      category: 'IoT',
      date: 'February 2024'
    },
    {
      id: 'drone-delivery-system',
      title: 'Autonomous Drone Delivery System',
      summary: 'Designed and implemented a GPS-guided drone system for package delivery with real-time tracking and automated landing capabilities.',
      image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800',
      author: 'Mohammed Rahman',
      authorRole: 'Technical Lead, AUST Robotics Club',
      authorDepartment: 'Student of Department of Mechanical & Production Engineering, AUST',
      category: 'Drones',
      date: 'January 2024'
    },
    {
      id: 'gesture-controlled-wheelchair',
      title: 'Gesture-Controlled Wheelchair for Disabled Persons',
      summary: 'An innovative assistive technology using hand gesture recognition to control wheelchair movement, improving accessibility and independence.',
      image: 'https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=800',
      author: 'Fatima Noor',
      authorRole: 'Member of AUST Robotics Club',
      authorDepartment: 'Student of Department of Electrical & Electronic Engineering, AUST',
      category: 'Assistive Tech',
      date: 'December 2023'
    },
    {
      id: 'solar-tracking-system',
      title: 'Dual-Axis Solar Tracking System',
      summary: 'An automated solar panel tracking system that maximizes energy efficiency by following the sun\'s position throughout the day.',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
      author: 'Rakib Hossain',
      authorRole: 'Member of AUST Robotics Club',
      authorDepartment: 'Student of Department of Electrical & Electronic Engineering, AUST',
      category: 'Renewable Energy',
      date: 'November 2023'
    },
    {
      id: 'face-recognition-attendance',
      title: 'AI-Powered Face Recognition Attendance System',
      summary: 'Implemented a real-time face recognition system for automated attendance tracking using deep learning and computer vision techniques.',
      image: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?w=800',
      author: 'Tasnim Islam',
      authorRole: 'AI Research Member, AUST Robotics Club',
      authorDepartment: 'Student of Department of Computer Science & Engineering, AUST',
      category: 'AI & Machine Learning',
      date: 'October 2023'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0a1810] to-black pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-4"
          >
            <span className="px-6 py-2 rounded-full bg-gradient-to-r from-[#2ECC71]/20 to-[#27AE60]/20 border border-[#2ECC71]/30 text-[#2ECC71] backdrop-blur-sm shadow-[0_0_30px_0_rgba(46,204,113,0.3)]">
              Innovation & Discovery
            </span>
          </motion.div>
          <h1 className="text-6xl mb-6 bg-gradient-to-r from-white via-[#2ECC71] to-white bg-clip-text text-transparent">
            Research & Projects
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore cutting-edge research and innovative projects developed by our talented members
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="relative group overflow-hidden bg-gradient-to-br from-black/90 via-[#0a1810]/90 to-black/90 border-[#2ECC71]/20 hover:border-[#2ECC71]/50 backdrop-blur-xl transition-all duration-500 hover:shadow-[0_0_60px_0_rgba(46,204,113,0.3)] h-full flex flex-col">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2ECC71]/5 via-transparent to-[#27AE60]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#2ECC71]/20 backdrop-blur-md border border-[#2ECC71]/30 shadow-[0_0_20px_0_rgba(46,204,113,0.4)]">
                    <span className="text-[#2ECC71] text-sm">{project.category}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="relative p-6 flex-1 flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-2xl text-white mb-3 group-hover:text-[#2ECC71] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4 line-clamp-3">
                      {project.summary}
                    </p>
                  </div>

                  {/* Meta Info */}
                  <div className="space-y-2 mb-4 pt-4 border-t border-[#2ECC71]/20">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <User className="w-4 h-4 text-[#2ECC71]" />
                      <span>{project.author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4 text-[#2ECC71]" />
                      <span>{project.date}</span>
                    </div>
                  </div>

                  {/* Explore Button */}
                  <Button
                    onClick={() => navigate(`/research-projects/${project.id}`)}
                    className="w-full relative overflow-hidden bg-gradient-to-r from-[#2ECC71] to-[#27AE60] hover:from-[#27AE60] hover:to-[#2ECC71] text-white shadow-[0_0_30px_0_rgba(46,204,113,0.6)] transition-all hover:shadow-[0_0_40px_0_rgba(46,204,113,0.9)] hover:scale-105 group/btn"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Explore
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left" />
                  </Button>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-lg shadow-[inset_0_0_30px_0_rgba(46,204,113,0.2)]" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
