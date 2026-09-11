---
title: "(2024) PCB Metro Maps"
date: 2024-07-20 00:00:00
slug: 2024-metro-map-pcb
categories:
  - Projects
tags:
  - esp32
  - fastled
  - kicad
  - jlcpcb
  - ws2812
  - pcb
  - code
  - maps
  - vancouver
  - london
  - ideas
excerpt: "PCB maps of metro and transit systems, lit up station by station"
header:
  teaser: /uploads/2024/banner-pcb-map.png
toc: false
---
A collection of PCB maps of metro and transit systems, with one addressable RGB LED per station. Boards exist for Washington DC, Vancouver, BC, and the London Underground, with more likely to follow.

The idea was to make a large PCB that was an interactive map of a transit system, with a microcontroller polling the transit agency's real-time API and lighting up each station as a train arrives.

The first design was of my hometown Vancouver, BC [Skytrain](https://www.translink.ca/), and the second was Washington DC. I decided to do Washington DC because I was doing a large 18-month project for the Washington DC Metro ([WMATA](https://wmata.com/)) and wanted a memento of the project. Since then the Vancouver board has gone through several redesigns, and a London Underground board has joined the family.

This idea was part of the [100 Days of Ideas project](/projects/2023-100-ideas/) from 2023, [Idea 022 - Translink map PCB](/idea022-translink-map-pcb/).

Open source: Full design files and firmware can be found on each project's GitHub page.

- Source code files for [Washington Metro PCB](https://github.com/funvill/washington-metro-pcb)
- Source code files for [Vancouver Skytrain PCB](https://github.com/funvill/vancouver-skytrain-pcb)
- Source code files for [London Underground PCB](https://github.com/funvill/London-Underground-PCB)

After creating the first version of these PCB maps, I wrote a retrospective of all the lessons that I learned. [PCB Metro maps retrospective](/pcb-metro-maps-retrospective/)

ESP32, FastLED, KiCad, SVG2Shenzhen, JLCPCB, WS2812 (XL-1010RGBC-WS2812B)

<iframe width="560" height="315" src="https://www.youtube.com/embed/HhUGJCySifQ?si=XCkaXUF_K3Fzo5UJ" title="Washinton Metro PCB maps" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Vancouver SkyTrain PCB

The Vancouver board has gone through three versions. The current **v3** is a 200 × 109 mm board built from real geography: land, water, and rivers traced from the BC Freshwater Atlas, with station positions pulled from OpenStreetMap. It has 68 WS2812B LEDs, one for every current and under-construction SkyTrain station plus the SeaBus, and a XIAO controller footprint on the back. The whole board (LED placement, exposed-copper water, silkscreened routes, station rings and labels) is generated end-to-end from a single data file.

<a href='/public/uploads/2026/vancouver-skytrain-v3-front.png'><img style="float: left; margin: 10px; max-width: 400px; border: 1px solid black; padding: 5px" src="/public/uploads/2026/vancouver-skytrain-v3-front.png" alt="Vancouver SkyTrain PCB v3, front" title="v3 front - exposed-copper water, silkscreen routes, one LED per station"></a>
<a href='/public/uploads/2026/vancouver-skytrain-v3-back.png'><img style="float: left; margin: 10px; max-width: 400px; border: 1px solid black; padding: 5px" src="/public/uploads/2026/vancouver-skytrain-v3-back.png" alt="Vancouver SkyTrain PCB v3, back" title="v3 back - XIAO controller footprint, buttons, LED chain test points"></a>

<div style="clear: both;"></div>

<a href='/public/uploads/2026/vancouver-skytrain-v3-geo-preview.png'><img style="max-width: 500px; border: 1px solid black; margin: 5px; padding: 5px;" src="/public/uploads/2026/vancouver-skytrain-v3-geo-preview.png" alt="Vancouver SkyTrain PCB v3 geography-only preview" title="v3 geography-only preview, built from the BC Freshwater Atlas"></a>

Full design files, the generation pipeline, and a lessons-learned page are on the [Vancouver Skytrain PCB GitHub repo](https://github.com/funvill/vancouver-skytrain-pcb).

## London Underground PCB

The London Underground board takes the idea further with 600 individually addressable RGB LEDs laid out in the shape of the Tube map. Animated "trains" travel along each line using the official TfL line colors.

<a href='/public/uploads/2026/london-underground-pcb-preview.png'><img style="max-width: 600px; border: 1px solid black; margin: 5px; padding: 5px;" src="/public/uploads/2026/london-underground-pcb-preview.png" alt="London Underground PCB preview" title="London Underground PCB - 600 LEDs, official TfL line colors"></a>

Full design files and firmware are on the [London Underground PCB GitHub repo](https://github.com/funvill/London-Underground-PCB).
