"use client";

import { useState } from "react";
import { platformCapabilities } from "../lib/data";

export default function PlatformCapabilities() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      id="platform"
      className="border-b border-[#E5E5E5] bg-[#F8F8F8]"
      aria-label="Platform Capabilities"
    >
      <div className="section-container">
        <p className="section-title">PLATFORM</p>
        <h2 className="font-mono text-2xl md:text-3xl font-bold text-black mb-4">
          DEVIN 2.2 + ORCHESTRATOR
        </h2>
        <p className="font-sans text-sm text-black/60 mb-12 max-w-2xl">
          Beyond code generation. A complete autonomous software engineering
          platform with verification, governance, and multi-agent orchestration.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {platformCapabilities.map((cap, i) => (
            <div
              key={cap.title}
              className={`border border-[#E5E5E5] p-6 md:p-8 cursor-pointer transition-colors ${
                activeIndex === i ? "bg-[#003B71] text-white" : "bg-white"
              }`}
              onClick={() => setActiveIndex(activeIndex === i ? null : i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveIndex(activeIndex === i ? null : i);
                }
              }}
              role="button"
              tabIndex={0}
              aria-expanded={activeIndex === i}
            >
              <span
                className={`font-mono text-[10px] font-bold tracking-[0.2em] uppercase px-2 py-1 border inline-block mb-4 ${
                  activeIndex === i
                    ? "border-white/40 text-white/80"
                    : "border-[#003B71]/30 text-[#003B71]"
                }`}
              >
                {cap.tag}
              </span>
              <h3
                className={`font-mono text-sm font-bold tracking-wider mb-3 ${
                  activeIndex === i ? "text-white" : "text-black"
                }`}
              >
                {cap.title}
              </h3>
              <p
                className={`font-sans text-sm leading-relaxed ${
                  activeIndex === i ? "text-white/80" : "text-black/70"
                }`}
              >
                {cap.description}
              </p>
            </div>
          ))}

          {/* 7th card — the empty fill card for grid alignment */}
          <div className="border border-[#E5E5E5] p-6 md:p-8 bg-white hidden lg:flex items-center justify-center">
            <p className="font-mono text-xs font-bold tracking-wider text-black/20 text-center">
              THE SYSTEM GETS
              <br />
              SMARTER WITH
              <br />
              EVERY SESSION
            </p>
          </div>
        </div>

        {/* Detail panel */}
        {activeIndex !== null && (
          <div
            className="border-2 border-[#003B71] p-6 md:p-8 bg-white mt-0"
            role="region"
            aria-live="polite"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-mono text-sm font-bold tracking-wider text-[#003B71]">
                {platformCapabilities[activeIndex].title}
              </h3>
              <button
                onClick={() => setActiveIndex(null)}
                className="font-mono text-xs text-black/50 hover:text-black border border-[#E5E5E5] px-3 py-1 bg-white"
                aria-label="Close details panel"
              >
                CLOSE
              </button>
            </div>
            <ul className="list-none m-0 p-0 grid grid-cols-1 md:grid-cols-2 gap-0">
              {platformCapabilities[activeIndex].highlights.map(
                (highlight, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 py-3 px-4 border-b border-r border-[#E5E5E5]"
                  >
                    <span
                      className="font-mono text-xs text-[#003B71] font-bold shrink-0"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span className="font-sans text-sm text-black/80">
                      {highlight}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
