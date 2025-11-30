import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const events = [
  {
    id: 1,
    title: 'Robotics Workshop 2025',
    date: 'December 15, 2025',
    location: 'AUST Campus',
    image: 'https://images.unsplash.com/photo-1755053757912-a63da9d6e0e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMHdvcmtzaG9wJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzYzNDU2ODEwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Join us for an intensive hands-on robotics workshop covering the latest technologies.',
    category: 'Workshop',
  },
  {
    id: 2,
    title: 'Tech Innovation Summit',
    date: 'January 20, 2026',
    location: 'Virtual Event',
    image: 'https://images.unsplash.com/photo-1700936655767-7049129f1995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwZXZlbnQlMjBjb25mZXJlbmNlfGVufDF8fHx8MTc2MzQ1NjgxMHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Explore cutting-edge innovations in AI, robotics, and automation.',
    category: 'Conference',
  },
  {
    id: 3,
    title: 'Robot Building Competition',
    date: 'February 10, 2026',
    location: 'Engineering Lab',
    image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdCUyMGFybSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzYzNDU2ODExfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Test your skills in our annual robot building competition.',
    category: 'Competition',
  },
];

export function EventsSection() {
  return (
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
            <span className="text-[#2ECC71] text-sm">Upcoming Events</span>
          </div>
          <h2 className="mb-4 tracking-tight text-white text-5xl">Experience Innovation</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join us for exciting events, workshops, and competitions that push the boundaries of innovation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <Card className="group cursor-pointer bg-gradient-to-br from-[rgba(46,204,113,0.05)] to-transparent border-[rgba(46,204,113,0.2)] hover:border-[rgba(46,204,113,0.5)] transition-all duration-300 hover:shadow-[0_0_40px_0_rgba(46,204,113,0.3)] overflow-hidden backdrop-blur-sm h-full flex flex-col">
                <div className="relative overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#2ECC71] text-white rounded-full text-sm shadow-[0_0_20px_0_rgba(46,204,113,0.6)]">
                      {event.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="w-3 h-3 bg-[#2ECC71] rounded-full shadow-[0_0_20px_0_rgba(46,204,113,0.8)]" />
                  </div>
                </div>

                <CardContent className="p-6 space-y-4 bg-black/40 backdrop-blur-sm flex-1 flex flex-col">
                  <h3 className="tracking-tight group-hover:text-[#2ECC71] transition-colors text-white">
                    {event.title}
                  </h3>

                  <p className="text-gray-400 text-sm flex-1">
                    {event.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar className="w-4 h-4 text-[#2ECC71]" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <MapPin className="w-4 h-4 text-[#2ECC71]" />
                      {event.location}
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    className="w-full group-hover:bg-[#2ECC71] group-hover:text-white transition-all text-[#2ECC71] border border-[rgba(46,204,113,0.3)] hover:shadow-[0_0_20px_0_rgba(46,204,113,0.5)]"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}