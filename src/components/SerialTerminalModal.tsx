"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Terminal, Play, Pause, RefreshCw, Cpu, Check, AlertCircle } from "lucide-react";

interface SerialTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnectionChange?: (connected: boolean) => void;
}

export const SerialTerminalModal: React.FC<SerialTerminalModalProps> = ({
  isOpen,
  onClose,
  onConnectionChange,
}) => {
  const [baudRate, setBaudRate] = useState("115200");
  const [isConnected, setIsConnected] = useState(true);
  const [hasWebSerial, setHasWebSerial] = useState(false);
  const [serialLogs, setSerialLogs] = useState<string[]>([
    "[00:00:00.012] ESP-ROM:esp32s2-rc4-20201025",
    "[00:00:00.015] Build:Oct 20 2026",
    "[00:00:00.020] rst:0x1 (POWERON_RESET),boot:0x13 (SPI_FAST_FLASH_BOOT)",
    "[00:00:00.104] [SYS.INIT] Initializing ImpulseNDT Firmware Rev 2026.10...",
    "[00:00:00.120] [I2C.BUS] Scanning I2C bus on GPIO21 (SDA), GPIO22 (SCL)...",
    "[00:00:00.142] [I2C.BUS] Device found at address 0x53 (ADXL345 3-Axis Accelerometer)",
    "[00:00:00.160] [ADXL345] Range set to ±2g, FIFO stream mode enabled.",
    "[00:00:00.180] [ADC1.INIT] Attenuation 11dB on GPIO34 (CH A) and GPIO35 (CH B).",
    "[00:00:00.195] [OPAMP.BIAS] Virtual ground VB verified @ 1.652 V.",
    "[00:00:00.220] [CALIB.REF] Reading baseline signature from NVS... f0 = 50.00 Hz.",
    "[00:00:01.000] [FFT.LOOP] Peak detected: 48.20 Hz (Δf = -1.80 Hz) | DI = 12.4% [WARNING]",
    "[00:00:01.050] [ANNUNCIATOR] GPIO16=LOW, GPIO17=HIGH (AMBER), GPIO18=LOW",
    "[00:00:02.000] [TELEMETRY] ACCEL_XYZ: 0.04g, -0.02g, 0.98g | PZT_VB: 1.65V, 1.42V",
  ]);
  const [inputCommand, setInputCommand] = useState("");
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "serial" in navigator) {
      setHasWebSerial(true);
    }
  }, []);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [serialLogs]);

  if (!isOpen) return null;

  const handleSendCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCommand.trim()) return;

    const cmd = inputCommand.trim().toUpperCase();
    const timestamp = new Date().toLocaleTimeString();
    
    let response = `[${timestamp}] [USER.CMD] >> ${cmd}`;
    let followUp = "";

    if (cmd === "CALIBRATE" || cmd === "BASELINE") {
      followUp = `[${timestamp}] [CALIB.EXEC] Calibrating reference spectrum. Baseline set to 50.00 Hz. Status: HEALTHY.`;
    } else if (cmd === "STATUS") {
      followUp = `[${timestamp}] [SYS.STATUS] Peak: 48.20 Hz | Δf: -1.80 Hz | DI: 12.4% | State: WARNING (GPIO17)`;
    } else if (cmd === "PING_PZT") {
      followUp = `[${timestamp}] [PZT.EXEC] Firing 40kHz ultrasonic burst via GPIO25/26. Transit time: 32μs.`;
    } else if (cmd === "HELP") {
      followUp = `[${timestamp}] Available commands: STATUS, CALIBRATE, PING_PZT, CLEAR, REBOOT`;
    } else if (cmd === "CLEAR") {
      setSerialLogs([]);
      setInputCommand("");
      return;
    } else {
      followUp = `[${timestamp}] Command received: "${cmd}". Type HELP for command list.`;
    }

    setSerialLogs((prev) => [...prev, response, followUp]);
    setInputCommand("");
  };

  const connectNativeSerial = async () => {
    if (typeof window !== "undefined" && "serial" in navigator) {
      try {
        // @ts-ignore
        const port = await navigator.serial.requestPort();
        await port.open({ baudRate: parseInt(baudRate, 10) });
        setIsConnected(true);
        if (onConnectionChange) onConnectionChange(true);
        setSerialLogs((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] [WEB.SERIAL] Connected to physical USB COM port @ ${baudRate} baud.`,
        ]);
      } catch (err: any) {
        setSerialLogs((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] [SERIAL.ERROR] Port connection cancelled or device busy: ${err.message}`,
        ]);
      }
    } else {
      alert("Web Serial API is not supported in this browser. Running in simulated UART mode.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col border border-white/[0.14] bg-[#0E0F12] p-6 shadow-2xl">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center border border-white/[0.12] bg-[#121316] text-[#FF5C00]">
              <Terminal className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-white font-bold">
                <span>ESP32 WEB SERIAL CONSOLE</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <span className="font-mono text-[10px] text-zinc-500">
                115200 8N1 // CP2102 / CH340 DRIVER INTERFACE
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="border border-white/[0.1] bg-[#121316] p-1.5 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Toolbar & Port Config */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4 mb-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <label className="text-zinc-500 text-[11px]">BAUD RATE:</label>
            <select
              value={baudRate}
              onChange={(e) => setBaudRate(e.target.value)}
              className="border border-white/[0.1] bg-[#121316] px-2 py-1 text-zinc-200 focus:outline-none"
            >
              <option value="9600">9600</option>
              <option value="57600">57600</option>
              <option value="115200">115200 (Default)</option>
              <option value="230400">230400</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={connectNativeSerial}
              className="border border-[#FF5C00] bg-[#FF5C00] px-3 py-1 font-semibold text-black uppercase hover:bg-[#FF5C00]/90"
            >
              [ Request Hardware Port ]
            </button>
            <button
              onClick={() => setSerialLogs([])}
              className="border border-white/[0.1] bg-[#121316] px-3 py-1 text-zinc-400 hover:text-white"
            >
              Clear Logs
            </button>
          </div>
        </div>

        {/* Terminal Output Display */}
        <div
          ref={logContainerRef}
          className="flex-1 min-h-[300px] max-h-[400px] overflow-y-auto border border-white/[0.08] bg-[#07080A] p-4 font-mono text-xs text-zinc-300 space-y-1 select-text"
        >
          {serialLogs.map((log, idx) => (
            <div
              key={idx}
              className={`${
                log.includes("[WARNING]") || log.includes("Shift")
                  ? "text-amber-400"
                  : log.includes("HEALTHY") || log.includes("found at")
                  ? "text-emerald-400"
                  : log.includes(">>")
                  ? "text-[#FF5C00] font-semibold"
                  : "text-zinc-400"
              }`}
            >
              {log}
            </div>
          ))}
        </div>

        {/* Command Input Form */}
        <form onSubmit={handleSendCommand} className="mt-4 flex gap-2 font-mono text-xs">
          <input
            type="text"
            value={inputCommand}
            onChange={(e) => setInputCommand(e.target.value)}
            placeholder="Type command: CALIBRATE, STATUS, PING_PZT, HELP..."
            className="flex-1 border border-white/[0.1] bg-[#121316] px-3 py-2 text-white placeholder-zinc-600 focus:border-[#FF5C00] focus:outline-none"
          />
          <button
            type="submit"
            className="border border-white/[0.14] bg-[#181A1F] px-4 py-2 text-zinc-200 hover:text-white hover:border-[#FF5C00] uppercase"
          >
            Send
          </button>
        </form>

      </div>
    </div>
  );
};
