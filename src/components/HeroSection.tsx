import { motion } from "framer-motion";

/* === HERO SECTION (v2.0) === */
const EASING = [0.25, 0.1, 0.25, 1] as const;

const HeroSection = () => {
  return (
    <section className="flex min-h-[90vh] flex-col items-center justify-center gap-10 md:gap-16 pt-32 pb-16 md:pt-0 md:pb-0 md:flex-row container-main">
      {/* Left: Vertical portrait photo with arch shape */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: EASING }}
        className="relative w-full max-w-[280px] md:max-w-[300px] shrink-0"
        style={{ aspectRatio: "3/4" }}
      >
        <div
          className="w-full h-full overflow-hidden"
          style={{ borderRadius: "50% 50% 20px 20px / 40% 40% 20px 20px" }}
        >
          <img
            src="/mariia.jpg"
            alt="Mariia Pohranychna portrait"
            className="w-full h-full object-cover object-top"
          />
        </div>
      </motion.div>

      {/* Right: Text block — strict left-alignment, max-width constrained */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: EASING, delay: 0.1 }}
        className="flex flex-col items-center text-center md:items-start md:text-left md:max-w-[480px]"
      >
        {/* Headline Option 1: Hi, I'm Mariia, a Product Business Partner (ACTIVE) */}
        <h1 className="heading-hero">
          Hi, I'm Mariia
        </h1>
        {/* Headline Option 2: Results-Oriented Product Designer */}
        {/* <h1 className="heading-hero">Results-Oriented Product Designer</h1> */}

        <p className="mt-4 text-body max-w-[420px]">
          I design with data, focus on business context, and ship with purpose.
        </p>

        {/* CTA — auto width */}
        <a
          href="https://t.me/placeholder"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-8"
        >
          Contact me
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
