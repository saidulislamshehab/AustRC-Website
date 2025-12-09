import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/config/firebase';

interface ResearchProject {
  id: string;
  Title: string;
  Cover_Picture: string;
  Introduction: string;
  Order?: number;
}

export function ResearchProjectsHomepageSection() {
  const [projects, setProjects] = useState<ResearchProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [cachedImages, setCachedImages] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsCollection = collection(db, 'All_Data', 'Research_Projects', 'research_projects');
        const q = query(projectsCollection);
        const querySnapshot = await getDocs(q);

        const fetchedProjects: ResearchProject[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log('Project data:', data);
          fetchedProjects.push({
            id: doc.id,
            Title: data.Title || doc.id || '',
            Cover_Picture: data.Cover_Picture || '',
            Introduction: data.Introduction || '',
            Order: data.Order || 0,
          });
        });

        // Sort by Order and take only first 4
        const topProjects = fetchedProjects
          .sort((a, b) => (a.Order || 0) - (b.Order || 0))
          .slice(0, 4);

        console.log('Fetched projects:', topProjects);
        setProjects(topProjects);
      } catch (error) {
        console.error('Error fetching research projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const cacheImages = async () => {
      const cached: { [key: string]: string } = {};
      for (const project of projects) {
        if (project.Cover_Picture) {
          try {
            const response = await fetch(project.Cover_Picture);
            const blob = await response.blob();
            const reader = new FileReader();
            reader.onload = () => {
              cached[project.id] = reader.result as string;
              if (Object.keys(cached).length === projects.length) {
                setCachedImages(cached);
              }
            };
            reader.readAsDataURL(blob);
          } catch (error) {
            cached[project.id] = project.Cover_Picture;
          }
        }
      }
    };
    if (projects.length > 0) {
      cacheImages();
    }
  }, [projects]);

  return (
    <section id="research-projects-home" className="py-20 bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(46,204,113,0.1)] via-transparent to-[rgba(46,204,113,0.1)] blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-[rgba(46,204,113,0.1)] to-[rgba(46,204,113,0.05)] rounded-full border border-[rgba(46,204,113,0.3)] mb-4">
            <span className="text-[#2ECC71] text-sm">Innovation & Discovery</span>
          </div>
          <h2 className="mb-4 tracking-tight text-white text-5xl">Research & Projects</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our cutting-edge research projects and innovations that advance robotics technology.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Loading research projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No research projects found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="group cursor-pointer bg-gradient-to-br from-[rgba(46,204,113,0.05)] to-transparent border-[rgba(46,204,113,0.2)] hover:border-[rgba(46,204,113,0.5)] transition-all duration-300 hover:shadow-[0_0_40px_0_rgba(46,204,113,0.3)] overflow-hidden backdrop-blur-sm flex flex-col h-full relative">
                  {/* Image Section */}
                  <div className="relative overflow-hidden h-48">
                    {project.Cover_Picture ? (
                      <>
                        <img
                          src={cachedImages[project.id] || project.Cover_Picture}
                          alt={project.Title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2ECC71]/30 to-[#27AE60]/10">
                        <span className="text-[#2ECC71] text-center px-4">{project.Title}</span>
                      </div>
                    )}

                    {/* Badge indicator */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className="w-3 h-3 bg-[#2ECC71] rounded-full shadow-[0_0_20px_0_rgba(46,204,113,0.8)]" />
                    </div>
                  </div>

                  {/* Content Section */}
                  <CardContent className="p-6 space-y-4 bg-black/40 backdrop-blur-sm flex-1 flex flex-col">
                    <h3 className="tracking-tight group-hover:text-[#2ECC71] transition-colors text-white font-semibold line-clamp-2">
                      {project.Title}
                    </h3>

                    <p className="text-gray-400 text-sm flex-1" style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {project.Introduction}
                    </p>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full group-hover:bg-[#2ECC71] group-hover:text-white transition-all text-[#2ECC71] border border-[rgba(46,204,113,0.3)] hover:shadow-[0_0_20px_0_rgba(46,204,113,0.5)] px-4 py-2 rounded-lg font-medium text-sm inline-flex items-center justify-center gap-2"
                    >
                      <span>View Details</span>
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.span>
                    </motion.button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Explore All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mt-12"
        >
          <motion.button
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
              Explore All Projects
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
  );
}
