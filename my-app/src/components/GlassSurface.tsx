
import React, {
  useEffect,
  useState,
  useRef,
  useId,
  ReactNode,
  CSSProperties,
} from "react";


interface GlassSurfaceProps {
  children?: ReactNode;
  width?: string | number;
  height?: string | number;
  borderRadius?: number;
  className?: string;
  style?: CSSProperties; 
}

const GlassSurface: React.FC<GlassSurfaceProps> = ({
  children,
  width = "100%",
  height = 80,
  borderRadius = 20,
  className = "",
  style = {},
}) => {
  const uniqueId = useId().replace(/:/g, "-");
  const filterId = `glass-filter-${uniqueId}`;

  const [svgSupported, setSvgSupported] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSvgSupported(supportsSVGFilters());
  }, []);

  const supportsSVGFilters = (): boolean => {
    if (typeof window === "undefined") {
      return false;
    }
    const div = document.createElement("div");
    div.style.backdropFilter = `url(#${filterId})`;
    return div.style.backdropFilter !== "";
  };

  const containerStyle: React.CSSProperties = {
    ...style,
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    borderRadius: `${borderRadius}px`,
  };

  return (
    <div
      ref={containerRef}
      style={containerStyle}
      className={`
        relative flex items-center justify-center overflow-hidden transition duration-300 ease-in-out
        bg-[rgba(255,255,255,0.06)]
        backdrop-blur-[22px] backdrop-saturate-[2.2] backdrop-brightness-[1.15]
        border-b border-white/15
        shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-1px_0_rgba(255,255,255,0.08)]
        hover:bg-[rgba(255,255,255,0.09)]
        hover:shadow-[0_8px_40px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.22)]
        ${svgSupported ? "glass-surface--svg" : "glass-surface--fallback"} 
        ${className}
      `}
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-0 -z-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
          </filter>
        </defs>
      </svg>

      <div className="relative z-10 flex items-center justify-center w-full h-full rounded-[inherit]">
        {children}
      </div>
    </div>
  );
};

export default GlassSurface;
