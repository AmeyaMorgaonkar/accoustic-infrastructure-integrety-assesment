"use client";

import React, { useState } from "react";
import { Cpu, Terminal, ArrowUpRight, Wifi, ShieldCheck } from "lucide-react";

interface NavbarProps {
  onOpenSerial?: () => void;
  isConnected?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSerial,
  isConnected = true,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#0B0C0E]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center border border-white/[0.12] bg-[#121316] text-[#FF5C00]">
            <Cpu className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <a
              href="#"
              className="font-mono text-sm font-semibold tracking-wider text-white transition-colors hover:text-[#FF5C00]"
            >
              IMPULSENDT // PROTOTYPE
            </a>
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
              [SYS.REV-2026.10 // ESP32]
            </span>
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 border border-white/[0.06] bg-[#121316]/60 px-3 py-1.5 rounded-none">
          <a
            href="#overview"
            className="px-3 py-1 font-mono text-xs uppercase tracking-wider text-zinc-400 transition-colors hover:text-white"
          >
            Overview
          </a>
          <span className="text-zinc-700 font-mono text-xs">/</span>
          <a
            href="#architecture"
            className="px-3 py-1 font-mono text-xs uppercase tracking-wider text-zinc-400 transition-colors hover:text-white"
          >
            Architecture
          </a>
          <span className="text-zinc-700 font-mono text-xs">/</span>
          <a
            href="#telemetry"
            className="px-3 py-1 font-mono text-xs uppercase tracking-wider text-zinc-400 transition-colors hover:text-white"
          >
            Telemetry
          </a>
          <span className="text-zinc-700 font-mono text-xs">/</span>
          <a
            href="#status-matrix"
            className="px-3 py-1 font-mono text-xs uppercase tracking-wider text-zinc-400 transition-colors hover:text-white"
          >
            Status Matrix
          </a>
        </nav>

        {/* Right Section: Status Pill & Action Button */}
        <div className="flex items-center gap-3">
          {/* Technical Hardware Status Pill */}
          <button
            onClick={onOpenSerial}
            title="Click to manage hardware serial interface"
            className="group flex items-center gap-2 border border-white/[0.08] bg-[#121316] px-3 py-1.5 transition-colors hover:border-[#FF5C00]/40"
          >
            <span className="relative flex h-2 w-2">
              {isConnected ? (
                <>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </>
              ) : (
                <span className="relative inline-flex h-2 w-2 rounded-full bg-zinc-600"></span>
              )}
            </span>
            <span className="font-mono text-[11px] tracking-wide text-zinc-300 group-hover:text-white">
              {isConnected ? "ESP32-DEV-CONNECTED" : "ESP32-DISCONNECTED"}
            </span>
          </button>

          {/* Primary CTA */}
          <a
            href="#workbench"
            className="inline-flex items-center gap-1.5 border border-[#FF5C00] bg-[#FF5C00] px-3.5 py-1.5 font-mono text-xs font-medium text-black transition-all hover:bg-[#FF5C00]/90 active:scale-[0.98]"
          >
            <span>[ Launch Workbench ]</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-black" />
          </a>
        </div>
      </div>
    </header>
  );
};
