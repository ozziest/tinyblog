import { Breakpoints } from "@/enums";
import { useState, useEffect } from "react";

const useTailwindBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState(
    getBreakpoint(window.innerWidth),
  );

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getBreakpoint(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
};

// Utility function to determine the breakpoint
const getBreakpoint = (width: number): Breakpoints => {
  if (width >= 1536) return Breakpoints["2xl"];
  if (width >= 1280) return Breakpoints.xl;
  if (width >= 1024) return Breakpoints.lg;
  if (width >= 768) return Breakpoints.md;
  if (width >= 640) return Breakpoints.sm;
  return Breakpoints.xs; // default for widths below 640px
};

export default useTailwindBreakpoint;
