"use client";

import { useState } from "react";
import { navLinks } from "../lib/data";
import USFlag from "./USFlag";

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E5E5E5]"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-14">
        <a
          href="#hero"
          className="font-mono text-sm font-bold tracking-wider text-black no-underline flex items-center gap-3"
        >
          <USFlag />
          COGNITION <span className="text-[#003B71]">//</span> FAA
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-xs font-medium tracking-wider uppercase text-black no-underline hover:text-[#003B71] transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 font-mono text-xs border border-black bg-white text-black"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? "CLOSE" : "MENU"}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#E5E5E5]">
          <ul className="list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-[#E5E5E5]">
                <a
                  href={link.href}
                  className="block px-6 py-3 font-mono text-xs font-medium tracking-wider uppercase text-black no-underline hover:bg-[#F8F8F8]"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
