# Project Guide Prompt: Acoustic Infrastructure Integrity Assessment System

Copy everything below the line into Claude or any AI chat. For long answers, ask for one section at a time, for example "Now write section 9 only."

---

## ROLE

You are an experienced embedded-systems and structural-health-monitoring mentor. I am a beginner college student, so explain everything in plain language, define every term the first time you use it, and never skip a step.

## PROJECT

**Non-Destructive Acoustic Infrastructure Integrity Assessment System using Piezoelectric Sensor and Accelerometer**

A low-cost prototype that detects damage (cracks, loose bolts) in a clamped aluminium beam without harming it. It compares the beam's healthy vibration and acoustic signature with its current one.

## MY CONSTRAINTS

- College project, prototype only, lowest possible budget in India (INR).
- Beginner level. No oscilloscope. I have a multimeter and a basic soldering iron.
- I want it to genuinely work, with both sensor types, signal processing, damage detection and a status display.

## HARDWARE I AM USING

- ESP32 DevKit (3.3 V logic, 12-bit ADC)
- ADXL345 accelerometer (GY-291) on I2C, address 0x53
- Bare 20 mm piezo discs (1 required, up to 3: PZT1 transmit, PZT2 receive, PZT3 passive listening)
- MCP6002 dual rail-to-rail op-amp (DIP-8). Acceptable substitutes: MCP6022, MCP6482, TLV2372, LMC6482. Never LM358.
- Potentiometer (50-100 kOhm) as the amplifier gain control
- 3 LEDs (green, amber, red), 1 push button, optional coin vibration motor (skip if no transistor)
- Resistors, small capacitors (10 uF, 100 nF), 1N4148 diodes, breadboard, jumper wires
- Test structure: 60 cm aluminium flat bar, 25 x 3 mm, with 10 cm clamped to a table edge (50 cm free length)

## PIN MAP (use exactly this)

| ESP32 pin | Connects to |
|---|---|
| 3V3 | + rail, ADXL345 VCC and CS, op-amp pin 8 |
| GND | - rail, ADXL345 GND and SDO, op-amp pin 4 |
| GPIO21 | ADXL345 SDA |
| GPIO22 | ADXL345 SCL |
| GPIO27 | ADXL345 INT1 |
| GPIO34 | Piezo amplifier output, channel A (ADC1, input only) |
| GPIO35 | Piezo amplifier output, channel B (ADC1, input only) |
| GPIO25 | 100 ohm, then PZT1 ceramic side (bridge drive +) |
| GPIO26 | 100 ohm, then PZT1 brass side (bridge drive -) |
| GPIO16 | 330 ohm, then green LED, then GND |
| GPIO17 | 330 ohm, then amber LED, then GND |
| GPIO18 | 330 ohm, then red LED, then GND |
| GPIO4 | Push button to GND (internal pull-up) |

**Piezo front end (each receive channel):**

- 3V3 -> 10k -> VB -> 10k -> GND gives VB = 1.65 V (add 10 uF and 100 nF from VB to GND).
- Disc ceramic side to the op-amp + input, brass side to VB.
- 1 MOhm from the + input to VB.
- Two 1N4148 diodes in opposite directions from the + input to VB.
- 10k from the - input to VB.
- Potentiometer between the op-amp output and the - input (gain = 1 + Rf / 10k).
- 1k from the op-amp output to the ADC pin.
- Op-amp pin 8 to 3V3, pin 4 to GND, with 100 nF and 10 uF between them.
- Unused half of the op-amp: + input to VB, - input to its own output.

## WHAT TO PRODUCE

Write one complete project guide with these sections, in this order:

1. Abstract and objectives (short, report-ready)
2. How it works in simple words, with the physics: why damage lowers natural frequency, and how the piezo pulse changes after passing a crack
3. Block diagram (text or table form) and a signal-flow explanation
4. Full components list with quantities, spares, approximate INR prices and where to buy in India
5. Circuit explanation for a beginner: what each part does and why
6. Wiring: pin-to-pin lists, one block at a time, with a check after each block (what the multimeter or serial monitor should show)
7. Mechanical setup: sensor positions on the bar, gluing, electrical insulation of the discs from the bar, clamping
8. Step-by-step build order from empty table to working system
9. Complete Arduino IDE code for the ESP32, split into small tested parts: I2C scan, ADXL345 reading, FFT of the vibration to find the natural frequency, piezo ADC capture, baseline saving on button press, damage index calculation, LED status logic, serial output. Comment every block in simple language.
10. Damage detection method: baseline recording, features used (natural frequency shift, RMS, peak amplitude, pulse energy), the formula for the damage index, and the thresholds for healthy, warning and damaged
11. Experiment plan: record baseline, then add damage in stages (saw cut 2 mm, 5 mm, 10 mm, or a loose clamp bolt), repeat each measurement at least 10 times, and a results table template
12. Graphs to produce for the report (damage index vs damage size, frequency shift vs damage)
13. Troubleshooting table (symptom, likely cause, fix) covering noisy ADC readings, clipped signals, no I2C device found, piezo silent, 50 Hz mains hum, ESP32 reboot
14. Limitations and honest accuracy notes (ESP32 ADC noise and nonlinearity, 1 MOhm input sensitivity to hum)
15. Future scope (Wi-Fi dashboard, machine-learning anomaly detection, more sensors)
16. Final report outline and 15 likely viva questions with short answers

## RULES

- Use the exact pin map above. Do not invent different pins.
- Keep every voltage within 0-3.3 V on ESP32 pins. Use only the ADC1 pins given.
- Use tables for wiring, components and troubleshooting.
- Show the arithmetic for any formula or calculated value (for example gain = 1 + Rf/Rg).
- Tell me clearly if something is an estimate or needs checking against a datasheet.
- If any detail above is missing or unclear, ask me up to 5 short questions first, then continue.
- Keep the tone encouraging and practical, like a lab instructor sitting next to me.
