import InteractiveBackground from "@/components/InteractiveBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import FeaturedProjects from "@/components/FeaturedProjects";
import CuratedProjects from "@/components/CuratedProjects";
import JourneyTimeline from "@/components/JourneyTimeline";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#FBFBFA] text-[#0F172A] overflow-hidden">
      {/* Interactive Canvas Background Adapted for White Theme */}
      <InteractiveBackground />

      {/* Main Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col space-y-4">
        <Hero />
        <TechStack />
        <FeaturedProjects />
        <CuratedProjects />
        <JourneyTimeline />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
