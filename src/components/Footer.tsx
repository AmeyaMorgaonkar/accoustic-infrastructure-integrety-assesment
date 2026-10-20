"use client";

import React from "react";
import { Cpu, GitBranch, ExternalLink, Terminal, ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#0E0F12] py-12 text-zinc-400 font-mono text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-between pb-8 border-b border-white/[0.06]">
          
          {/* Left Brand & Details */}
          <div className="md:col-span-6 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-white">
              <Cpu className="h-4 w-4 text-[#FF5C00]" />
              <span className="font-bold tracking-wider">
                IMPULSENDT // STRUCTURAL INTEGRITY LABS
              </span>
            </div>
            <p className="text-zinc-500 font-sans text-xs max-w-md leading-relaxed">
              Non-Destructive Acoustic Infrastructure Integrity Assessment System using
              dual-channel piezoelectric transducer pulse-echo and 3-axis vibration FFT telemetry.
            </p>
          </div>

          {/* Right Meta Badges */}
          <div className="md:col-span-6 flex flex-col md:items-end gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="border border-white/[0.08] bg-[#121316] px-2.5 py-1 text-zinc-300">
                BUILD: <span className="text-[#FF5C00] font-semibold">REV-2026.10</span>
              </span>
              <span className="border border-white/[0.08] bg-[#121316] px-2.5 py-1 text-zinc-300">
                ARCH: ESP32-WROOM-32D
              </span>
              <span className="border border-white/[0.08] bg-[#121316] px-2.5 py-1 text-zinc-300">
                FW: v2.4.1-PROD
              </span>
            </div>

            <a
              href="https://github.com/AmeyaMorgaonkar/accoustic-infrastructure-integrety-assesment"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-[#FF5C00] transition-colors border border-white/[0.1] bg-[#121316] px-3 py-1.5 hover:border-[#FF5C00]/40"
            >
              <GitBranch className="h-4 w-4 text-[#FF5C00]" />
              <span>GitHub Repository</span>
              <ExternalLink className="h-3 w-3 text-zinc-500" />
            </a>
          </div>

        </div>

        {/* Bottom copyright and legal disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-600 text-[11px]">
          <div>
            © 2026 ImpulseNDT Infrastructure Assessment. All rights reserved. Built for College Research & Physical Structural Diagnostics.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-zinc-500">NO CLOUD DEPENDENCY // LOCAL SERIAL BUS</span>
            <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full"></span>
            <span className="text-zinc-500">SYSTEM NOMINAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
