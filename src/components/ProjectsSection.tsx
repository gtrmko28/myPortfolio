/* === PROJECTS SECTION (v2.0) — 1×4 horizontal card stack === */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProjectCard from "./ProjectCard";

const ProjectsSection = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#cases') {
      const element = document.getElementById('cases');
      if (element) {
        // Small delay to allow react rendering / lazy loading images to adjust layout
        setTimeout(() => {
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          // Offset for the sticky header
          const headerOffset = 100;
          window.scrollTo({
            top: elementPosition - headerOffset,
            behavior: "smooth"
          });
        }, 100);
      }
    }
  }, [location]);

  return (
    <section id="cases" className="container-main pb-20 md:pb-[140px] pt-0">
      <h1 className="text-[28px] sm:text-[32px] md:text-[42px] lg:text-[54px] font-bold tracking-[-0.025em] text-[#1B2A6B] text-center mb-3 md:mb-6">
        Case Studies
      </h1>
      <p className="text-[16px] md:text-[20px] lg:text-[22px] font-medium text-[#1a212dcc] text-center mb-10 md:mb-16">
        New cases are being added
      </p>

      <div className="flex flex-col gap-12 md:gap-12">
        {/* Card 1: Active — Breazen */}
        <ProjectCard
          active
          showMetrics={false}
          cardType="DEFAULT"
          company="BREAZEN"
          title="Breazen: Turning User Friction Into Testable Hypotheses"
          description="Researched what stops users from coming back, mapped 3 behavioral segments, and translated findings into product hypotheses."
          tags={["Mob. App IOS", "UX Research", "User Interview", "Segments", "Product Hypothesis"]}
          metrics={[
            { value: "24+", label: "Participants" },
            { value: "85%", label: "Hypotheses Validated" }
          ]}
          href="/work/breazen"
          imageSrc="/images/breazen_new.png"
        />

        {/* Snapvault: NDA case */}
        <ProjectCard
          active
          showMetrics={false}
          isNDA={true}
          cardType="NDA"
          company="SNAPVAULT"
          title="Designed From Scratch: Making Thousands of Screenshots Findable"
          description="Users had thousands of screenshots with no way to find them. I joined a startup at zero and shaped the entire product: defined functionality around OCR-based auto-tagging, manual tagging, rule-based albums, and tag search, validated hypotheses through moderated user testing, and delivered complete wireframes ready for handoff."
          tags={["MOB. APP IOS", "PRODUCT THINKING", "OCR & SEARCH UX", "INFORMATION ARCHITECTURE", "HYPOTHESIS TESTING"]}
          metrics={[
            { value: "Thousands", label: "Screenshots" },
            { value: "OCR", label: "Auto-Tagging" }
          ]}
          href="/work/snapvault"
          imageSrc="/images/snapvault_final.png"
        />

      </div>
    </section>
  );
};

export default ProjectsSection;
