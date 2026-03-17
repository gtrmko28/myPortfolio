import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

/* === HEADER / NAVIGATION (v2.0) === */
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClass =
    "relative text-[15px] font-normal text-foreground after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-foreground after:transition-all after:duration-200 hover:after:w-full";

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/[0.92] py-4 backdrop-blur-md shadow-[var(--shadow-nav)]"
          : "bg-transparent py-6 md:py-8"
      }`}
    >
      <nav className="container-main flex items-center justify-between" aria-label="Main navigation">
        <a href="/" aria-label="Home">
          <Logo />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Resume
          </a>
          <a
            href="https://linkedin.com/in/placeholder"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            LinkedIn
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          style={{ color: 'hsl(227, 60%, 26%)' }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-foreground/[0.08] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="container-main flex flex-col gap-4 py-6">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] font-normal text-foreground py-2"
              onClick={() => setMenuOpen(false)}
            >
              Resume
            </a>
            <a
              href="https://linkedin.com/in/placeholder"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] font-normal text-foreground py-2"
              onClick={() => setMenuOpen(false)}
            >
              LinkedIn
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
