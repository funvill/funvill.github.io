---
title: "Dodecahedron PCB Design"
date: 2024-03-30 00:01:00
excerpt: PCB design of a pentagon plate of a dodecahedron lamp
categories:
- Projects
- PCB
tags:
- PCB
- JLCPCB
---

<img src='\public\uploads\2024\Dodecahedron.gif' alt='Dodecahedron' title='Dodecahedron' style='align: right;border: 1px solid black; margin: 5px; padding: 5px;'> It seems to be a right of passage that people learning how to design PCBs make an LED Cube. It's a good learning project because it only has a few components and each face (PDB Boards) is identical.

I wanted to test out a few PCB design elements on a larger board so I decided to use Pentagons instead of [Equilateral Triangles] to make a Regular Pentagon [Dodecahedron](https://en.wikipedia.org/wiki/Regular_dodecahedron).

This idea came from [Idea 077 - Equilateral triangles LED panels](https://blog.abluestar.com/idea077-equilateral-triangles-led-panels/) from the [year of ideas](https://blog.abluestar.com/projects/2023-100-ideas/) project.

The project files can be found on my github project page: [https://github.com/funvill/dodecahedron-pcb](https://github.com/funvill/dodecahedron-pcb)

<img src='\public\uploads\2024\2024-march-30-front.png' alt='Pentagon front PCB' title='Pentagon front PCB'>

<img src='\public\uploads\2024\2024-march-30-back.png' alt='Pentagon back PCB' title='Pentagon back PCB'>

Creating a polyhedral shape involves welding together several faces. To ensure a robust mechanical connection to the edges of the boards, I devised a custom footprint with large pads that could be welded together. Each pad features a through hole through which solid core wire could be threaded and welded, providing additional strength.

<img src='\public\uploads\2024\pentagon-corner-pcb.png' alt='or-pad' title='or-pad' style='align: left;border: 1px solid black; margin: 5px; padding: 5px;'> I ordered the pads with 5V in the center pin 1. Then two data pads on either side (Pin 2 and Pin 3). With two identical GND pads on the far ends. I wanted to keep the positive and negative power pads away from each other incase they get accidentally bridged.

<img src='\public\uploads\2024\or-pad.png' alt='or-pad' title='or-pad' style='align: right;border: 1px solid black; margin: 5px; padding: 5px;'> One of the design goals is to make each of the PCB boards (faces) identical. Identical boards would reduce the costs of manufacturing and hopefully simplify the construction. To do this I needed a method that would allow me to configure what edge of the PDB board the LED OUT, and LED IN data line are connected to. I designed this "OR PAD" that allows for configuration via a [solder bridge](https://resources.altium.com/p/solder-bridge-jumper-best-practices-pcb-design).

I still will need to figure out the [Hamiltonian path](https://en.wikipedia.org/wiki/Hamiltonian_path) problem aka the [Traveling Salesman problem](https://en.wikipedia.org/wiki/Travelling_salesman_problem), or [NP-hard](https://en.wikipedia.org/wiki/NP-hard) problem. Creating a path in a directed graph that visits each face exactly once.

In other words I need a way of configuring a path for the LED Data line where it touches all faces only once. Luckily for me William Rowan Hamilton used a dodecahedron in the [Hamilton's puzzle](https://en.wikipedia.org/wiki/Icosian_game) as an example of a platonic solids that has a Hamiltonian path. (Warning [Hamiltonian path](https://en.wikipedia.org/wiki/Hamiltonian_path) is a huge [wiki rabbit hole](https://en.wikipedia.org/wiki/Wiki_rabbit_hole))

