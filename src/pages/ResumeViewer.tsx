import { useEffect } from "react";

const ResumeViewer = () => {
  useEffect(() => {
    // Set Tab Title
    document.title = "Resume | Mariia Pohranychna";
    
    // Set Favicon to match the rest of the site
    const link: HTMLLinkElement = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/png';
    link.rel = 'icon';
    link.href = '/favicon.png';
    if (!document.querySelector("link[rel*='icon']")) {
      document.getElementsByTagName('head')[0].appendChild(link);
    }
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-white z-[9999]">
      <iframe
        src="/resume.pdf"
        className="w-full h-full border-none"
        title="Resume"
      />
    </div>
  );
};

export default ResumeViewer;
