import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { 
  Lightbulb, 
  GraduationCap, 
  MessageSquare, 
  Users, 
  FileText, 
  Cpu, 
  Target, 
  Eye,
  Mail,
  Facebook,
  Linkedin,
  Instagram,
  Trophy,
  Rocket,
  BookOpen
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function AboutPage() {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'AUST Robotics Club';

  useEffect(() => {
    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  const objectives = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Innovative Development',
      description: 'Fostering creativity and innovation in robotics through hands-on projects and cutting-edge technology.'
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: 'Knowledge Enhancement',
      description: 'Organizing workshops, trainings, and competitions to enhance technical skills and expertise.'
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Educational Outreach',
      description: 'Conducting seminars, discussions, and knowledge-sharing sessions for continuous learning.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Social Development',
      description: 'Building strong collaborations and networks within and beyond AUST community.'
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Information Sharing',
      description: 'Publishing newsletters, magazines, and updates to keep members informed and engaged.'
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: 'Robotics Excellence',
      description: 'Driving excellence in robotics through research, development, and practical applications.'
    }
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      icon: <Facebook className="w-6 h-6" />,
      url: 'https://www.facebook.com/austrc',
      color: '#1877F2'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-6 h-6" />,
      url: 'https://www.linkedin.com/company/austrc',
      color: '#0A66C2'
    },
    {
      name: 'Instagram',
      icon: <Instagram className="w-6 h-6" />,
      url: 'https://www.instagram.com/austrc',
      color: '#E4405F'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2ECC71]/10 via-white to-[#2ECC71]/20 text-gray-900 pt-24">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-br from-[#2ECC71]/15 via-white to-[#27AE60]/10">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[500px] h-[500px] bg-[#2ECC71]/40 rounded-full blur-[150px] -top-48 -left-48 animate-pulse" />
          <div className="absolute w-[500px] h-[500px] bg-[#27AE60]/40 rounded-full blur-[150px] -bottom-48 -right-48 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute w-[300px] h-[300px] bg-[#2ECC71]/30 rounded-full blur-[100px] top-1/2 left-1/4 animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute w-[400px] h-[400px] bg-green-400/30 rounded-full blur-[120px] top-1/4 right-1/3 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center mb-8"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2ECC71] to-[#27AE60] rounded-3xl blur-3xl opacity-80 group-hover:opacity-100 transition-opacity animate-pulse" />
                <div className="relative w-32 h-32 bg-gradient-to-br from-[#2ECC71] to-[#27AE60] rounded-3xl flex items-center justify-center shadow-[0_0_100px_0_rgba(46,204,113,0.8)]">
                  <span className="text-white text-6xl">A</span>
                </div>
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-[#2ECC71] via-[#27AE60] to-[#2ECC71] bg-clip-text text-transparent">
              {typedText}{showCursor ? '|' : ''}
            </h1>
            
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl md:text-3xl mb-4 text-gray-700 italic"
            >
              "Robotics for Building a Safer Future"
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl text-gray-600"
            >
              Where innovation meets aspiration
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Intro/Overview Section */}
      <section className="py-20 px-6 relative bg-gradient-to-br from-white via-[#2ECC71]/10 to-[#27AE60]/10 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#2ECC71]/50 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-[#27AE60]/50 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-green-400/40 rounded-full blur-[100px] animate-pulse" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#2ECC71]/40 via-green-300/20 to-[#27AE60]/40 rounded-3xl blur-2xl" />
            <div className="relative bg-white/70 backdrop-blur-xl border-2 border-[#2ECC71]/60 rounded-3xl p-12 shadow-[0_20px_60px_0_rgba(46,204,113,0.4)]">
              <h2 className="text-4xl md:text-5xl mb-8 text-center bg-gradient-to-r from-[#2ECC71] via-green-400 to-[#27AE60] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(46,204,113,0.3)]">
                About AUSTRC
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed text-center">
                AUSTRC is a leading student robotics club at Ahsanullah University of Science and Technology, 
                established in Fall 2021. With an active student-community, the club encourages developing and 
                materializing innovative robotics ideas — from microcontroller-based bots to large-scale projects 
                like Mars Rover & autonomous quadcopters.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-6 relative bg-gradient-to-b from-[#2ECC71]/8 via-[#2ECC71]/15 to-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute w-[500px] h-[500px] bg-gradient-to-br from-[#2ECC71]/40 to-transparent rounded-full blur-[120px] top-20 -left-20 animate-pulse" />
          <div className="absolute w-[450px] h-[450px] bg-gradient-to-br from-[#27AE60]/40 to-transparent rounded-full blur-[100px] bottom-20 -right-20 animate-pulse" style={{ animationDelay: '1.5s' }} />
          <div className="absolute w-[350px] h-[350px] bg-green-400/30 rounded-full blur-[90px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '0.8s' }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl mb-16 text-center bg-gradient-to-r from-[#2ECC71] via-green-400 to-[#27AE60] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(46,204,113,0.3)]"
          >
            Mission & Vision
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#2ECC71]/50 to-green-300/40 rounded-3xl blur-2xl group-hover:blur-3xl transition-all" />
              <div className="relative bg-white/80 backdrop-blur-sm border-2 border-[#2ECC71]/60 rounded-3xl p-10 h-full hover:border-[#2ECC71]/80 transition-all hover:shadow-[0_20px_60px_0_rgba(46,204,113,0.5)]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-gradient-to-br from-[#2ECC71] to-[#27AE60] p-4 rounded-2xl shadow-[0_10px_40px_0_rgba(46,204,113,0.6)]">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl text-[#2ECC71] drop-shadow-[0_0_10px_rgba(46,204,113,0.3)]">Our Mission</h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To enrich knowledge in robotics and foster sustainable projects through comprehensive 
                  educational programs, interactive workshops, specialized training sessions, and competitive 
                  events. We aim to empower students with practical skills and theoretical knowledge to excel 
                  in the field of robotics and automation.
                </p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-300/40 to-[#2ECC71]/50 rounded-3xl blur-2xl group-hover:blur-3xl transition-all" />
              <div className="relative bg-white/80 backdrop-blur-sm border-2 border-[#2ECC71]/60 rounded-3xl p-10 h-full hover:border-[#2ECC71]/80 transition-all hover:shadow-[0_20px_60px_0_rgba(46,204,113,0.5)]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-gradient-to-br from-[#2ECC71] to-[#27AE60] p-4 rounded-2xl shadow-[0_10px_40px_0_rgba(46,204,113,0.6)]">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl text-[#2ECC71] drop-shadow-[0_0_10px_rgba(46,204,113,0.3)]">Our Vision</h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To build strong bonds across clubs and groups inside and outside AUST, combining technological 
                  growth with social development. We envision a collaborative ecosystem where innovation thrives, 
                  knowledge is shared freely, and robotics enthusiasts from diverse backgrounds unite to create 
                  impactful solutions for tomorrow's challenges.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="py-20 px-6 relative overflow-hidden bg-gradient-to-br from-white via-[#2ECC71]/12 to-[#27AE60]/12">
        {/* Background Effect */}
        <div className="absolute inset-0">
          <div className="absolute w-[700px] h-[700px] bg-gradient-to-br from-[#2ECC71]/30 to-green-300/25 rounded-full blur-[200px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          <div className="absolute w-[400px] h-[400px] bg-[#2ECC71]/25 rounded-full blur-[100px] top-20 right-20 animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute w-[350px] h-[350px] bg-green-400/25 rounded-full blur-[80px] bottom-40 left-40 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute w-[300px] h-[300px] bg-[#27AE60]/25 rounded-full blur-[90px] top-40 left-20 animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl mb-16 text-center bg-gradient-to-r from-[#2ECC71] via-green-400 to-[#27AE60] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(46,204,113,0.3)]"
          >
            What We Do
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {objectives.map((objective, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#2ECC71]/40 to-green-300/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-white/80 backdrop-blur-sm border-2 border-[#2ECC71]/50 rounded-2xl p-8 h-full hover:border-[#2ECC71]/80 transition-all hover:shadow-[0_15px_40px_0_rgba(46,204,113,0.5)] hover:-translate-y-2 duration-300">
                  <div className="bg-gradient-to-br from-[#2ECC71] to-[#27AE60] p-4 rounded-xl inline-block mb-6 shadow-[0_10px_40px_0_rgba(46,204,113,0.6)] group-hover:shadow-[0_15px_50px_0_rgba(46,204,113,0.8)] transition-all text-white">
                    {objective.icon}
                  </div>
                  <h3 className="text-2xl mb-4 text-gray-900 group-hover:text-[#2ECC71] transition-colors">
                    {objective.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {objective.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership & Leadership Section */}
      <section className="py-20 px-6 relative bg-gradient-to-b from-[#2ECC71]/10 via-[#27AE60]/8 to-[#2ECC71]/12 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute w-[600px] h-[600px] bg-gradient-to-br from-[#27AE60]/30 to-transparent rounded-full blur-[150px] top-0 right-0" />
          <div className="absolute w-[550px] h-[550px] bg-gradient-to-bl from-[#2ECC71]/35 to-transparent rounded-full blur-[140px] bottom-0 left-0" />
          <div className="absolute w-[400px] h-[400px] bg-green-400/25 rounded-full blur-[120px] top-1/3 left-1/3 animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl mb-16 text-center bg-gradient-to-r from-[#2ECC71] via-green-400 to-[#27AE60] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(46,204,113,0.3)]"
          >
            Membership & Leadership
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Membership */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#2ECC71]/40 to-green-300/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-white/80 backdrop-blur-sm border-2 border-[#2ECC71]/60 rounded-3xl p-10 h-full hover:border-[#2ECC71]/80 transition-all hover:shadow-[0_20px_60px_0_rgba(46,204,113,0.5)]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-gradient-to-br from-[#2ECC71] to-[#27AE60] p-4 rounded-2xl shadow-[0_10px_40px_0_rgba(46,204,113,0.6)]">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl text-[#2ECC71] drop-shadow-[0_0_10px_rgba(46,204,113,0.3)]">Who Can Join</h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  AUSTRC welcomes all students from Ahsanullah University of Science and Technology who are 
                  passionate about robotics, technology, and innovation.
                </p>
                <div className="bg-gradient-to-r from-[#2ECC71]/25 to-transparent border-l-4 border-[#2ECC71] p-6 rounded-lg shadow-[0_0_20px_0_rgba(46,204,113,0.2)]">
                  <p className="text-gray-700">
                    A one-time registration fee grants you full club rights and privileges, including access to 
                    workshops, equipment, mentorship, and all club activities.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Leadership */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-300/30 to-[#2ECC71]/40 rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-white/80 backdrop-blur-sm border-2 border-[#2ECC71]/60 rounded-3xl p-10 h-full hover:border-[#2ECC71]/80 transition-all hover:shadow-[0_20px_60px_0_rgba(46,204,113,0.5)]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-gradient-to-br from-[#2ECC71] to-[#27AE60] p-4 rounded-2xl shadow-[0_10px_40px_0_rgba(46,204,113,0.6)]">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl text-[#2ECC71] drop-shadow-[0_0_10px_rgba(46,204,113,0.3)]">Leadership Structure</h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Our club is governed by a dedicated Executive Committee that ensures smooth operations and 
                  continuous growth.
                </p>
                <div className="space-y-3">
                  {['President', 'Vice President', 'Treasurer', 'General Secretary', 'Organizing Secretary', 'Directors & Panels'].map((role, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 bg-gradient-to-r from-[#2ECC71]/20 to-transparent p-3 rounded-lg border border-[#2ECC71]/40 hover:border-[#2ECC71]/70 transition-all hover:shadow-[0_0_15px_0_rgba(46,204,113,0.3)]"
                    >
                      <div className="w-2 h-2 bg-[#2ECC71] rounded-full shadow-[0_0_15px_0_rgba(46,204,113,1)]" />
                      <span className="text-gray-700">{role}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to="/governing-panel/hall-of-fame"
                  className="mt-6 inline-block px-6 py-3 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-lg text-white hover:shadow-[0_15px_50px_0_rgba(46,204,113,0.8)] transition-all hover:scale-105"
                >
                  View Governing Panel
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 relative overflow-hidden bg-gradient-to-br from-[#2ECC71]/15 via-[#27AE60]/10 to-[#2ECC71]/15">
        {/* Background Effect */}
        <div className="absolute inset-0">
          <div className="absolute w-[900px] h-[900px] bg-gradient-to-br from-[#2ECC71]/35 to-green-400/30 rounded-full blur-[200px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          <div className="absolute w-[500px] h-[500px] bg-green-300/35 rounded-full blur-[120px] top-10 left-10 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute w-[450px] h-[450px] bg-[#27AE60]/30 rounded-full blur-[100px] bottom-20 right-20 animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute w-[400px] h-[400px] bg-[#2ECC71]/30 rounded-full blur-[110px] top-1/4 right-1/4 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl mb-16 text-center bg-gradient-to-r from-[#2ECC71] via-green-400 to-[#27AE60] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(46,204,113,0.3)]"
          >
            Connect With Us
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#2ECC71]/45 via-green-300/30 to-[#27AE60]/45 rounded-3xl blur-2xl" />
            <div className="relative bg-white/75 backdrop-blur-xl border-2 border-[#2ECC71]/60 rounded-3xl p-12 shadow-[0_30px_100px_0_rgba(46,204,113,0.5)]">
              {/* Email */}
              <div className="flex flex-col items-center mb-12">
                <div className="bg-gradient-to-br from-[#2ECC71] to-[#27AE60] p-6 rounded-2xl mb-6 shadow-[0_15px_50px_0_rgba(46,204,113,0.7)]">
                  <Mail className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl mb-4 text-gray-900">Email Us</h3>
                <a
                  href="mailto:austrc@aust.edu"
                  className="text-xl text-[#2ECC71] hover:text-[#27AE60] transition-colors hover:underline drop-shadow-[0_0_10px_rgba(46,204,113,0.3)]"
                >
                  austrc@aust.edu
                </a>
              </div>

              {/* Social Links */}
              <div className="border-t-2 border-[#2ECC71]/40 pt-12">
                <h3 className="text-2xl mb-8 text-center text-gray-900">Follow Us On Social Media</h3>
                <div className="flex justify-center gap-8">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      className="relative group"
                    >
                      <div
                        className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all"
                        style={{ backgroundColor: `${social.color}40` }}
                      />
                      <div
                        className="relative p-6 rounded-2xl border-2 transition-all bg-white group-hover:shadow-[0_15px_50px_0_rgba(46,204,113,0.6)]"
                        style={{ borderColor: social.color }}
                      >
                        <div style={{ color: social.color }}>
                          {social.icon}
                        </div>
                      </div>
                    </motion.a>
                  ))}
                  
                  {/* Mail Icon */}
                  <motion.a
                    href="mailto:austrc@aust.edu"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: socialLinks.length * 0.1 }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="relative group"
                  >
                    <div
                      className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all"
                      style={{ backgroundColor: '#2ECC7150' }}
                    />
                    <div
                      className="relative p-6 rounded-2xl border-2 transition-all bg-white group-hover:shadow-[0_15px_50px_0_rgba(46,204,113,0.6)]"
                      style={{ borderColor: '#2ECC71' }}
                    >
                      <div style={{ color: '#2ECC71' }}>
                        <Mail className="w-6 h-6" />
                      </div>
                    </div>
                  </motion.a>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-12 text-center">
                <p className="text-xl text-gray-700 mb-6">
                  Join us in building the future of robotics!
                </p>
                <Link
                  to="/"
                  className="inline-block px-10 py-4 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-lg text-white text-lg hover:shadow-[0_20px_60px_0_rgba(46,204,113,0.8)] transition-all hover:scale-105"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fun Facts / Stats Section */}
      <section className="py-20 px-6 relative bg-gradient-to-b from-white via-[#2ECC71]/12 to-[#27AE60]/15 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0">
          <div className="absolute w-[550px] h-[550px] bg-[#2ECC71]/30 rounded-full blur-[150px] top-1/2 left-0 -translate-y-1/2 animate-pulse" />
          <div className="absolute w-[500px] h-[500px] bg-green-300/30 rounded-full blur-[130px] top-1/2 right-0 -translate-y-1/2 animate-pulse" style={{ animationDelay: '1.5s' }} />
          <div className="absolute w-[400px] h-[400px] bg-[#27AE60]/25 rounded-full blur-[120px] top-0 left-1/2 -translate-x-1/2 animate-pulse" style={{ animationDelay: '0.8s' }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-4 gap-6"
          >
            {[
              { number: '2021', label: 'Established' },
              { number: '500+', label: 'Active Members' },
              { number: '50+', label: 'Projects Completed' },
              { number: '100+', label: 'Events Organized' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#2ECC71]/45 to-green-300/35 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-white/80 backdrop-blur-sm border-2 border-[#2ECC71]/60 rounded-2xl p-8 text-center hover:border-[#2ECC71]/80 transition-all hover:shadow-[0_15px_50px_0_rgba(46,204,113,0.5)] hover:-translate-y-1">
                  <div className="text-4xl md:text-5xl mb-3 bg-gradient-to-r from-[#2ECC71] via-green-400 to-[#27AE60] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(46,204,113,0.4)]">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}