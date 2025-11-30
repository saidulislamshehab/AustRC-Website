import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { 
  Trophy, Award, Star, Calendar, Users, ArrowRight, 
  Lightbulb, Rocket, Target, ChevronLeft, ChevronRight,
  Code, Wrench, Presentation, PartyPopper, BookOpen,
  Zap, Heart, Coffee, Music
} from 'lucide-react';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';
import { Badge } from './ui/badge';
import { useLocation } from 'react-router-dom';

// Workshops Data
const workshops = [
  {
    id: 1,
    title: 'Arduino Basics Workshop',
    description: 'Learn the fundamentals of Arduino programming and electronics',
    date: 'Every Saturday',
    duration: '3 hours',
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1608889476561-6242cfdbf622?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmR1aW5vJTIwd29ya3Nob3B8ZW58MXx8fHwxNzYzNDU2ODEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    participants: 25,
    icon: Code,
  },
  {
    id: 2,
    title: 'Robotics Hardware Design',
    description: 'Hands-on experience with mechanical design and fabrication',
    date: 'Bi-Weekly',
    duration: '4 hours',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMGhhcmR3YXJlfGVufDF8fHx8MTc2MzQ1NjgxMnww&ixlib=rb-4.1.0&q=80&w=1080',
    participants: 20,
    icon: Wrench,
  },
  {
    id: 3,
    title: 'AI & Machine Learning',
    description: 'Explore artificial intelligence applications in robotics',
    date: 'Monthly',
    duration: '5 hours',
    level: 'Advanced',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaSUyMG1hY2hpbmUlMjBsZWFybmluZ3xlbnwxfHx8fDE3NjM0NTY4MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    participants: 18,
    icon: Lightbulb,
  },
  {
    id: 4,
    title: 'PCB Design Workshop',
    description: 'Design and fabricate custom printed circuit boards',
    date: 'Monthly',
    duration: '6 hours',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljcyUyMHBjYnxlbnwxfHx8fDE3NjM0NTY4MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    participants: 15,
    icon: Zap,
  },
];

// Events Data
const events = [
  {
    id: 1,
    title: 'Robotics Competition 2025',
    description: 'Annual robotics competition featuring line following, maze solving, and autonomous challenges',
    date: 'March 15, 2025',
    location: 'AUST Main Campus',
    category: 'Competition',
    image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMGNvbXBldGl0aW9ufGVufDF8fHx8MTc2MzQ1NjgxMXww&ixlib=rb-4.1.0&q=80&w=1080',
    participants: 150,
  },
  {
    id: 2,
    title: 'Tech Innovation Summit',
    description: 'Industry leaders and experts discussing future of robotics and automation',
    date: 'April 22, 2025',
    location: 'Virtual Event',
    category: 'Conference',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29uZmVyZW5jZXxlbnwxfHx8fDE3NjM0NTY4MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    participants: 200,
  },
  {
    id: 3,
    title: 'Hardware Hackathon',
    description: '24-hour hardware building marathon with exciting prizes',
    date: 'May 10, 2025',
    location: 'Engineering Lab',
    category: 'Hackathon',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWNrYXRob258ZW58MXx8fHwxNzYzNDU2ODExfDA&ixlib=rb-4.1.0&q=80&w=1080',
    participants: 80,
  },
  {
    id: 4,
    title: 'Robot Exhibition Day',
    description: 'Showcase of student projects and research to the public',
    date: 'June 5, 2025',
    location: 'AUST Exhibition Hall',
    category: 'Exhibition',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMGV4aGliaXRpb258ZW58MXx8fHwxNzYzNDU2ODEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    participants: 300,
  },
];

