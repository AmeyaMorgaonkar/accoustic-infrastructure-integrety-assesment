"use client";

import React from "react";
import { X, FileCode, CheckCircle2, ChevronRight, Layers, Cpu, ShieldAlert } from "lucide-react";

interface SpecificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpecificationModal: React.FC<SpecificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-white/[0.14] bg-[#0E0F12] p-6 sm:p-8 shadow-2xl">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-white/[0.08] pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#FF5C00] uppercase mb-1">
              <span className="h-1.5 w-1.5 bg-[#FF5C00]"></span>
              [ HARDWARE SPECIFICATION & ENGINEERING REFERENCE // REV-2026.10 ]
            </div>
            <h3 className="font-sans text-2xl font-bold text-white">
              System Engineering Specification
            </h3>
          </div>

          <button
            onClick={onClose}
            className="border border-white/[0.1] bg-[#121316] p-2 text-zinc-400 hover:text-white hover:border-white/30 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Section 1: Mechanical Specimen & Physics */}
        <div className="mb-8">
          <h4 className="font-mono text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="text-[#FF5C00]">01 //</span> Mechanical Setup & Structural Physics
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs text-zinc-300">
            <div className="border border-white/[0.06] bg-[#121316] p-4">
              <span className="text-[10px] text-zinc-500 uppercase">Test Specimen</span>
              <div className="text-white font-semibold text-sm mt-1">60 cm Aluminium Flat Bar</div>
              <p className="text-zinc-400 text-[11px] mt-2">
                Cross-section: 25 mm × 3 mm. 10 cm securely clamped to rigid bench (effective cantilever free span = 50 cm).
              </p>
            </div>
            <div className="border border-white/[0.06] bg-[#121316] p-4">
              <span className="text-[10px] text-zinc-500 uppercase">Cantilever Stiffness Physics</span>
              <div className="text-[#FF5C00] font-semibold text-sm mt-1">ωn = √(k / m)</div>
              <p className="text-zinc-400 text-[11px] mt-2">
                Where k = 3EI / L³. A micro-crack or notch reduces cross-sectional moment of inertia I, causing a downward shift in fundamental modal frequency.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Analog Front-End (MCP6002 Op-Amp) */}
        <div className="mb-8">
          <h4 className="font-mono text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="text-[#FF5C00]">02 //</span> Piezoelectric Analog Conditioning Circuit
          </h4>
          <div className="border border-white/[0.08] bg-[#121316] p-4 font-mono text-xs text-zinc-300 space-y-2">
            <div className="flex items-center gap-2 text-[#FF5C00] font-semibold">
              <span>CIRCUIT TOPOLOGY: MCP6002 DUAL RAIL-TO-RAIL (DIP-8)</span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Dual resistor divider from 3V3 rail creates Virtual Ground VB = 1.65 V bypassed with 10 μF & 100 nF capacitors.
              Piezo disc brass electrode is tied to VB; ceramic electrode feeds the non-inverting (+) op-amp input.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/[0.06] text-[11px]">
              <div>
                <span className="text-zinc-500 block">Gain Equation:</span>
                <span className="text-white">Av = 1 + (Rf / 10kΩ)</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Input Protection:</span>
                <span className="text-white">Dual 1N4148 Back-to-Back</span>
              </div>
              <div>
                <span className="text-zinc-500 block">ADC Protection:</span>
                <span className="text-white">1 kΩ Series to GPIO34/35</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Pin Mapping Matrix */}
        <div className="mb-8">
          <h4 className="font-mono text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="text-[#FF5C00]">03 //</span> ESP32 Pin Assignment Schedule
          </h4>
          <div className="border border-white/[0.08] bg-[#121316] overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-white/[0.1] bg-[#0E0F12] text-zinc-400">
                  <th className="py-2.5 px-3 uppercase">ESP32 Pin</th>
                  <th className="py-2.5 px-3 uppercase">Connected Component</th>
                  <th className="py-2.5 px-3 uppercase">Function / Electrical Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05] text-zinc-300">
                <tr>
                  <td className="py-2 px-3 font-semibold text-[#FF5C00]">GPIO21</td>
                  <td className="py-2 px-3">ADXL345 SDA</td>
                  <td className="py-2 px-3 text-zinc-400">I2C Data line (External pull-up)</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold text-[#FF5C00]">GPIO22</td>
                  <td className="py-2 px-3">ADXL345 SCL</td>
                  <td className="py-2 px-3 text-zinc-400">I2C Clock line (400 kHz Fast-Mode)</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold text-[#FF5C00]">GPIO34</td>
                  <td className="py-2 px-3">Piezo Amp Channel A</td>
                  <td className="py-2 px-3 text-zinc-400">ADC1 Input Only (0 - 3.3V)</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold text-[#FF5C00]">GPIO35</td>
                  <td className="py-2 px-3">Piezo Amp Channel B</td>
                  <td className="py-2 px-3 text-zinc-400">ADC1 Input Only (0 - 3.3V)</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold text-[#FF5C00]">GPIO25 / 26</td>
                  <td className="py-2 px-3">100Ω to PZT1 Discs</td>
                  <td className="py-2 px-3 text-zinc-400">Differential Bridge Transmitter Drive</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold text-[#FF5C00]">GPIO16 / 17 / 18</td>
                  <td className="py-2 px-3">330Ω to Green / Amber / Red LEDs</td>
                  <td className="py-2 px-3 text-zinc-400">Triage Annunciator Hardware Outputs</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold text-[#FF5C00]">GPIO04</td>
                  <td className="py-2 px-3">Tactile Push Button to GND</td>
                  <td className="py-2 px-3 text-zinc-400">Baseline Calibration (Internal Pull-Up)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 4: Damage Index Math Formula */}
        <div>
          <h4 className="font-mono text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="text-[#FF5C00]">04 //</span> Composite Damage Index (DI) Formulation
          </h4>
          <div className="border border-white/[0.08] bg-[#121316] p-4 font-mono text-xs text-zinc-300">
            <div className="text-sm font-bold text-white mb-2">
              DI = [ w_freq × (|f0 - f_live| / f0) + w_acoustic × (1 - E_pulse / E0) ] × 100%
            </div>
            <p className="text-zinc-400 text-xs mb-3">
              Where w_freq = 0.60 and w_acoustic = 0.40. Damage thresholds are hardcoded in firmware:
            </p>
            <div className="grid grid-cols-3 gap-2 text-[11px]">
              <div className="border border-emerald-500/30 bg-emerald-950/20 p-2 text-emerald-400">
                <span className="font-bold">HEALTHY:</span> DI &lt; 10% (Δf &lt; 0.2 Hz)
              </div>
              <div className="border border-amber-500/30 bg-amber-950/20 p-2 text-amber-400">
                <span className="font-bold">WARNING:</span> 10% ≤ DI &lt; 25% (Δf ≈ 1.4 Hz)
              </div>
              <div className="border border-red-500/30 bg-red-950/20 p-2 text-red-400">
                <span className="font-bold">CRITICAL:</span> DI ≥ 25% (Δf &gt; 4.5 Hz)
              </div>
            </div>
          </div>
        </div>

        {/* Modal Close Button */}
        <div className="mt-8 pt-4 border-t border-white/[0.08] flex justify-end">
          <button
            onClick={onClose}
            className="border border-[#FF5C00] bg-[#FF5C00] px-5 py-2 font-mono text-xs font-semibold text-black uppercase hover:bg-[#FF5C00]/90"
          >
            [ Close Specification ]
          </button>
        </div>

      </div>
    </div>
  );
};
