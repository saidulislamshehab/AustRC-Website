import { HeroSection } from './HeroSection';
import { EventsSection } from './EventsSection';
import { EducationalProgramsSection } from './EducationalProgramsSection';
import { ResearchProjectsSection } from './ResearchProjectsSection';
import { MentorshipSection } from './MentorshipSection';
import { TestimonialsSection } from './TestimonialsSection';
import { CollaborationsSection } from './CollaborationsSection';
import { HallOfFameSection } from './HallOfFameSection';

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <EventsSection />
      <EducationalProgramsSection />
      <ResearchProjectsSection />
      <HallOfFameSection />
      <MentorshipSection />
      <TestimonialsSection />
      <CollaborationsSection />
    </main>
  );
}