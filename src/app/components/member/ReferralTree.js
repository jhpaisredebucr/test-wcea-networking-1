//CLIENT COMPONENT

"use client";

import React, { useMemo, useState, useCallback, useRef, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";

import dagre from "dagre";

// layout config
const nodeWidth = 160;
const nodeHeight = 55;
const tooltipDelay = 200; // ms hover delay
const tooltipOffsetX = 10;
const tooltipOffsetY = -5;

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

// Tooltip Component
function Tooltip({ position, data, onMouseLeave }) {
  const lines = [
    data.first_name + ' ' + (data.last_name || ''),
    `Status: ${data.status}` || 'pending',
    `Commission: ₱${data.earnings_from_user || '0.00'}`,
    `Referrals: ${data.total_count || 0}`,
    `Package: ${data.package || 'N/A'}`
  ].filter(Boolean);

  return (
    <div 
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        background: "rgba(255,255,255,1)",
        color: "#555555",
        padding: '8px 12px',
        borderRadius: 8,
        fontSize: '12px',
        lineHeight: 1.5,
        whiteSpace: 'pre-line',
        pointerEvents: 'auto',
        zIndex: 1000,
        minWidth: 140,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        backdropFilter: 'blur(4px)',
      }}
      onMouseEnter={() => {}} // Prevent disappear
      onMouseLeave={onMouseLeave}
    >
      {lines.join('\n')}
    </div>
  );
}

