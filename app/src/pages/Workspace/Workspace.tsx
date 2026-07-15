import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import api from "../../api/api";

import { toPng } from "html-to-image";
import jsPDF from "jspdf";

import ReactFlow, {
  ReactFlowProvider,
  useReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  ConnectionMode,
  Handle,
  Position,
} from "reactflow";

import 'reactflow/dist/style.css';

import { useParams } from "react-router-dom";

const styles = {
  workspaceWrapper: {
    height: "100vh",
    background: "#0f172a",
    padding: "20px",
    boxSizing: "border-box",
  },

  navbar: {
    height: "70px",
    background: "#1e293b",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
  },

  navbarLeft: {
    display: "flex",
    alignItems: "center",
  },

  navbarRight: {
    display: "flex",
    gap: "12px",
  },

  body: {
    display: "flex",
    height: "calc(100vh - 110px)",
    background: "#efefef",
  },

  sidebar: {
    width: "220px",
    borderRight: "1px solid #ccc",
    padding: "16px",
    background: "white",
  },

  canvasArea: {
    flex: 1,
    height: "100%",
  },

  primaryBtn: {
    background: "#6366f1",
    color: "white",
    border: "none",
    padding: "10px 18px",
    cursor: "pointer",
  },

  bigBtn: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    background: "#6366f1",
    color: "white",
    border: "none",
    cursor: "pointer",
  },

  titleInput: {
  fontSize: "36px",
  fontWeight: "700",
  border: "none",
  outline: "none",
  background: "transparent",
  color: "white",
  padding: 0,
  width: "auto",
  minWidth: "250px",
},
};


const handleStyle = {
  width: 12,
  height: 12,
  background: "#2563eb",
  border: "2px solid white",
};


