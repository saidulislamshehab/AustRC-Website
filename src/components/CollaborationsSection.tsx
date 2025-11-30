import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'motion/react';
import { Card, CardContent } from './ui/card';

const collaborators = [
  { name: 'Tech Innovators Inc', logo: 'TI' },
  { name: 'Robotics Alliance', logo: 'RA' },
  { name: 'Future Labs', logo: 'FL' },
  { name: 'Innovation Hub', logo: 'IH' },
  { name: 'Smart Systems Co', logo: 'SS' },
  { name: 'AI Research Center', logo: 'AR' },
  { name: 'Automation Solutions', logo: 'AS' },
  { name: 'Engineering Partners', logo: 'EP' },
];

export function CollaborationsSection() {
  const [isPaused, setIsPaused] = useState(false);
  const x = useMotionValue(0);
  const speed = -64; // pixels per second (1920px in 30s = 64px/s)

  useAnimationFrame((t, delta) => {
    if (!isPaused) {
      const newX = x.get() + (speed * delta) / 1000;
      // Reset to 0 when we've scrolled through one full set
      if (newX <= -1920) {
        x.set(0);
      } else {
        x.set(newX);
      }
    }
  });

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(46,204,113,0.05)] via-transparent to-transparent" />
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
            <span className="text-[#2ECC71] text-sm">Partners & Sponsors</span>
          </div>
          <h2 className="mb-4 tracking-tight text-white text-5xl">Event Collaborations</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Proud to collaborate with leading institutions, industry partners, and innovation hubs.
          </p>
        </motion.div>

        <div 
          className="relative overflow-hidden mb-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            className="flex gap-6"
            style={{ x }}
          >
            {/* First set of collaborators */}
            {collaborators.map((collaborator) => (
              <div key={`first-${collaborator.name}`} className="flex-shrink-0 w-64">
                <Card className="group hover:shadow-[0_0_40px_0_rgba(46,204,113,0.3)] transition-all duration-300 bg-gradient-to-br from-[rgba(46,204,113,0.05)] to-transparent border-[rgba(46,204,113,0.2)] hover:border-[rgba(46,204,113,0.5)] cursor-pointer backdrop-blur-sm">
                  <CardContent className="p-8 flex flex-col items-center justify-center text-center h-40">
                    <div className="bg-gradient-to-br from-[#2ECC71] to-[#27AE60] w-16 h-16 rounded-full flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform shadow-[0_0_30px_0_rgba(46,204,113,0.6)]">
                      <span className="text-xl">{collaborator.logo}</span>
                    </div>
                    <div className="text-sm group-hover:text-[#2ECC71] transition-colors text-gray-300">
                      {collaborator.name}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {collaborators.map((collaborator) => (
              <div key={`second-${collaborator.name}`} className="flex-shrink-0 w-64">
                <Card className="group hover:shadow-[0_0_40px_0_rgba(46,204,113,0.3)] transition-all duration-300 bg-gradient-to-br from-[rgba(46,204,113,0.05)] to-transparent border-[rgba(46,204,113,0.2)] hover:border-[rgba(46,204,113,0.5)] cursor-pointer backdrop-blur-sm">
                  <CardContent className="p-8 flex flex-col items-center justify-center text-center h-40">
                    <div className="bg-gradient-to-br from-[#2ECC71] to-[#27AE60] w-16 h-16 rounded-full flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform shadow-[0_0_30px_0_rgba(46,204,113,0.6)]">
                      <span className="text-xl">{collaborator.logo}</span>
                    </div>
                    <div className="text-sm group-hover:text-[#2ECC71] transition-colors text-gray-300">
                      {collaborator.name}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '25+', label: 'Partner Organizations' },
            { value: '100+', label: 'Joint Events' },
            { value: '50+', label: 'Industry Mentors' },
            { value: '$500K+', label: 'Funding Secured' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 rounded-lg bg-gradient-to-br from-[rgba(46,204,113,0.1)] to-transparent border border-[rgba(46,204,113,0.2)]"
            >
              <div className="text-4xl text-[#2ECC71] mb-2 font-bold">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
