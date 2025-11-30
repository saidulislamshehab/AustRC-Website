import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Quote, Award } from "lucide-react";

const hallOfFameMembers1 = [
  {
    name: "Dr. Sarah Johnson",
    position: "President",
    year: "2023-2024",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    quote: "Leading AUSRC has been the most rewarding experience of my academic journey. Our club represents the pinnacle of innovation, where students transform theoretical knowledge into groundbreaking robotics solutions. Every project we undertake pushes the boundaries of what's possible, and seeing our members grow from curious beginners to confident engineers fills me with immense pride. Together, we're not just building robots; we're shaping the future of technology and fostering a community of passionate innovators who will change the world.",
  },
  {
    name: "Michael Chen",
    position: "Vice President",
    year: "2023-2024",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    quote: "As Vice President, I've witnessed firsthand the incredible dedication of our members. AUSRC is more than a club—it's a family of innovators united by a shared passion for robotics and automation. We've created an environment where creativity thrives, collaboration is valued, and every member's contribution matters. From organizing workshops to mentoring new members, every moment has reinforced my belief that together, we can achieve extraordinary things and inspire the next generation of robotics pioneers.",
  },
  {
    name: "Emily Rodriguez",
    position: "General Secretary",
    year: "2023-2024",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    quote: "Coordinating AUSRC's activities has given me unique insights into the power of organized collaboration. Our club thrives because every member brings unique skills and perspectives to the table. From managing logistics for competitions to ensuring smooth communication across teams, I've learned that success in robotics requires both technical excellence and exceptional teamwork. AUSRC has taught me that when passionate individuals unite with a common purpose, there's no limit to what we can accomplish in advancing robotics technology.",
  },
];

const hallOfFameMembers2 = [
  {
    name: "David Park",
    position: "President",
    year: "2022-2023",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    quote: "My tenure as President was marked by unprecedented growth and achievement. We expanded our membership, launched ambitious projects, and established partnerships with leading tech companies. AUSRC's strength lies in its ability to balance academic rigor with hands-on innovation. Every workshop, every competition, and every late-night debugging session contributed to our collective growth. I'm proud to have led a team that not only excelled in robotics but also cultivated leadership, creativity, and a genuine passion for solving real-world problems through technology.",
  },
  {
    name: "Aisha Patel",
    position: "Vice President",
    year: "2022-2023",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    quote: "Supporting AUSRC's mission as Vice President taught me invaluable lessons about leadership and innovation. We created programs that democratized access to robotics education, ensuring that every student, regardless of background, could participate in this technological revolution. Our initiatives bridged the gap between classroom theory and industry practice, preparing members for successful careers in robotics and automation. The relationships built and knowledge shared within AUSRC continue to inspire me as I pursue my career in advanced robotics research.",
  },
  {
    name: "James Williams",
    position: "General Secretary",
    year: "2022-2023",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    quote: "Managing AUSRC's operations revealed the intricate balance between vision and execution. Every event we organized, from intimate workshops to large-scale competitions, required meticulous planning and seamless coordination. I learned that effective administration empowers innovation—by streamlining processes and fostering clear communication, we enabled our technical teams to focus on what they do best: creating incredible robotics solutions. AUSRC's administrative excellence is the foundation upon which our technical achievements are built, and I'm honored to have contributed to that foundation.",
  },
];

