import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Quote } from "lucide-react";
import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Alex Thompson",
    role: "Alumni, Software Engineer at Tesla",
    content:
      "AUSRC gave me the foundation I needed to pursue my dreams in robotics. The mentorship and hands-on projects were invaluable.",
    initials: "AT",
  },
  {
    name: "Priya Sharma",
    role: "Current Member, Research Assistant",
    content:
      "The research opportunities and collaborative environment at AUSRC have accelerated my learning beyond anything I imagined.",
    initials: "PS",
  },
  {
    name: "Marcus Johnson",
    role: "Alumni, Robotics Engineer",
    content:
      "Being part of AUSRC was transformative. I learned not just technical skills, but also how to work in teams and lead projects.",
    initials: "MJ",
  },
  {
    name: "Sophie Chen",
    role: "Current Member, Team Leader",
    content:
      "The community at AUSRC is amazing. Everyone is passionate, supportive, and driven to create innovative solutions.",
    initials: "SC",
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [carousel1Index, setCarousel1Index] = useState(0);
  const [carousel2Index, setCarousel2Index] = useState(0);

  const carousel1Images = [
    "https://images.unsplash.com/photo-1755053757912-a63da9d6e0e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMHN0dWRlbnRzJTIwd29ya3Nob3B8ZW58MXx8fHwxNzYzNDY5NTg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1743677077216-00a458eff9e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMGNsYXNzcm9vbSUyMGxlYXJuaW5nfGVufDF8fHx8MTc2MzQ2OTU4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1760493828288-d2dbb70d18c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwaW5ub3ZhdGlvbiUyMGxhYnxlbnwxfHx8fDE3NjMzNzM1MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  ];

  const carousel2Images = [
    "https://images.unsplash.com/photo-1760894942780-2b4b82a42ac3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMGF1dG9tYXRpb24lMjB3b3Jrc2hvcHxlbnwxfHx8fDE3NjM0NjgwNDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1745571479662-54a2ad1c747f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kcyUyMG9uJTIwZWxlY3Ryb25pY3MlMjB0cmFpbmluZ3xlbnwxfHx8fDE3NjM0NjgwNDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1755053757912-a63da9d6e0e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMHN0dWRlbnRzJTIwd29ya3Nob3B8ZW58MXx8fHwxNzYzNDY5NTg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  ];

  useEffect(() => {
    const interval1 = setInterval(() => {
      setCarousel1Index(
        (prev) => (prev + 1) % carousel1Images.length,
      );
    }, 3000);

    const interval2 = setInterval(() => {
      setCarousel2Index(
        (prev) => (prev + 1) % carousel2Images.length,
      );
    }, 3500);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#2ECC71] rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="tracking-tight text-white text-5xl">
            VOICE OF AUSTRC
          </h2>
        </motion.div>

        {/* Carousels Side by Side */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Carousel 1 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ perspective: "1000px" }}
          >
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-[rgba(46,204,113,0.3)] shadow-[0_0_50px_0_rgba(46,204,113,0.4)]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={carousel1Index}
                  src={carousel1Images[carousel1Index]}
                  alt={`Carousel 1 - Image ${carousel1Index + 1}`}
                  className="w-full h-full object-cover"
                  initial={{ 
                    opacity: 0, 
                    scale: 1.3, 
                    rotateY: -15,
                    filter: "blur(10px)"
                  }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    rotateY: 0,
                    filter: "blur(0px)"
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.8,
                    rotateY: 15,
                    filter: "blur(10px)"
                  }}
                  transition={{ 
                    duration: 1.2,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white mb-2">
                  Robotics Innovation
                </h3>
                <p className="text-gray-300 text-sm">
                  Explore our cutting-edge robotics workshops
                  and projects
                </p>
              </div>
              {/* Dots Indicator */}
              <div className="absolute bottom-6 right-6 flex gap-2">
                {carousel1Images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === carousel1Index
                        ? "bg-[#2ECC71] w-6 shadow-[0_0_10px_0_rgba(46,204,113,0.8)]"
                        : "bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Carousel 2 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ perspective: "1000px" }}
          >
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-[rgba(46,204,113,0.3)] shadow-[0_0_50px_0_rgba(46,204,113,0.4)]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={carousel2Index}
                  src={carousel2Images[carousel2Index]}
                  alt={`Carousel 2 - Image ${carousel2Index + 1}`}
                  className="w-full h-full object-cover"
                  initial={{ 
                    opacity: 0, 
                    x: 150,
                    rotateZ: 5,
                    scale: 1.2,
                    filter: "blur(8px) brightness(0.5)"
                  }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    rotateZ: 0,
                    scale: 1,
                    filter: "blur(0px) brightness(1)"
                  }}
                  exit={{ 
                    opacity: 0, 
                    x: -150,
                    rotateZ: -5,
                    scale: 0.9,
                    filter: "blur(8px) brightness(0.5)"
                  }}
                  transition={{ 
                    duration: 1,
                    ease: [0.68, -0.55, 0.265, 1.55]
                  }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white mb-2">
                  Hands-on Learning
                </h3>
                <p className="text-gray-300 text-sm">
                  Experience practical robotics education with
                  expert guidance
                </p>
              </div>
              {/* Dots Indicator */}
              <div className="absolute bottom-6 right-6 flex gap-2">
                {carousel2Images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === carousel2Index
                        ? "bg-[#2ECC71] w-6 shadow-[0_0_10px_0_rgba(46,204,113,0.8)]"
                        : "bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}