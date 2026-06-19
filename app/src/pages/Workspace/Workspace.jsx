import React, {
  useRef,
  useState,
} from "react";

import "./Workspace.css";
import MindCanvas from "./MindCanvas";

export default function Workspace() {
  const idRef = useRef(2);

  const [nodes, setNodes] = useState([
    {
      id: "1",
      type: "custom",
      position: {
        x: 250,
        y: 150,
      },
      data: {
        label: "Central Idea",
        shape: "rectangle",
      },
    },
  ]);

  const [edges, setEdges] =
    useState([]);

  const [mindMapName, setMindMapName] = useState("Mindmap Name");

  const createNode = (shape) => {
    const id = `${idRef.current++}`;

    setNodes((nds) => [
      ...nds,
      {
        id,
        type: "custom",
        position: {
          x:
            200 +
            Math.random() * 400,
          y:
            100 +
            Math.random() * 300,
        },
        data: {
          label:
            shape.charAt(0).toUpperCase() +
            shape.slice(1),
          shape,
        },
      },
    ]);
  };

  const exportMindMap = () => {
    const data = JSON.stringify(
      {
        nodes,
        edges,
      },
      null,
      2
    );

    const blob = new Blob(
      [data],
      {
        type:
          "application/json",
      }
    );

    const a =
      document.createElement(
        "a"
      );

    a.href =
      URL.createObjectURL(blob);

    a.download = `${mindMapName}.json`;

    a.click();
  };

  return (
    <div className="workspace-wrapper">
      <header className="workspace-navbar">
        <div className="navbar-left">
          <button className="menu-btn">
            ☰
          </button>

          <input
  value={mindMapName}
  onChange={(e) =>
    setMindMapName(e.target.value)
  }
  className="mindmap-title"
/>
        </div>

        <div className="navbar-right">
          <button className="primary-btn">
            Add Collaborators
          </button>

          <button
            className="primary-btn"
            onClick={exportMindMap}
          >
            Export
          </button>
        </div>
      </header>

      <div className="workspace-body">
        <aside className="sidebar">
          <button
            className="big-btn"
            onClick={() =>
              createNode(
                "rectangle"
              )
            }
          >
            Rectangle
          </button>

          <button
            className="big-btn"
            onClick={() =>
              createNode(
                "circle"
              )
            }
          >
            Circle
          </button>

          <button
            className="big-btn"
            onClick={() =>
              createNode(
                "diamond"
              )
            }
          >
            Diamond
          </button>
        </aside>

        <main className="canvas-area">
          <MindCanvas
            nodes={nodes}
            edges={edges}
            setNodes={setNodes}
            setEdges={setEdges}
          />
        </main>
      </div>
    </div>
  );
}