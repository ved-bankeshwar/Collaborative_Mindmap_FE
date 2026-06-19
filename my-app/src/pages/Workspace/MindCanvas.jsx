import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  ConnectionMode,
} from "reactflow";

import "reactflow/dist/style.css";

import CustomNode from "./CustomNode";

const nodeTypes = {
  custom: CustomNode,
};

export default function MindCanvas({
  nodes,
  edges,
  setNodes,
  setEdges,
}) {
  const [selectedNode, setSelectedNode] =
    useState(null);

  const [selectedEdge, setSelectedEdge] =
    useState(null);

  const onNodesChange = useCallback(
    (changes) => {
      setNodes((nds) =>
        applyNodeChanges(changes, nds)
      );
    },
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => {
      setEdges((eds) =>
        applyEdgeChanges(changes, eds)
      );
    },
    [setEdges]
  );

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) =>
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
    [setEdges]
  );

  const onNodeDoubleClick = (
    _,
    node
  ) => {
    const label = prompt(
      "Rename Node",
      node.data.label
    );

    if (!label) return;

    setNodes((nds) =>
      nds.map((n) =>
        n.id === node.id
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
  };

  useEffect(() => {
    const handleDelete = (e) => {
      if (e.key !== "Delete") return;

      if (selectedEdge) {
        setEdges((eds) =>
          eds.filter(
            (edge) =>
              edge.id !== selectedEdge
          )
        );

        setSelectedEdge(null);
        return;
      }

      if (selectedNode) {
        setNodes((nds) =>
          nds.filter(
            (node) =>
              node.id !== selectedNode
          )
        );

        setEdges((eds) =>
          eds.filter(
            (edge) =>
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
    setNodes,
    setEdges,
  ]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <ReactFlow
  nodes={nodes}
  edges={edges}
  nodeTypes={nodeTypes}
  onNodesChange={onNodesChange}
  onEdgesChange={onEdgesChange}
  onConnect={onConnect}
  onNodeClick={(_, node) =>
    setSelectedNode(node.id)
  }
  onEdgeClick={(_, edge) =>
    setSelectedEdge(edge.id)
  }
  onNodeDoubleClick={
    onNodeDoubleClick
  }
  connectionMode={ConnectionMode.Loose}
  fitView
>   
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}