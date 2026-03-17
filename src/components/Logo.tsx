/* === MP MONOGRAM LOGO (v2.0) === */
const Logo = () => (
  <div className="flex items-center gap-2 group cursor-pointer">
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="MP Monogram"
      role="img"
    >
      {/* Joined MP monogram — M shares right vertical with P */}
      {/* M: left vertical */}
      <line x1="4" y1="6" x2="4" y2="26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* M: left diagonal */}
      <line x1="4" y1="6" x2="14" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* M: right diagonal */}
      <line x1="14" y1="18" x2="24" y2="6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Shared M-right / P-left vertical stroke */}
      <line x1="24" y1="6" x2="24" y2="26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* P: bowl (arc from top of shared stroke) */}
      <path d="M24 6 L28 6 Q32 6 32 12 Q32 18 28 18 L24 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
    <div className="flex flex-col leading-[1.1]">
      <span className="text-[17px] font-bold tracking-tight" style={{ color: 'hsl(227, 60%, 26%)' }}>Mariia</span>
      <span className="text-[13px] font-bold" style={{ color: 'hsl(227, 60%, 26%)' }}>Pohranychna</span>
    </div>
  </div>
);

export default Logo;
