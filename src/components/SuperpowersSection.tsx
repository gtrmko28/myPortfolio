import { motion } from "framer-motion";
import { BarChart2, Activity, Search, Briefcase } from "lucide-react";

/* === SUPERPOWERS SECTION (v2.0) === */
const SUPERPOWERS = [
  { icon: BarChart2, label: "Deep Analytical Thinking" },
  { icon: Activity, label: "Metrics-Driven Approach" },
  { icon: Search, label: "UX Research" },
  { icon: Briefcase, label: "Strategic Business Context" },
];

const SuperpowersSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="section-padding container-main"
    >
      <h2 className="heading-section text-center mb-14">
        My superpowers as a designer
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-[700px] mx-auto">
        {SUPERPOWERS.map(({ icon: Icon, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="flex items-center gap-3.5 p-6 rounded-2xl ink-border bg-card transition-shadow duration-200 hover:shadow-[0_4px_16px_rgba(27,42,107,0.08)]"
          >
            <Icon
              size={28}
              className="shrink-0"
              style={{ color: 'hsl(227, 60%, 26%)' }}
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <span className="text-[15px] md:text-[16px] font-semibold text-foreground">
              {label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default SuperpowersSection;
