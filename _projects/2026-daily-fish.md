---
title: "(2026) Daily Fish"
date: 2026-11-11 00:00:00
slug: 2026-daily-fish
categories:
  - Projects
tags:
  - esp32
  - code
  - cpp
  - art
  - ai
excerpt: "An e-paper panel that generates and draws a new fish, or an insect, every day on the ESP32-C3 inside it."
header:
  teaser: /uploads/2026/daily-fish-panel.jpg
toc: false
---
> A new made-up fish every day, drawn on e-paper

## Overview

![The e-paper panel held in a hand, showing a line drawing of a fish named Pseuca helus](/uploads/2026/daily-fish-panel.jpg)

Daily Fish is a [Seeed Studio XIAO 7.5" ePaper Panel](https://www.seeedstudio.com/XIAO-7-5-ePaper-Panel-p-6416.html) that draws a different fish every day. Each fish is generated from scratch by the [XIAO ESP32-C3](https://wiki.seeedstudio.com/XIAO_ESP32C3_Getting_Started/) inside the panel, gets a pseudo-Latin species name, and stays on the screen for 24 hours. Then the panel wakes up, makes the next one, and goes back to sleep.

There is no server and no app. The only thing the panel uses Wi-Fi for is checking whether I have published new firmware.

The code is on GitHub at [funvill/daily-fish](https://github.com/funvill/daily-fish), under the MIT license. Ready-made firmware is on the [releases page](https://github.com/funvill/daily-fish/releases).

## The fish

The fish come from [fishdraw](https://github.com/LingDong-/fishdraw) by [Lingdong Huang](https://lingdong.works/). It is a single JavaScript file that generates all sorts of weird fish as plotter-style line drawings.

fishdraw builds every line of a fish in memory before drawing it, which takes megabytes as JavaScript. The ESP32-C3 has about 400 KB of RAM, so the generator is ported to C++ and rearranged to fit. The port keeps the original's random numbers in the same order. That means a fish drawn on the panel is the same fish the original draws for the same name.

Here is the original on top and the port underneath, for two names.

![Two fish drawn by the original fishdraw, and the same two fish drawn by the C++ port](/uploads/2026/daily-fish-original-vs-port.png)

These are the 800x480 images the panel draws.

![A deep-bodied fish with large scales](/uploads/2026/daily-fish-fish-1.png)

![A slender fish with a cross-hatched back](/uploads/2026/daily-fish-fish-2.png)

![A striped fish](/uploads/2026/daily-fish-fish-3.png)

![A speckled fish](/uploads/2026/daily-fish-fish-4.png)

![A fish with small scales and a forked tail](/uploads/2026/daily-fish-fish-5.png)

## The insects

After the fish worked I wanted a second subject. I tried flowers first and didn't like them, so they are switched off. Insects are what stayed.

fishdraw has no insects, so these are a new generator written for this project in the same line style. It reuses the noise, clipping and hatching from the fish. Where a fish is drawn from the side, an insect is drawn from above like a pinned specimen. Each one is built for the right-hand side and mirrored.

There are beetles, butterflies and moths, dragonflies and damselflies, bees, wasps and flies, and ants.

![A butterfly with dark wing borders and spots](/uploads/2026/daily-fish-insect-1.png)

![A dragonfly](/uploads/2026/daily-fish-insect-2.png)

![A long-horned beetle](/uploads/2026/daily-fish-insect-3.png)

![A striped bee](/uploads/2026/daily-fish-insect-4.png)

![An ant](/uploads/2026/daily-fish-insect-5.png)

## Using it

- A new picture appears every 24 hours, of the same kind as the last one.
- Pressing Reset switches between fish and insects and draws a new one straight away.
- A small box saying it is drawing appears in the middle of the screen a couple of seconds after the press, because a fish takes a while to work out.
- The panel counts every picture it has made and shows the count in the bottom right corner. The count is kept in flash, so it survives a flat battery.

The panel has a second button, Boot, that I wanted to use for this. It can't wake the chip from deep sleep, so Reset does both jobs.

## Technical details

The firmware is C++ on the Arduino framework, built with [PlatformIO](https://platformio.org/). The display is 800x480, black and white, with a UC8179 controller, and is driven by Jean-Marc Zingg's [GxEPD2](https://github.com/ZinggJM/GxEPD2) library. The names under the pictures are drawn in a single-stroke [Hershey font](https://en.wikipedia.org/wiki/Hershey_fonts), the same one fishdraw uses.

### Memory

A big fish is about 25,000 points. On the panel the finished lines are packed as 16-bit coordinates into one 90 KB block. The scale textures, which are most of the points, are generated one scale at a time straight into that block. Cutting away the parts hidden behind fins is done in place.

### Speed

The ESP32-C3 has no floating point unit. It does that maths in software, where one cosine costs thousands of cycles. The [Perlin noise](https://en.wikipedia.org/wiki/Perlin_noise) function asks for twelve cosines every call, so it now reads them from a table. Clipping is mostly comparisons that rule edges out, and those are done on integers.

Times measured on the panel, before and after that work:

| Fish | Before | After |
| --- | --- | --- |
| Aroloris tritus, a typical one | 13.6 s | 4.6 s |
| Mycirrla chrybaphatus | 15.4 s | 8.0 s |
| Micpogtys xantus | 28.2 s | 16.1 s |
| Eloras vitraradi, the heaviest I found | 30.2 s | 18.9 s |

An insect takes under a second. The screen refresh adds about 4 seconds to either.

### Updates

After each picture the panel joins Wi-Fi and asks GitHub for the latest release. If it is newer, the panel downloads it, installs it and restarts. Pushing a version tag to the repository runs a [GitHub Actions workflow](https://github.com/funvill/daily-fish/blob/main/.github/workflows/release.yml) that builds the firmware and publishes the release, so a tag is all it takes to update the panel on my desk.

A new version is on trial until it has drawn a picture. If it resets before that, the bootloader is set up to go back to the previous version using the ESP32's [app rollback](https://docs.espressif.com/projects/esp-idf/en/latest/esp32c3/api-reference/system/ota.html#app-rollback).

### Desktop preview

The generators have no Arduino code in them, so the same files compile on a computer. That is how the example images on this page were made. It also meant 3,000 fish and 3,000 insects could be checked for crashes without waiting for the panel.

## How it was built

I built this with [Claude Code](https://claude.com/claude-code). I described what I wanted, pressed the Reset button a lot, and said what I saw on the screen. It wrote the port and the firmware, and tested them on the real panel over USB.

## Versions

- [v0.1.0](https://github.com/funvill/daily-fish/releases/tag/v0.1.0) - Fish on the panel, a new one every 24 hours.
- [v0.2.0](https://github.com/funvill/daily-fish/releases/tag/v0.2.0) - Updates over Wi-Fi from GitHub releases.
- [v0.3.0](https://github.com/funvill/daily-fish/releases/tag/v0.3.0) - Flowers, and Reset to switch between the two.
- [v0.3.1](https://github.com/funvill/daily-fish/releases/tag/v0.3.1) - The drawing box after a press of Reset.
- [v0.4.0](https://github.com/funvill/daily-fish/releases/tag/v0.4.0) - Faster fish, and two more kinds of flower.
- [v0.5.0](https://github.com/funvill/daily-fish/releases/tag/v0.5.0) - Insects. Flowers switched off.

## Links

- [Daily Fish on GitHub](https://github.com/funvill/daily-fish), with the [README](https://github.com/funvill/daily-fish#readme) and the [releases](https://github.com/funvill/daily-fish/releases)
- [fishdraw](https://github.com/LingDong-/fishdraw) by [Lingdong Huang](https://lingdong.works/)
- [XIAO 7.5" ePaper Panel](https://www.seeedstudio.com/XIAO-7-5-ePaper-Panel-p-6416.html) and Seeed's [wiki page](https://wiki.seeedstudio.com/xiao_075inch_epaper_panel/) for it
- [XIAO ESP32-C3](https://wiki.seeedstudio.com/XIAO_ESP32C3_Getting_Started/)
- [GxEPD2](https://github.com/ZinggJM/GxEPD2), the e-paper display library
- [PlatformIO](https://platformio.org/)
- [Electronic paper](https://en.wikipedia.org/wiki/Electronic_paper) on Wikipedia
- An older idea of mine in the same spirit: [procedurally generated glowing mushroom PCB](/idea006-procedurally-generated-glowing-mushroom-pcb/)
