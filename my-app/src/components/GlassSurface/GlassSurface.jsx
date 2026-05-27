/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState, useRef, useId } from "react";
import "./GlassSurface.css";

const GlassSurface = ({
  children,
  width = "100%",
  height = 80,
  borderRadius = 20,
  className = "",
  style = {},
}) => {

  const uniqueId = useId().replace(/:/g, "-");
  const filterId = `glass-filter-${uniqueId}`;

  const [svgSupported, setSvgSupported] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    setSvgSupported(supportsSVGFilters());
  }, []);

  const supportsSVGFilters = () => {
    if (typeof window === "undefined") {
      return false;
    }

    const div = document.createElement("div");

    div.style.backdropFilter = `url(#${filterId})`;

    return div.style.backdropFilter !== "";
  };

  const containerStyle = {
    ...style,
    width:
      typeof width === "number"
        ? `${width}px`
        : width,

    height:
      typeof height === "number"
        ? `${height}px`
        : height,

    borderRadius: `${borderRadius}px`,
  };

  return (
    <div
      ref={containerRef}
      className={`glass-surface ${
        svgSupported
          ? "glass-surface--svg"
          : "glass-surface--fallback"
      } ${className}`}
      style={containerStyle}
    >

      <svg
        className="glass-surface__filter"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter
            id={filterId}
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
            />
          </filter>
        </defs>
      </svg>

      <div className="glass-surface__content">
        {children}
      </div>

    </div>
  );
};

export default GlassSurface;