import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SuperpowersSection from "@/components/SuperpowersSection";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";

/* === MAIN PORTFOLIO PAGE === */
const Index = () => {
  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <Header />
      <main>
        <HeroSection />
        <SuperpowersSection />
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
