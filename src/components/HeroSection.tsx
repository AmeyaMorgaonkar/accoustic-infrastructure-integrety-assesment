"use client";

import React, { useState } from "react";
import {
  Terminal,
  FileCode,
  Layers,
} from "lucide-react";

interface HeroSectionProps {
  onOpenSerial: () => void;
  onOpenSpecs: () => void;
  naturalFrequency?: number;
  baselineFrequency?: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenSerial,
  onOpenSpecs,
  naturalFrequency = 48.2,
  baselineFrequency = 50.0,
}) => {
  const [activeTab, setActiveTab] = useState<"fft" | "pzt">("fft");
  const [showBaselineOverlay, setShowBaselineOverlay] = useState(true);

  const deltaF = (naturalFrequency - baselineFrequency).toFixed(2);

  return (
    <section id="overview" className="relative border-b border-white/[0.08] bg-[#0B0C0E] py-16 lg:py-24 overflow-hidden">
      {/* Background architectural grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          
          {/* Left Column: Monospaced badge, Headline, Subtitle, CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Monospaced Badge */}
            <div className="inline-flex items-center gap-2 border border-white/[0.12] bg-[#121316] px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-[#FF5C00] mb-6 w-fit">
              <span className="h-1.5 w-1.5 bg-[#FF5C00]"></span>
              [ NON-DESTRUCTIVE TESTING // STRUCTURAL HEALTH ]
            </div>

            {/* Headline */}
            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] mb-6">
              Structural integrity,{" "}
              <span className="text-[#FF5C00]">measured down</span> to the hertz.
            </h1>

            {/* Subtitle */}
            <p className="font-sans text-base sm:text-lg text-zinc-400 leading-relaxed mb-8 max-w-xl">
              Low-cost acoustic and vibration monitoring prototype utilizing an
              ESP32, ADXL345 accelerometer, and PZT piezoelectric transducers to
              detect micro-cracks in aluminum infrastructure.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={onOpenSerial}
                className="inline-flex items-center justify-center gap-2 border border-[#FF5C00] bg-[#FF5C00] px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-[#FF5C00]/90 active:scale-[0.98]"
              >
                <Terminal className="h-4 w-4" />
                [ Connect Web Serial ]
              </button>
              
              <button
                onClick={onOpenSpecs}
                className="inline-flex items-center justify-center gap-2 border border-white/[0.14] bg-[#121316] px-5 py-3 font-mono text-xs font-medium uppercase tracking-wider text-zinc-200 transition-all hover:border-white/30 hover:bg-[#181A1F] active:scale-[0.98]"
              >
                <FileCode className="h-4 w-4 text-zinc-400" />
                [ View Specification ]
              </button>
            </div>

            {/* Hardware Specification Micro-Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-white/[0.08] pt-6 font-mono text-xs">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-zinc-500">Test Specimen</span>
                <span className="font-semibold text-zinc-200">600×25×3mm AL</span>
                <span className="text-[9px] text-zinc-500">50cm Cantilever</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-zinc-500">Sampling Rate</span>
                <span className="font-semibold text-zinc-200">2.0 kHz ADC1</span>
                <span className="text-[9px] text-zinc-500">12-Bit Dual Core</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-zinc-500">Vibration Bus</span>
                <span className="font-semibold text-zinc-200">I2C @ 0x53</span>
                <span className="text-[9px] text-zinc-500">ADXL345 3-Axis</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-zinc-500">Signal Cond</span>
                <span className="font-semibold text-zinc-200">MCP6002 OpAmp</span>
                <span className="text-[9px] text-zinc-500">VB = 1.65V Bias</span>
              </div>
            </div>

          </div>

          {/* Right Column: Minimalist browser window frame wrapping dark-mode FFT curves */}
          <div className="lg:col-span-6">
            <div className="border border-white/[0.12] bg-[#121316] shadow-2xl relative">
              
              {/* Window Frame Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#0E0F12] px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/80"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80"></div>
                  <span className="ml-2 font-mono text-[11px] text-zinc-400 tracking-wide">
                    [FFT_SPECTRUM_ANALYZER_V1.02] // LIVE_FEED
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    GPIO34: ACTIVE
                  </span>
                </div>
              </div>

              {/* Sub-Header Toolbar */}
              <div className="flex items-center justify-between border-b border-white/[0.06] bg-[#121316] px-4 py-2 font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab("fft")}
                    className={`px-2.5 py-1 text-xs uppercase tracking-wider transition-colors ${
                      activeTab === "fft"
                        ? "bg-[#1F2128] text-white border-b-2 border-[#FF5C00]"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    Modal FFT Spectrum
                  </button>
                  <button
                    onClick={() => setActiveTab("pzt")}
                    className={`px-2.5 py-1 text-xs uppercase tracking-wider transition-colors ${
                      activeTab === "pzt"
                        ? "bg-[#1F2128] text-white border-b-2 border-[#FF5C00]"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    Acoustic Pulse (PZT)
                  </button>
                </div>

                <button
                  onClick={() => setShowBaselineOverlay(!showBaselineOverlay)}
                  className="flex items-center gap-1 text-[10px] text-zinc-400 hover:text-white transition-colors"
                >
                  <Layers className="h-3 w-3" />
                  <span>Baseline: {showBaselineOverlay ? "SHOW" : "HIDE"}</span>
                </button>
              </div>

              {/* Display Area: FFT Frequency Curves */}
              <div className="p-4 sm:p-5 bg-[#090A0C]">
                {activeTab === "fft" ? (
                  <div>
                    {/* Telemetry Readout Head */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3 font-mono text-xs text-zinc-400 border-b border-white/[0.05] pb-2">
                      <div className="flex items-center gap-4">
                        <div>
                          <span className="text-zinc-600 mr-1">PEAK:</span>
                          <span className="text-[#FF5C00] font-semibold">{naturalFrequency.toFixed(2)} Hz</span>
                        </div>
                        <div>
                          <span className="text-zinc-600 mr-1">REF:</span>
                          <span className="text-cyan-400 font-semibold">{baselineFrequency.toFixed(2)} Hz</span>
                        </div>
                        <div>
                          <span className="text-zinc-600 mr-1">Δf:</span>
                          <span className="text-amber-400 font-semibold">{deltaF} Hz</span>
                        </div>
                      </div>
                      <div className="text-[10px] text-zinc-500">
                        FFT: 1024-PT // HANNING
                      </div>
                    </div>

                    {/* SVG FFT Spectrum Graph */}
                    <div className="relative w-full h-56 sm:h-64 border border-white/[0.06] bg-[#0D0E12] overflow-hidden">
                      {/* Grid lines */}
                      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                        <defs>
                          <pattern id="fft-grid" width="40" height="30" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 30" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
                          </pattern>
                          <linearGradient id="amber-glow" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#FF5C00" stopOpacity="0.35" />
                            <stop offset="85%" stopColor="#FF5C00" stopOpacity="0.02" />
                            <stop offset="100%" stopColor="#FF5C00" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#fft-grid)" />

                        {/* Baseline Reference Curve (50.00 Hz peak) */}
                        {showBaselineOverlay && (
                          <g>
                            <path
                              d="M 10 200 Q 100 198 160 190 T 210 170 Q 235 60 250 20 Q 265 60 290 170 T 340 190 Q 420 198 520 200"
                              fill="none"
                              stroke="#38BDF8"
                              strokeWidth="1.5"
                              strokeDasharray="4 3"
                              opacity="0.75"
                            />
                            {/* Baseline marker text */}
                            <circle cx="250" cy="20" r="3" fill="#38BDF8" />
                            <text x="256" y="24" fill="#38BDF8" fontSize="9" fontFamily="monospace">
                              f0=50.0Hz
                            </text>
                          </g>
                        )}

                        {/* Current Shifted Curve (48.20 Hz peak) */}
                        <g>
                          {/* Filled area */}
                          <path
                            d="M 10 210 Q 90 205 145 195 T 195 175 Q 225 75 238 32 Q 252 75 280 175 T 330 195 Q 410 205 520 210 L 520 240 L 10 240 Z"
                            fill="url(#amber-glow)"
                          />
                          {/* Main line */}
                          <path
                            d="M 10 210 Q 90 205 145 195 T 195 175 Q 225 75 238 32 Q 252 75 280 175 T 330 195 Q 410 205 520 210"
                            fill="none"
                            stroke="#FF5C00"
                            strokeWidth="2.5"
                          />
                          {/* Shifted Peak Marker */}
                          <circle cx="238" cy="32" r="4" fill="#FF5C00" />
                          <circle cx="238" cy="32" r="8" fill="none" stroke="#FF5C00" strokeWidth="1" opacity="0.6" />
                          <line x1="238" y1="32" x2="238" y2="240" stroke="#FF5C00" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
                        </g>
                      </svg>

                      {/* Coordinate readout pill overlay */}
                      <div className="absolute top-3 right-3 border border-white/[0.1] bg-[#121316]/90 backdrop-blur px-2.5 py-1 font-mono text-[10px] text-zinc-300">
                        <span className="text-zinc-500">CURSOR: </span>
                        <span className="text-[#FF5C00]">48.20 Hz</span>
                        <span className="text-zinc-500"> // </span>
                        <span>-14.2 dBV</span>
                      </div>

                      {/* Anomaly Flag Banner */}
                      <div className="absolute bottom-3 left-3 border border-amber-500/30 bg-amber-950/40 px-2.5 py-1 font-mono text-[10px] text-amber-300 flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
                        <span>FREQ SHIFT: -1.80 Hz // DAMAGE THRESHOLD WARNING</span>
                      </div>
                    </div>

                    {/* Frequency Axis Labels */}
                    <div className="flex justify-between font-mono text-[9px] text-zinc-500 px-2 pt-2">
                      <span>0 Hz</span>
                      <span>25 Hz</span>
                      <span>50 Hz (Mode 1)</span>
                      <span>75 Hz</span>
                      <span>100 Hz</span>
                      <span>125 Hz</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* Time Domain Acoustic Waveform */}
                    <div className="flex items-center justify-between mb-3 font-mono text-xs text-zinc-400 border-b border-white/[0.05] pb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-zinc-600">PZT CHANNEL A:</span>
                        <span className="text-[#FF5C00] font-semibold">1.65 Vdc + 240 mVpp</span>
                      </div>
                      <div className="text-[10px] text-zinc-500">PULSE PROPAGATION VELOCITY: ~5100 m/s</div>
                    </div>

                    <div className="relative w-full h-56 sm:h-64 border border-white/[0.06] bg-[#0D0E12] overflow-hidden flex items-center">
                      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 500 200">
                        {/* Center zero line */}
                        <line x1="0" y1="100" x2="500" y2="100" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3 3" />
                        
                        {/* Transmitted Pulse Burst (t=0 to 50) */}
                        <path
                          d="M 10 100 L 40 100 Q 45 20 50 100 T 55 180 T 60 100 T 65 160 T 70 100 L 160 100"
                          fill="none"
                          stroke="#38BDF8"
                          strokeWidth="2"
                        />
                        {/* Crack Reflection / Attenuated Arrival (t=160 to 240) */}
                        <path
                          d="M 160 100 Q 170 60 180 100 T 190 140 T 200 100 T 210 125 T 220 100 L 500 100"
                          fill="none"
                          stroke="#FF5C00"
                          strokeWidth="2"
                        />
                      </svg>

                      {/* Micro annotations */}
                      <div className="absolute top-4 left-6 border border-cyan-500/30 bg-cyan-950/30 px-2 py-0.5 font-mono text-[9px] text-cyan-300">
                        TX: 40kHz PZT EXCITATION
                      </div>
                      <div className="absolute top-4 left-44 border border-amber-500/30 bg-amber-950/30 px-2 py-0.5 font-mono text-[9px] text-amber-300">
                        RX: ATTENUATED REFLECTION (t_flight = 32μs)
                      </div>
                    </div>

                    <div className="flex justify-between font-mono text-[9px] text-zinc-500 px-2 pt-2">
                      <span>0 μs</span>
                      <span>25 μs</span>
                      <span>50 μs</span>
                      <span>75 μs</span>
                      <span>100 μs</span>
                    </div>
                  </div>
                )}

                {/* Footer Status Indicators */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/[0.06] font-mono text-[10px]">
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <span className="h-1.5 w-1.5 bg-emerald-400"></span>
                    <span>ADC1_CH4: 1.65V VB</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <span className="h-1.5 w-1.5 bg-cyan-400"></span>
                    <span>I2C_ADDR: 0x53 OK</span>
                  </div>
                  <div className="flex items-center justify-end gap-1.5 text-zinc-400">
                    <span className="h-1.5 w-1.5 bg-amber-400"></span>
                    <span>DI RATIO: 12.4%</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
