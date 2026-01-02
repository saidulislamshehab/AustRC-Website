import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { 
  ArrowRight, 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Sparkles, 
  ChevronRight,
  ExternalLink,
  Share2,
  Eye,
  Zap,
  Star,
  ArrowUpRight
} from 'lucide-react';
import { Button } from './ui/button';
import { useEffect, useState, useRef, useCallback } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useNavigate } from 'react-router-dom';

interface Event {
  id: string;
  Event_Name: string;
  Cover_Picture: string;
  Introduction: string;
  Order: number;
}

// Premium Animated Background
const PremiumBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Base Grid Pattern */}
    <div 
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(46,204,113,0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(46,204,113,0.5) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    />
    
    {/* Radial Gradient Overlay */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
    
    {/* Animated Gradient Orbs */}
    <motion.div
      className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(46,204,113,0.08) 0%, transparent 70%)',
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
    <motion.div
      className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(39,174,96,0.06) 0%, transparent 70%)',
      }}
      animate={{
        scale: [1.2, 1, 1.2],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />

    {/* Floating Particles */}
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-[#2ECC71]/30 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [-20, 20, -20],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 3 + Math.random() * 4,
          repeat: Infinity,
          delay: Math.random() * 2,
          ease: 'easeInOut',
        }}
      />
    ))}
  </div>
);