// Achievements Data
const achievements = [
  {
    id: 1,
    title: 'National Robotics Championship 2024',
    description: 'First place in the autonomous robot navigation challenge with our advanced SLAM-based system',
    date: 'March 2024',
    category: 'Gold Medal',
    icon: Trophy,
    image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMGNvbXBldGl0aW9ufGVufDF8fHx8MTc2MzQ1NjgxMXww&ixlib=rb-4.1.0&q=80&w=1080',
    participants: 15,
    prize: '$5,000',
  },
  {
    id: 2,
    title: 'IEEE Innovation Award',
    description: 'Recognized for outstanding innovation in embedded systems and IoT applications',
    date: 'June 2024',
    category: 'Award',
    icon: Award,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwYXdhcmR8ZW58MXx8fHwxNzYzNDU2ODExfDA&ixlib=rb-4.1.0&q=80&w=1080',
    participants: 8,
    prize: 'Trophy',
  },
  {
    id: 3,
    title: 'Best Research Paper - AI Conference',
    description: 'Published groundbreaking paper on machine learning applications in autonomous robotics',
    date: 'September 2024',
    category: 'Publication',
    icon: Star,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaSUyMHJlc2VhcmNofGVufDF8fHx8MTc2MzQ1NjgxMXww&ixlib=rb-4.1.0&q=80&w=1080',
    participants: 6,
    prize: 'Publication',
  },
  {
    id: 4,
    title: 'International Robot Olympiad',
    description: 'Silver medal in the robot soccer category against 50 international teams',
    date: 'October 2024',
    category: 'Silver Medal',
    icon: Award,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdCUyMHNvY2NlcnxlbnwxfHx8fDE3NjM0NTY4MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    participants: 10,
    prize: '$2,000',
  },
  {
    id: 5,
    title: 'Hackathon Winners 2024',
    description: 'Developed an innovative IoT solution for smart campus management',
    date: 'November 2024',
    category: 'First Place',
    icon: Trophy,
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWNrYXRob258ZW58MXx8fHwxNzYzNDU2ODExfDA&ixlib=rb-4.1.0&q=80&w=1080',
    participants: 12,
    prize: '$3,000',
  },
  {
    id: 6,
    title: 'Best Student Chapter Award',
    description: 'AUST Robotics Club recognized as the top student organization nationwide',
    date: 'December 2024',
    category: 'Excellence Award',
    icon: Star,
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwZ3JvdXB8ZW58MXx8fHwxNzYzNDU2ODExfDA&ixlib=rb-4.1.0&q=80&w=1080',
    participants: 25,
    prize: 'Recognition',
  },
];

// Educational Activities Data
const educationalActivities = [
  {
    id: 1,
    title: 'Robotics Fundamentals Course',
    description: 'Comprehensive 8-week course covering robotics basics, programming, and hardware',
    schedule: 'Weekdays 6-8 PM',
    icon: BookOpen,
    duration: '8 weeks',
    enrolled: 45,
    instructor: 'Prof. Ahmed Khan',
  },
  {
    id: 2,
    title: 'Advanced Python for Robotics',
    description: 'Learn Python programming specifically for robotics applications and ROS',
    schedule: 'Saturdays 2-5 PM',
    icon: Code,
    duration: '6 weeks',
    enrolled: 30,
    instructor: 'Dr. Sarah Rahman',
  },
  {
    id: 3,
    title: 'Computer Vision Workshop Series',
    description: 'Master computer vision techniques for autonomous robots and drones',
    schedule: 'Sundays 10-1 PM',
    icon: Target,
    duration: '5 weeks',
    enrolled: 22,
    instructor: 'Eng. Michael Chen',
  },
  {
    id: 4,
    title: 'Embedded Systems Training',
    description: 'Deep dive into microcontrollers, sensors, and real-time systems',
    schedule: 'Wednesdays 5-8 PM',
    icon: Zap,
    duration: '10 weeks',
    enrolled: 28,
    instructor: 'Dr. Lisa Wong',
  },
];

// Social Activities Data
const socialActivities = [
  {
    id: 1,
    title: 'Monthly Club Meetup',
    description: 'Casual gathering for members to network, share ideas, and collaborate',
    frequency: 'Monthly',
    icon: Coffee,
    participants: 60,
    nextDate: 'First Friday',
    location: 'Club Lounge',
  },
  {
    id: 2,
    title: 'Tech Movie Night',
    description: 'Watch and discuss technology and robotics-themed movies together',
    frequency: 'Bi-Monthly',
    icon: PartyPopper,
    participants: 40,
    nextDate: '2nd & 4th Saturday',
    location: 'Auditorium',
  },
  {
    id: 3,
    title: 'Team Building Activities',
    description: 'Fun outdoor activities to strengthen team bonds and collaboration',
    frequency: 'Quarterly',
    icon: Heart,
    participants: 80,
    nextDate: 'Every Quarter',
    location: 'Campus Grounds',
  },
  {
    id: 4,
    title: 'Cultural Night',
    description: 'Celebrate diversity with performances, food, and cultural exchange',
    frequency: 'Bi-Annual',
    icon: Music,
    participants: 100,
    nextDate: 'June & December',
    location: 'Main Hall',
  },
  {
    id: 5,
    title: 'Study Group Sessions',
    description: 'Collaborative study sessions for robotics courses and projects',
    frequency: 'Weekly',
    icon: Users,
    participants: 35,
    nextDate: 'Every Tuesday',
    location: 'Library',
  },
  {
    id: 6,
    title: 'Alumni Networking Event',
    description: 'Connect with successful alumni working in robotics and tech industry',
    frequency: 'Annual',
    icon: Rocket,
    participants: 120,
    nextDate: 'March',
    location: 'Conference Hall',
  },
];

