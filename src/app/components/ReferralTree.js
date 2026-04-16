"use client";

import React, { useMemo } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";

import dagre from "dagre";

// layout config
const nodeWidth = 180;
const nodeHeight = 60;

// dagre layout function
function getLayoutedElements(nodes, edges, direction = "TB") {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);

    return {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
}

// convert tree → nodes + edges
function convertTreeToGraph(tree) {
  const nodes = [];
  const edges = [];

  function traverse(node, parent = null) {
    // Robust status detection
    let status = 'unknown';
    const statusMatch = node.name.match(/\[([^\]]+)\]/i);
    if (statusMatch) {
      const rawStatus = statusMatch[1].toLowerCase().trim();
      if (rawStatus.includes('approved') || rawStatus.includes('active')) status = 'approved';
      else if (rawStatus.includes('pending') || rawStatus.includes('waitlist')) status = 'pending';
      else if (rawStatus.includes('declined') || rawStatus.includes('rejected') || rawStatus.includes('banned')) status = 'declined';
    }
    console.log('Node name:', node.name, '-> Raw:', statusMatch ? statusMatch[1] : null, '-> Parsed:', status);
    
    const borderColor = status === 'approved' ? '#83ff83' : status === 'pending' ? '#ffd883' : status === 'declined' ? '#ff6a6a' : '#666666';
    const bgColor = status === 'approved' ? 'rgba(131, 255, 131, 0.1)' : status === 'pending' ? 'rgba(255, 216, 131, 0.1)' : status === 'declined' ? 'rgba(255, 106, 106, 0.1)' : 'rgba(102, 102, 102, 0.1)';
    const textColor = status === 'approved' ? '#3a9a3a' : status === 'pending' ? '#b86a00' : status === 'declined' ? '#b81d1d' : '#6b7280';
    
    nodes.push({
      id: node.id,
      data: { label: node.name },
      position: { x: 0, y: 0 }, // temp (dagre will fix)
      style: {
        border: `1px solid ${borderColor}`,
        padding: 10,
        borderRadius: 10,
        background: bgColor,
        color: textColor,
        width: nodeWidth,
        textAlign: "center",
        fontSize: '12px',
        lineHeight: 1.2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });




    if (parent) {
      edges.push({
        id: `${parent}-${node.id}`,
        source: parent,
        target: node.id,
        animated: true,
      });
    }

    if (node.children) {
      node.children.forEach((child) => traverse(child, node.id));
    }
  }

  traverse(tree);

  return { nodes, edges };
}

export default function ReferralTree({ data, fetchChildren, maxDepth = 3 }) {
  const [treeData, setTreeData] = React.useState(data);
  const [expandedNodes, setExpandedNodes] = React.useState(new Set());
  const [loadingNodes, setLoadingNodes] = React.useState(new Set());

  const loadChildren = React.useCallback(async (nodeId, currentDepth = 1) => {
    if (loadingNodes.has(nodeId) || expandedNodes.has(nodeId) || currentDepth >= maxDepth) return;
    
    setLoadingNodes(prev => new Set(prev).add(nodeId));
    
    try {
      const members = await fetchChildren(nodeId);
      const children = members.map(member => ({
        id: member.referral_code,
        name: `${member.first_name || ''} ${member.last_name || ''} (${member.username}) [${member.status}]`,
        children: [],
        depth: currentDepth + 1
      }));

      setTreeData(prev => {
        // Update tree recursively
        const updateNode = (node) => {
          if (node.id === nodeId) {
            return { ...node, children };
          }
          if (node.children) {
            return {
              ...node,
              children: node.children.map(updateNode)
            };
          }
          return node;
        };
        return updateNode(prev);
      });
      
      setExpandedNodes(prev => new Set(prev).add(nodeId));
    } catch (err) {
      console.error('Failed to load children:', err);
    } finally {
      setLoadingNodes(prev => {
        const newSet = new Set(prev);
        newSet.delete(nodeId);
        return newSet;
      });
    }
  }, [fetchChildren, loadingNodes, expandedNodes, maxDepth]);

  const { nodes, edges } = useMemo(() => {
    const graph = convertTreeToGraph(treeData);
    return getLayoutedElements(graph.nodes, graph.edges);
  }, [treeData]);

  const onNodeClick = (_, node) => {
    loadChildren(node.id, (node.depth || 1));
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlow 
        nodes={nodes} 
        edges={edges} 
        onNodeClick={onNodeClick}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
