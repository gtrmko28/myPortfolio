import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Globe, Users, Lightbulb, Maximize2, X } from "lucide-react";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tag } from "@/components/ui/Tag";

// Colors: text-[#111827], accent-[#1B2A6B]
const EASING = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30, scale: 0.98 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: EASING, delay },
});

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASING },
  },
};

const NAV_ITEMS = [
  { id: "context", label: "CONTEXT" },
  { id: "discovery", label: "DISCOVERY" },
  { id: "patterns", label: "PATTERNS" },
  { id: "so-what", label: "SO WHAT?" },
];

const ScrollSpyNav = () => {
  const [active, setActive] = useState("context");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <nav className="cs-sidebar hidden md:flex flex-col gap-[12px] relative mt-[2px]" aria-label="Page sections">
        {NAV_ITEMS.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`text-left font-sans text-[15px] font-bold uppercase tracking-[0.12em] transition-colors duration-200 flex items-center relative pl-5 ${isActive ? "text-[#1B2A6B]" : "text-[rgba(17,24,39,0.35)] hover:text-[#111827]"
                }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full bg-[#1B2A6B]" />
              )}
              {label}
            </button>
          );
        })}
      </nav>

      {/* Mobile Tab Bar Removed intentionally per user request */}
    </>
  );
};

const SectionHeading = ({ children, overline }: { children: React.ReactNode; overline?: string }) => (
  <div className="mt-12 md:mt-16 mb-6 first:mt-0">
    {overline && (
      <motion.div {...fadeUp(0)} className="text-[13px] font-medium uppercase tracking-[0.16em] text-[rgba(17,24,39,0.4)] mb-3 font-sans">
        {overline}
      </motion.div>
    )}
    <motion.h2 {...fadeUp(0)} className="text-[clamp(28px,4vw,36px)] font-bold text-[#1B2A6B] leading-[1.3] md:leading-[1.1] tracking-[-0.025em] m-0">
      {children}
    </motion.h2>
  </div>
);

const ImageBlock = ({ src, caption, className, borderClass, disableZoom = false }: { src: string; caption?: string; className?: string; borderClass?: string; disableZoom?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (disableZoom || window.innerWidth < 768) return;
    setIsOpen(true);
  };

  return (
    <>
      <motion.div {...fadeUp(0.1)} className={`w-full ${className ?? 'my-8'}`}>
        <div 
          className={`relative overflow-hidden rounded-2xl shadow-sm bg-white ${disableZoom ? '' : 'md:cursor-zoom-in'} ${borderClass ?? 'border border-[#E5E7EB]'}`}
          onClick={handleOpen}
        >
          <img
            src={src}
            alt={caption || ""}
            className="w-full h-[280px] md:h-auto object-contain block"
            loading="lazy"
          />
          {!disableZoom && (
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm text-[#1B2A6B] md:flex hidden">
              <Maximize2 size={18} />
            </div>
          )}
        </div>
        {caption && <p className="cs-image-caption mt-3">{caption}</p>}
      </motion.div>

      {isOpen && !disableZoom && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#111827]/90 backdrop-blur-sm p-4 md:p-8 cursor-zoom-out animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <button 
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 rounded-full p-2 transition-colors z-[101]"
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
            aria-label="Close fullscreen image"
          >
            <X size={24} />
          </button>
          <img
            src={src}
            alt={caption || "Fullscreen view"}
            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()} /* Prevent background click from closing */
          />
        </div>
      )}
    </>
  );
};

const Highlight = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-[#FFF9DC] text-[#111827] font-semibold px-1.5 py-0.5 rounded-[2px] inline m-0">
    {children}
  </span>
);

/* === SURVEY CHARTS === */
const SurveyCharts = () => {
  // --- Data ---
  const statCards = [
    { pct: "50%", text: "report that existing apps feel overwhelming and overly complex" },
    { pct: "28.6%", text: "are frustrated by long or unclear registration flows" },
    { pct: "28.6%", text: "struggle to quickly tell if the app is actually right for them" },
    { pct: "7.1%", text: "report no difficulties with breathing apps at all" },
  ];

  const paymentData = [
    { label: "Free basics, paid extras", pct: 57.1, color: "#1B2A6B" },
    { label: "Paid app + trial period", pct: 21.4, color: "#4A5CA8" },
    { label: "Free apps only", pct: 14.3, color: "#8A98CC" },
    { label: "Limited free trial", pct: 7.1, color: "#C3C9E6" },
  ];

  const toolsData = [
    { label: "Mobile apps", pct: 58.3, color: "#1B2A6B" },
    { label: "Other resources (YouTube, notebooks)", pct: 41.7, color: "#8A98CC" },
  ];

  // --- Pie chart helper ---
  const PieChart = ({ data, label }: { data: { label: string; pct: number; color: string }[]; label: string }) => {
    const cx = 70, cy = 70, r = 60;
    let cum = 0;
    const segs = data.map(item => {
      const rad1 = ((cum * 3.6) - 90) * Math.PI / 180;
      cum += item.pct;
      const rad2 = ((cum * 3.6) - 90) * Math.PI / 180;
      const x1 = cx + r * Math.cos(rad1), y1 = cy + r * Math.sin(rad1);
      const x2 = cx + r * Math.cos(rad2), y2 = cy + r * Math.sin(rad2);
      const large = item.pct > 50 ? 1 : 0;
      return { ...item, d: `M ${cx} ${cy} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z` };
    });
    return (
      <div className="flex flex-col items-center w-full">
        <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1B2A6B] mb-1 text-center">{label}</div>
        <svg width="140" height="140" viewBox="0 0 140 140" className="mb-4">
          {segs.map((s, i) => <path key={i} d={s.d} fill={s.color} />)}
        </svg>
        <div className="w-full space-y-2">
          {data.map((d, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
              <span className="text-[11px] text-[rgba(17,24,39,0.6)] leading-tight flex-1">{d.label}</span>
              <span className="text-[11px] font-bold text-[#1B2A6B] ml-2 whitespace-nowrap">{d.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="my-12">
      <motion.div {...fadeUp(0.1)} className="rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-7">
        {/* Stat cards row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statCards.map((c, i) => (
            <div key={i} className="bg-white border border-[#E5E7EB] rounded-2xl p-5 flex flex-col gap-2">
              <div className="text-[36px] font-bold text-[#1B2A6B] leading-none">{c.pct}</div>
              <div className="text-[13px] text-[rgba(17,24,39,0.6)] leading-snug">{c.text}</div>
            </div>
          ))}
        </div>
        {/* Divider */}
        <div className="border-t border-[#E5E7EB] mb-8" />
        {/* Pie charts row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PieChart data={paymentData} label="Payment model preference" />
          <PieChart data={toolsData} label="What tools do users use?" />
        </div>
      </motion.div>
      <p className="cs-image-caption mt-3 text-center">A snapshot of quantitative survey data from the research process</p>
    </div>
  );
};

const BreazenCaseStudy = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-[#111827]">
      <style>{`
        /* Global typography & layout overrides for case study to match Sydney Rasmussen style */
        .cs-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
        }
        
        /* Clean pure Sans-Serif font-stack per screenshots */
        .cs-hero h1, .cs-content-inner, .cs-stat-card, .cs-insight-card, h2 {
          font-family: 'Geist', 'Inter', system-ui, sans-serif !important;
        }

        .cs-hero {
          padding: 32px 0 0;
        }
        .cs-hero-tags {
          display: flex;
          gap: 12px;
          margin-top: 32px;
          flex-wrap: wrap;
        }

        /* Two column layout */
        .cs-layout-wrapper {
          display: flex;
          gap: 0;
          max-width: 1100px;
          margin: 0 auto;
        }
        @media (max-width: 767px) {
          .cs-layout-wrapper {
            flex-direction: column;
            gap: 32px;
          }
        }
        
        .cs-sidebar {
          width: 18%;
          position: sticky;
          top: 110px;
          align-self: flex-start;
          padding-right: 0;
          flex-direction: column;
          max-height: calc(100vh - 140px);
          overflow-y: auto;
          scrollbar-width: none;
        }
        .cs-sidebar::-webkit-scrollbar {
          display: none;
        }

        .cs-content-area {
          width: 82%;
          padding-top: 0;
          padding-bottom: 0;
        }
        @media (max-width: 767px) {
          .cs-content-area {
            width: 100%;
          }
        }
        .cs-content-inner {
          max-width: 824px;
        }
        .cs-content-inner p {
          font-size: 16px;
          color: rgba(17,24,39,0.72);
          line-height: 1.75;
          margin-bottom: 16px;
          font-weight: 400;
          max-width: 780px;
        }
        @media (min-width: 768px) {
          .cs-content-inner p {
            font-size: 18px;
          }
        }
        .cs-content-inner ul {
          margin-bottom: 32px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-left: 0;
          max-width: 780px;
        }
        .cs-content-inner li {
          font-size: 16px;
          color: #1B2A6B;
          line-height: 1.6;
          margin-bottom: 8px;
          font-weight: 600;
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        @media (min-width: 768px) {
          .cs-content-inner li {
            font-size: 18px;
          }
        }
        .cs-content-inner li::before {
          content: '';
          display: block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #111827;
          opacity: 1;
          margin-top: 13px;
          flex-shrink: 0;
        }

        .cs-section {
          margin-bottom: 64px;
          scroll-margin-top: 100px;
        }
        @media (min-width: 768px) {
          .cs-section {
            margin-bottom: 96px;
          }
        }

        /* Insights Cards — editorial teal-muted surface, Sydney Rasmussen reference */
        .cs-insight-card {
          position: relative;
          background: rgba(27, 42, 107, 0.04);
          border-radius: 20px;
          padding: 24px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        @media (min-width: 768px) {
          .cs-insight-card {
            padding: 32px;
          }
        }
        .cs-insight-title {
          font-size: 24px;
          font-weight: 700;
          color: #1B2A6B;
          letter-spacing: -0.02em;
          line-height: 1.2;
          z-index: 10;
        }
        .cs-insight-desc {
          font-size: 16px;
          color: rgba(17, 24, 39, 0.68);
          line-height: 1.65;
          font-weight: 400;
          z-index: 10;
        }
        .cs-insight-quote {
          font-size: 18px;
          font-style: normal;
          color: rgba(27, 42, 107, 0.95);
          font-weight: 600;
          z-index: 10;
          margin-top: 8px;
          padding-left: 0;
          line-height: 1.6;
        }
        .cs-insight-number {
          position: absolute;
          bottom: -36px;
          left: 12px;
          font-size: 180px;
          font-weight: 800;
          color: transparent;
          -webkit-text-stroke: 2px rgba(27, 42, 107, 0.04);
          line-height: 1;
          pointer-events: none;
          z-index: 0;
        }

        .cs-image {
          width: 100%;
          display: block;
          object-fit: cover;
        }
        .cs-image-caption {
          font-size: 15px;
          color: rgba(17, 24, 39, 0.5);
          margin-top: 12px;
          text-align: center;
          font-style: normal;
          line-height: 1.5;
        }

        /* Hypotheses Table styling */
        .cs-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 28px;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #E5E7EB;
        }
        .cs-table th {
          text-align: left;
          padding: 14px 24px;
          background: rgba(27, 42, 107, 0.04);
          color: rgba(17,24,39,0.45);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-weight: 600;
          font-family: 'Geist', 'Inter', sans-serif;
        }
        .cs-table th:first-child { border-top-left-radius: 0; }
        .cs-table th:last-child { border-top-right-radius: 0; }
        .cs-table td {
          padding: 20px 24px;
          border-bottom: 1px solid #F3F4F6;
          vertical-align: top;
          font-size: 15px;
          color: #111827;
          line-height: 1.6;
          font-weight: 400;
        }
        .cs-table tr:last-child td { border-bottom: none; }
        .cs-table td:first-child { width: 45%; font-weight: 500; color: rgba(17,24,39,0.85); }
        
        .cs-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #1B2A6B;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 6px;
          margin-right: 12px;
          margin-bottom: 8px;
        }
      `}</style>

      <Header />

      <main className="pt-[88px] md:pt-[108px] pb-0">
        <div className="cs-container">
          <div className="mb-8">
            <Link to="/#cases" className="btn-secondary shrink-0 w-fit gap-2">
              <ArrowLeft size={16} /> Back to cases
            </Link>
          </div>

          {/* HERO */}
          <div className="cs-hero !pt-0 !mb-10 !pb-0 !border-none">
            <motion.h1
              {...fadeUp(0.1)}
              className="text-[clamp(30px,4.5vw,48px)] font-bold text-[#111827] leading-[1.3] md:leading-[1.18] tracking-[-0.025em] w-full m-0"
            >
              Breazen: Turning User Friction Into Testable Hypotheses
            </motion.h1>

            <motion.div {...fadeUp(0.2)} className="cs-hero-tags">
              <Tag>Mob. App IOS</Tag>
              <Tag>UX Research</Tag>
              <Tag>User Interview</Tag>
              <Tag>Segments</Tag>
              <Tag>Product Hypothesis</Tag>
            </motion.div>
          </div>

          <div className="cs-layout-wrapper">
            {/* SIDEBAR */}
            <ScrollSpyNav />

            {/* CONTENT AREA */}
            <div className="cs-content-area">
              <div className="cs-content-inner">

                {/* 1. CONTEXT */}
                <section id="context" className="cs-section">
                  <SectionHeading overline="CONTEXT">Breazen & My Role</SectionHeading>
                  <motion.p {...fadeUp(0.1)}>
                    <Highlight>Breazen is a mobile app</Highlight> for breathing practices and meditation. The product’s core value: simple breathing exercises that help users relax, reduce stress, and improve their mental health.
                  </motion.p>
                  <motion.p {...fadeUp(0.2)}>
                    <Highlight>I conducted UX research focused on one question: what stops users from coming back?</Highlight>
                  </motion.p>
                  <motion.p {...fadeUp(0.3)}>
                    My role covered the full research cycle: product and competitor analysis, <Highlight>quantitative survey (40+ respondents),</Highlight> <Highlight>in-depth interviews (10 participants),</Highlight> user segmentation, personas, user journey mapping, and hypothesis formation.
                  </motion.p>
                  <SectionHeading>Research goals</SectionHeading>
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 mb-12"
                  >
                    {[
                      { Icon: Search, title: "Product Audit", desc: "Identify strengths and weaknesses from real users' perspectives to build a clear improvement foundation." },
                      { Icon: Globe, title: "Market Analysis", desc: "Map the competitive landscape and define concrete directions for differentiation." },
                      { Icon: Users, title: "User Research", desc: "Explore motivations and barriers through in-depth interviews and a quantitative survey." },
                      { Icon: Lightbulb, title: "Insights & Hypotheses", desc: "Translate behavioral patterns into testable product hypotheses tied to real usage scenarios." },
                    ].map(({ Icon, title, desc }, i) => (
                      <motion.div
                        key={i}
                        variants={staggerItem}
                        className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-6 md:p-8 hover:shadow-sm transition-shadow duration-150"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#1B2A6B] flex items-center justify-center mb-5">
                          <Icon size={20} className="text-white" />
                        </div>
                        <div className="font-semibold text-[#111827] text-[18px] mb-2 leading-snug">{title}</div>
                        <div className="text-[15px] text-[rgba(17,24,39,0.6)] leading-relaxed">{desc}</div>
                      </motion.div>
                    ))}
                  </motion.div>
                </section>

                {/* 2. DISCOVERY */}
                <section id="discovery" className="cs-section">
                  <SectionHeading overline="DISCOVERY">Where It Breaks</SectionHeading>
                  <motion.p {...fadeUp(0.1)}>
                    I started with the product itself — walked through the core user flows and evaluated its strengths and weaknesses. I grouped all findings by theme to get a complete picture, not just a scattered list of problems.
                  </motion.p>
                  <motion.p {...fadeUp(0.2)}>
                    This gave me not just a list of issues, but concrete criteria for the next step — competitor analysis. I knew exactly which solutions and features to pay attention to in order to understand how other products solve the same problems.
                  </motion.p>
                  <motion.p {...fadeUp(0.3)}>
                    <Highlight>Result: key strengths that create value for users identified,</Highlight> alongside pain points that get in the way of the experience.
                  </motion.p>

                  <SectionHeading>How Others Solve It</SectionHeading>
                  <motion.p {...fadeUp(0.1)}>
                    With the criteria from the previous stage, <Highlight>I moved on to analyzing 7 competitors — comprehensively:</Highlight> both looking for targeted solutions to Breazen’s weak spots, and broadly evaluating the key features common to this type of product.
                  </motion.p>
                  <motion.p {...fadeUp(0.2)}>
                    I built a comparison table breaking down each product’s functionality, UX, and value proposition. This made it easy to see what works well and what creates barriers.
                  </motion.p>
                  <motion.p {...fadeUp(0.3)}>
                    <Highlight>In parallel, I conducted a visual breakdown of key screens:</Highlight> collected screenshots of strong solutions that could be adapted, and weak ones — that our product could turn into its own advantage.
                  </motion.p>
                   <ImageBlock 
                    src="/images/breazen/whimsical-analysis.jpg" 
                    caption="This is the work process" 
                    className="my-8"
                    borderClass="border-[3px] border-[#FDE68A]"
                  />

                  <motion.p {...fadeUp(0.4)}>
                    <Highlight>Result: a clear list of opportunities</Highlight> — strong patterns worth borrowing and specific areas where the product can outperform competitors.
                  </motion.p>

                  <SectionHeading>Listening to Real People</SectionHeading>
                  <motion.p {...fadeUp(0.1)}>
                    With hypotheses from the product and competitor analysis in hand, I moved to the most important stage — talking to real users.
                  </motion.p>
                  <motion.p {...fadeUp(0.15)}>
                    <Highlight>My main goal was to immerse myself in their experience and find answers to the question “Why?”:</Highlight>
                  </motion.p>
                  <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex flex-col gap-4 my-8">
                    {[
                      "Why do people practice breathing exercises at all? What is the real motivation?",
                      "Why do they choose mobile apps — or avoid them?",
                      "What demotivates them most and prevents habit formation?"
                    ].map((q, i) => (
                      <motion.div key={i} variants={staggerItem} className="bg-[#1B2A6B] rounded-2xl p-6 flex items-start gap-4 shadow-sm w-full">
                        <div className="w-3 h-3 rounded-full bg-[#FFFBF0] mt-1.5 flex-shrink-0" />
                        <div className="text-white text-[16px] md:text-[18px] font-medium leading-snug">
                          {q}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.h2
                    {...fadeUp(0.15)}
                    className="text-[24px] font-bold text-[#111827] tracking-[-0.01em] mt-12 md:mt-16 mb-6 leading-[1.3] md:leading-snug"
                  >
                    4 key insights from the interviews
                  </motion.h2>

                  <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex flex-col gap-4 mt-8 mb-12">
                    {[
                      {
                        title: "Effortless start",
                        desc: "Users feel frustrated when an app looks overwhelming or requires registration before showing any value. They want to start instantly and breathe without unnecessary friction.",
                        quote: "\"When they ask me to go through steps without even letting me try — that's it, goodbye.\" — Dasha\n\"I just want to open it and breathe, without a thousand buttons and extra features.\" — Maria"
                      },
                      {
                        title: "Breathing as a fast reset",
                        desc: "Breathing is perceived not as a ritual or philosophy, but as a quick emotional recovery tool — for focus and calm.",
                        quote: "\"I'm not into meditation — I just breathe to unload my brain after work.\" — Dasha\n\"Breathing exercises are a way to balance my nervous system when there's too much going on.\" — Kateryna"
                      },
                      {
                        title: "Guidance matters",
                        desc: "Users feel more confident and engaged when the app provides a calm voice or a sensory cue — removing the need to count or think.",
                        quote: "\"I want the app to be like a teacher — someone who guides, explains, and supports.\" — Olha\n\"When there's a voice, you don't need to count breaths, you just listen and relax.\" — Ruslana"
                      },
                      {
                        title: "Flexibility & control",
                        desc: "People want to personalize duration and rhythm to match their mood and energy — breathing should adapt to them, not the other way around.",
                        quote: "\"It would be great if I could choose how long I want to breathe — one minute or five.\" — Olha\n\"Sometimes I just want a short exercise, not a full session — depending on how I feel.\" — Kateryna"
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        variants={staggerItem}
                        className="cs-insight-card border border-[#E5E7EB]"
                      >
                        <div className="cs-insight-title">{item.title}</div>
                        <div className="cs-insight-desc">{item.desc}</div>
                        <div className="cs-insight-quote whitespace-pre-line">{item.quote}</div>
                        <div className="cs-insight-number">0{index + 1}</div>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.h2 {...fadeUp(0.1)} className="text-[24px] font-bold text-[#111827] tracking-[-0.01em] mt-12 md:mt-16 mb-6 leading-[1.3] md:leading-snug">
                    Validating with Numbers
                  </motion.h2>
                  <motion.p {...fadeUp(0.15)} className="mt-0">
                    After analyzing the interviews, I launched a quantitative survey to validate and confirm the main insights on a larger sample. The survey covered motivation for using breathing practices, key barriers, ways of doing exercises, and the content format users find most comfortable.
                  </motion.p>
                  <motion.p {...fadeUp(0.2)}>
                    <Highlight>The results quantitatively confirmed the main finding:</Highlight> users value simplicity, minimum steps before starting, and a calm, non-intrusive interaction experience.
                  </motion.p>
                  <SurveyCharts />
                </section>

                {/* 3. PATTERNS */}
                <section id="patterns" className="cs-section">
                  <SectionHeading overline="PATTERNS">Three Ways to Need This App</SectionHeading>
                  <motion.p {...fadeUp(0.1)}>
                    After collecting the data I needed to understand not just what users say — but how they actually behave and in what moments they open the app. Through affinity mapping I clustered recurring patterns around motivation, friction, and emotional response.
                  </motion.p>
                  <ImageBlock src="/images/breazen/сегменти.png" caption="Affinity Mapping" borderClass="border-[3px] border-[#BBF7D0]" />

                  <motion.h2
                    {...fadeUp(0.1)}
                    className="text-[24px] font-bold text-[#111827] tracking-[-0.01em] mt-12 md:mt-16 mb-6 leading-[1.3] md:leading-snug"
                  >
                    So, I identified 3 segments
                  </motion.h2>

                  <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 gap-4 my-8">
                    {[
                      {
                        priority: "Priority 1",
                        name: "Quick Relief Seeker",
                        mode: "Reactive · High-urgency",
                        need: "Open → breathe → feel better",
                        insight: "Highest friction sensitivity — any registration, long onboarding, or complex UI leads to immediate churn.",
                        bg: "bg-[#FFFBF0] border-[#FDE68A]", // Yellow/Orange tint
                      },
                      {
                        priority: "Priority 2",
                        name: "Conscious Explorer",
                        mode: "Intentional · Engaged",
                        need: "I want to understand and choose consciously",
                        insight: "Stable core audience — willing to learn, explore, and return if the product supports their growth.",
                        bg: "bg-[#EAFCEE] border-[#C4F1CF]", // Green tint lighter
                      },
                      {
                        priority: "Priority 3",
                        name: "Aesthetic Minimalist",
                        mode: "Ambient · Mood-driven",
                        need: "Quiet, beautiful, non-intrusive experience",
                        insight: "Key for brand and emotional positioning, but not the primary usage scenario.",
                        bg: "bg-[#F8F5FF] border-[#E9D5FF]", // Purple tint
                      },
                    ].map((seg, i) => (
                      <motion.div
                        key={i}
                        variants={staggerItem}
                        className={`rounded-2xl border min-h-[180px] ${seg.bg} p-6 md:p-8 flex flex-col md:flex-row gap-0 md:gap-8 items-stretch hover:shadow-sm transition-shadow duration-150`}
                      >
                        {/* Left: priority + name */}
                        <div className="md:w-[38%] flex-shrink-0 flex flex-col justify-center py-0 md:py-2">
                          <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[rgba(27,42,107,0.45)] mb-3">{seg.priority}</div>
                          <div className="text-[23px] font-bold text-[#1B2A6B] leading-snug mb-3">{seg.name}</div>
                          <div className="inline-flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#1B2A6B] opacity-40" />
                            <span className="text-[14px] text-[rgba(17,24,39,0.45)] font-normal">{seg.mode}</span>
                          </div>
                        </div>
                        {/* Divider */}
                        <div className="hidden md:block w-px bg-[rgba(17,24,39,0.08)] self-stretch flex-shrink-0" />
                        {/* Right: need + insight */}
                        <div className="flex-1 flex flex-col justify-center pt-5 mt-5 md:pt-0 md:mt-0 md:py-2 border-t border-[rgba(17,24,39,0.08)] md:border-t-0">
                          <div className="text-[18px] font-semibold text-[#111827] mb-3 leading-snug">"{seg.need}"</div>
                          <div className="text-[15px] text-[rgba(17,24,39,0.6)] leading-relaxed">{seg.insight}</div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.p {...fadeUp(0.2)}>
                    This allowed me to avoid designing <Highlight>"universal solutions for everyone"</Highlight> and ground every product decision in real behavioral patterns.
                  </motion.p>

                  <motion.h2
                    {...fadeUp(0.1)}
                    className="text-[24px] font-bold text-[#111827] tracking-[-0.01em] mt-12 md:mt-16 mb-6 leading-[1.3] md:leading-snug"
                  >
                    Next, I created personas to bring the segments to life
                  </motion.h2>
                  <motion.p {...fadeUp(0.12)}>
                    Personas helped me move from abstract segments to real people with specific contexts, motivations, and barriers. Each persona represents a distinct way of needing the product — and a different standard for what "good experience" means.
                  </motion.p>
                  <ImageBlock src="/images/breazen/юзер персони.png" caption="User Personas based on key segments" borderClass="border-[3px] border-[#DDD6FE]" />

                  <SectionHeading>From Stress to Breathe</SectionHeading>
                  <motion.p {...fadeUp(0.1)}>
                    The user journey was needed to see the product through the eyes of a specific user in a specific situation: where friction appears, where decisions are made, where value is formed — what needs to be instant, and what needs to be explained.
                  </motion.p>
                  <motion.p {...fadeUp(0.2)}>
                    I mapped only what the product can actually influence: <Highlight>Trigger → Entry → Choose → Practice → Result → Reflection</Highlight>. Each segment got its own product principle, which became the foundation for hypotheses.
                  </motion.p>

                  <div className="flex flex-col gap-6 pt-8 pb-0">
                    {[
                      { src: "/images/breazen/2026-03-19 23_18_08-.png", border: "border-[3px] border-[#FDE68A]" },
                      { src: "/images/breazen/2026-03-19 23_19_19-UX research Breazen app - Figma.png", border: "border-[3px] border-[#C4F1CF]" },
                      { src: "/images/breazen/2026-03-19 23_19_36-UX research Breazen app - Figma.png", border: "border-[3px] border-[#E9D5FF]" }
                    ].map((item, i) => (
                      <div key={i} className="hidden md:block" style={{ position: 'sticky', top: `${110 + i * 32}px`, zIndex: 10 + i }}>
                        <ImageBlock src={item.src} className="my-0" borderClass={item.border} disableZoom />
                      </div>
                    ))}
                    {/* Mobile: plain vertical stack, no sticky */}
                    <div className="flex flex-col gap-6 md:hidden">
                      {[
                        { src: "/images/breazen/2026-03-19 23_18_08-.png", border: "border-[3px] border-[#FDE68A]" },
                        { src: "/images/breazen/2026-03-19 23_19_19-UX research Breazen app - Figma.png", border: "border-[3px] border-[#C4F1CF]" },
                        { src: "/images/breazen/2026-03-19 23_19_36-UX research Breazen app - Figma.png", border: "border-[3px] border-[#E9D5FF]" }
                      ].map((item, i) => (
                        <ImageBlock key={i} src={item.src} className="my-0" borderClass={item.border} disableZoom />
                      ))}
                    </div>
                  </div>
                </section>

                {/* 4. SO WHAT? */}
                  <section id="so-what" className="cs-section !mb-16">
                  <SectionHeading overline="SO WHAT?">What We Now Know — And What to Test</SectionHeading>
                  <motion.p {...fadeUp(0.1)}>
                    I formed insights not from individual quotes, but from recurring behavioral patterns found at the intersection of interviews, affinity mapping, segments, personas and journey maps.
                  </motion.p>

                  <motion.p {...fadeUp(0.12)}>
                    <Highlight>The goal of this stage was</Highlight> to move from describing behavior to identifying clear causes that can be tested through product hypotheses.
                  </motion.p>

                  <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex flex-col gap-4 mt-8 pb-8">
                    {[
                      { i: "In a state of stress, any extra choice or onboarding is a barrier\nMetrics: onboarding completion rate, time to first practice", h: "If mandatory onboarding is removed → high-urgency users more often reach their first practice", b: "H1" },
                      { i: "The first few minutes decide everything: no quick effect — no return\nMetrics: session completion rate, re-open rate within 24h", h: "If the first session delivers a noticeable effect in 1–2 min → likelihood of re-opening in moments of stress increases", b: "H2" },
                      { i: "Structuring exercises by expected outcome reduces cognitive load at the moment of choice\nMetrics: time to select exercise, back navigation rate", h: "If exercises are grouped as Relax / Refocus / Sleep → users find it easier to choose without overthinking", b: "H3" },
                      { i: "Different engagement types require different levels of guidance\nMetrics: practice completion rate per guidance type, session abandonment rate per guidance type", h: "If users can set their preferred guidance style once → practice completion rate increases across both guided and independent segments", b: "H4" },
                      { i: "The wrong voice tone or intrusive music destroys the sense of calm before the practice even begins\nMetrics: settings interaction rate, session abandonment rate", h: "If users can mute or change voice and sound before starting → churn from the first session decreases", b: "H5" },
                      { i: "Soft positive reinforcement after an exercise increases willingness to return\nMetrics: return rate within 48h", h: "If gentle confirmation is added after a session → users finish with a positive emotional state and greater readiness to come back", b: "H6" },
                      { i: "Product-as-a-tool \"right now\" is more effective than product-as-a-habit-tracker\nMetrics: time to first action, repeat session rate", h: "If the home screen shows contextual entry points by moment — Relax now / Sleep / Refocus — rather than a generic library → users open the right exercise faster and perceive the app as immediately useful", b: "H7" },
                      { i: "UX built around a specific segment outperforms solutions averaged for everyone\nMetrics: D1 retention rate per segment", h: "If Quick Relief Seeker segment receives a zero-onboarding entry path → retention after first session increases compared to standard flow", b: "H8" }
                    ].map((row, i) => (
                      <motion.div
                        key={i}
                        variants={staggerItem}
                        className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-sm transition-shadow duration-150 flex flex-col"
                      >
                        <div className="mb-4">
                          <span className="cs-badge !mb-0">{row.b}</span>
                        </div>
                        <div className="font-semibold text-[#111827] text-[18px] mb-4 leading-snug">{row.h}</div>
                        <div className="text-[15px] text-[rgba(17,24,39,0.72)] leading-relaxed mt-auto border-t border-[rgba(17,24,39,0.06)] pt-4 whitespace-pre-line">{row.i}</div>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.p {...fadeUp(0.2)}>
                    <Highlight>H1 and H2 are highest priority</Highlight> — they directly affect first-session retention for the most friction-sensitive segment and represent the highest churn risk if unaddressed.
                  </motion.p>

                  <div className="mt-12">
                    <SectionHeading>What This Research Unlocks</SectionHeading>
                    <motion.p {...fadeUp(0.1)}>As a result of this work, I:</motion.p>
                    <motion.ul variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-8 space-y-3">
                      <motion.li variants={staggerItem} className="!font-normal !text-[rgba(17,24,39,0.72)]"><span><Highlight>Formed hypotheses, directly tied to real usage scenarios</Highlight> and engagement types — not "averaged for everyone," but built around specific behavior</span></motion.li>
                      <motion.li variants={staggerItem} className="!font-normal !text-[rgba(17,24,39,0.72)]"><span><Highlight>Identified critical moments in the experience:</Highlight> where immediacy is needed, where control matters, where silence is valued</span></motion.li>
                      <motion.li variants={staggerItem} className="!font-normal !text-[rgba(17,24,39,0.72)]"><span><Highlight>Translated insights from research and journey maps</Highlight> into concrete product assumptions that can be tested through behavioral signals</span></motion.li>
                      <motion.li variants={staggerItem} className="!font-normal !text-[rgba(17,24,39,0.72)]"><span><Highlight>Laid the foundation for prioritizing changes:</Highlight> what needs to be instant, what should be optional, and what should not be complicated at early stages</span></motion.li>
                    </motion.ul>
                    <motion.p {...fadeUp(0.5)} className="!font-normal !text-[#111827] mt-8">
                      This stage brought clarity: what exactly needs to be tested next and for which users — so the product is useful in a specific moment, not abstractly <Highlight>"convenient for everyone."</Highlight>
                    </motion.p>
                  </div>
                  <div className="mt-8 group">
                    <Link to="/#cases" className="btn-secondary shrink-0 w-fit gap-2">
                      <ArrowLeft size={16} /> Back to cases
                    </Link>
                  </div>
                </section>

              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BreazenCaseStudy;
