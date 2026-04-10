import { motion } from "framer-motion";

/* === HERO SECTION (v2.0) === */
const EASING = [0.25, 0.1, 0.25, 1] as const;

const HeroSection = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-10 md:gap-12 lg:gap-24 pt-28 pb-0 md:pt-[160px] md:pb-0 md:flex-row container-main">
      {/* Photo: Left side on desktop */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: EASING }}
        className="relative w-full max-w-[200px] sm:max-w-[240px] md:max-w-[320px] lg:max-w-[340px] shrink-0"
        style={{ aspectRatio: "3.5/5" }}
      >
        <div
          className="w-full h-full overflow-hidden rounded-t-full rounded-b-[40px]"
          style={{
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.05)"
          }}
        >
          <img
            src="/mariia.jpg"
            alt="Maria Pohranychna portrait"
            className="w-full h-full object-cover"
            style={{
              objectPosition: "50% 15%",
              transform: "scale(1.1) translateY(10px)"
            }}
          />
        </div>
      </motion.div>

      {/* Text block: Right side on desktop */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: EASING, delay: 0.1 }}
        className="flex flex-col items-center text-center md:items-start md:text-left max-w-[800px] px-[12px] md:px-0"
      >
        <h1 className="text-[32px] sm:text-[36px] md:text-[42px] lg:text-[52px] font-bold leading-[1.3] md:leading-[1.25] tracking-[-0.025em] text-[#1B2A6B]">
          <span className="inline md:block">I'm Maria, </span>
          <span className="inline md:block">a Product Designer </span>
          <span className="inline md:block md:whitespace-nowrap">who asks "why" before "how"</span>
        </h1>

        <p className="mt-4 md:mt-6 text-body max-w-[540px] text-[16px] md:text-[18px] lg:text-[22px] font-medium text-foreground/100">
          I design with data, focus on business context, and ship with impact.
        </p>

        {/* CTA — auto width */}
        <a
          href="https://t.me/Maria_Pohranychna"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-8 md:mt-10 text-[16px] md:text-[20px] px-8 md:px-12 whitespace-nowrap"
        >
          Contact me
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
