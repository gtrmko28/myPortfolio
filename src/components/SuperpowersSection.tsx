import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, TrendingUp, Lightbulb, Zap } from "lucide-react";

/* === SUPERPOWERS SECTION (v2.3) === */
const SUPERPOWERS = [
  { 
    icon: BarChart3, 
    label: "Deep Analytical Thinking",
    color: "hsl(var(--foreground))" 
  },
  { 
    icon: TrendingUp, 
    label: "Metrics-Driven Approach",
    color: "hsl(var(--foreground))" 
  },
  { 
    icon: Lightbulb, 
    label: "Why-First Thinking",
    color: "hsl(var(--foreground))" 
  },
  { 
    icon: Zap, 
    label: "Proactive Ownership",
    color: "hsl(var(--foreground))" 
  },
];

const SuperpowersSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SUPERPOWERS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const current = SUPERPOWERS[index];
  const Icon = current.icon;

  return (
    <section className="relative overflow-hidden py-20 md:py-[140px]">

      <div className="container-main relative z-10 text-center">
        <h1 className="text-[26px] sm:text-[32px] md:text-[42px] lg:text-[54px] font-bold tracking-[-0.025em] text-[#1B2A6B] mb-8 md:mb-12">
          My superpowers as a designer
        </h1>

        <div className="flex flex-col items-center justify-center min-h-[80px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex items-center gap-4 md:gap-5"
            >
              <Icon
                size={32}
                className="md:w-10 md:h-10 lg:w-11 lg:h-11 shrink-0"
                style={{ color: 'hsl(var(--foreground))' }}
                strokeWidth={1.8}
              />
              <span className="text-[18px] sm:text-[22px] md:text-[32px] lg:text-[42px] font-medium text-foreground tracking-tight">
                {current.label}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default SuperpowersSection;
