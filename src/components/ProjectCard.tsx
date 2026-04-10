import { Lock, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

import { Tag } from "./ui/Tag";

/* === PROJECT CARD (v3.0) — High-Fidelity Horizontal === */
interface Metric {
  label: string;
  value: string;
}

type CardType = "NDA" | "DEFAULT";

interface ProjectCardProps {
  company: string;
  title: string;
  description: string;
  tags: string[];
  metrics: Metric[];
  active?: boolean;
  status?: string;
  showLock?: boolean;
  href?: string;
  liveHref?: string;
  imageSrc?: string;
  showMetrics?: boolean;
  isNDA?: boolean;
  className?: string;
  cardType?: CardType;
}

const ProjectCard = ({
  company,
  title,
  description,
  tags,
  metrics,
  active = false,
  status,
  showLock = false,
  href = "#",
  imageSrc,
  showMetrics = false,
  isNDA = false,
  className,
  cardType = "DEFAULT",
}: ProjectCardProps) => {
  const navigate = useNavigate();

  const cardContent = (
    <div
      onClick={() => {
        if (active && window.innerWidth < 768 && cardType !== "NDA") {
          window.scrollTo(0, 0);
          navigate(href);
        }
      }}
      className={cn(
        "relative overflow-hidden bg-[#1B2A6B]/[0.04] rounded-[32px] border border-[#1B2A6B]/[0.06] transition-all",
        cardType === "DEFAULT" && "lg:h-[644px]",
        active ? "md:cursor-default cursor-pointer" : "opacity-60 grayscale-[0.5]",
        className
      )}
    >
      {/* Media Side — inner frame absolutely fills the padding area via inset */}
      <div className="relative min-h-[280px] sm:min-h-[280px] md:min-h-[300px] lg:absolute lg:top-0 lg:left-0 lg:bottom-0 lg:w-1/2 lg:min-h-0">
        <div className="absolute inset-4 md:inset-10 lg:inset-16 bg-white rounded-[24px] border border-[#1B2A6B]/10 overflow-hidden shadow-sm">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={title}
              className={cn(
                "w-full h-full",
                cardType === "NDA" ? "object-cover blur-sm" : "object-contain"
              )}
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center gap-4 text-gray-300">
              <div className="w-11 h-11 rounded-full border-4 border-current border-t-transparent animate-pulse" />
              <span className="text-[12px] font-bold uppercase tracking-widest opacity-50">Visualizing Data</span>
            </div>
          )}

          {/* NDA Lock overlay */}
          {cardType === "NDA" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-orange-600 flex items-center justify-center">
                <Lock size={28} className="text-white" />
              </div>
            </div>
          )}
        </div>

        {!active && status && (
          <div className="absolute top-12 left-12 z-20 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-gray-900 text-white flex items-center gap-2">
            {showLock && <Lock size={11} />}
            {status}
          </div>
        )}
      </div>

      {/* Content Side — determines card height; offset right on desktop */}
      <div className="p-5 md:p-10 lg:p-16 lg:ml-[50%] flex flex-col">
        <div className="w-full">
          <span className="text-[12px] md:text-[13px] font-bold tracking-[0.18em] text-gray-400 uppercase mb-3 block">
            {company}
          </span>
          <h3 className="text-[20px] md:text-[32px] lg:text-[42px] font-bold outline-none leading-[1.35] md:leading-[1.2] text-foreground mb-3 md:mb-6 tracking-[-0.018em]">
            {title}
          </h3>
          <p className="text-[15px] md:text-[18px] text-gray-600 leading-[1.6] mb-6 md:mb-8 lg:mb-10 max-w-[650px]">
            {description}
          </p>

          <div className="flex flex-wrap gap-4 mb-8 lg:mb-10">
            {tags.map((tag, i) => (
              <Tag 
                key={i} 
              >
                {tag}
              </Tag>
            ))}
          </div>

          {showMetrics && (
            <>
              <div className="h-[1px] w-full bg-[#1B2A6B]/5 mb-8 lg:mb-10" />

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-x-6 md:gap-x-12 gap-y-6 md:gap-y-8 mb-6 md:mb-10">
                {metrics.map((metric, i) => (
                  <div key={i}>
                    <div className="text-[24px] md:text-[32px] font-bold text-[#1B2A6B] leading-none mb-2">
                      {metric.value}
                    </div>
                    <div className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em]">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Action Button */}
        <div className="pb-4">
          {isNDA ? (
            <div className="relative inline-flex items-center justify-center gap-2 rounded-full px-8 md:px-10 h-[48px] md:h-[60px] w-full md:w-auto text-[14px] md:text-[16px] font-bold uppercase tracking-[0.1em] bg-orange-500/[0.12] text-orange-600 cursor-not-allowed">
              <Lock size={16} className="text-current shrink-0" strokeWidth={3} />
              <span>UNDER NDA</span>
            </div>
          ) : active ? (
            <a 
              href={href}
              className="btn-primary"
            >
              View Full Case
            </a>
          ) : (
            <div className="inline-flex items-center justify-center px-8 md:px-10 h-[48px] md:h-[60px] w-full md:w-auto bg-gray-100 text-gray-400 rounded-full font-bold text-[14px] md:text-[16px] uppercase tracking-[0.1em] cursor-not-allowed">
              Coming Soon
            </div>
          )}
        </div>
      </div>








    </div>
  );

  return cardContent;
};

export default ProjectCard;