export function ActivitiesPage() {
  // Carousel states with auto-play
  const [achievementIndex, setAchievementIndex] = useState(0);
  const [workshopIndex, setWorkshopIndex] = useState(0);
  const [eventIndex, setEventIndex] = useState(0);
  const location = useLocation();

  // Auto-play for achievements carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setAchievementIndex((prev) => (prev + 1) % achievements.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auto-play for workshops carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setWorkshopIndex((prev) => (prev + 1) % workshops.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Auto-play for events carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setEventIndex((prev) => (prev + 1) % events.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Scroll to section when hash changes
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location]);

  const currentAchievement = achievements[achievementIndex];
  const AchievementIcon = currentAchievement.icon;

  const currentWorkshop = workshops[workshopIndex];
  const WorkshopIcon = currentWorkshop.icon;

  const currentEvent = events[eventIndex];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-[#2ECC71] rounded-full blur-[150px] opacity-30"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#27AE60] rounded-full blur-[150px] opacity-20"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-block px-6 py-2 bg-gradient-to-r from-[rgba(46,204,113,0.1)] to-[rgba(46,204,113,0.05)] rounded-full border border-[rgba(46,204,113,0.3)] mb-6">
              <span className="text-[#2ECC71]">🚀 Our Journey</span>
            </div>
            <h1 className="mb-6 tracking-tight text-white text-6xl md:text-7xl">
              Activities & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ECC71] to-[#27AE60]">Achievements</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Explore our journey of innovation, collaboration, and excellence in robotics and technology
            </p>
          </motion.div>
        </div>
      </section>

      {/* Workshops Section */}
      <section id="workshops" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#2ECC71] rounded-full blur-[120px]" />
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
              <span className="text-[#2ECC71] text-sm">🔧 Workshops</span>
            </div>
            <h2 className="mb-4 tracking-tight text-white text-5xl">Hands-On Learning</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join our practical workshops and gain real-world robotics skills
            </p>
          </motion.div>

          {/* Featured Workshop Carousel */}
          <div className="relative max-w-4xl mx-auto mb-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={workshopIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="group cursor-pointer bg-gradient-to-br from-[rgba(46,204,113,0.05)] to-transparent border-[rgba(46,204,113,0.2)] hover:border-[rgba(46,204,113,0.5)] transition-all duration-300 hover:shadow-[0_0_40px_0_rgba(46,204,113,0.3)] overflow-hidden backdrop-blur-sm">
                  <div className="relative overflow-hidden">
                    <img
                      src={currentWorkshop.image}
                      alt={currentWorkshop.title}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-[#2ECC71] text-white shadow-[0_0_20px_0_rgba(46,204,113,0.6)]">
                        {currentWorkshop.level}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="w-12 h-12 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center border border-[rgba(46,204,113,0.3)]">
                        <WorkshopIcon className="w-6 h-6 text-[#2ECC71]" />
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-4 bg-black/40 backdrop-blur-sm">
                    <h3 className="tracking-tight group-hover:text-[#2ECC71] transition-colors text-white">
                      {currentWorkshop.title}
                    </h3>

                    <p className="text-gray-400 text-sm">
                      {currentWorkshop.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar className="w-4 h-4 text-[#2ECC71]" />
                        {currentWorkshop.date}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Users className="w-4 h-4 text-[#2ECC71]" />
                        {currentWorkshop.participants} seats
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 -left-4 md:-left-16 -translate-y-1/2">
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md text-[#2ECC71] border border-[rgba(46,204,113,0.3)] hover:bg-[rgba(46,204,113,0.2)] hover:border-[rgba(46,204,113,0.6)] hover:shadow-[0_0_20px_0_rgba(46,204,113,0.5)] transition-all"
                onClick={() => setWorkshopIndex((prev) => (prev > 0 ? prev - 1 : workshops.length - 1))}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
            </div>
            <div className="absolute top-1/2 -right-4 md:-right-16 -translate-y-1/2">
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md text-[#2ECC71] border border-[rgba(46,204,113,0.3)] hover:bg-[rgba(46,204,113,0.2)] hover:border-[rgba(46,204,113,0.6)] hover:shadow-[0_0_20px_0_rgba(46,204,113,0.5)] transition-all"
                onClick={() => setWorkshopIndex((prev) => (prev < workshops.length - 1 ? prev + 1 : 0))}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {workshops.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setWorkshopIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === workshopIndex
                      ? 'w-8 bg-[#2ECC71] shadow-[0_0_10px_0_rgba(46,204,113,0.8)]'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-[#27AE60] rounded-full blur-[120px]" />
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
              <span className="text-[#2ECC71] text-sm">📅 Events</span>
            </div>
            <h2 className="mb-4 tracking-tight text-white text-5xl">Upcoming Events</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join us for exciting competitions, conferences, and exhibitions
            </p>
          </motion.div>

          {/* Featured Event Carousel */}
          <div className="relative max-w-5xl mx-auto mb-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={eventIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="group cursor-pointer bg-gradient-to-br from-[rgba(46,204,113,0.05)] to-transparent border-[rgba(46,204,113,0.2)] hover:border-[rgba(46,204,113,0.5)] transition-all duration-300 hover:shadow-[0_0_40px_0_rgba(46,204,113,0.3)] overflow-hidden backdrop-blur-sm">
                  <div className="grid md:grid-cols-2">
                    <div className="relative overflow-hidden h-64 md:h-auto">
                      <img
                        src={currentEvent.image}
                        alt={currentEvent.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-gradient-to-r from-[#2ECC71] to-[#27AE60] text-white shadow-[0_0_20px_0_rgba(46,204,113,0.6)]">
                          {currentEvent.category}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-8 space-y-4 bg-black/40 backdrop-blur-sm flex flex-col justify-center">
                      <h3 className="tracking-tight group-hover:text-[#2ECC71] transition-colors text-white text-3xl">
                        {currentEvent.title}
                      </h3>

                      <p className="text-gray-400">
                        {currentEvent.description}
                      </p>

                      <div className="space-y-3 pt-4">
                        <div className="flex items-center gap-3 text-gray-400">
                          <Calendar className="w-5 h-5 text-[#2ECC71]" />
                          <span>{currentEvent.date}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-400">
                          <Target className="w-5 h-5 text-[#2ECC71]" />
                          <span>{currentEvent.location}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-400">
                          <Users className="w-5 h-5 text-[#2ECC71]" />
                          <span>{currentEvent.participants}+ Expected</span>
                        </div>
                      </div>

                      <Button
                        className="w-full mt-4 bg-[#2ECC71] hover:bg-[#27AE60] text-white"
                      >
                        Register Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 -left-4 md:-left-16 -translate-y-1/2">
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md text-[#2ECC71] border border-[rgba(46,204,113,0.3)] hover:bg-[rgba(46,204,113,0.2)] hover:border-[rgba(46,204,113,0.6)] hover:shadow-[0_0_20px_0_rgba(46,204,113,0.5)] transition-all"
                onClick={() => setEventIndex((prev) => (prev > 0 ? prev - 1 : events.length - 1))}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
            </div>
            <div className="absolute top-1/2 -right-4 md:-right-16 -translate-y-1/2">
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md text-[#2ECC71] border border-[rgba(46,204,113,0.3)] hover:bg-[rgba(46,204,113,0.2)] hover:border-[rgba(46,204,113,0.6)] hover:shadow-[0_0_20px_0_rgba(46,204,113,0.5)] transition-all"
                onClick={() => setEventIndex((prev) => (prev < events.length - 1 ? prev + 1 : 0))}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {events.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setEventIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === eventIndex
                      ? 'w-8 bg-[#2ECC71] shadow-[0_0_10px_0_rgba(46,204,113,0.8)]'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-[#2ECC71] rounded-full blur-[120px]" />
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
              <span className="text-[#2ECC71] text-sm">🏆 Achievements</span>
            </div>
            <h2 className="mb-4 tracking-tight text-white text-5xl">Hall of Excellence</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Celebrating our milestones and recognition in robotics and technology
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={achievementIndex}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="group cursor-pointer bg-gradient-to-br from-[rgba(46,204,113,0.05)] to-transparent border-[rgba(46,204,113,0.2)] hover:border-[rgba(46,204,113,0.5)] transition-all duration-300 hover:shadow-[0_0_40px_0_rgba(46,204,113,0.3)] overflow-hidden backdrop-blur-sm">
                  <div className="relative overflow-hidden">
                    <img
                      src={currentAchievement.image}
                      alt={currentAchievement.title}
                      className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-[#2ECC71] to-[#27AE60] text-white shadow-[0_0_20px_0_rgba(46,204,113,0.6)] text-base px-4 py-2">
                        {currentAchievement.category}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="w-16 h-16 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-[rgba(46,204,113,0.5)]">
                        <AchievementIcon className="w-8 h-8 text-[#2ECC71]" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white text-3xl mb-2 tracking-tight">
                        {currentAchievement.title}
                      </h3>
                    </div>
                  </div>

                  <CardContent className="p-8 space-y-4 bg-black/40 backdrop-blur-sm">
                    <p className="text-gray-300 text-lg">
                      {currentAchievement.description}
                    </p>

                    <div className="grid grid-cols-3 gap-4 pt-4">
                      <div className="text-center p-4 bg-[rgba(46,204,113,0.1)] rounded-lg border border-[rgba(46,204,113,0.2)]">
                        <Calendar className="w-5 h-5 text-[#2ECC71] mx-auto mb-2" />
                        <div className="text-xs text-gray-400">Date</div>
                        <div className="text-sm text-white">{currentAchievement.date}</div>
                      </div>
                      <div className="text-center p-4 bg-[rgba(46,204,113,0.1)] rounded-lg border border-[rgba(46,204,113,0.2)]">
                        <Users className="w-5 h-5 text-[#2ECC71] mx-auto mb-2" />
                        <div className="text-xs text-gray-400">Team</div>
                        <div className="text-sm text-white">{currentAchievement.participants} members</div>
                      </div>
                      <div className="text-center p-4 bg-[rgba(46,204,113,0.1)] rounded-lg border border-[rgba(46,204,113,0.2)]">
                        <Trophy className="w-5 h-5 text-[#2ECC71] mx-auto mb-2" />
                        <div className="text-xs text-gray-400">Prize</div>
                        <div className="text-sm text-white">{currentAchievement.prize}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 -left-4 md:-left-16 -translate-y-1/2">
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md text-[#2ECC71] border border-[rgba(46,204,113,0.3)] hover:bg-[rgba(46,204,113,0.2)] hover:border-[rgba(46,204,113,0.6)] hover:shadow-[0_0_20px_0_rgba(46,204,113,0.5)] transition-all"
                onClick={() => setAchievementIndex((prev) => (prev > 0 ? prev - 1 : achievements.length - 1))}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
            </div>
            <div className="absolute top-1/2 -right-4 md:-right-16 -translate-y-1/2">
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md text-[#2ECC71] border border-[rgba(46,204,113,0.3)] hover:bg-[rgba(46,204,113,0.2)] hover:border-[rgba(46,204,113,0.6)] hover:shadow-[0_0_20px_0_rgba(46,204,113,0.5)] transition-all"
                onClick={() => setAchievementIndex((prev) => (prev < achievements.length - 1 ? prev + 1 : 0))}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {achievements.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setAchievementIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === achievementIndex
                      ? 'w-8 bg-[#2ECC71] shadow-[0_0_10px_0_rgba(46,204,113,0.8)]'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Educational Activities Section */}
      <section id="educational-activities" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-[#27AE60] rounded-full blur-[120px]" />
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
              <span className="text-[#2ECC71] text-sm">📚 Educational Activities</span>
            </div>
            <h2 className="mb-4 tracking-tight text-white text-5xl">Learn & Grow</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Structured courses and training programs to advance your robotics knowledge
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {educationalActivities.map((activity, index) => {
              const ActivityIcon = activity.icon;
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="group cursor-pointer bg-gradient-to-br from-[rgba(46,204,113,0.05)] to-transparent border-[rgba(46,204,113,0.2)] hover:border-[rgba(46,204,113,0.5)] transition-all duration-300 hover:shadow-[0_0_40px_0_rgba(46,204,113,0.3)] backdrop-blur-sm h-full">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#2ECC71] to-[#27AE60] rounded-xl flex items-center justify-center shadow-[0_0_30px_0_rgba(46,204,113,0.6)] group-hover:shadow-[0_0_40px_0_rgba(46,204,113,0.9)] transition-all">
                          <ActivityIcon className="w-8 h-8 text-white" />
                        </div>
                        <Badge className="bg-[rgba(46,204,113,0.1)] text-[#2ECC71] border border-[rgba(46,204,113,0.2)]">
                          {activity.duration}
                        </Badge>
                      </div>

                      <h3 className="tracking-tight group-hover:text-[#2ECC71] transition-colors text-white text-xl">
                        {activity.title}
                      </h3>

                      <p className="text-gray-400 text-sm">
                        {activity.description}
                      </p>

                      <div className="space-y-2 pt-2">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Calendar className="w-4 h-4 text-[#2ECC71]" />
                          {activity.schedule}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Users className="w-4 h-4 text-[#2ECC71]" />
                          {activity.enrolled} enrolled
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Presentation className="w-4 h-4 text-[#2ECC71]" />
                          {activity.instructor}
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        className="w-full group-hover:bg-[#2ECC71] group-hover:text-white transition-all text-[#2ECC71] border border-[rgba(46,204,113,0.3)] hover:shadow-[0_0_20px_0_rgba(46,204,113,0.5)] mt-4"
                      >
                        Enroll Now
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Activities Section */}
      <section id="social-activities" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#2ECC71] rounded-full blur-[120px]" />
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
              <span className="text-[#2ECC71] text-sm">🎉 Social Activities</span>
            </div>
            <h2 className="mb-4 tracking-tight text-white text-5xl">Community & Fun</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Build connections and enjoy activities beyond technical learning
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {socialActivities.map((activity, index) => {
              const ActivityIcon = activity.icon;
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full"
                >
                  <Card className="group cursor-pointer bg-gradient-to-br from-[rgba(46,204,113,0.05)] to-transparent border-[rgba(46,204,113,0.2)] hover:border-[rgba(46,204,113,0.5)] transition-all duration-300 hover:shadow-[0_0_40px_0_rgba(46,204,113,0.3)] backdrop-blur-sm h-full flex flex-col">
                    <CardContent className="p-6 space-y-4 flex-1 flex flex-col">
                      <div className="flex items-start justify-between">
                        <div className="w-14 h-14 bg-gradient-to-br from-[#2ECC71] to-[#27AE60] rounded-xl flex items-center justify-center shadow-[0_0_30px_0_rgba(46,204,113,0.6)] group-hover:shadow-[0_0_40px_0_rgba(46,204,113,0.9)] transition-all">
                          <ActivityIcon className="w-7 h-7 text-white" />
                        </div>
                        <Badge className="bg-[rgba(46,204,113,0.1)] text-[#2ECC71] border border-[rgba(46,204,113,0.2)] text-xs">
                          {activity.frequency}
                        </Badge>
                      </div>

                      <h3 className="tracking-tight group-hover:text-[#2ECC71] transition-colors text-white">
                        {activity.title}
                      </h3>

                      <p className="text-gray-400 text-sm flex-1">
                        {activity.description}
                      </p>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Calendar className="w-4 h-4 text-[#2ECC71]" />
                          {activity.nextDate}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Target className="w-4 h-4 text-[#2ECC71]" />
                          {activity.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Users className="w-4 h-4 text-[#2ECC71]" />
                          {activity.participants}+ participants
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        className="w-full group-hover:bg-[#2ECC71] group-hover:text-white transition-all text-[#2ECC71] border border-[rgba(46,204,113,0.3)] hover:shadow-[0_0_20px_0_rgba(46,204,113,0.5)]"
                      >
                        Join Activity
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2ECC71] to-[#27AE60] opacity-10" />
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2ECC71] rounded-full blur-[200px] opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="mb-6 tracking-tight text-white text-5xl">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ECC71] to-[#27AE60]">Join Us?</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Be part of our journey in robotics and innovation. Start your adventure today!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="relative overflow-hidden bg-gradient-to-r from-[#2ECC71] to-[#27AE60] hover:from-[#27AE60] hover:to-[#2ECC71] text-white shadow-[0_0_40px_0_rgba(46,204,113,0.8)] transition-all hover:shadow-[0_0_60px_0_rgba(46,204,113,1)] hover:scale-105 px-8 py-6 text-lg rounded-lg group">
                <span className="relative z-10">Become a Member</span>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Button>
              <Button
                variant="outline"
                className="px-8 py-6 text-lg text-gray-300 hover:text-white border-[rgba(46,204,113,0.3)] hover:border-[rgba(46,204,113,0.6)] hover:bg-[rgba(46,204,113,0.1)] transition-all backdrop-blur-sm rounded-lg"
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}