// convert tree → nodes + edges
function convertTreeToGraph(tree) {
  const nodes = [];
  const edges = [];

  function traverse(node, parent = null) {
    const isRoot = node.id === tree.id;
    
    // Status detection - special case for root (always approved green)
    let status = isRoot ? 'approved' : 'unknown';
    let parsedStatus = 'approved'; // Default for root
    
    if (!isRoot) {
      const statusMatch = node.name.match(/\[([^\]]+)\]/i);
      if (statusMatch) {
        parsedStatus = statusMatch[1].toLowerCase().trim();
        if (parsedStatus.includes('approved') || parsedStatus.includes('active')) status = 'approved';
        else if (parsedStatus.includes('pending') || parsedStatus.includes('waitlist')) status = 'pending';
        else if (parsedStatus.includes('declined') || parsedStatus.includes('rejected') || parsedStatus.includes('banned')) status = 'declined';
      }
    }
    
    const borderColor = status === 'approved' ? '#83ff83' : status === 'pending' ? '#ffd883' : status === 'declined' ? '#ff6a6a' : '#666666';
    const bgColor = status === 'approved' ? 'rgba(131, 255, 131, 0.15)' : status === 'pending' ? 'rgba(255, 216, 131, 0.15)' : status === 'declined' ? 'rgba(255, 106, 106, 0.15)' : 'rgba(102, 102, 102, 0.15)';
    const textColor = status === 'approved' ? '#059669' : status === 'pending' ? '#d97706' : status === 'declined' ? '#dc2626' : '#6b7280';
    
    // Compact label
    const label = node.data?.label ?? node.name ?? 'Unknown User';
    
    // Full data for tooltip - handle root and children
    let fullData = node.data?.fullData;
    if (!fullData) {
      // Parse from name for root
      const nameMatch = node.name.match(/^(.+?)\s+\((.+?)\)\s+\[(.+?)\]/);
      if (nameMatch) {
        fullData = {
          first_name: node.name.split(' ')[0],
          last_name: node.name.split(' ')[1] || '',
          status: parsedStatus,
          earnings_from_user: '0.00',
          total_count: 0,
          package: 'N/A'
        };
      } else {
        fullData = {
          first_name: 'N/A',
          last_name: '',
          status: parsedStatus,
          earnings_from_user: '0.00',
          total_count: 0,
          package: 'N/A'
        };
      }
    }
    
    nodes.push({
      id: node.id,
      data: { 
        label,
        fullData,
        isRoot
      },
      position: { x: 0, y: 0 },
      style: {
        border: `2px solid ${borderColor}`,
        borderRadius: 12,
        background: bgColor,
        color: textColor,
        width: nodeWidth,
        height: nodeHeight,
        padding: '6px 8px',
        textAlign: "center",
        fontSize: '12px',
        lineHeight: 1.3,
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        transition: 'all 0.2s ease',
      },
    });

    if (parent) {
      edges.push({
        id: `${parent}-${node.id}`,
        source: parent,
        target: node.id,
        style: { stroke: '#888', strokeWidth: 2 },
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
  const [tooltip, setTooltip] = useState({ show: false, position: {}, data: null });
  const [tooltipTimeout, setTooltipTimeout] = useState(null);
  const containerRef = useRef(null);
  const [expandedNodes, setExpandedNodes] = useState(new Set());
  const [loadingNodes, setLoadingNodes] = useState(new Set());

  const loadChildren = useCallback(async (nodeId, currentDepth = 1) => {
    const isExpanded = expandedNodes.has(nodeId);
    
    if (loadingNodes.has(nodeId)) return;
    
    if (isExpanded && currentDepth < maxDepth) {
      // Collapse - remove children
      setTreeData(prev => {
        const updateNode = (node) => {
          if (node.id === nodeId) {
            return { ...node, children: [] };
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
      setExpandedNodes(prev => {
        const newSet = new Set(prev);
        newSet.delete(nodeId);
        return newSet;
      });
      return;
    }
    
    if (!isExpanded && currentDepth >= maxDepth) return;
    
    setLoadingNodes(prev => new Set(prev).add(nodeId));
    
    try {
      const members = await fetchChildren(nodeId);
      const children = members.map(member => ({
        id: member.referral_code,
        name: `${(member.first_name ?? 'N/A')} ${member.last_name ?? ''} [${member.status ?? 'pending'}]\n₱${member.earnings_from_user ?? '0.00'}`,
        data: { fullData: member },
        children: [],
        depth: currentDepth + 1,
        canExpand: currentDepth + 1 < maxDepth
      }));

      setTreeData(prev => {
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
  }, [fetchChildren, expandedNodes, maxDepth]);

  const onNodeMouseEnter = useCallback((event, node) => {
    // Skip tooltip for root node
    if (node.data.isRoot) return;
    
    if (node.data.fullData && containerRef.current) {
      // Clear previous timeout
      if (tooltipTimeout) {
        clearTimeout(tooltipTimeout);
      }
      
      const rect = containerRef.current.getBoundingClientRect();
      const nodeRect = event.currentTarget.getBoundingClientRect();
      
      const showTooltip = () => {
        setTooltip({
          show: true,
          position: {
            x: nodeRect.right + tooltipOffsetX - rect.left,
            y: nodeRect.top + tooltipOffsetY - rect.top,
          },
          data: node.data.fullData
        });
      };

      const timeoutId = setTimeout(showTooltip, tooltipDelay);
      setTooltipTimeout(timeoutId);
    }
  }, [tooltipTimeout]);

  const onNodeMouseLeave = useCallback(() => {
    if (tooltipTimeout) {
      clearTimeout(tooltipTimeout);
    }
    setTooltipTimeout(null);
    setTooltip({ show: false, position: {}, data: null });
  }, [tooltipTimeout]);

  const onTooltipMouseEnter = useCallback(() => {
    if (tooltipTimeout) {
      clearTimeout(tooltipTimeout);
    }
    setTooltipTimeout(null);
  }, [tooltipTimeout]);

  const onTooltipMouseLeave = useCallback(() => {
    setTooltip({ show: false, position: {}, data: null });
    setTooltipTimeout(null);
  }, []);

  const onNodeClick = useCallback((_, node) => {
    loadChildren(node.id, node.depth || 1);
  }, [loadChildren]);

  const { nodes, edges } = useMemo(() => {
    const graph = convertTreeToGraph(treeData);
    return getLayoutedElements(graph.nodes, graph.edges);
  }, [treeData]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%", position: 'relative' }}>
      <ReactFlow 
        nodes={nodes} 
        edges={edges} 
        onNodeMouseEnter={onNodeMouseEnter}
        onNodeMouseLeave={onNodeMouseLeave}
        onNodeClick={onNodeClick}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
      {tooltip.show && tooltip.data && (
        <Tooltip 
          position={tooltip.position} 
          data={tooltip.data}
          onMouseEnter={onTooltipMouseEnter}
          onMouseLeave={onTooltipMouseLeave}
        />
      )}
    </div>
  );
}
