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


  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 border-b border-[#E5E7EB] ${
        scrolled
          ? "bg-white/[0.98] py-3 md:py-4 backdrop-blur-md shadow-sm"
          : "bg-white py-3 md:py-4"
      }`}
    >
      <nav className="container-wide flex items-center justify-between" aria-label="Main navigation">
        <a href="/" aria-label="Home">
          <Logo />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="/resume"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-tertiary"
          >
            Resume
          </a>
          <a
            href="https://www.linkedin.com/in/maria-pohranychna-uiuxdesigner?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-tertiary"
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
        <div className="absolute top-full left-0 w-full md:hidden bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E5E7EB] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="container-main flex flex-col gap-3 py-4">
            <a
              href="/resume"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tertiary py-2"
              onClick={() => setMenuOpen(false)}
            >
              Resume
            </a>
            <a
              href="https://www.linkedin.com/in/maria-pohranychna-uiuxdesigner?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tertiary py-2"
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
