"use client";

import React, { useState } from "react";
import {
  Terminal,
  Activity,
  Sliders,
  RefreshCw,
  Download,
  Play,
  Pause,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Radio,
  BarChart3,
  Cpu,
  Layers,
} from "lucide-react";

interface TelemetryWorkbenchProps {
  onOpenSerial?: () => void;
}

export const TelemetryWorkbench: React.FC<TelemetryWorkbenchProps> = ({
  onOpenSerial,
}) => {
  const [streamMode, setStreamMode] = useState<"SIMULATION" | "LIVE_USB">("SIMULATION");
  const [selectedScenario, setSelectedScenario] = useState<"healthy" | "warning" | "critical">("warning");
  const [isSimulating, setIsSimulating] = useState(true);
  const [baselineCalibrated, setBaselineCalibrated] = useState(true);
  const [showExportToast, setShowExportToast] = useState(false);

  // Scenario telemetry state profiles
  const telemetryData = {
    healthy: {
      frequency: 49.95,
      baseline: 50.0,
      deltaF: -0.05,
      accelX: 0.01,
      accelY: 0.00,
      accelZ: 1.00,
      piezoA: 1.65,
      piezoB: 1.64,
      damageIndex: 1.8,
      status: "HEALTHY",
      statusClass: "text-emerald-400 border-emerald-500/30 bg-emerald-950/20",
      dotClass: "bg-emerald-500",
      activeState: 1,
    },
    warning: {
      // EXACT HARDCODED VALUES REQUIRED IN SPECIFICATION:
      frequency: 48.2,
      baseline: 50.0,
      deltaF: -1.8,
      accelX: 0.04,
      accelY: -0.02,
      accelZ: 0.98,
      piezoA: 1.65,
      piezoB: 1.42,
      damageIndex: 12.4,
      status: "WARNING STATE",
      statusClass: "text-amber-400 border-amber-500/30 bg-amber-950/20",
      dotClass: "bg-amber-500",
      activeState: 2,
    },
    critical: {
      frequency: 44.5,
      baseline: 50.0,
      deltaF: -5.5,
      accelX: 0.12,
      accelY: -0.08,
      accelZ: 0.89,
      piezoA: 1.65,
      piezoB: 0.88,
      damageIndex: 38.6,
      status: "CRITICAL DAMAGE",
      statusClass: "text-red-400 border-red-500/30 bg-red-950/20",
      dotClass: "bg-red-500",
      activeState: 3,
    },
  };

  const current = telemetryData[selectedScenario];

  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Timestamp,NaturalFrequency_Hz,Baseline_Hz,DeltaF_Hz,AccelX_g,AccelY_g,AccelZ_g,PiezoChA_V,PiezoChB_V,DamageIndex_pct,Status\n" +
      `${new Date().toISOString()},${current.frequency},${current.baseline},${current.deltaF},${current.accelX},${current.accelY},${current.accelZ},${current.piezoA},${current.piezoB},${current.damageIndex},${current.status}\n`;
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ImpulseNDT_telemetry_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setShowExportToast(true);
    setTimeout(() => setShowExportToast(false), 3000);
  };

  return (
    <section id="workbench" className="relative border-b border-white/[0.08] bg-[#0B0C0E] py-20 lg:py-28">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 border border-white/[0.1] bg-[#121316] px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-[#FF5C00] mb-3">
              <span className="h-1.5 w-1.5 bg-[#FF5C00]"></span>
              [ DIAGNOSTIC ENGINE // TELEMETRY WORKBENCH ]
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Results & Hardware Telemetry Workbench
            </h2>
            <p className="font-sans text-sm text-zinc-400 mt-2">
              Continuous non-destructive modal frequency tracking and ultrasonic pulse acoustic attenuation analysis.
            </p>
          </div>

          {/* Top Bar Controls: Mode Toggle between [ SIMULATION ] and [ LIVE USB STREAM ] */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center border border-white/[0.12] bg-[#121316] p-1 font-mono text-xs">
              <button
                onClick={() => setStreamMode("SIMULATION")}
                className={`px-3 py-1.5 uppercase tracking-wider transition-all ${
                  streamMode === "SIMULATION"
                    ? "bg-[#FF5C00] text-black font-semibold shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                [ SIMULATION ]
              </button>
              <button
                onClick={() => {
                  setStreamMode("LIVE_USB");
                  if (onOpenSerial) onOpenSerial();
                }}
                className={`px-3 py-1.5 uppercase tracking-wider transition-all ${
                  streamMode === "LIVE_USB"
                    ? "bg-[#FF5C00] text-black font-semibold shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                [ LIVE USB STREAM ]
              </button>
            </div>

            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 border border-white/[0.12] bg-[#121316] px-3 py-2 font-mono text-xs text-zinc-300 hover:text-white hover:border-white/20 transition-colors"
            >
              <Download className="h-3.5 w-3.5 text-[#FF5C00]" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Export Toast Banner */}
        {showExportToast && (
          <div className="mb-6 border border-emerald-500/40 bg-emerald-950/30 p-3 font-mono text-xs text-emerald-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              <span>Telemetry frame exported to CSV successfully.</span>
            </div>
            <span className="text-zinc-500">[LOG.SAVED]</span>
          </div>
        )}

        {/* Simulation Control Ribbon (if in SIMULATION mode) */}
        {streamMode === "SIMULATION" && (
          <div className="mb-8 border border-white/[0.08] bg-[#121316] p-4 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="text-[#FF5C00] font-semibold">[ SIMULATION SCENARIO ]:</span>
              <span>Inject structural damage condition into telemetry buffer:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedScenario("healthy")}
                className={`px-3 py-1 border transition-all ${
                  selectedScenario === "healthy"
                    ? "border-emerald-500 bg-emerald-950/40 text-emerald-300 font-semibold"
                    : "border-white/[0.08] bg-[#0E0F12] text-zinc-400 hover:text-white"
                }`}
              >
                1. Healthy Baseline (50.00 Hz)
              </button>
              <button
                onClick={() => setSelectedScenario("warning")}
                className={`px-3 py-1 border transition-all ${
                  selectedScenario === "warning"
                    ? "border-amber-500 bg-amber-950/40 text-amber-300 font-semibold"
                    : "border-white/[0.08] bg-[#0E0F12] text-zinc-400 hover:text-white"
                }`}
              >
                2. Warning (48.20 Hz // Minor Shift)
              </button>
              <button
                onClick={() => setSelectedScenario("critical")}
                className={`px-3 py-1 border transition-all ${
                  selectedScenario === "critical"
                    ? "border-red-500 bg-red-950/40 text-red-300 font-semibold"
                    : "border-white/[0.08] bg-[#0E0F12] text-zinc-400 hover:text-white"
                }`}
              >
                3. Critical Damage (44.50 Hz // Notch)
              </button>
            </div>
          </div>
        )}

        {/* Live USB Banner (if in LIVE_USB mode) */}
        {streamMode === "LIVE_USB" && (
          <div className="mb-8 border border-[#FF5C00]/30 bg-[#FF5C00]/10 p-4 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-2 text-zinc-300">
              <span className="h-2 w-2 rounded-full bg-[#FF5C00] animate-pulse"></span>
              <span className="font-semibold text-white">LIVE USB STREAM ACTIVE:</span>
              <span>Listening on CP2102 / CH340 USB-UART @ 115200 baud (ESP32 TX/RX).</span>
            </div>
            <button
              onClick={onOpenSerial}
              className="border border-[#FF5C00] bg-[#FF5C00] px-3 py-1 text-black font-semibold hover:bg-[#FF5C00]/90"
            >
              [ Configure Serial Port ]
            </button>
          </div>
        )}

        {/* Grid Layout (2 Columns): Card A and Card B */}
        <div id="status-matrix" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ================= CARD A: Infrastructure Health Status (3 States) ================= */}
          <div className="lg:col-span-6 border border-white/[0.08] bg-[#121316] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-[#FF5C00]"></div>
                  <h3 className="font-sans text-xl font-bold tracking-tight text-white">
                    Card A: Infrastructure Health Status
                  </h3>
                </div>
                <span className="font-mono text-[10px] uppercase text-zinc-500 tracking-wider">
                  [ 3-STATE MATRIX ]
                </span>
              </div>

              <p className="font-sans text-sm text-zinc-400 mb-6">
                Evaluates physical structural health state against pristine reference modal baseline. Monitored through physical GPIO annunciator LEDs:
              </p>

              {/* 3 Distinct Structural Status Rows with Clean CSS Indicators */}
              <div className="space-y-4">
                
                {/* State 1: Healthy (Active Baseline) */}
                <div
                  className={`border p-4 transition-all ${
                    current.activeState === 1
                      ? "border-emerald-500/60 bg-emerald-950/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                      : "border-white/[0.06] bg-[#0E0F12] opacity-60 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      {/* Clean CSS indicator dot */}
                      <span className="relative flex h-3 w-3 items-center justify-center">
                        {current.activeState === 1 && (
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                        )}
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                      </span>

                      <div>
                        <h4 className="font-mono text-sm font-bold text-white">
                          1. Healthy (Active Baseline)
                        </h4>
                        <span className="font-mono text-[11px] text-zinc-400">
                          GPIO16 Green LED Active
                        </span>
                      </div>
                    </div>

                    <span className="font-mono text-xs font-semibold px-2 py-0.5 border border-emerald-500/30 text-emerald-400 bg-emerald-950/40">
                      Δf &lt; 0.2 Hz
                    </span>
                  </div>

                  <p className="font-sans text-xs text-zinc-400 mt-2 pl-6 leading-relaxed">
                    Matches reference signature. No stiffness reduction detected. Cantilever beam vibrating at natural baseline frequency with pristine acoustic transmission.
                  </p>
                </div>

                {/* State 2: Warning (Minor Shift) */}
                <div
                  className={`border p-4 transition-all ${
                    current.activeState === 2
                      ? "border-amber-500/60 bg-amber-950/20 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                      : "border-white/[0.06] bg-[#0E0F12] opacity-60 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      {/* Clean CSS indicator dot */}
                      <span className="relative flex h-3 w-3 items-center justify-center">
                        {current.activeState === 2 && (
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                        )}
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]"></span>
                      </span>

                      <div>
                        <h4 className="font-mono text-sm font-bold text-white">
                          2. Warning (Minor Shift)
                        </h4>
                        <span className="font-mono text-[11px] text-zinc-400">
                          GPIO17 Amber LED Active
                        </span>
                      </div>
                    </div>

                    <span className="font-mono text-xs font-semibold px-2 py-0.5 border border-amber-500/30 text-amber-400 bg-amber-950/40">
                      Δf = 1.4 Hz
                    </span>
                  </div>

                  <p className="font-sans text-xs text-zinc-400 mt-2 pl-6 leading-relaxed">
                    Possible loosening or initial micro-crack. Frequency shift observed at Δf = 1.4Hz (measured peak 48.20 Hz). Pulse acoustic attenuation indicates initial acoustic wave scatter.
                  </p>
                </div>

                {/* State 3: Critical (Potential Damage) */}
                <div
                  className={`border p-4 transition-all ${
                    current.activeState === 3
                      ? "border-red-500/60 bg-red-950/20 shadow-[0_0_15px_rgba(239,68,68,0.15)]"
                      : "border-white/[0.06] bg-[#0E0F12] opacity-60 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      {/* Clean CSS indicator dot */}
                      <span className="relative flex h-3 w-3 items-center justify-center">
                        {current.activeState === 3 && (
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                        )}
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                      </span>

                      <div>
                        <h4 className="font-mono text-sm font-bold text-white">
                          3. Critical (Potential Damage)
                        </h4>
                        <span className="font-mono text-[11px] text-zinc-400">
                          GPIO18 Red LED Active
                        </span>
                      </div>
                    </div>

                    <span className="font-mono text-xs font-semibold px-2 py-0.5 border border-red-500/30 text-red-400 bg-red-950/40">
                      Δf &gt; 4.5 Hz
                    </span>
                  </div>

                  <p className="font-sans text-xs text-zinc-400 mt-2 pl-6 leading-relaxed">
                    Significant structural anomaly detected. Severe flexural rigidity degradation (k drop) or clamp structural separation requiring immediate intervention.
                  </p>
                </div>

              </div>
            </div>

            {/* Hardware Baseline Calibration Trigger (GPIO4 button emulation) */}
            <div className="mt-8 pt-6 border-t border-white/[0.06]">
              <div className="flex items-center justify-between font-mono text-xs">
                <div>
                  <span className="text-zinc-500 block text-[10px]">BASELINE SIGNATURE STATUS</span>
                  <span className="text-white font-semibold">CALIBRATED // REF: 50.00 Hz</span>
                </div>
                <button
                  onClick={() => {
                    setSelectedScenario("healthy");
                    setBaselineCalibrated(true);
                  }}
                  className="border border-white/[0.12] bg-[#0E0F12] px-3 py-1.5 text-zinc-300 hover:text-white hover:border-[#FF5C00] transition-colors"
                >
                  [ Recalibrate Baseline (GPIO4) ]
                </button>
              </div>
            </div>

          </div>

          {/* ================= CARD B: Live Hardcoded Telemetry Readings ================= */}
          <div id="telemetry" className="lg:col-span-6 border border-white/[0.08] bg-[#121316] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-[#FF5C00]"></div>
                  <h3 className="font-sans text-xl font-bold tracking-tight text-white">
                    Card B: Live Telemetry Readings
                  </h3>
                </div>
                <span className="font-mono text-[10px] uppercase text-zinc-500 tracking-wider">
                  [ SENSOR FUSION ENGINE ]
                </span>
              </div>

              {/* Metric 1: Natural Frequency Peak */}
              <div className="mb-6 border-b border-white/[0.05] pb-5">
                <div className="flex items-center justify-between mb-1.5 font-mono text-xs">
                  <span className="text-zinc-400">Natural Frequency Peak:</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-[#FF5C00]">
                      {current.frequency.toFixed(2)} Hz
                    </span>
                    <span className="text-zinc-500 text-[11px]">
                      (Baseline: {current.baseline.toFixed(2)} Hz)
                    </span>
                  </div>
                </div>

                {/* Progress bar for frequency shift */}
                <div className="w-full bg-[#0E0F12] h-2 border border-white/[0.06] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-[#FF5C00] transition-all duration-300"
                    style={{
                      width: `${Math.min(100, Math.max(10, ((current.baseline - current.frequency) / 6) * 100))}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between font-mono text-[10px] text-zinc-500 mt-1">
                  <span>Shift: {current.deltaF.toFixed(2)} Hz</span>
                  <span>Max Allowable Tolerance: ±0.5 Hz</span>
                </div>
              </div>

              {/* Metric 2: ADXL345 Accelerometer (XYZ) */}
              <div className="mb-6 border-b border-white/[0.05] pb-5">
                <div className="flex items-center justify-between mb-2 font-mono text-xs">
                  <span className="text-zinc-400">ADXL345 Accelerometer (XYZ):</span>
                  <span className="text-zinc-200 font-bold">
                    X: {current.accelX >= 0 ? `+${current.accelX.toFixed(2)}` : current.accelX.toFixed(2)}g, Y:{" "}
                    {current.accelY >= 0 ? `+${current.accelY.toFixed(2)}` : current.accelY.toFixed(2)}g, Z:{" "}
                    {current.accelZ.toFixed(2)}g
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 font-mono text-xs">
                  {/* Axis X */}
                  <div className="border border-white/[0.06] bg-[#0E0F12] p-2.5">
                    <div className="text-[10px] text-zinc-500 mb-1">AXIS X (LATERAL)</div>
                    <div className="text-sm font-semibold text-zinc-200">{current.accelX.toFixed(2)}g</div>
                    <div className="w-full bg-zinc-800 h-1 mt-2">
                      <div
                        className="bg-cyan-500 h-1"
                        style={{ width: `${Math.abs(current.accelX) * 200}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Axis Y */}
                  <div className="border border-white/[0.06] bg-[#0E0F12] p-2.5">
                    <div className="text-[10px] text-zinc-500 mb-1">AXIS Y (TRANSVERSE)</div>
                    <div className="text-sm font-semibold text-zinc-200">{current.accelY.toFixed(2)}g</div>
                    <div className="w-full bg-zinc-800 h-1 mt-2">
                      <div
                        className="bg-cyan-500 h-1"
                        style={{ width: `${Math.abs(current.accelY) * 200}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Axis Z */}
                  <div className="border border-white/[0.06] bg-[#0E0F12] p-2.5">
                    <div className="text-[10px] text-zinc-500 mb-1">AXIS Z (GRAVITY)</div>
                    <div className="text-sm font-semibold text-zinc-200">{current.accelZ.toFixed(2)}g</div>
                    <div className="w-full bg-zinc-800 h-1 mt-2">
                      <div
                        className="bg-emerald-500 h-1"
                        style={{ width: `${current.accelZ * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Metric 3: Piezo Channel A/B Voltage */}
              <div className="mb-6 border-b border-white/[0.05] pb-5">
                <div className="flex items-center justify-between mb-2 font-mono text-xs">
                  <span className="text-zinc-400">Piezo Channel A/B Voltage:</span>
                  <span className="text-zinc-200 font-bold">
                    Channel A: {current.piezoA.toFixed(2)}V, Channel B: {current.piezoB.toFixed(2)}V
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 font-mono text-xs">
                  <div className="border border-white/[0.06] bg-[#0E0F12] p-3">
                    <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                      <span>CH A (GPIO34 / VB)</span>
                      <span className="text-emerald-400 font-semibold">{current.piezoA.toFixed(2)} V</span>
                    </div>
                    <div className="w-full bg-zinc-800 h-1.5">
                      <div
                        className="bg-emerald-500 h-1.5"
                        style={{ width: `${(current.piezoA / 3.3) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-[9px] text-zinc-500 mt-1 block">Op-Amp Bias Rail (1.65 Vdc)</span>
                  </div>

                  <div className="border border-white/[0.06] bg-[#0E0F12] p-3">
                    <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                      <span>CH B (GPIO35 / RX)</span>
                      <span className="text-amber-400 font-semibold">{current.piezoB.toFixed(2)} V</span>
                    </div>
                    <div className="w-full bg-zinc-800 h-1.5">
                      <div
                        className="bg-amber-500 h-1.5"
                        style={{ width: `${(current.piezoB / 3.3) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-[9px] text-zinc-500 mt-1 block">Attenuated Receiver Wave</span>
                  </div>
                </div>
              </div>

              {/* Metric 4: Computed Damage Index (DI) */}
              <div>
                <div className="flex items-center justify-between mb-2 font-mono text-xs">
                  <span className="text-zinc-400">Computed Damage Index (DI):</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-[#FF5C00]">
                      {current.damageIndex.toFixed(1)}%
                    </span>
                    <span className={`px-2 py-0.5 border text-xs font-semibold ${current.statusClass}`}>
                      [{current.status}]
                    </span>
                  </div>
                </div>

                {/* Segmented Damage Index Bar */}
                <div className="w-full bg-[#0E0F12] h-3 border border-white/[0.06] relative overflow-hidden flex">
                  {/* Healthy range: 0 to 10% */}
                  <div className="w-[10%] h-full border-r border-white/20 bg-emerald-950/40"></div>
                  {/* Warning range: 10 to 25% */}
                  <div className="w-[15%] h-full border-r border-white/20 bg-amber-950/40"></div>
                  {/* Critical range: 25 to 100% */}
                  <div className="w-[75%] h-full bg-red-950/30"></div>

                  {/* Active Indicator Fill */}
                  <div
                    className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-emerald-500 via-amber-500 to-[#FF5C00] transition-all duration-300"
                    style={{ width: `${Math.min(100, current.damageIndex * 2)}%` }}
                  />
                </div>

                <div className="flex justify-between font-mono text-[9px] text-zinc-500 mt-1.5">
                  <span>0% Pristine</span>
                  <span>10% Warn Threshold</span>
                  <span>25% Critical Danger</span>
                  <span>100% Structural Failure</span>
                </div>
              </div>

            </div>

            {/* Bottom Register Telemetry Tag */}
            <div className="mt-8 pt-6 border-t border-white/[0.06] font-mono text-[10px] text-zinc-500 flex flex-wrap justify-between items-center gap-2">
              <div>
                <span>REG_DEVID: </span>
                <span className="text-zinc-300 font-semibold">0xE5</span>
                <span> // FIFO_LEVEL: </span>
                <span className="text-zinc-300 font-semibold">32 SAMPLES</span>
              </div>
              <div className="text-[#FF5C00]">
                FUSION_CONFIDENCE: 98.4%
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