// Section Header Component
const SectionHeader = () => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    className="text-center mb-10 sm:mb-14 lg:mb-20"
  >
    {/* Premium Badge */}
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 bg-[#2ECC71]/10 rounded-full border border-[#2ECC71]/20 mb-6 sm:mb-8"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      >
        <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2ECC71]" />
      </motion.div>
      <span className="text-[#2ECC71] text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase">
        Featured Events
      </span>
    </motion.div>

    {/* Title */}
    <motion.h2
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <span className="text-white">Recent Events</span>
      <br className="sm:hidden" />
      <span className="text-white"> of </span>
      <span className="relative">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ECC71] via-[#3DED97] to-[#27AE60]">
          AUSTRC
        </span>
        <motion.svg
          className="absolute -bottom-2 sm:-bottom-3 left-0 w-full"
          viewBox="0 0 200 12"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <motion.path
            d="M2 8C50 2 150 2 198 8"
            stroke="url(#underline-gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
          />
          <defs>
            <linearGradient id="underline-gradient" x1="0" y1="0" x2="200" y2="0">
              <stop stopColor="#2ECC71" />
              <stop offset="0.5" stopColor="#3DED97" />
              <stop offset="1" stopColor="#27AE60" />
            </linearGradient>
          </defs>
        </motion.svg>
      </span>
    </motion.h2>

    {/* Subtitle */}
    <motion.p
      className="mt-4 sm:mt-6 text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4 leading-relaxed"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      Explore our cutting-edge events that drive innovation and shape the future of robotics technology
    </motion.p>

    {/* Stats Row */}
    <motion.div
      className="flex flex-wrap justify-center gap-8 sm:gap-12 lg:gap-16 mt-8 sm:mt-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      {[
        { value: '25+', label: 'Events', icon: Zap },
        { value: '500+', label: 'Attendees', icon: Users },
        { value: '4.9', label: 'Rating', icon: Star },
      ].map((stat, i) => (
        <motion.div
          key={i}
          className="group flex flex-col items-center"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#2ECC71]/60 group-hover:text-[#2ECC71] transition-colors duration-300" />
            <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white group-hover:text-[#2ECC71] transition-colors duration-300">
              {stat.value}
            </span>
          </div>
          <span className="text-xs sm:text-sm text-gray-500">{stat.label}</span>
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
);

// Premium Event Card
const EventCard = ({
  event,
  index,
  onClick,
  cachedImage,
}: {
  event: Event;
  index: number;
  onClick: () => void;
  cachedImage?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-full"
    >
      <motion.div
        className="relative h-full cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        whileTap={{ scale: 0.98 }}
      >
        {/* Neon Glow Effect on Hover */}
        <motion.div
          className="absolute -inset-[1px] rounded-2xl sm:rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, rgba(46,204,113,0.3), rgba(61,237,151,0.2), rgba(39,174,96,0.3))',
            backgroundSize: '300% 300%',
          }}
          animate={{ 
            opacity: isHovered ? 1 : 0.6,
            backgroundPosition: isHovered ? ['0% 0%', '100% 100%'] : '0% 0%',
          }}
          transition={{ duration: 0.4 }}
        />
        <motion.div
          className="absolute -inset-[2px] rounded-2xl sm:rounded-3xl blur-md"
          style={{
            background: 'linear-gradient(135deg, #2ECC71, #3DED97, #27AE60)',
          }}
          animate={{ opacity: isHovered ? 0.6 : 0.2 }}
          transition={{ duration: 0.4 }}
        />

        {/* Main Card */}
        <div className="relative h-full flex flex-col bg-gradient-to-br from-[#2ECC71]/10 via-black/60 to-[#27AE60]/10 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-[#2ECC71]/30 overflow-hidden transition-all duration-300">
          {/* Neon Border Glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none"
            style={{
              boxShadow: isHovered 
                ? '0 0 30px rgba(46,204,113,0.4), inset 0 0 30px rgba(46,204,113,0.15)' 
                : '0 0 15px rgba(46,204,113,0.15), inset 0 0 10px rgba(46,204,113,0.05)',
            }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#2ECC71]/50 rounded-tl-2xl sm:rounded-tl-3xl" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#2ECC71]/50 rounded-br-2xl sm:rounded-br-3xl" />
          {/* Image Section */}
          <div className="relative h-48 sm:h-56 lg:h-60 overflow-hidden">
            {event.Cover_Picture ? (
              <motion.img
                src={cachedImage || event.Cover_Picture}
                alt={event.Event_Name}
                className="w-full h-full object-cover"
                animate={{ scale: isHovered ? 1.08 : 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#2ECC71]/20 to-[#27AE60]/10 flex items-center justify-center">
                <Calendar className="w-16 h-16 text-[#2ECC71]/30" />
              </div>
            )}

            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            
            {/* Neon Green Overlay on Hover */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(46,204,113,0.2), transparent)',
              }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Shine Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2ECC71]/20 to-transparent -skew-x-12"
              initial={{ x: '-150%' }}
              animate={{ x: isHovered ? '150%' : '-150%' }}
              transition={{ duration: 0.7 }}
            />

            {/* Badge */}
            <motion.div
              className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-[#2ECC71]/40">
                <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2ECC71] opacity-75" />
                  <span className="relative inline-flex rounded-full h-full w-full bg-[#2ECC71]" />
                </span>
                <span className="text-[9px] sm:text-[10px] text-[#2ECC71] font-semibold tracking-wider uppercase">
                  Active
                </span>
              </div>
            </motion.div>

            {/* Index Number */}
            <motion.div
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#2ECC71] to-[#27AE60] flex items-center justify-center shadow-lg shadow-[#2ECC71]/30">
                <span className="text-white font-bold text-sm sm:text-base">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
            </motion.div>

            {/* Hover View Button */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
                initial={{ scale: 0.8 }}
                animate={{ scale: isHovered ? 1 : 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                <span className="text-white text-xs sm:text-sm font-medium">View Details</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Content Section */}
          <div className="p-4 sm:p-6 flex flex-col flex-1 bg-gradient-to-t from-[#2ECC71]/5 to-transparent">
            {/* Title */}
            <motion.h3 
              className="text-lg sm:text-xl lg:text-2xl font-bold text-white line-clamp-2 leading-snug transition-all duration-300 mb-3 sm:mb-4"
              animate={{ 
                color: isHovered ? '#2ECC71' : '#ffffff',
                textShadow: isHovered ? '0 0 20px rgba(46,204,113,0.5)' : '0 0 0px rgba(46,204,113,0)',
              }}
            >
              {event.Event_Name}
            </motion.h3>

            {/* Description */}
            <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 leading-relaxed flex-1">
              {event.Introduction}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-end pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-[#2ECC71]/20">
              {/* View Details Button */}
              <motion.div
                className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-[#2ECC71]/10 to-[#27AE60]/10 border border-[#2ECC71]/40 cursor-pointer"
                animate={{
                  background: isHovered 
                    ? 'linear-gradient(to right, rgba(46,204,113,1), rgba(39,174,96,1))' 
                    : 'linear-gradient(to right, rgba(46,204,113,0.1), rgba(39,174,96,0.1))',
                  borderColor: isHovered ? 'rgba(46,204,113,1)' : 'rgba(46,204,113,0.4)',
                  boxShadow: isHovered 
                    ? '0 0 25px rgba(46,204,113,0.5), 0 4px 15px rgba(46,204,113,0.3)' 
                    : '0 0 10px rgba(46,204,113,0.1)',
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.span 
                  className="text-xs sm:text-sm font-semibold"
                  animate={{ color: isHovered ? '#000000' : '#2ECC71' }}
                >
                  View Details
                </motion.span>
                <motion.div
                  animate={{ 
                    color: isHovered ? '#000000' : '#2ECC71',
                    x: isHovered ? 3 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Loading Skeleton
const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: i * 0.1 }}
        className="bg-gray-900/50 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/5"
      >
        <div className="h-48 sm:h-56 lg:h-60 bg-gradient-to-br from-gray-800/50 to-gray-900/50 animate-pulse" />
        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          <div className="flex gap-2">
            <div className="h-3 w-16 bg-gray-800/50 rounded animate-pulse" />
            <div className="h-3 w-20 bg-gray-800/50 rounded animate-pulse" />
          </div>
          <div className="h-6 sm:h-7 bg-gray-800/50 rounded animate-pulse" />
          <div className="h-4 bg-gray-800/50 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-gray-800/50 rounded animate-pulse" />
          <div className="flex justify-between pt-3 border-t border-white/5">
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-800/50 animate-pulse" />
              ))}
            </div>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-800/50 animate-pulse" />
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

// Empty State
const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-16 sm:py-24"
  >
    <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 rounded-3xl bg-[#2ECC71]/10 flex items-center justify-center">
      <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-[#2ECC71]/40" />
    </div>
    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">No Events Yet</h3>
    <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto">
      We're preparing amazing events for you. Check back soon!
    </p>
  </motion.div>
);

// Event Modal Component
const EventModal = ({
  event,
  cachedImage,
  onClose,
}: {
  event: Event;
  cachedImage?: string;
  onClose: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Handle click outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: event.Event_Name,
          text: event.Introduction,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        // You could add a toast notification here
      }
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-xl"
        style={{ zIndex: 99999 }}
        onClick={handleBackdropClick}
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto"
        style={{ zIndex: 100000 }}
        onClick={handleBackdropClick}
      >
        {/* Modal Content */}
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.95 }}
          transition={{ 
            duration: 0.5, 
            type: 'spring', 
            stiffness: 300, 
            damping: 30 
          }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative bg-gradient-to-b from-gray-900 to-gray-950 rounded-xl sm:rounded-2xl lg:rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
            {/* Animated Top Border */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#2ECC71] to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />

            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-[#2ECC71] hover:border-[#2ECC71] transition-all duration-300"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>

            {/* Hero Image */}
            <div className="relative h-40 sm:h-52 lg:h-64 overflow-hidden">
              <motion.img
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                src={cachedImage || event.Cover_Picture}
                alt={event.Event_Name}
                className="w-full h-full object-cover"
              />
              
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#2ECC71]/5 to-transparent" />

              {/* Title Section */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2ECC71] rounded-full mb-3 sm:mb-4"
                >
                  <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                  <span className="text-white text-[10px] sm:text-xs font-semibold tracking-wider uppercase">
                    Featured Event
                  </span>
                </motion.div>
                
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight"
                >
                  {event.Event_Name}
                </motion.h2>
                
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="w-12 sm:w-16 lg:w-20 h-1 bg-gradient-to-r from-[#2ECC71] to-[#3DED97] rounded-full mt-3 sm:mt-4 origin-left"
                />
              </div>
            </div>

            {/* Content Body */}
            <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
              {/* About Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 sm:w-10 h-0.5 bg-gradient-to-r from-[#2ECC71] to-transparent rounded-full" />
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white">
                    About This Event
                  </h3>
                </div>
                <div className="bg-white/[0.02] rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/5">
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                    {event.Introduction}
                  </p>
                </div>
              </motion.div>

              {/* Highlights Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
              >
                {[
                  { label: 'Networking', desc: 'Connect with peers' },
                  { label: 'Learning', desc: 'Gain new skills' },
                  { label: 'Innovation', desc: 'Explore new ideas' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 sm:p-4 bg-white/[0.02] rounded-xl border border-white/5"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#2ECC71]" />
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-white">{item.label}</p>
                      <p className="text-[10px] sm:text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex flex-col sm:flex-row gap-3 pt-2"
              >
                <Button
                  onClick={onClose}
                  className="flex-1 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] hover:from-[#27AE60] hover:to-[#2ECC71] text-white h-11 sm:h-12 rounded-xl font-semibold shadow-lg shadow-[#2ECC71]/20 transition-all text-sm sm:text-base"
                >
                  <span>Close</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-[#2ECC71]/50 text-[#2ECC71] hover:bg-[#2ECC71]/10 hover:border-[#2ECC71] h-11 sm:h-12 rounded-xl font-semibold text-sm sm:text-base transition-all"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  <span>View Full Project</span>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

// Main Component
export function EventsSection() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [cachedImages, setCachedImages] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, 'All_Data', 'Event_Page', 'All_Events_of_RC');
        const q = query(eventsCollection, orderBy('Order', 'asc'));
        const querySnapshot = await getDocs(q);

        const fetchedEvents: Event[] = [];
        querySnapshot.forEach((doc) => {
          if (fetchedEvents.length < 3) {
            fetchedEvents.push({
              id: doc.id,
              Event_Name: doc.data().Event_Name,
              Cover_Picture: doc.data().Cover_Picture,
              Introduction: doc.data().Introduction,
              Order: doc.data().Order,
            });
          }
        });

        fetchedEvents.sort((a, b) => a.Order - b.Order);
        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedEvent]);

  // Cache images
  useEffect(() => {
    const cacheImages = async () => {
      const cached: { [key: string]: string } = {};
      for (const event of events) {
        if (event.Cover_Picture) {
          try {
            const response = await fetch(event.Cover_Picture);
            const blob = await response.blob();
            const reader = new FileReader();
            reader.onload = () => {
              cached[event.id] = reader.result as string;
              setCachedImages((prev) => ({ ...prev, [event.id]: reader.result as string }));
            };
            reader.readAsDataURL(blob);
          } catch {
            cached[event.id] = event.Cover_Picture;
          }
        }
      }
    };
    if (events.length > 0) {
      cacheImages();
    }
  }, [events]);

  const handleCloseModal = useCallback(() => {
    setSelectedEvent(null);
  }, []);

  return (
    <>
      <section
        id="events"
        className="relative py-16 sm:py-24 lg:py-32 bg-black overflow-hidden"
      >
        {/* Background */}
        <PremiumBackground />

        {/* Ambient Glow Effects */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#2ECC71]/5 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#27AE60]/5 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <SectionHeader />

          {/* Events Grid */}
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <LoadingSkeleton />
            ) : events.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {events.map((event, index) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    index={index}
                    onClick={() => setSelectedEvent(event)}
                    cachedImage={cachedImages[event.id]}
                  />
                ))}
              </div>
            )}
          </div>

          {/* CTA Button */}
          {events.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center mt-12 sm:mt-16 lg:mt-20"
            >
              <motion.button
                onClick={() => navigate('/events')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center gap-3 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-transparent border border-[#2ECC71]/40 rounded-full text-[#2ECC71] font-semibold text-sm sm:text-base overflow-hidden transition-all duration-300 hover:border-[#2ECC71] hover:shadow-lg hover:shadow-[#2ECC71]/20"
              >
                {/* Hover Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#2ECC71] to-[#27AE60]"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4 }}
                />

                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  Explore All Events
                </span>
                <motion.span
                  className="relative z-10 inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#2ECC71]/20 group-hover:bg-white/20 transition-colors duration-300"
                  whileHover={{ x: 4 }}
                >
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:text-white transition-colors duration-300" />
                </motion.span>
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence mode="wait">
        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            cachedImage={cachedImages[selectedEvent.id]}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </>
  );
}