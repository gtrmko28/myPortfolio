/* === PROJECTS SECTION (v2.0) — 1×4 horizontal card stack === */
import ProjectCard from "./ProjectCard";

const ProjectsSection = () => {
  return (
    <section className="section-padding container-main">
      <h2 className="heading-section mb-12">Projects</h2>

      <div className="grid grid-cols-1 gap-6">
        {/* Card 1: Active — Breazen */}
        <ProjectCard
          active
          title="Breazen — UX Research"
          description="A deep-dive UX research project for a mobile wellness app, uncovering user pain points and validating product hypotheses through qualitative and quantitative methods."
          tags={["Mobile", "iOS", "UX Research"]}
          href="#"
        />

        {/* Card 2: Placeholder — Soon */}
        <ProjectCard
          title="Project Title"
          description="Details coming soon. This case study is currently being prepared and will showcase a complete design process."
          tags={["· · ·", "· · ·"]}
          status="Soon"
        />

        {/* Card 3: Placeholder — Soon */}
        <ProjectCard
          title="Project Title"
          description="Details coming soon. This case study is currently being prepared and will showcase a complete design process."
          tags={["· · ·", "· · ·"]}
          status="Soon"
        />

        {/* Card 4: Placeholder — NDA */}
        <ProjectCard
          title="Project Title"
          description="This project is under a non-disclosure agreement. The work involved complex product design challenges at enterprise scale."
          tags={["· · ·", "· · ·"]}
          status="NDA"
          showLock
        />
      </div>
    </section>
  );
};

export default ProjectsSection;