function CustomNode({ data }: any) {
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
        <div
          style={{
            width: 100,
            height: 100,
            background: data.color || "#fff",
            border: "2px solid #ccc",
            transform: "rotate(45deg)",
            position: "absolute",
            zIndex: 0,
          }}
        />

        <div
          style={{
            position: "absolute",
            zIndex: 2,
            fontWeight: 400,
            pointerEvents: "none",
          }}
        >
          {data.label}
        </div>

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

  

  if (shape === "triangle") {
  return (
    <div
      style={{
        width: 120,
        height: 100,
        position: "relative",
      }}
    >
      <svg
        width="120"
        height="100"
        viewBox="0 0 120 100"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        <polygon
          points="60,2 2,98 118,98"
          fill={data.color || "#fff"}
          stroke="#c4c4c4"
          strokeWidth="2"
        />
      </svg>

      <div
        style={{
          position: "absolute",
          width: "100%",
          top: 58,
          left: 0,
          textAlign: "center",
          fontWeight: 400,
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        {data.label}
      </div>

      <Handle
        id="top"
        type="source"
        position={Position.Top}
        style={{
          ...handleStyle,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      <Handle
        id="bottom-left"
        type="source"
        position={Position.Left}
        style={{
          ...handleStyle,
          left: 0,
          top: 100,
        }}
      />

      <Handle
        id="bottom-right"
        type="source"
        position={Position.Right}
        style={{
          ...handleStyle,
          right: 0,
          top: 100,
        }}
      />
    </div>
  );
}

if (shape === "hexagon") {
  return (
    <div
      style={{
        width: 140,
        height: 100,
        position: "relative",
      }}
    >
      <svg
        width="140"
        height="100"
        viewBox="0 0 140 100"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        <polygon
          points="
            35,2
            105,2
            138,50
            105,98
            35,98
            2,50
          "
          fill={data.color || "#fff"}
          stroke="#c4c4c4"
          strokeWidth="2"
        />
      </svg>

      <div
        style={{
          position: "absolute",
          width: "100%",
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
          textAlign: "center",
          fontWeight: 400,
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        {data.label}
      </div>

      <Handle
        id="top-left"
        type="source"
        position={Position.Top}
        style={{
          ...handleStyle,
          left: "25%",
        }}
      />

      <Handle
        id="top-right"
        type="source"
        position={Position.Top}
        style={{
          ...handleStyle,
          left: "75%",
        }}
      />

      <Handle
        id="right"
        type="source"
        position={Position.Right}
        style={handleStyle}
      />

      <Handle
        id="bottom-right"
        type="source"
        position={Position.Bottom}
        style={{
          ...handleStyle,
          left: "75%",
        }}
      />

      <Handle
        id="bottom-left"
        type="source"
        position={Position.Bottom}
        style={{
          ...handleStyle,
          left: "25%",
        }}
      />

      <Handle
        id="left"
        type="source"
        position={Position.Left}
        style={handleStyle}
      />
    </div>
  );
}

if (shape === "note") {
  return (
    <div
      style={{
        width: 140,
        height: 100,
        background: "#FDE68A",
        borderRadius: 8,
        border: "2px solid #ccc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {data.label}

      <Handle id="top" type="source" position={Position.Top} style={handleStyle} />
      <Handle id="right" type="source" position={Position.Right} style={handleStyle} />
      <Handle id="bottom" type="source" position={Position.Bottom} style={handleStyle} />
      <Handle id="left" type="source" position={Position.Left} style={handleStyle} />
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
          background: data.color || "#fff",
          border: "2px solid #ccc",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Handle
          id="top"
          type="source"
          position={Position.Top}
          style={handleStyle}
        />

        <Handle
          id="right"
          type="source"
          position={Position.Right}
          style={handleStyle}
        />

        <Handle
          id="bottom"
          type="source"
          position={Position.Bottom}
          style={handleStyle}
        />

        <Handle
          id="left"
          type="source"
          position={Position.Left}
          style={handleStyle}
        />

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
        background: data.color || "#fff",
        border: "2px solid #ccc",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Handle
        id="top"
        type="source"
        position={Position.Top}
        style={handleStyle}
      />

      <Handle
        id="right"
        type="source"
        position={Position.Right}
        style={handleStyle}
      />

      <Handle
        id="bottom"
        type="source"
        position={Position.Bottom}
        style={handleStyle}
      />

      <Handle
        id="left"
        type="source"
        position={Position.Left}
        style={handleStyle}
      />

      {data.label}
    </div>
  );
}

const nodeTypes = {
  custom: CustomNode,
};

function WorkspaceContent() {
  const idRef = useRef(2);


  const { mapId } = useParams();

  const reactFlowWrapper =
  useRef<HTMLDivElement>(null);


  const [showExportMenu, setShowExportMenu] =
  useState(false);

  const [loadingMap, setLoadingMap] = useState(true);

  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  const { screenToFlowPosition } =
  useReactFlow();

  const [mindMapName, setMindMapName] =
    useState("Mindmap Name");
    

    const [sidebarCollapsed, setSidebarCollapsed] =
  useState(false);

  const flowRef = useRef<HTMLDivElement>(null);

  const [nodes, setNodes] = useState<any[]>([]);
  
  const [showCollaboratorModal, setShowCollaboratorModal] = useState(false);

  const [collaboratorEmail, setCollaboratorEmail] = useState("");

  const [collaboratorPermission, setCollaboratorPermission] =
    useState<"view" | "edit">("edit");

  const [sendingInvite, setSendingInvite] = useState(false);

  const [edges, setEdges] =
    useState<any[]>([]);

  const [selectedNode, setSelectedNode] =
    useState<string | null>(null);

  const [selectedColor, setSelectedColor] =
    useState("#ffffff");

  const [selectedEdge, setSelectedEdge] =
    useState<string | null>(null);

  const createNode = (shape: string) => {
    const id = crypto.randomUUID();

    setNodes((nds: any) => [
      ...nds,
      {
        id,
        type: "custom",
        position: {
          x: 200 + Math.random() * 400,
          y: 100 + Math.random() * 300,
        },
        data: {
          label:
            shape.charAt(0).toUpperCase() +
            shape.slice(1),
        shape,
        color: "#ffffff",
        },
      },
    ]);
  };

  const onDragOver = useCallback(
  (event: DragEvent | any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  },
  []
);

const onDrop = useCallback(
  (event: DragEvent | any) => {
    event.preventDefault();

    const shape =
      event.dataTransfer.getData(
        "application/reactflow"
      );

    if (!shape) return;

    const position =
  screenToFlowPosition({
    x: event.clientX,
    y: event.clientY,
  });

    const id = crypto.randomUUID();

    setNodes((nds) => [
      ...nds,
      {
        id,
        type: "custom",
        position,
        data: {
          label:
            shape.charAt(0).toUpperCase() +
            shape.slice(1),
          shape,
          color: "#ffffff",
        },
      },
    ]);
  },
  [
    screenToFlowPosition
  ]
);

  const onNodesChange = useCallback(
    (changes: any) => {
      setNodes((nds: any) =>
        applyNodeChanges(changes, nds as any)
      );
    },
    []
  );

  const onEdgesChange = useCallback(
    (changes: any) => {
      setEdges((eds: any) =>
        applyEdgeChanges(changes, eds as any)
      );
    },
    []
  );

  const onConnect = useCallback(
    (params: any) => {
      setEdges((eds: any) =>
        addEdge(
          {
            ...params,
            animated: true,
            type: "bezier",
          },
          eds
        )
      );
    },
    []
  );

  useEffect(() => {
    const handleDelete = (e: KeyboardEvent) => {
      if (e.key !== "Delete") return;

      if (selectedEdge) {
        setEdges((eds: any) =>
          eds.filter(
            (edge: any) =>
              edge.id !== selectedEdge
          )
        );

        setSelectedEdge(null);
        return;
      }

      if (selectedNode) {
        setNodes((nds: any) =>
          nds.filter(
            (node: any) =>
              node.id !== selectedNode
          )
        );

        setEdges((eds: any) =>
          eds.filter(
            (edge: any) =>
              edge.source !==
                selectedNode &&
              edge.target !==
                selectedNode
          )
        );

        setSelectedNode(null);
      }
    };

    window.addEventListener(
      "keydown",
      handleDelete
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleDelete
      );
  }, [
    selectedNode,
    selectedEdge,
  ]);

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

    a.download =
      `${mindMapName}.json`;

    a.click();
  };

  const exportPNG = async () => {
  if (!flowRef.current) return;

  try {
    const dataUrl = await toPng(flowRef.current);

    const link = document.createElement("a");
    link.download = `${mindMapName}.png`;
    link.href = dataUrl;
    link.click();
  } catch (err) {
    console.error(err);
  }
};



const exportPDF = async () => {
  if (!flowRef.current) return;

  try {
    const dataUrl = await toPng(flowRef.current);

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
    });

    const imgProps = pdf.getImageProperties(dataUrl);

    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pdfHeight =
      (imgProps.height * pdfWidth) /
      imgProps.width;

    pdf.addImage(
      dataUrl,
      "PNG",
      0,
      0,
      pdfWidth,
      pdfHeight
    );

    pdf.save(`${mindMapName}.pdf`);
  } catch (err) {
    console.error(err);
  }
};

const sendCollaboratorInvite = async () => {
  if (!collaboratorEmail.trim()) {
    alert("Enter an email.");
    return;
  }

  try {
    setSendingInvite(true);

    const token = localStorage.getItem("token");

    await api.post(
      "/maps/requests/request-access",
      {
        email: collaboratorEmail,
        permission:
          collaboratorPermission,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Invitation sent!");

    setCollaboratorEmail("");

    setCollaboratorPermission(
      "edit"
    );

    setShowCollaboratorModal(false);

  } catch (err) {
    console.error(err);

    alert(
      "Unable to send invitation."
    );
  } finally {
    setSendingInvite(false);
  }
};

useEffect(() => {
  if (!mapId) return;

  const loadMap = async () => {
    try {
      setLoadingMap(true);


      const token = localStorage.getItem("token");

const response = await api.get(`/maps/${mapId}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});


const map = response.data.map ?? response.data;

      setMindMapName(map.title);

      setNodes(map.nodes || []);

      setEdges(map.edges || []);

      setHasLoadedOnce(true);

    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMap(false);
    }
  };

  loadMap();

}, [mapId]);

useEffect(() => {
  if (!mapId) return;

  if (loadingMap) return;

  const timer = setTimeout(async () => {
    try {

      const token =
        localStorage.getItem("token");
    } catch (err) {
      console.error(err);
    }
  }, 700);

  return () => clearTimeout(timer);

}, [
  mapId,
  nodes,
  edges,
  mindMapName,
  loadingMap,
]);

  return (
    <div
      style={
        styles.workspaceWrapper as React.CSSProperties
      }
    >
      <header
        style={
          styles.navbar as React.CSSProperties
        }
      >
        <div
          style={
            styles.navbarLeft as React.CSSProperties
          }
        >


          <input
          autoFocus
  value={mindMapName}
  onChange={(e) =>
    setMindMapName(e.target.value)
  }
  spellCheck={false}
  style={{
    fontSize: "36px",
    fontWeight: 700,
    background: "transparent",
    border: "none",
    outline: "none",
    color: "white",
    width: "350px",
  }}
/>

<div
style={{
fontSize:12,
color:"#cbd5e1",
marginTop:4
}}
>


</div>

        </div>

        <div
          style={
            styles.navbarRight as React.CSSProperties
          }
        >
          <button
  onClick={() =>
    setShowCollaboratorModal(true)
  }
  style={
    styles.primaryBtn as React.CSSProperties
  }
>
  Add Collaborators
</button>

          <div
  style={{
    position: "relative",
  }}
>
  <button
    onClick={() =>
      setShowExportMenu(
        !showExportMenu
      )
    }
    style={
      styles.primaryBtn as React.CSSProperties
    }
  >
    Export ▼
  </button>

  {showExportMenu && (
    <div
      style={{
        position: "absolute",
        right: 0,
        top: "110%",

        background: "#1e293b",

        border:
          "1px solid #374151",

        borderRadius: 8,

        overflow: "hidden",

        minWidth: 140,

        zIndex: 999,
      }}
    >
      <button
        onClick={() => {
          exportMindMap();
          setShowExportMenu(false);
        }}
        style={menuButton}
      >
        JSON
      </button>

      <button
        onClick={() => {
          exportPNG();
          setShowExportMenu(false);
        }}
        style={menuButton}
      >
        PNG
      </button>

      <button
        onClick={() => {
          exportPDF();
          setShowExportMenu(false);
        }}
        style={menuButton}
      >
        PDF
      </button>
    </div>
  )}
</div>
        </div>
      </header>

      <div
        style={
          styles.body as React.CSSProperties
        }
      >
        <aside
  style={{
    width: sidebarCollapsed ? 60 : 220,
    transition: "all 0.3s ease",

    background: "#081229",

    padding: sidebarCollapsed ? 6 : 16,

    overflow: "hidden",

    borderRight: sidebarCollapsed
      ? "none"
      : "1px solid #374151",

    boxSizing: "border-box",
  }}
>
            <button
                onClick={() =>
                    setSidebarCollapsed(!sidebarCollapsed)
                }
            style={{
                width: "100%",
                marginBottom: 20,
                background: "#374151",
                color: "white",
                border: "none",
                padding: 12,
                cursor: "pointer",
                borderRadius: 8,
            }}
        >
            ☰
        </button>
<div
  draggable
  
  onDragStart={(e) => {
    e.dataTransfer.setData(
      "application/reactflow",
      "rectangle"
    );
  }}
  style={{
  width: "100%",
  boxSizing: "border-box",

  display: "flex",
  alignItems: "center",
  justifyContent: sidebarCollapsed
    ? "center"
    : "flex-start",

  gap: "8px",

  background: "#6366f1",
  color: "white",

  padding: "6px 10px",
  marginBottom: "5px",

  borderRadius: "6px",

  cursor: "grab",
  userSelect: "none",

  fontSize: "18px",
}}
>
  <span>▭</span>
{!sidebarCollapsed && <span>Rectangle</span>}
</div>

<div
  draggable
  onDragStart={(e) => {
    e.dataTransfer.setData(
      "application/reactflow",
      "circle"
    );
  }}
  style={{
  width: "100%",
  boxSizing: "border-box",

  display: "flex",
  alignItems: "center",
  justifyContent: sidebarCollapsed
    ? "center"
    : "flex-start",

  gap: "8px",

  background: "#6366f1",
  color: "white",

  padding: "6px 10px",
  marginBottom: "5px",

  borderRadius: "6px",

  cursor: "grab",
  userSelect: "none",

  fontSize: "18px",
}}
>
  <span>○</span>
  {!sidebarCollapsed && <span> Circle</span>}
</div>

<div
  draggable
  onDragStart={(e) => {
    e.dataTransfer.setData(
      "application/reactflow",
      "diamond"
    );
  }}
  style={{
  width: "100%",
  boxSizing: "border-box",

  display: "flex",
  alignItems: "center",
  justifyContent: sidebarCollapsed
    ? "center"
    : "flex-start",

  gap: "8px",

  background: "#6366f1",
  color: "white",

  padding: "6px 10px",
  marginBottom: "5px",

  borderRadius: "6px",

  cursor: "grab",
  userSelect: "none",

  fontSize: "18px",
}}
>
  <span>◇</span>
  {!sidebarCollapsed && <span> Diamond</span>}
</div>

<div
  draggable
  onDragStart={(e) => {
    e.dataTransfer.setData(
      "application/reactflow",
      "triangle"
    );
  }}
  style={{
  width: "100%",
  boxSizing: "border-box",

  display: "flex",
  alignItems: "center",
  justifyContent: sidebarCollapsed
    ? "center"
    : "flex-start",

  gap: "8px",

  background: "#6366f1",
  color: "white",

  padding: "6px 10px",
  marginBottom: "5px",

  borderRadius: "6px",

  cursor: "grab",
  userSelect: "none",

  fontSize: "18px",
}}
>
  <span>△</span> 
  {!sidebarCollapsed && <span> Triangle</span>}
</div>

<div
  draggable
  onDragStart={(e) => {
    e.dataTransfer.setData(
      "application/reactflow",
      "hexagon"
    );
  }}
  style={{
  width: "100%",
  boxSizing: "border-box",

  display: "flex",
  alignItems: "center",
  justifyContent: sidebarCollapsed
    ? "center"
    : "flex-start",

  gap: "8px",

  background: "#6366f1",
  color: "white",

  padding: "6px 10px",
  marginBottom: "5px",

  borderRadius: "6px",

  cursor: "grab",
  userSelect: "none",

  fontSize: "18px",
}}
>
  <span>⬡</span>
  {!sidebarCollapsed && <span> Hexagon</span>}
</div>

<div
  draggable
  onDragStart={(e) => {
    e.dataTransfer.setData(
      "application/reactflow",
      "note"
    );
  }}
  style={{
  width: "100%",
  boxSizing: "border-box",

  display: "flex",
  alignItems: "center",
  justifyContent: sidebarCollapsed
    ? "center"
    : "flex-start",

  gap: "8px",

  background: "#6366f1",
  color: "white",

  padding: "6px 10px",
  marginBottom: "5px",

  borderRadius: "6px",

  cursor: "grab",
  userSelect: "none",

  fontSize: "18px",
}}
>
  <span>📝</span>
  {!sidebarCollapsed && <span> Note  </span>}
</div>

{!sidebarCollapsed && (
  <>
    <hr style={{ margin: "20px 0" }} />

    <div
      style={{
        color: "white",
        marginBottom: 10,
        fontWeight: "bold",
      }}
    >
      Node Color
    </div>

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      <input
        type="color"
        value={selectedColor}
        onChange={(e) => {
          const color = e.target.value;

          setSelectedColor(color);

          if (!selectedNode) return;

          setNodes((nds: any) =>
            nds.map((n: any) =>
              n.id === selectedNode
                ? {
                    ...n,
                    data: {
                      ...n.data,
                      color,
                    },
                  }
                : n
            )
          );
        }}
        style={{
          width: "120px",
          height: "40px",
          border: "1px solid #555",
          borderRadius: "8px",
          cursor: "pointer",
          background: "transparent",
          padding: 0,
        }}
      />
    </div>
  </>
)}
        </aside>

        <main
  ref={reactFlowWrapper}
          style={
            styles.canvasArea as React.CSSProperties
          }
        >

          <div
           ref = {flowRef}
           style={{
            width: "100%",
            height: "100%",
          }}
          >
          <ReactFlow

          
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onDrop={onDrop}
onDragOver={onDragOver}
            onNodesChange={
              onNodesChange
            }
            onEdgesChange={
              onEdgesChange
            }
            onConnect={
              onConnect
            }
            onNodeClick={(_, node) => {
  setSelectedNode(node.id);

  setSelectedColor(
    node.data.color || "#ffffff"
  );
}}
            onEdgeClick={(
              _,
              edge
            ) =>
              setSelectedEdge(
                edge.id
              )
            }
            onNodeDoubleClick={(
              _,
              node
            ) => {
              const label =
                prompt(
                  "Rename Node",
                  node.data.label
                );

              if (!label?.trim())
                return;

              setNodes(
                (
                  nds: any
                ) =>
                  nds.map(
                    (
                      n: any
                    ) =>
                      n.id ===
                      node.id
                        ? {
                            ...n,
                            data: {
                              ...n.data,
                              label,
                            },
                          }
                        : n
                  )
              );
            }}
            connectionMode={
              ConnectionMode.Loose
            }
            fitView
          >
            <Controls />
            <Background />
          </ReactFlow>
          </div>
        </main>
      </div>
          {
showCollaboratorModal && (
<div
style={{
position:"fixed",
inset:0,
background:"rgba(0,0,0,.45)",
display:"flex",
justifyContent:"center",
alignItems:"center",
zIndex:9999
}}
>

<div
style={{
width:430,
background:"#1e293b",
padding:24,
borderRadius:14,
color:"white"
}}
>

<h2>Add Collaborator</h2>

<input
type="email"
placeholder="Email"
value={collaboratorEmail}
onChange={(e)=>
setCollaboratorEmail(e.target.value)
}
style={{
width:"100%",
padding:12,
marginBottom:20,
borderRadius:8
}}
/>

<select
value={collaboratorPermission}
onChange={(e)=>
setCollaboratorPermission(
e.target.value as
"view"|"edit"
)
}
style={{
width:"100%",
padding:12,
marginBottom:20,
borderRadius:8
}}
>

<option value="view">
View
</option>

<option value="edit">
Edit
</option>

</select>

<div
style={{
display:"flex",
justifyContent:"flex-end",
gap:10
}}
>

<button
onClick={()=>
setShowCollaboratorModal(false)
}
>
Cancel
</button>

<button
onClick={sendCollaboratorInvite}
disabled={sendingInvite}
>

{
sendingInvite
?
"Sending..."
:
"Send Invite"
}

</button>

</div>

</div>

</div>
)
}
      
    </div>
  );
}

const menuButton: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  background: "transparent",
  color: "white",
  border: "none",
  cursor: "pointer",
  textAlign: "left",
};

export default function Workspace() {
  return (
    <ReactFlowProvider>
      <WorkspaceContent />
    </ReactFlowProvider>
  );
}