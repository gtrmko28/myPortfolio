const Logo = () => (
  <div className="flex items-center group cursor-pointer transition-opacity hover:opacity-80">

    {/* Text Stack */}
    <div className="flex flex-col leading-[1.2] text-primary" style={{ fontFamily: "'Geist', 'Inter', sans-serif" }}>
      <span className="text-[16px] md:text-[18px] font-extrabold tracking-tighter uppercase">Maria</span>
      <span className="text-[16px] md:text-[18px] font-extrabold tracking-tighter uppercase">Pohranychna</span>
    </div>
  </div>
);

export default Logo;
