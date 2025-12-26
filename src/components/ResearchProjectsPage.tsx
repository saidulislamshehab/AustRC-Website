<<<<<<< HEAD
import { motion, AnimatePresence } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/config/firebase';

interface ProjectData {
  id: string;
  Title: string;
  Introduction: string;
  Cover_Picture: string;
  Order: number;
  Owner_1_Name?: string;
  Owner_1_Designation_Department?: string;
  Owner_2_Name?: string;
  Owner_2_Designation_Department?: string;
  Owner_3_Name?: string;
  Owner_3_Designation_Department?: string;
  Owner_4_Name?: string;
  Owner_4_Designation_Department?: string;
  [key: string]: string | number | undefined;
}

export function ResearchProjectsPage() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [cachedImages, setCachedImages] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsCollection = collection(db, 'All_Data', 'Research_Page', 'All_Projects_of_RC');
        const q = query(projectsCollection, orderBy('Order', 'asc'));
        const querySnapshot = await getDocs(q);
        
        const fetchedProjects: ProjectData[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedProjects.push({
            id: doc.id,
            Title: data.Title || '',
            Introduction: data.Introduction || '',
            Cover_Picture: data.Cover_Picture || '',
            Order: data.Order || 0,
            ...data,
          } as ProjectData);
        });
        
        setProjects(fetchedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

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

  const getOwners = (project: ProjectData) => {
    const owners = [];
    for (let i = 1; i <= 4; i++) {
      const nameKey = `Owner_${i}_Name`;
      const designationKey = `Owner_${i}_Designation_Department`;
      const name = project[nameKey];
      const designation = project[designationKey];
      if (name) {
        owners.push({
          name,
          designation: designation || '',
        });
      }
    }
    return owners;
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-black via-[#0a1810] to-black pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-4"
            >
              <span className="px-6 py-2 rounded-full bg-gradient-to-r from-[#2ECC71]/20 to-[#27AE60]/20 border border-[#2ECC71]/30 text-[#2ECC71] backdrop-blur-sm shadow-[0_0_30px_0_rgba(46,204,113,0.3)]">
                Innovation & Discovery
              </span>
            </motion.div>
            <h1 className="text-6xl mb-6 bg-gradient-to-r from-white via-[#2ECC71] to-white bg-clip-text text-transparent">
              Research & Projects
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Explore cutting-edge research and innovative projects developed by our talented members
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-400">Loading projects...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-400">No projects found</p>
              </div>
            ) : (
              projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => setSelectedProject(project)}
                >
                  <Card className="relative group overflow-hidden bg-gradient-to-br from-black/90 via-[#0a1810]/90 to-black/90 border-[#2ECC71]/20 hover:border-[#2ECC71]/50 backdrop-blur-xl transition-all duration-500 hover:shadow-[0_0_60px_0_rgba(46,204,113,0.3)] h-full flex flex-col cursor-pointer">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2ECC71]/5 via-transparent to-[#27AE60]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        src={cachedImages[project.id] || project.Cover_Picture}
                        alt={project.Title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="relative p-6 flex-1 flex flex-col">
                      <div className="flex-1">
                        <h3 className="text-2xl text-white mb-3 group-hover:text-[#2ECC71] transition-colors">
                          {project.Title}
                        </h3>
                        <p className="text-gray-400 mb-4 line-clamp-3">
                          {project.Introduction}
                        </p>
                      </div>

                      {/* Team Members Preview */}
                      {getOwners(project).length > 0 && (
                        <div className="mb-4 pt-4 border-t border-[#2ECC71]/20">
                          <p className="text-sm text-[#2ECC71] mb-2">
                            {getOwners(project).length} Team {getOwners(project).length === 1 ? 'Member' : 'Members'}
                          </p>
                          <div className="space-y-1">
                            {getOwners(project).slice(0, 2).map((owner, idx) => (
                              <p key={idx} className="text-xs text-gray-500 truncate">
                                {owner.name}
                              </p>
                            ))}
                            {getOwners(project).length > 2 && (
                              <p className="text-xs text-gray-500">
                                +{getOwners(project).length - 2} more
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* View Button */}
                      <Button
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                        className="w-full relative overflow-hidden bg-gradient-to-r from-[#2ECC71] to-[#27AE60] hover:from-[#27AE60] hover:to-[#2ECC71] text-white shadow-[0_0_30px_0_rgba(46,204,113,0.6)] transition-all hover:shadow-[0_0_40px_0_rgba(46,204,113,0.9)] hover:scale-105 group/btn"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          View Details
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left" />
                      </Button>
                    </div>

                    {/* Hover Border Effect */}
                    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 rounded-lg shadow-[inset_0_0_30px_0_rgba(46,204,113,0.2)]" />
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modal Portal - Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            key="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            style={{ zIndex: 99999 }}
            onClick={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      {/* Modal Portal - Content */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            key="modal-content"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none p-3 sm:p-4 md:p-6 overflow-hidden"
            style={{ zIndex: 100000 }}
          >
            <div
              className="bg-gradient-to-br from-[rgba(46,204,113,0.1)] to-transparent border border-[rgba(46,204,113,0.3)] rounded-lg w-full max-w-2xl sm:max-w-4xl h-[95vh] sm:h-[90vh] md:h-[85vh] flex flex-col shadow-2xl pointer-events-auto overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 flex justify-end p-3 sm:p-4 bg-black/40 backdrop-blur-sm border-b border-[rgba(46,204,113,0.3)] z-10 flex-shrink-0">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 sm:p-2 hover:bg-[rgba(46,204,113,0.2)] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-[#2ECC71]" />
                </button>
              </div>

              <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-[#2ECC71]/50 scrollbar-track-transparent">
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  {/* Cover Image */}
                  <div className="relative rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={selectedProject.Cover_Picture}
                      alt={selectedProject.Title}
                      className="w-full h-40 sm:h-48 md:h-56 object-cover"
                    />
                  </div>

                  {/* Title */}
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                      {selectedProject.Title}
                    </h2>
                    <div className="w-12 h-1 bg-[#2ECC71] rounded-full" />
                  </div>

                  {/* Introduction */}
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-[#2ECC71] mb-3">
                      About This Project
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                      {selectedProject.Introduction}
                    </p>
                  </div>

                  {/* Owners/Team Members */}
                  {getOwners(selectedProject).length > 0 && (
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-[#2ECC71] mb-3 sm:mb-4">
                        Project Team
                      </h3>
                      <div className="space-y-3 sm:space-y-4">
                        {getOwners(selectedProject).map((owner, index) => (
                          <div key={index} className="bg-[rgba(46,204,113,0.1)] border border-[rgba(46,204,113,0.3)] rounded-lg p-3 sm:p-4">
                            <h4 className="text-white font-semibold mb-1 text-sm sm:text-base">
                              {owner.name}
                            </h4>
                            <p className="text-gray-300 text-xs sm:text-sm">
                              {owner.designation}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={() => setSelectedProject(null)}
                    className="w-full bg-[#2ECC71] text-white hover:bg-[#27AE60] transition-all mt-2 sm:mt-4"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
=======
import { motion } from 'motion/react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { MANUAL_PROJECTS, ProjectData } from './ProjectData';
import { ProjectDetailPage } from './ProjectDetailPage';

export default function ResearchProjectsPage() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [cachedImages, setCachedImages] = useState<{ [key: string]: string }>({});

  // Convert Firebase data to ProjectData format (exactly like ResearchProjectsHomepageSection)
  const convertFirebaseToProjectData = (firebaseData: any): ProjectData => {
    // Get team members from Owner fields
    const teamMembers = [];
    for (let i = 1; i <= 4; i++) {
      const nameKey = `Owner_${i}_Name`;
      const designationKey = `Owner_${i}_Designation_Department`;
      const name = firebaseData[nameKey];
      const designation = firebaseData[designationKey];
      if (name) {
        teamMembers.push({
          name,
          designation: designation || '',
          role: i === 1 ? 'Project Lead' : 'Team Member'
        });
      }
    }

    // Get carousel images - Cover_Picture first, then Image_1, Image_2, etc.
    const carouselImages = [];
    if (firebaseData.Cover_Picture) {
      carouselImages.push(firebaseData.Cover_Picture);
    }
    // Check for additional image fields (Image_1, Image_2, etc.)
    for (let i = 1; i <= 10; i++) {
      const imgKey = `Image_${i}`;
      if (firebaseData[imgKey]) {
        carouselImages.push(firebaseData[imgKey]);
      }
    }

    return {
      id: firebaseData.id,
      title: firebaseData.Title || firebaseData.id || '',
      coverImage: firebaseData.Cover_Picture || '',
      shortDescription: firebaseData.Introduction || '',
      fullDescription: firebaseData.Description || firebaseData.Introduction || '',
      carouselImages: carouselImages.length > 0 ? carouselImages : [firebaseData.Cover_Picture || ''],
      teamMembers: teamMembers,
      tags: firebaseData.Tags || [],
      order: firebaseData.Order || 0
    };
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsCollection = collection(db, 'All_Data', 'Research_Projects', 'research_projects');
        const q = query(projectsCollection);
        const querySnapshot = await getDocs(q);

        const fetchedProjects: ProjectData[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log('Project data:', data);
          fetchedProjects.push({ id: doc.id,
            ...convertFirebaseToProjectData({ ...data, id: doc.id })
          });
        });

        console.log('Fetched Firebase projects:', fetchedProjects);

        // Combine Firebase projects with manual projects
        const allProjects = [...fetchedProjects, ...MANUAL_PROJECTS].sort(
          (a, b) => (a.order || 0) - (b.order || 0)
        );

        console.log('Total projects (Firebase + Manual):', allProjects);
        setProjects(allProjects);
        setFilteredProjects(allProjects);
      } catch (error) {
        console.error('Error fetching research projects:', error);
        // Fallback to manual projects if Firebase fails
        setProjects(MANUAL_PROJECTS);
        setFilteredProjects(MANUAL_PROJECTS);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter((project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredProjects(filtered);
    }
  }, [searchQuery, projects]);

  const handleProjectClick = (projectId: string) => {
    setSelectedProject(projectId);
  };

  if (selectedProject) {
    const project = projects.find(p => p.id === selectedProject);
    if (project) {
      return <ProjectDetailPage project={project} onBack={() => setSelectedProject(null)} />;
    }
  }

  return (
    <main className="min-h-screen bg-black relative overflow-x-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#2ECC71] rounded-full opacity-10"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-[rgba(46,204,113,0.1)] to-[rgba(46,204,113,0.05)] rounded-full border border-[rgba(46,204,113,0.3)] mb-6">
              <span className="text-[#2ECC71] text-sm">Innovation Hub</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Research & Projects
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
              Discover groundbreaking research and innovative projects pushing the boundaries of robotics
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-16"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects by name, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gradient-to-r from-[rgba(46,204,113,0.05)] to-transparent border border-[rgba(46,204,113,0.3)] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[rgba(46,204,113,0.6)] transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20 px-4">
        <div className="container mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-[#2ECC71] border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-400 mt-4">Loading projects...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-gray-400 text-lg">No projects found</p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  onClick={() => handleProjectClick(project.id)}
                  className="cursor-pointer"
                >
                  <Card className="group bg-gradient-to-br from-[rgba(46,204,113,0.05)] to-transparent border-[rgba(46,204,113,0.2)] hover:border-[rgba(46,204,113,0.5)] transition-all duration-300 hover:shadow-[0_0_40px_0_rgba(46,204,113,0.3)] overflow-hidden backdrop-blur-sm h-full flex flex-col">
                    <div className="relative overflow-hidden h-56">
                      {project.coverImage ? (
                        <>
                          <img
                            src={cachedImages[project.id] || project.coverImage}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2ECC71]/30 to-[#27AE60]/10">
                          <span className="text-[#2ECC71] text-center px-4">{project.title}</span>
                        </div>
                      )}
                      <div className="absolute top-4 right-4">
                        <div className="w-3 h-3 bg-[#2ECC71] rounded-full shadow-[0_0_20px_0_rgba(46,204,113,0.8)]" />
                      </div>
                    </div>

                    <CardContent className="p-6 space-y-4 bg-black/40 backdrop-blur-sm flex-1 flex flex-col">
                      <h3 className="text-xl font-semibold text-white group-hover:text-[#2ECC71] transition-colors line-clamp-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm flex-1 line-clamp-3">
                        {project.shortDescription}
                      </p>
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 2).map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-[rgba(46,204,113,0.1)] border border-[rgba(46,204,113,0.2)] rounded text-[#2ECC71] text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-[#2ECC71] font-medium text-sm">
                        <span>Learn More</span>
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
>>>>>>> e3159407ec27fe3b2dce6612b51c372d4253c44e
  );
}

export { ResearchProjectsPage };