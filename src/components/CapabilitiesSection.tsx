"use client";

import React, { useState } from "react";
import {
  Cpu,
  Activity,
  Zap,
  Sliders,
  ChevronRight,
  Database,
  GitBranch,
  ShieldAlert,
  ArrowRight,
  Layers,
  TerminalSquare,
} from "lucide-react";

export const CapabilitiesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"modules" | "signalFlow" | "pinMap">("modules");

  const modules = [
    {
      id: "esp32",
      badge: "CORE COMPUTATION // DUAL LX6",
      title: "ESP32 Core Processing",
      icon: Cpu,
      description:
        "12-bit ADC capture & real-time Fast Fourier Transform analysis running on dedicated 240MHz Xtensa cores.",
      specs: [
        "ADC1 Channels: GPIO34 & GPIO35",
        "Dual-core RTOS task segregation",
        "1024-point fixed-point FFT routine",
        "Non-volatile baseline signature storage",
      ],
      tag: "HW: ESP32-WROOM-32D",
    },
    {
      id: "adxl345",
      badge: "VIBRATION DYNAMICS // I2C 0x53",
      title: "ADXL345 Telemetry",
      icon: Activity,
      description:
        "High-precision 3-axis accelerometer tracking natural vibration frequency shifts down to sub-0.1 Hz resolution.",
      specs: [
        "I2C Bus: GPIO21 (SDA) / GPIO22 (SCL)",
        "Range: ±2g with 3.9 mg/LSB sensitivity",
        "Measures modal stiffness reduction",
        "Tracks X, Y dynamic deflection & Z gravity",
      ],
      tag: "SENSOR: GY-291 ADXL345",
    },
    {
      id: "piezo",
      badge: "ACOUSTIC PROPAGATION // PZT",
      title: "Piezoelectric Transducers",
      icon: Zap,
      description:
        "Acoustic pulse propagation and damage index calculation conditioned via MCP6002 rail-to-rail op-amp circuitry.",
      specs: [
        "Excitation: GPIO25/GPIO26 bridge drive",
        "PZT1 transmit, PZT2 receive, PZT3 monitor",
        "Virtual ground VB = 1.65V bias network",
        "High-speed crack boundary reflection capture",
      ],
      tag: "FRONTEND: MCP6002 DIP-8",
    },
    {
      id: "status",
      badge: "TRIAGE LOGIC // PHYSICAL GPIO",
      title: "Status Annunciator",
      icon: Sliders,
      description:
        "Hardware LED output mirroring physical health states with composite Damage Index formula thresholds.",
      specs: [
        "GPIO16: Green LED (Healthy, Δf < 0.2 Hz)",
        "GPIO17: Amber LED (Warning, Δf = 1.4 Hz)",
        "GPIO18: Red LED (Critical, Δf > 4.5 Hz)",
        "GPIO04: Push-button baseline calibration",
      ],
      tag: "ANNUNCIATOR: 3-STAGE TRIAGE",
    },
  ];

  const pinMappings = [
    { pin: "ESP32 3V3", connects: "+ rail, ADXL345 VCC & CS, op-amp pin 8", purpose: "Regulated 3.3V System Logic" },
    { pin: "ESP32 GND", connects: "- rail, ADXL345 GND & SDO, op-amp pin 4", purpose: "Common Ground Reference" },
    { pin: "GPIO21", connects: "ADXL345 SDA (I2C Data)", purpose: "Vibration Telemetry Stream" },
    { pin: "GPIO22", connects: "ADXL345 SCL (I2C Clock)", purpose: "400 kHz Fast-Mode Clock" },
    { pin: "GPIO27", connects: "ADXL345 INT1 Interrupt", purpose: "FIFO Data Ready Trigger" },
    { pin: "GPIO34", connects: "Piezo Amp Output Channel A (ADC1)", purpose: "Acoustic Signal ADC Sampling" },
    { pin: "GPIO35", connects: "Piezo Amp Output Channel B (ADC1)", purpose: "Differential Echo ADC Sampling" },
    { pin: "GPIO25", connects: "100Ω to PZT1 ceramic side (+)", purpose: "Bridge Excitation Drive +" },
    { pin: "GPIO26", connects: "100Ω to PZT1 brass side (-)", purpose: "Bridge Excitation Drive -" },
    { pin: "GPIO16", connects: "330Ω to Green LED to GND", purpose: "Healthy Status Indicator" },
    { pin: "GPIO17", connects: "330Ω to Amber LED to GND", purpose: "Warning / Minor Crack Indicator" },
    { pin: "GPIO18", connects: "330Ω to Red LED to GND", purpose: "Critical Damage Indicator" },
    { pin: "GPIO04", connects: "Push Button to GND (Internal Pull-Up)", purpose: "Hardware Baseline Recalibration" },
  ];

  return (
    <section id="architecture" className="relative border-b border-white/[0.08] bg-[#0E0F12] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 border border-white/[0.1] bg-[#121316] px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-[#FF5C00] mb-3">
              <span className="h-1.5 w-1.5 bg-[#FF5C00]"></span>
              [ HARDWARE SUBSYSTEMS // ARCHITECTURE ]
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Core Capabilities & Signal Pipeline
            </h2>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center border border-white/[0.1] bg-[#121316] p-1 font-mono text-xs">
            <button
              onClick={() => setActiveTab("modules")}
              className={`px-3 py-1.5 uppercase tracking-wider transition-all ${
                activeTab === "modules"
                  ? "bg-[#FF5C00] text-black font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Hardware Modules
            </button>
            <button
              onClick={() => setActiveTab("signalFlow")}
              className={`px-3 py-1.5 uppercase tracking-wider transition-all ${
                activeTab === "signalFlow"
                  ? "bg-[#FF5C00] text-black font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Signal Flow
            </button>
            <button
              onClick={() => setActiveTab("pinMap")}
              className={`px-3 py-1.5 uppercase tracking-wider transition-all ${
                activeTab === "pinMap"
                  ? "bg-[#FF5C00] text-black font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Pin Mapping Matrix
            </button>
          </div>
        </div>

        {/* View 1: 4-Card Module Grid */}
        {activeTab === "modules" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((mod) => {
              const IconComponent = mod.icon;
              return (
                <div
                  key={mod.id}
                  className="group relative border border-white/[0.08] bg-[#121316] p-6 lg:p-8 transition-all hover:border-white/[0.22] hover:bg-[#16181D]"
                >
                  {/* Card top bar */}
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-5">
                    <span className="font-mono text-[10px] tracking-widest text-[#FF5C00]">
                      {mod.badge}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center border border-white/[0.1] bg-[#1A1D23] text-[#FF5C00] transition-transform group-hover:scale-105">
                      <IconComponent className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-sans text-xl font-bold tracking-tight text-white mb-2 group-hover:text-[#FF5C00] transition-colors">
                    {mod.title}
                  </h3>
                  <p className="font-sans text-sm text-zinc-400 leading-relaxed mb-6">
                    {mod.description}
                  </p>

                  {/* Bullet Spec List */}
                  <div className="space-y-2 border-t border-white/[0.06] pt-4 font-mono text-xs">
                    {mod.specs.map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-zinc-300">
                        <span className="h-1 w-1 bg-[#FF5C00]"></span>
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom tag */}
                  <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono text-zinc-500">
                    <span>{mod.tag}</span>
                    <span className="text-[#FF5C00] opacity-0 group-hover:opacity-100 transition-opacity">
                      [ VERIFIED ]
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View 2: Signal Flow Diagram */}
        {activeTab === "signalFlow" && (
          <div className="border border-white/[0.1] bg-[#121316] p-6 sm:p-8">
            <div className="font-mono text-xs text-zinc-400 mb-6">
              [ DUAL-MODAL STRUCTURAL HEALTH MONITORING SIGNAL TOPOLOGY ]
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Channel 1: Mechanical Vibration */}
              <div className="border border-white/[0.08] bg-[#0E0F12] p-5">
                <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 mb-3">
                  <Activity className="h-4 w-4" />
                  <span>MODAL VIBRATION PATH</span>
                </div>
                <p className="text-xs text-zinc-400 mb-4">
                  Cantilever beam natural resonance excitation via plucking or environmental ambient vibration.
                </p>
                <div className="space-y-3 font-mono text-xs">
                  <div className="border border-white/[0.06] bg-[#14161B] p-2.5">
                    <span className="text-zinc-500 text-[10px]">TRANSDUCTION</span>
                    <div className="text-white font-semibold">ADXL345 (GY-291)</div>
                    <div className="text-zinc-400 text-[11px]">3-axis dynamic g reading</div>
                  </div>
                  <div className="flex justify-center text-zinc-600">↓ I2C 400kHz</div>
                  <div className="border border-white/[0.06] bg-[#14161B] p-2.5">
                    <span className="text-zinc-500 text-[10px]">ANALYSIS ENGINE</span>
                    <div className="text-white font-semibold">ESP32 1024-PT FFT</div>
                    <div className="text-amber-400 text-[11px]">Peak tracking: f0 → 48.20 Hz</div>
                  </div>
                </div>
              </div>

              {/* Channel 2: Acoustic Pulse-Echo */}
              <div className="border border-white/[0.08] bg-[#0E0F12] p-5">
                <div className="flex items-center gap-2 font-mono text-xs text-[#FF5C00] mb-3">
                  <Zap className="h-4 w-4" />
                  <span>ACOUSTIC PULSE PATH</span>
                </div>
                <p className="text-xs text-zinc-400 mb-4">
                  Active ultrasonic pulse injection through 25x3mm aluminum beam to interrogate crack interfaces.
                </p>
                <div className="space-y-3 font-mono text-xs">
                  <div className="border border-white/[0.06] bg-[#14161B] p-2.5">
                    <span className="text-zinc-500 text-[10px]">TRANSMIT EXCITATION</span>
                    <div className="text-white font-semibold">GPIO25/26 Bridge Drive</div>
                    <div className="text-zinc-400 text-[11px]">3.3Vpp burst to PZT1 ceramic</div>
                  </div>
                  <div className="flex justify-center text-zinc-600">↓ Acoustic Waveguide</div>
                  <div className="border border-white/[0.06] bg-[#14161B] p-2.5">
                    <span className="text-zinc-500 text-[10px]">ANALOG FRONT END</span>
                    <div className="text-white font-semibold">MCP6002 Op-Amp</div>
                    <div className="text-zinc-400 text-[11px]">Virtual Ground VB = 1.65V</div>
                  </div>
                </div>
              </div>

              {/* Channel 3: Decision & Annunciator */}
              <div className="border border-white/[0.08] bg-[#0E0F12] p-5">
                <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 mb-3">
                  <Sliders className="h-4 w-4" />
                  <span>DECISION & TRIAGE</span>
                </div>
                <p className="text-xs text-zinc-400 mb-4">
                  Mathematical fusion of modal frequency shift Δf and acoustic pulse attenuation into Damage Index (DI).
                </p>
                <div className="space-y-3 font-mono text-xs">
                  <div className="border border-white/[0.06] bg-[#14161B] p-2.5">
                    <span className="text-zinc-500 text-[10px]">FUSION FORMULA</span>
                    <div className="text-white font-semibold">DI = α(Δf/f0) + β(1 - A/A0)</div>
                    <div className="text-zinc-400 text-[11px]">Weighting: α=0.6, β=0.4</div>
                  </div>
                  <div className="flex justify-center text-zinc-600">↓ Logic Gate</div>
                  <div className="border border-white/[0.06] bg-[#14161B] p-2.5">
                    <span className="text-zinc-500 text-[10px]">ACTUATION</span>
                    <div className="text-white font-semibold">GPIO16/17/18 LEDs</div>
                    <div className="text-amber-400 text-[11px]">Amber Active: 12.4% Warning</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View 3: Exact Pin Mapping Matrix */}
        {activeTab === "pinMap" && (
          <div className="border border-white/[0.1] bg-[#121316] overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-white/[0.1] bg-[#0D0E12] text-zinc-400">
                  <th className="py-3 px-4 uppercase">ESP32 Pin</th>
                  <th className="py-3 px-4 uppercase">Hardware Connection</th>
                  <th className="py-3 px-4 uppercase">Functional Purpose</th>
                  <th className="py-3 px-4 uppercase text-right">Logic Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {pinMappings.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#181A1F] transition-colors">
                    <td className="py-3 px-4 font-semibold text-[#FF5C00]">{row.pin}</td>
                    <td className="py-3 px-4 text-zinc-200">{row.connects}</td>
                    <td className="py-3 px-4 text-zinc-400">{row.purpose}</td>
                    <td className="py-3 px-4 text-right text-zinc-500">3.3 V Logic</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </section>
  );
};
