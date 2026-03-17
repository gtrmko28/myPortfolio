import { Lock } from "lucide-react";

/* === PROJECT CARD — Horizontal Layout (v2.0) === */
interface ProjectCardProps {
  title: string;
  description?: string;
  tags: string[];
  active?: boolean;
  status?: string;
  showLock?: boolean;
  href?: string;
}

const ProjectCard = ({
  title,
  description,
  tags,
  active = false,
  status,
  showLock = false,
  href = "#",
}: ProjectCardProps) => {
  const cardInner = (
    <div
      className={`group relative flex flex-col md:flex-row overflow-hidden rounded-2xl ink-border bg-card transition-all duration-200 ${
        active
          ? "hover:-translate-y-[2px] hover:shadow-[var(--shadow-card-hover)] cursor-pointer"
          : "opacity-[0.42] cursor-default pointer-events-none"
      }`}
      style={{ minHeight: '280px' }}
    >
      {/* Image area — left 45% */}
      <div className="aspect-[16/10] md:aspect-auto md:w-[45%] shrink-0 ghost-fill flex items-center justify-center relative">
        {!active && status && (
          <div className="z-10 badge-status flex items-center gap-1.5">
            {showLock && <Lock size={10} />}
            {status}
          </div>
        )}
        <div className="absolute inset-4 ghost-border rounded-lg" />
      </div>

      {/* Content area — right 55% */}
      <div className="p-6 md:p-8 lg:px-9 flex flex-col justify-center flex-1">
        <h3 className="heading-card">{title}</h3>
        {description && (
          <p className="text-body mt-3 line-clamp-4">{description}</p>
        )}
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag, i) => (
            <span key={i} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>
        {active ? (
          <span className="btn-primary text-center w-full mt-6">
            View Case Study
          </span>
        ) : (
          status && (
            <div className="badge-status inline-flex items-center justify-center gap-1.5 w-full mt-6 rounded-[32px] py-3">
              {showLock && <Lock size={10} />}
              {status}
            </div>
          )
        )}
      </div>
    </div>
  );

  return active ? (
    <a href={href} aria-label={`View case study: ${title}`}>
      {cardInner}
    </a>
  ) : (
    cardInner
  );
};

export default ProjectCard;
