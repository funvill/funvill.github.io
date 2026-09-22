---
title: "(2024) Polyhedron Mobile PCB"
date: 2024-12-03 00:00:00
slug: 2024-polyhedron-mobile-pcb
categories:
  - Projects
tags:
  - pcb
  - kicad
  - jlcpcb
  - led
  - esp32
  - code
  - ideas
excerpt: "A family of LED polyhedron lamps, each face its own welded PCB panel"
header:
  teaser: /uploads/2024/rhombic-dodecahedron-front.png
toc: false
---
> A 3D shape built out of PCBs instead of paper.

## Overview

[Polyhedron Mobile PCB](https://github.com/funvill/PolyhedronMobile-PCB) collects the different polyhedron lamp designs that grew out of [Idea 010 - Polyhedron Papercraft Mobile](/idea010-polyhedron-papercraft-mobile/). Each shape is built from identical PCB panels, one per face, each carrying a grid of small LEDs. The panels are welded together edge to edge with solder, so the finished object is both the structure and the circuit board.

So far there are three shapes in the family.

## Rhombic Dodecahedron

<a href='/public/uploads/2024/rhombic-dodecahedron-front.png'><img style="float: left; margin: 10px; max-width: 340px; border: 1px solid black; padding: 5px" src="/public/uploads/2024/rhombic-dodecahedron-front.png" alt="Rhombic Dodecahedron PCB, front"></a>
<a href='/public/uploads/2024/rhombic-dodecahedron-back.png'><img style="float: left; margin: 10px; max-width: 340px; border: 1px solid black; padding: 5px" src="/public/uploads/2024/rhombic-dodecahedron-back.png" alt="Rhombic Dodecahedron PCB, back"></a>

<div style="clear: both;"></div>

A [rhombic dodecahedron](https://en.wikipedia.org/wiki/Rhombic_dodecahedron) is made of 12 identical rhombus faces. Each face panel is scaled to 70mm, with a 70.53° acute angle.

## Tetragonal Trapezohedron

<a href='/public/uploads/2024/tetragonal-trapezohedron-pcb-front.png'><img style="float: left; margin: 10px; max-width: 340px; border: 1px solid black; padding: 5px" src="/public/uploads/2024/tetragonal-trapezohedron-pcb-front.png" alt="Tetragonal Trapezohedron PCB, front"></a>
<a href='/public/uploads/2024/tetragonal-trapezohedron-pcb-back.png'><img style="float: left; margin: 10px; max-width: 340px; border: 1px solid black; padding: 5px" src="/public/uploads/2024/tetragonal-trapezohedron-pcb-back.png" alt="Tetragonal Trapezohedron PCB, back"></a>

<div style="clear: both;"></div>

A [tetragonal trapezohedron](https://en.wikipedia.org/wiki/Tetragonal_trapezohedron) is made of 8 kite-shaped faces. This one has a much denser LED grid than the earlier Dodecahedron design, a XIAO ESP32-S3 mounted inside using its castellated edge pads, and panels tied together with fishing line where the solder joints didn't hold. Full build notes are in the [Tetragonal Trapezohedron Retrospective](/tetragonal-trapezohedron-retrospective/).

## Dodecahedron

<a href='/public/uploads/2024/2024-march-30-front.png'><img style="float: left; margin: 10px; max-width: 340px; border: 1px solid black; padding: 5px" src="/public/uploads/2024/2024-march-30-front.png" alt="Dodecahedron pentagon PCB, front"></a>
<a href='/public/uploads/2024/2024-march-30-back.png'><img style="float: left; margin: 10px; max-width: 340px; border: 1px solid black; padding: 5px" src="/public/uploads/2024/2024-march-30-back.png" alt="Dodecahedron pentagon PCB, back"></a>

<div style="clear: both;"></div>

The first shape in the family. A [regular dodecahedron](https://en.wikipedia.org/wiki/Regular_dodecahedron) built from 12 pentagon PCBs, each with 10 LEDs, welded together at the vertices with a hole left in the center for the controller and batteries. Design notes are in [Dodecahedron PCB Design](/dodecahedron-pcb-design/), and the lessons learned afterward are in the [Dodecahedron PCB Retrospective](/dodecahedron-pcb-retrospective/).

## Links

- [GitHub repo](https://github.com/funvill/PolyhedronMobile-PCB) - design files for all three shapes
