---
title: "Vancouver SkyTrain PCB v3 - generated from real geography"
date: 2026-09-10 00:01:00
slug: vancouver-skytrain-pcb-v3
categories:
  - Projects
tags:
  - pcb
  - kicad
  - jlcpcb
  - ws2812
  - code
  - maps
  - vancouver
  - ideas
excerpt: "The third redesign of the Vancouver SkyTrain PCB, built from real map data instead of hand-drawn artwork"
---
[Project page](/projects/2024-metro-map-pcb/) - [GitHub repo](https://github.com/funvill/vancouver-skytrain-pcb)

The [Vancouver SkyTrain PCB](/projects/2024-metro-map-pcb/) is now on its third design. v1 was a large 320 × 210 mm board with two LEDs per station, one per direction, driven by an ESP32. v2 shrank that down to a 100 × 83 mm schematic-style board, with the artwork hand-drawn in Inkscape and imported into KiCad with svg2shenzhen. Neither ever felt finished enough to send to manufacturing in large numbers.

<a href='/public/uploads/2026/vancouver-skytrain-v3-front.png'><img style="float: left; margin: 10px; max-width: 400px; border: 1px solid black; padding: 5px" src="/public/uploads/2026/vancouver-skytrain-v3-front.png" alt="Vancouver SkyTrain PCB v3, front"></a>
<a href='/public/uploads/2026/vancouver-skytrain-v3-back.png'><img style="float: left; margin: 10px; max-width: 400px; border: 1px solid black; padding: 5px" src="/public/uploads/2026/vancouver-skytrain-v3-back.png" alt="Vancouver SkyTrain PCB v3, back"></a>

<div style="clear: both;"></div>

**v3** is a 200 × 109 mm board with 68 WS2812B LEDs, one for every current and under-construction SkyTrain station plus the SeaBus, and a XIAO controller footprint on the back. The front shows exposed copper for the water, with silkscreen for the routes and station rings.

The bigger change from v1 and v2 is how the board gets made. Instead of hand-drawing the map, v3 is generated end-to-end from a single data file, `vancouver.json`:

- **Geography** comes from the province's Freshwater Atlas (land, sea, rivers, lakes) and the ABMS layer (the UBC boundary).
- **Station positions** come from OpenStreetMap.
- A set of Python tools turns that data file into LED placement, the exposed-copper water pour, silkscreen routes, station rings and labels, and even the copper city names and wordmark.

<a href='/public/uploads/2026/vancouver-skytrain-v3-geo-preview.png'><img style="max-width: 500px; border: 1px solid black; margin: 5px; padding: 5px;" src="/public/uploads/2026/vancouver-skytrain-v3-geo-preview.png" alt="Vancouver SkyTrain PCB v3 geography-only preview"></a>

Station labels are laid out automatically by an optimizer (greedy placement plus simulated annealing) and then finished by hand in KiCad where needed. Those hand edits get imported back into `vancouver.json`, so they aren't lost on the next regeneration. Move a label, delete a leader line, or edit a station's text in KiCad, run the import script, and the data file catches up. That makes the whole pipeline safe to re-run any time the source geography or station list changes, without redoing hours of manual layout work.

Full pipeline, tooling, and a lessons-learned page covering what to carry into the next board of this kind are on the [GitHub repo](https://github.com/funvill/vancouver-skytrain-pcb).
