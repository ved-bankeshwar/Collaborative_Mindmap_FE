import React from "react";
import GlassSurface from "./GlassSurface"; // Adjust path if necessary

const Navbar: React.FC = () => {
  return (
    <GlassSurface
      width="100%"
      height="auto" // Changed from 80 to "auto" to prevent overflow on mobile devices
      borderRadius={0}
      className="fixed top-0 left-0 w-full z-[1000] min-h-[80px]"
    >
      <nav className="relative z-10 box-border flex w-full flex-col items-center gap-[15px] p-[15px] sm:h-[80px] sm:flex-row sm:justify-between sm:p-0 sm:px-[25px] md:px-[50px]">
        {/* Left Side */}
        <div className="flex items-center">
          <h2 className="text-[18px] font-bold tracking-[1px] text-white sm:text-[24px] md:text-[32px]">
            Site Name
          </h2>
        </div>

        {/* Right Side */}
        <div className="flex flex-wrap items-center justify-center gap-[10px] sm:flex-nowrap sm:gap-[15px] md:gap-[30px]">
          <a
            href="/"
            className="text-[14px] font-medium text-white no-underline transition duration-300 hover:opacity-70 sm:text-[16px]"
          >
            Page
          </a>

          <a
            href="/"
            className="text-[14px] font-medium text-white no-underline transition duration-300 hover:opacity-70 sm:text-[16px]"
          >
            Page
          </a>

          <a
            href="/"
            className="text-[14px] font-medium text-white no-underline transition duration-300 hover:opacity-70 sm:text-[16px]"
          >
            Page
          </a>

          <button className="cursor-pointer rounded-[10px] border border-white/20 bg-white/10 px-[14px] py-[8px] text-white backdrop-blur-[10px] transition duration-300 hover:bg-white/15 sm:px-[18px] sm:py-[10px]">
            Button
          </button>
        </div>
      </nav>
    </GlassSurface>
  );
};

export default Navbar;