export function HallOfFameSection() {
  const [carousel1Index, setCarousel1Index] = useState(0);
  const [carousel2Index, setCarousel2Index] = useState(0);
  const [isHovering1, setIsHovering1] = useState(false);
  const [isHovering2, setIsHovering2] = useState(false);

  useEffect(() => {
    const interval1 = setInterval(() => {
      if (!isHovering1) {
        setCarousel1Index((prev) => (prev + 1) % hallOfFameMembers1.length);
      }
    }, 5000);

    const interval2 = setInterval(() => {
      if (!isHovering2) {
        setCarousel2Index((prev) => (prev + 1) % hallOfFameMembers2.length);
      }
    }, 5500);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, [isHovering1, isHovering2]);

  return (
    <section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-[#2ECC71] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-[#27AE60] rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <Award className="w-8 h-8 text-[#2ECC71]" />
            <h2 className="tracking-tight text-white text-5xl">Hall Of Fame</h2>
            <Award className="w-8 h-8 text-[#2ECC71]" />
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Celebrating the visionary leaders who shaped AUSRC's legacy
          </p>
        </motion.div>

        {/* Carousels Side by Side */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Carousel 1 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ perspective: "1000px" }}
            onMouseEnter={() => setIsHovering1(true)}
            onMouseLeave={() => setIsHovering1(false)}
          >
            <div className="relative h-[600px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={carousel1Index}
                  className="absolute inset-0 bg-gradient-to-br from-[rgba(46,204,113,0.1)] to-transparent border border-[rgba(46,204,113,0.3)] rounded-2xl p-6 backdrop-blur-sm shadow-[0_0_50px_0_rgba(46,204,113,0.3)]"
                  initial={{
                    opacity: 0,
                    rotateY: -20,
                    scale: 0.9,
                    filter: "blur(10px)",
                  }}
                  animate={{
                    opacity: 1,
                    rotateY: 0,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    rotateY: 20,
                    scale: 0.9,
                    filter: "blur(10px)",
                  }}
                  transition={{
                    duration: 1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  {/* Image */}
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2ECC71] to-[#27AE60] rounded-full blur-md opacity-50" />
                    <img
                      src={hallOfFameMembers1[carousel1Index].image}
                      alt={hallOfFameMembers1[carousel1Index].name}
                      className="relative w-full h-full rounded-full object-cover border-4 border-[#2ECC71] shadow-[0_0_30px_0_rgba(46,204,113,0.6)]"
                    />
                  </div>

                  {/* Info */}
                  <div className="text-center mb-6">
                    <h3 className="text-white text-2xl mb-2">
                      {hallOfFameMembers1[carousel1Index].name}
                    </h3>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[rgba(46,204,113,0.2)] to-transparent border border-[rgba(46,204,113,0.3)] rounded-full mb-1">
                      <span className="text-[#2ECC71]">
                        {hallOfFameMembers1[carousel1Index].position}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mt-2">
                      {hallOfFameMembers1[carousel1Index].year}
                    </p>
                  </div>

                  {/* Quote */}
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-[#2ECC71] opacity-30" />
                    <p className="text-gray-300 text-sm leading-relaxed pl-6 pr-2 italic">
                      {hallOfFameMembers1[carousel1Index].quote}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dots Indicator */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
                {hallOfFameMembers1.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCarousel1Index(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === carousel1Index
                        ? "bg-[#2ECC71] w-8 shadow-[0_0_10px_0_rgba(46,204,113,0.8)]"
                        : "bg-gray-500 hover:bg-gray-400"
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
            onMouseEnter={() => setIsHovering2(true)}
            onMouseLeave={() => setIsHovering2(false)}
          >
            <div className="relative h-[600px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={carousel2Index}
                  className="absolute inset-0 bg-gradient-to-br from-[rgba(46,204,113,0.1)] to-transparent border border-[rgba(46,204,113,0.3)] rounded-2xl p-6 backdrop-blur-sm shadow-[0_0_50px_0_rgba(46,204,113,0.3)]"
                  initial={{
                    opacity: 0,
                    x: 100,
                    rotateZ: 5,
                    scale: 0.9,
                    filter: "blur(8px)",
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    rotateZ: 0,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    x: -100,
                    rotateZ: -5,
                    scale: 0.9,
                    filter: "blur(8px)",
                  }}
                  transition={{
                    duration: 0.9,
                    ease: [0.68, -0.55, 0.265, 1.55],
                  }}
                >
                  {/* Image */}
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2ECC71] to-[#27AE60] rounded-full blur-md opacity-50" />
                    <img
                      src={hallOfFameMembers2[carousel2Index].image}
                      alt={hallOfFameMembers2[carousel2Index].name}
                      className="relative w-full h-full rounded-full object-cover border-4 border-[#2ECC71] shadow-[0_0_30px_0_rgba(46,204,113,0.6)]"
                    />
                  </div>

                  {/* Info */}
                  <div className="text-center mb-6">
                    <h3 className="text-white text-2xl mb-2">
                      {hallOfFameMembers2[carousel2Index].name}
                    </h3>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[rgba(46,204,113,0.2)] to-transparent border border-[rgba(46,204,113,0.3)] rounded-full mb-1">
                      <span className="text-[#2ECC71]">
                        {hallOfFameMembers2[carousel2Index].position}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mt-2">
                      {hallOfFameMembers2[carousel2Index].year}
                    </p>
                  </div>

                  {/* Quote */}
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-[#2ECC71] opacity-30" />
                    <p className="text-gray-300 text-sm leading-relaxed pl-6 pr-2 italic">
                      {hallOfFameMembers2[carousel2Index].quote}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dots Indicator */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
                {hallOfFameMembers2.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCarousel2Index(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === carousel2Index
                        ? "bg-[#2ECC71] w-8 shadow-[0_0_10px_0_rgba(46,204,113,0.8)]"
                        : "bg-gray-500 hover:bg-gray-400"
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