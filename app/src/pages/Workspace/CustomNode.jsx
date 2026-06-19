import React from "react";
import { Handle, Position } from "reactflow";

const handleStyle = {
  width: 12,
  height: 12,
  background: "#2563eb",
  border: "2px solid white",
};

export default function CustomNode({ data }) {
  const shape = data.shape || "rectangle";

  if (shape === "diamond") {
  return (
    <div
      style={{
        width: 140,
        height: 140,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Diamond Shape */}
      <div
        style={{
          width: 100,
          height: 100,
          background: "#fff",
          border: "2px solid #ccc",
          transform: "rotate(45deg)",
          position: "absolute",
          zIndex: 0,
        }}
      />

      {/* Label */}
      <div
        style={{
          position: "absolute",
          zIndex: 2,
          fontWeight: "bold",
          pointerEvents: "none",
        }}
      >
        {data.label}
      </div>

      {/* Top Vertex */}
      <Handle
        id="top"
        type="source"
        position={Position.Top}
        style={{
          ...handleStyle,
          top: -6,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
        }}
      />

      {/* Right Vertex */}
      <Handle
        id="right"
        type="source"
        position={Position.Right}
        style={{
          ...handleStyle,
          right: -6,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 3,
        }}
      />

      {/* Bottom Vertex */}
      <Handle
        id="bottom"
        type="source"
        position={Position.Bottom}
        style={{
          ...handleStyle,
          bottom: -6,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
        }}
      />

      {/* Left Vertex */}
      <Handle
        id="left"
        type="source"
        position={Position.Left}
        style={{
          ...handleStyle,
          left: -6,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 3,
        }}
      />
    </div>
  );
}

  if (shape === "circle") {
    return (
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: "#fff",
          border: "2px solid #ccc",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Handle id="top" type="source" position={Position.Top} style={handleStyle} />
        <Handle id="right" type="source" position={Position.Right} style={handleStyle} />
        <Handle id="bottom" type="source" position={Position.Bottom} style={handleStyle} />
        <Handle id="left" type="source" position={Position.Left} style={handleStyle} />

        {data.label}
      </div>
    );
  }

  return (
    <div
      style={{
        width: 140,
        height: 70,
        borderRadius: 8,
        background: "#fff",
        border: "2px solid #ccc",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Handle id="top" type="source" position={Position.Top} style={handleStyle} />
      <Handle id="right" type="source" position={Position.Right} style={handleStyle} />
      <Handle id="bottom" type="source" position={Position.Bottom} style={handleStyle} />
      <Handle id="left" type="source" position={Position.Left} style={handleStyle} />

      {data.label}
    </div>
  );
}