---
title: "(2026) Mixxtape"
date: 2026-09-10 00:00:00
slug: 2026-mixxtape
categories:
  - Projects
tags:
  - pcb
  - esp32
  - kicad
  - jlcpcb
  - ws2812
  - bluetooth
  - code
  - music
  - ideas
excerpt: "A cassette-shaped PCB you can actually record on"
header:
  teaser: /uploads/2026/mixxtape-case-mockup.png
toc: false
---
> A cassette you can actually record on.

## Overview

**Mixxtape** is a 2-layer PCB, shaped and sized like a real compact cassette (99.5 x 63.5 mm), that slides into an actual Norelco cassette case. There's no enclosure and no bezel, the bare board is the object.

An onboard MEMS microphone records three 4-minute tracks straight to onboard flash. Hold REC to record, release to stop, then pair it to any Bluetooth earbuds or speaker and press PLAY.

Cassette-shaped Bluetooth players already exist. I couldn't find a cassette-shaped recorder, and recording is the part that made a mixtape a mixtape in the first place, so I started building one.

<img style="max-width: 100%; border: 1px solid black; margin: 5px; padding: 5px;" src="/public/uploads/2026/mixxtape-render.gif" alt="The Mixxtape board turning, front and back">

<sub>3D render from KiCad. The front carries the ESP32, two rings of RGB LEDs around the routed-out reel windows, four buttons and a USB-C port. The back is covered edge to edge in a peony line-art silkscreen. The mask reads green in the render, the board ships matte white, which is what makes the sharpie label work.</sub>

<a href='/public/uploads/2026/mixxtape-case-mockup.png'><img style="float: right; margin: 10px; max-width: 400px; border: 1px solid black; padding: 5px" src="/public/uploads/2026/mixxtape-case-mockup.png" alt="Cassette and J-card insert, both carrying the same peony line-art"></a>

## How you use it

- **Hold REC.** Records. Release stops. Recording always overwrites the current track from zero, recording is erasing, same as tape.
- **PLAY.** Plays all three tracks in order. It's a tape side, not three separate voice memos.
- **TRACK.** Cycles track 1 to 2 to 3.
- **MODE (hold 2 s).** Pairing. Hold the board against your speaker and it picks the closest device by signal strength. No phone, no app, no list.
- Plug it in and it auto-reconnects to the last thing it paired with.

## Design features

- **Snap-off write-protect tab.** A mouse-bitten break-off PCB tab carries a trace to a GPIO. Snap it and the firmware refuses to record, permanently. Handing someone a finished tape becomes a ritual with a physical step you can't undo.
- **The reels show tape position.** Twelve RGB LEDs ring each routed-out reel window. During playback the left ring empties and the right ring fills, like tape transferring between reels. A red pulse tracks recording level.
- **Matte white solder mask** so you can sharpie the label on, with a ruled label block silkscreened where a cassette's paper label sits.
- **No battery.** USB-C only, no charging circuit on the board at all. A cassette's promise is that you find it years later and it still works.
- **Jig-programmed.** No USB-UART on the board, USB-C is power only. Firmware loads through six pogo-pin pads via a programming jig.

## Hardware

The MCU is a classic Xtensa ESP32, not an S-series or C-series variant, because it's the only ESP32 with Classic Bluetooth. That's what makes it the only one that can be an A2DP source and push audio out to earbuds. Audio comes in through a top-ported PDM MEMS microphone and is stored on a dedicated 16 MB NOR flash chip, separate from the module's own flash, as three fixed ~4-minute ADPCM-encoded slots.

Every fitted part is stocked at JLCPCB with a minimum of 5,000 in stock, so a production run doesn't stall on one line item. One documented exception: the microphone, which sits around 3,500 in stock because no digital MEMS microphone at JLCPCB clears that bar, and the one analogue part that does would wreck the audio path.

| | |
|---|---|
| MCU | ESP32-WROOM-32E-N4 |
| Microphone | MSM261DHT006, PDM digital MEMS, mono, top-ported |
| Storage | GD25Q128ESIG, 16 MB NOR flash |
| Indicators | 29x WS2812-compatible RGB LEDs, two 12-LED reel rings, three track lamps, REC, BT |
| Board | 2-layer, 99.50 x 63.50 mm, matte white solder mask, black silkscreen |
| Cost | ~$9.41/board at a run of 20 |

## Project status

Design locked, schematic and firmware core underway. The `hardware/` folder holds a KiCad 9 project with an ERC-clean schematic and JLCPCB part libraries. The `firmware/` folder has an ESP-IDF skeleton plus a host-tested core: crash-safe slot manager, ADPCM codec, playback sequencer, reel display, pairing policy, bond table and record limiter, all proven without hardware since there's no devkit yet. Plan is a prototype run of 3-5 boards, then a full run of 20. What's left needs a board in hand: SPI flash, I2S capture, A2DP plumbing, LED output, and testing A2DP against real earbuds.

Full design files, firmware, and documentation (manual, FAQ, BOM, prior-art research) are on the [Mixxtape GitHub repo](https://github.com/funvill/mixxtape).

## Prior art

- **Mixtape Alpha** (Open Music Labs with Jie Qi / MIT Media Lab, 2012) - a cassette-shaped ATmega328p synth. The bare-PCB-as-object idea comes straight from it.
- **Mixxtape** (Mixxim) - the commercial cassette-shaped Bluetooth player. The thing this project is not.
