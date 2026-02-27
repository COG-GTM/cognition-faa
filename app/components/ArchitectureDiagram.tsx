"use client";

import { useState } from "react";
import { architectureNodes } from "../lib/data";

function NodeBox({
  node,
  isActive,
  onClick,
  x,
  y,
  width,
  height,
}: {
  node: (typeof architectureNodes)[number];
  isActive: boolean;
  onClick: () => void;
  x: number;
  y: number;
  width: number;
  height: number;
}) {
  return (
    <g
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      aria-label={`${node.label}: ${node.subtitle}. Click to ${isActive ? "collapse" : "expand"} details.`}
      className="cursor-pointer"
    >
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={isActive ? "#003B71" : "#000"}
        stroke={isActive ? "#003B71" : "#000"}
        strokeWidth="2"
      />
      <text
        x={x + width / 2}
        y={y + height / 2 - 8}
        textAnchor="middle"
        fill="#fff"
        fontFamily="'JetBrains Mono', monospace"
        fontSize="13"
        fontWeight="700"
      >
        {node.label}
      </text>
      <text
        x={x + width / 2}
        y={y + height / 2 + 12}
        textAnchor="middle"
        fill="#fff"
        fontFamily="'JetBrains Mono', monospace"
        fontSize="10"
        opacity="0.8"
      >
        {node.subtitle}
      </text>
    </g>
  );
}

export default function ArchitectureDiagram() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const orchestrator = architectureNodes[0];
  const brain = architectureNodes[1];
  const executionNodes = architectureNodes.slice(2);

  const handleClick = (id: string) => {
    setActiveNode(activeNode === id ? null : id);
  };

  const activeDetail = architectureNodes.find((n) => n.id === activeNode);

  return (
    <section
      id="architecture"
      className="border-b border-[#E5E5E5]"
      aria-label="Devin Architecture"
    >
      <div className="section-container">
        <p className="section-title">SYSTEM ARCHITECTURE</p>
        <h2 className="font-mono text-2xl md:text-3xl font-bold text-black mb-4">
          THE DEVINCLAW ARCHITECTURE
        </h2>
        <p className="font-sans text-sm text-black/50 mb-10">
          Click any node to view details.
        </p>

        {/* SVG Diagram */}
        <div className="w-full overflow-x-auto mb-8">
          <svg
            viewBox="0 0 1060 340"
            className="w-full max-w-[1060px] mx-auto"
            role="img"
            aria-label="Architecture diagram showing Devin system components: Orchestrator, Brain/Knowledge, and six execution layers"
          >
            {/* Orchestrator */}
            <NodeBox
              node={orchestrator}
              isActive={activeNode === orchestrator.id}
              onClick={() => handleClick(orchestrator.id)}
              x={180}
              y={10}
              width={700}
              height={70}
            />

            {/* Connection line */}
            <line
              x1={530}
              y1={80}
              x2={530}
              y2={110}
              stroke="#E5E5E5"
              strokeWidth="2"
            />

            {/* Brain */}
            <NodeBox
              node={brain}
              isActive={activeNode === brain.id}
              onClick={() => handleClick(brain.id)}
              x={180}
              y={110}
              width={700}
              height={70}
            />

            {/* Vertical connector from brain */}
            <line
              x1={530}
              y1={180}
              x2={530}
              y2={200}
              stroke="#E5E5E5"
              strokeWidth="2"
            />

            {/* Horizontal spread line */}
            <line
              x1={90}
              y1={200}
              x2={970}
              y2={200}
              stroke="#E5E5E5"
              strokeWidth="2"
            />

            {/* Drop-down lines */}
            {executionNodes.map((_, i) => {
              const nodeX = 20 + i * 170;
              const nodeCenterX = nodeX + 150 / 2;
              return (
                <line
                  key={`drop-${i}`}
                  x1={nodeCenterX}
                  y1={200}
                  x2={nodeCenterX}
                  y2={230}
                  stroke="#E5E5E5"
                  strokeWidth="2"
                />
              );
            })}

            {/* Execution nodes */}
            {executionNodes.map((node, i) => {
              const nodeX = 20 + i * 170;
              return (
                <NodeBox
                  key={node.id}
                  node={node}
                  isActive={activeNode === node.id}
                  onClick={() => handleClick(node.id)}
                  x={nodeX}
                  y={230}
                  width={150}
                  height={70}
                />
              );
            })}
          </svg>
        </div>

        {/* Detail panel */}
        {activeDetail && (
          <div
            className="border-2 border-[#003B71] p-6 md:p-8 bg-white"
            role="region"
            aria-live="polite"
            aria-label={`Details for ${activeDetail.label}`}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-mono text-sm font-bold tracking-wider text-[#003B71]">
                {activeDetail.label}
              </h3>
              <button
                onClick={() => setActiveNode(null)}
                className="font-mono text-xs text-black/50 hover:text-black border border-[#E5E5E5] px-3 py-1 bg-white"
                aria-label="Close details panel"
              >
                CLOSE
              </button>
            </div>
            <p className="font-sans text-sm text-black/80 leading-relaxed">
              {activeDetail.description}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
