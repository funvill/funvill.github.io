---
title: "Mixxtape - the first boards, and what went wrong"
date: 2026-10-25 00:02:00
slug: mixxtape-first-boards-and-what-went-wrong
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
  - ai
excerpt: "The first 20 Mixxtape boards arrived from JLCPCB. One boots, the voltage regulator overheats, and there is a list of changes for version two."
---
[Project page](/projects/2026-mixxtape/) - [GitHub repo](https://github.com/funvill/mixxtape)

This is a status update for the Mixxtape project. See [Mixxtape - a cassette you can actually record on](/mixxtape-a-cassette-you-can-actually-record-on/) for the original idea and design notes.

The first 20 boards arrived from JLCPCB in September. I have one of them on the bench. It boots, and I was able to flash firmware to it. It also gets very hot as soon as the programmer is plugged in.

## First impressions

I wrote down my [first impressions](https://github.com/funvill/mixxtape/issues/1) before plugging anything in. Most of these are cosmetic, and most of them are my own fault.

- **Black board.** I ordered a black board with white silkscreen. I should have ordered a white board with black silkscreen. The plan was that you could write your track list on the board with a sharpie, where the paper label would be on a real cassette. That doesn't work on a black board.
- **I forgot to rename the project** before sending it off to be manufactured.
- **The corners are too sharp.** The corner radius is too small and it doesn't feel nice in your hand.
- **The REC LED is in the wrong spot.** It's the second LED from the left. It should be on the end.
- **No QR code.** There is no QR code or short link back to the GitHub repo. People are going to pick this up and flip it over, and there is nothing that tells them what it is.
- **Test pads instead of through holes.** The programming header is bare test pads. It's fiddly to connect anything to them. Through holes would have been much easier.
- **The CUT trace is too small.** I added a trace that you can cut with a knife to disconnect the LEDs from the 5V rail, in case something went wrong. It's too small to actually cut. Design flaw.

My friend Tyson suggested moving the buttons to the side of the board and leaving the top clear for a label. That is where the label is on a real cassette. I like this idea a lot and will probably do it for the next version.

## The hot regulator

When I connected the programmer, the 3.3V line was drawing 431 mA and U4 (the AMS1117 voltage regulator) was too hot to touch. See [issue 2](https://github.com/funvill/mixxtape/issues/2).

The programming pads supply 3.3V directly to the 3.3V rail, which is the output of the regulator. With USB-C unplugged there is nothing on the regulator's input. So the current flows backwards through the regulator into the 5V rail, and then into the 29 LEDs and the level shifter. The regulator ends up burning off about half a watt, and it doesn't have enough copper around it to get rid of that heat.

Before ordering the boards I had a set of AI agents review the design. One of them found this exact problem and marked it as minor. Its reasoning was that the AMS1117 "blocks reverse conduction, so this is tolerable".

It wasn't tolerable. This problem is on all 20 boards. For now the workaround is to power the board from 5V and disconnect the 3.3V line on the programmer. The fix for the next version is to add the 5V pad to the programming header.

There is a second problem on this one board. USB-C doesn't provide any power. The cable charges my phone, the plug clicks in firmly, and pushing on it doesn't change anything. I think it's a bad solder joint on the connector. Hopefully that is only on this one board.

## What went right

- **It boots.** The ESP32 talks to the programmer and I was able to flash and verify firmware on it. It reports as an ESP32-D0WD-V3 with Bluetooth Classic and 4 MB of flash.
- **The fit.** Before ordering I printed the board on paper and checked it against a real cassette case. It fits.
- **The LED footprint was caught before ordering.** This is the one that would have killed the whole batch.

The LED footprint was originally drawn for the Worldsemi WS2812B-2020. The Worldsemi part is end of life at JLCPCB, so the BOM had been switched to a XINGLIGHT part. Same protocol and the same 2mm x 2mm size, but pin 1 is on the opposite corner. All 29 LEDs would have had power and ground swapped. The pads are tiny and there is no way I could have reworked 29 LEDs by hand on 20 boards. It would have meant ordering a new batch.

None of the automated checks found this. ERC passed, DRC passed, the netlist was correct, and the BOM matched the pick-and-place file. All of those checks assume the footprint is correct. It was found by comparing the LCSC part number on the footprint to the part number in the BOM, noticing they were different, and checking the manufacturer's datasheet. I have added a rule to the repo: if the part number on a footprint doesn't match the BOM, that is a bug.

I ended up switching to the XINGLIGHT XL-1615RGBC-WS2812B LED. I have used it on other projects and know it works.

## The firmware

The firmware had never been compiled when the boards arrived. It had unit tests that ran on my desktop and they all passed. But four of the source files, including the LED driver and the flash driver, weren't in any of the build files, so they had never actually been compiled for the ESP32. Getting it to build found a circular dependency between two components and an integer overflow in my LED timing code (280 x 10,000,000 doesn't fit in 32 bits).

It builds now, and it's running on board number one.

## What to change in the next version

- White board with black silkscreen
- Rename the project on the silkscreen
- Larger corner radius
- Move the REC LED to the end
- Add a QR code linking to the GitHub repo
- Through holes for the programming header
- Add a 5V pad to the programming header, and stop powering the board through the regulator's output
- Make the CUT trace large enough to actually cut
- Move the buttons to the side and leave the top clear for a label

## Next steps

- Power the board from 5V the way it's supposed to be powered, and see if the regulator survived.
- Fix the USB-C solder joint.
- Test the microphone. Does it record?
- Test Bluetooth. Does it play to a real pair of earbuds?
- Test the reel LED animations. Do they look like tape spinning?

I still don't know if the core features work. I'll post another update once I do.
