import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { ArrowRight, X } from 'lucide-react';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
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

export function EventsSection() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [cachedImages, setCachedImages] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

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

  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedEvent]);

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
              if (Object.keys(cached).length === events.length) {
                setCachedImages(cached);
              }
            };
            reader.readAsDataURL(blob);
          } catch (error) {
            cached[event.id] = event.Cover_Picture;
          }
        }
      }
    };
    if (events.length > 0) {
      cacheImages();
    }
  }, [events]);

  return (
    <>
      <section id="events" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#2ECC71] rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#27AE60] rounded-full blur-[150px]" />
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
              <span className="text-[#2ECC71] text-sm">Latest Activities</span>
            </div>
            <h2 className="mb-4 tracking-tight text-white text-5xl">Recent Events of AUSTRC</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover our latest events, workshops, and activities that showcase innovation and excellence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
            {loading ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-400">Loading events...</p>
              </div>
            ) : events.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-400">No events found</p>
              </div>
            ) : (
              events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
                  className="h-full relative group"
                  onClick={() => setSelectedEvent(event)}
                  whileHover={{ boxShadow: '0 0 30px rgba(46, 204, 113, 0.6)' }}
                >
                  {/* Neon glow effect on hover */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#2ECC71] via-[#2ECC71]/50 to-[#2ECC71] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg blur-lg -z-10 pointer-events-none" />
                  
                  {/* Enhanced card background glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-[#2ECC71]/20 via-[#2ECC71]/5 to-[#2ECC71]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg blur-xl -z-10 pointer-events-none" />
                  
                  {/* Card background glow effect - behind the card */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2ECC71]/0 via-[#2ECC71]/0 to-[#2ECC71]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg blur-xl -z-10 pointer-events-none" />
                  
                  <div 
                    className="cursor-pointer relative bg-gradient-to-br from-[rgba(46,204,113,0.08)] via-[rgba(20,20,20,0.5)] to-[rgba(10,10,10,0.8)] border border-[rgba(46,204,113,0.2)] hover:border-[rgba(46,204,113,0.6)] transition-all duration-500 hover:shadow-[0_0_60px_0_rgba(46,204,113,0.4),inset_0_0_40px_0_rgba(46,204,113,0.05)] overflow-hidden backdrop-blur-md h-full flex flex-col rounded-lg before:absolute before:inset-0 before:rounded-lg before:p-[1px] before:bg-gradient-to-r before:from-[#2ECC71] before:via-[rgba(46,204,113,0.2)] before:to-[#2ECC71] before:opacity-30 hover:before:opacity-60 before:transition-opacity before:duration-500 before:pointer-events-none"
                  >
                    {/* Image Section Enhanced */}
                    <div className="relative overflow-hidden h-56 bg-gradient-to-b from-[#2ECC71]/10 to-transparent cursor-pointer">
                      <img
                        src={cachedImages[event.id] || event.Cover_Picture}
                        alt={event.Event_Name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-125 cursor-pointer"
                      />
                      
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 hover:opacity-50 transition-opacity duration-300 cursor-pointer pointer-events-none" />
                      
                      {/* Shine effect on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.7 }}
                      />

                      {/* Active indicator badge */}
                      <motion.div 
                        className="absolute top-4 right-4 z-10"
                        whileHover={{ scale: 1.2 }}
                      >
                        <div className="flex items-center gap-2">
                          <motion.div
                            className="w-3 h-3 bg-[#2ECC71] rounded-full"
                            animate={{ 
                              boxShadow: [
                                '0_0_10px_rgba(46,204,113,0.6)',
                                '0_0_20px_rgba(46,204,113,0.9)',
                                '0_0_10px_rgba(46,204,113,0.6)',
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <span className="text-xs font-semibold text-[#2ECC71] bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">Active</span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Content Section Enhanced */}
                    <CardContent className="p-6 space-y-4 bg-gradient-to-b from-black/40 to-black/80 backdrop-blur-md flex-1 flex flex-col relative z-10">
                      {/* Title with enhanced styling */}
                      <motion.h3 
                        className="tracking-tight text-white text-lg font-semibold line-clamp-2 hover:text-[#2ECC71] transition-colors duration-300 cursor-pointer"
                        whileHover={{ x: 4 }}
                      >
                        {event.Event_Name}
                      </motion.h3>

                      {/* Decorative line under title */}
                      <motion.div
                        className="h-0.5 w-0 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-full"
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
                      />

                      {/* Description text */}
                      <p className="text-gray-300 text-sm flex-1 leading-relaxed" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {event.Introduction}
                      </p>

                      {/* Enhanced button */}
                      <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEvent(event);
                        }}
                        className="w-full relative mt-2 py-3 px-4 bg-gradient-to-r from-[rgba(46,204,113,0.1)] to-[rgba(46,204,113,0.05)] border border-[rgba(46,204,113,0.4)] hover:border-[rgba(46,204,113,0.7)] rounded-lg hover:bg-gradient-to-r hover:from-[rgba(46,204,113,0.2)] hover:to-[rgba(46,204,113,0.1)] transition-all duration-300 overflow-hidden cursor-pointer"
                      >
                        {/* Button shine effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.5 }}
                        />

                        <span className="relative flex items-center justify-center gap-2 text-[#2ECC71] font-semibold text-sm">
                          Read More
                          <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </motion.span>
                        </span>
                      </motion.button>
                    </CardContent>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Explore All Events Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center mt-12"
          >
            <motion.button
              onClick={() => navigate('/events')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-8 py-3 bg-gradient-to-r from-[rgba(46,204,113,0.15)] to-[rgba(46,204,113,0.05)] rounded-full border border-[rgba(46,204,113,0.4)] hover:border-[rgba(46,204,113,0.7)] text-[#2ECC71] font-semibold text-base transition-all duration-300 hover:shadow-[0_0_30px_0_rgba(46,204,113,0.4)] overflow-hidden group"
            >
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />

              <span className="relative inline-flex items-center gap-2">
                Explore All Events
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Modal Portal - Separate from section to avoid stacking context */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            key="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            style={{ zIndex: 99999 }}
            onClick={() => setSelectedEvent(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            key="modal-content"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none p-4"
            style={{ zIndex: 100000 }}
          >
            <div
              className="bg-gradient-to-br from-[rgba(46,204,113,0.1)] to-transparent border border-[rgba(46,204,113,0.3)] rounded-lg max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 flex justify-end p-4 bg-black/40 backdrop-blur-sm border-b border-[rgba(46,204,113,0.3)]">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="p-2 hover:bg-[rgba(46,204,113,0.2)] rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-[#2ECC71]" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={selectedEvent.Cover_Picture}
                    alt={selectedEvent.Event_Name}
                    className="w-full h-80 object-cover"
                  />
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {selectedEvent.Event_Name}
                  </h2>
                  <div className="w-12 h-1 bg-[#2ECC71] rounded-full" />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#2ECC71] mb-3">
                    About This Event
                  </h3>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {selectedEvent.Introduction}
                  </p>
                </div>

                <Button
                  onClick={() => setSelectedEvent(null)}
                  className="w-full bg-[#2ECC71] text-white hover:bg-[#27AE60] transition-all"
                >
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}