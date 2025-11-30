import { motion } from "motion/react";
import { Button } from "./ui/button";
import { ArrowRight, Sparkles, Cpu } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[rgba(46,204,113,0.15)] via-transparent to-[rgba(46,204,113,0.15)] blur-3xl"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Neon Gradient Orbs */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-[#2ECC71] rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#27AE60] rounded-full blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-full blur-[100px]"
          animate={{
            rotate: [0, 360],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[rgba(46,204,113,0.1)] to-[rgba(46,204,113,0.05)] rounded-full border border-[rgba(46,204,113,0.3)] shadow-[0_0_30px_0_rgba(46,204,113,0.3)]"
          >
            <Cpu className="w-4 h-4 text-[#2ECC71]" />
            <span className="text-[#2ECC71] text-sm text-[20px]">
              AUST Robotics Club
            </span>
            <Sparkles className="w-4 h-4 text-[#2ECC71]" />
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h1 className="tracking-tight text-white text-6xl md:text-7xl lg:text-8xl">
              Robotics For
            </h1>
            <h1
              className="tracking-tight text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-[#2ECC71] via-[#27AE60] to-[#2ECC71]"
              style={{
                WebkitTextFillColor: "transparent",
                backgroundImage:
                  "linear-gradient(90deg, #2ECC71 0%, #27AE60 50%, #2ECC71 100%)",
              }}
            >
              Building Safer Future
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            AUST Robotics Club (AUSTRC) at Ahsanullah University fosters a vibrant student community, 
            driving innovation in robotics through projects 
            like AI, autonomous robots, quadcopters, and the Mars Rover
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center pt-4"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Button className="bg-[#2ECC71] hover:bg-[#27AE60] text-white px-8 py-6 text-base shadow-[0_0_40px_0_rgba(46,204,113,0.8),0_0_80px_0_rgba(46,204,113,0.6),0_0_120px_0_rgba(46,204,113,0.4)] transition-all hover:shadow-[0_0_60px_0_rgba(46,204,113,1)] group">
                <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Join the Club
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Button
                variant="outline"
                className="bg-white border-[rgba(46,204,113,0.5)] text-[#2ECC71] hover:bg-[#2ECC71]/10 px-8 py-6 text-base transition-all hover:shadow-[0_0_30px_0_rgba(46,204,113,0.5)] group"
              >
                <Cpu className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                View Projects
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto"
          >
            {[
              { value: "500+", label: "Active Members" },
              { value: "50+", label: "Projects" },
              { value: "100+", label: "Events" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center p-4 rounded-lg bg-gradient-to-br from-[rgba(46,204,113,0.1)] to-transparent border border-[rgba(46,204,113,0.2)]"
              >
                <div className="text-3xl md:text-4xl text-[#2ECC71] mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 border-[#2ECC71] rounded-full flex items-start justify-center p-2 shadow-[0_0_20px_0_rgba(46,204,113,0.6)]"
        >
          <div className="w-1 h-2 bg-[#2ECC71] rounded-full shadow-[0_0_10px_0_rgba(46,204,113,0.8)]" />
        </motion.div>
      </motion.div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(46,204,113,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(46,204,113,0.5) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />
    </section>
  );
}