import * as React from "react";
import { cn } from "@/lib/utils";

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full px-4 h-7 text-[11px] font-bold tracking-widest uppercase transition-all duration-200 border border-[#1B2A6B]/30 bg-[#1B2A6B]/5 text-[#1B2A6B] leading-none pt-[1px]",
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Tag.displayName = "Tag";

export { Tag };
