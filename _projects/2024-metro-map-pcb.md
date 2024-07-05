---
title       : (2024) PCB Metro Maps
excerpt     : A Metro map made with PCBs
post_date   : 2024-07-20 00:00:00
header      :
  teaser    : /public/uploads/2024/banner-pcb-map.png
toc         : false
tags:
- ESP32
- FastLED
- KiCad
- SVG2Shenzhen
- JLCPCB
- WS2812
---

> This is a temp landing page for information on this project.
>
> ToDo: Update this page with more information

A PCB Metro map of the public transit system of Washington DC, and Vancouver, BC.

The idea was to make a large PCB that was an interactive map of a metro train system. A microcontroller (ESP32) uses WiFi to poll the metro train API to get real time train location information then illuminate the stations when trains arrived.

The first design was of my hometown Vancouver, BC [Skytrain](https://www.translink.ca/), and the second design was of Washington DC. I decided to do Washington DC because I was doing a large 18-month project for the Washington DC Metro ([WMATA](https://wmata.com/)) and wanted a memento of the project.

This idea was part of the [100 Days of Ideas project](/projects/2023-100-ideas/) from 2023, [Idea 022 - Translink map PCB](/idea022-translink-map-pcb/).

Open source: Full Design files, and firmware can be found on the project page

- Source code files for [Washington Metro PCB](https://github.com/funvill/washington-metro-pcb)
- Source code files for [Vancouver Skytrain PCB](https://github.com/funvill/vancouver-skytrain-pcb)

After creating the first version of these PCB maps, I wrote a retrospective of all the leasons that I learned. [PCB Metro maps retrospective](/pcb-metro-maps-retrospective/)

ESP32, FastLED, KiCad, SVG2Shenzhen, JLCPCB, WS2812 (XL-1010RGBC-WS2812B)

<iframe width="560" height="315" src="https://www.youtube.com/embed/HhUGJCySifQ?si=XCkaXUF_K3Fzo5UJ" title="Washinton Metro PCB maps" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
