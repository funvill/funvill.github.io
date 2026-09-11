---
title: "Mixxtape - a cassette you can actually record on"
date: 2026-09-10 00:00:00
slug: mixxtape-a-cassette-you-can-actually-record-on
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
excerpt: "A cassette-shaped PCB, sized to fit a real Norelco case, that actually records"
---
[Project page](/projects/2026-mixxtape/)

Cassette-shaped Bluetooth speakers and players are everywhere. What I couldn't find anyone selling was a cassette-shaped recorder, and recording is the part that made a mixtape a mixtape in the first place. So I started building one.

<img style="max-width: 100%; border: 1px solid black; margin: 5px; padding: 5px;" src="/public/uploads/2026/mixxtape-render.gif" alt="The Mixxtape board turning, front and back">

**Mixxtape** is a 2-layer PCB, 99.5 x 63.5 mm, shaped to slide into a real Norelco cassette case. There's no enclosure, the bare board is the object. An ESP32 and a top-ported MEMS microphone record three 4-minute tracks to onboard flash. Hold REC to record, release to stop, then hold the board up to any Bluetooth speaker or earbuds and press PLAY.

A few of the details I'm happiest with so far:

- Two rings of 12 RGB LEDs sit around routed-out "reel" windows. During playback the left ring empties and the right fills, like tape spooling from one reel to the other.
- A mouse-bitten, snap-off PCB tab carries the write-protect trace. Snap it off and the firmware refuses to record, permanently. Handing someone a finished tape becomes a small physical ritual, the same way it always was.
- No battery, no charging circuit, USB-C is power only. A real cassette's promise is that you find it in a drawer years later and it still works. I wanted the board to keep that promise too.
- Matte white solder mask, so the label can be written on with a sharpie, right where a cassette's paper label would sit.

<a href='/public/uploads/2026/mixxtape-case-mockup.png'><img style="float: right; margin: 10px; max-width: 400px; border: 1px solid black; padding: 5px" src="/public/uploads/2026/mixxtape-case-mockup.png" alt="Cassette and J-card insert artwork mockup"></a>

Right now the design is locked and the schematic is ERC-clean. The firmware core (slot manager, ADPCM codec, playback sequencer, pairing policy) is built and tested on the host, even though there's no hardware yet to run it on. Next step is a prototype run of 3-5 boards to prove out the microphone capture, the Bluetooth A2DP audio path, and the LED reel animation against real hardware, before ordering a full run of 20.

Full schematic, firmware, bill of materials, and documentation are on the [Mixxtape GitHub repo](https://github.com/funvill/mixxtape). More to come once the first boards are in hand.
