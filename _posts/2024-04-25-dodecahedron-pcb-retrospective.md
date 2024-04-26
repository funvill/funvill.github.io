---
title: "Dodecahedron PCB Retrospective"
date: 2024-04-25 00:01:00
excerpt: Retrospective of the dodecahedron polyhedron lamp
categories:
- Projects
- PCB
tags:
- PCB
- JLCPCB
---

The [Idea 077 - Equilateral triangles LED panels](https://blog.abluestar.com/idea077-equilateral-triangles-led-panels/) is part of the [100 Days of Ideas project](https://blog.abluestar.com/projects/2023-100-ideas/) from 2023.

The idea was to create several polyhedron shapes from PCB panels with addressable LEDS on them.

For the first version I decided to make a dodecahedra from 12 identical Pentagram PCB panels. See [Dodecahedron PCB Design](https://blog.abluestar.com/dodecahedron-pcb-design/) post for my original design notes.

The design and source code files can be found in my github project page: https://github.com/funvill/dodecahedron-pcb

The project costs about ~$60 USD shipped to my door via JLCPCB for 25 panels. Enough panels to make two dodecahedra with one extra panel to spare.

<iframe width="560" height="315" src="https://www.youtube.com/embed/NZIekc-BD-g?si=AifS6hRIP9IZHQtJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## What went right

- It worked - It was a good first version that I can demo to others.
- The data [in] and data [out] on the edge of each panel worked as expected. This allowed me a lot of flexibility to route the data lines through the panels. See [Hamiltonian path](https://en.wikipedia.org/wiki/Hamiltonian_path) for what I was trying to avoid.
- It’s the right size with 100mm panels - Overall the polyhedron has a 160mm diameter.
- Easy enough to assemble
- It's solid - I don’t expect it to fall apart if I drop it on the ground
- The circular paths for the GND and the 5V for the LEDs worked well.
- The white PCB panels reflect the light from the LEDs well
- Using copper tape to bridge the gaps between the edges helped a lot with creating connections between panels.

## What to change in the next version

This was a learning experience, I didn’t expect to get it right on the first attempt. This is why I started with a simple shape before progressing onto a more complex (And expensive) shapes.

### Hole size

<img src='\public\uploads\2024\or-pad.png' alt='Dodecahedron OR Pad' title='Dodecahedron OR Pad' style='float: right; border: 1px solid black; margin: 5px; padding: 5px;'>The holes in the connectors on the edge of the boards are far too small. This made it difficult to insert solid core wires into the holes connecting the panels together.

For the next version creating a larger hole, with a more oval shape should help.

### Connections between panels

<img src='\public\uploads\2024\pentagon-corner-pcb.png' alt='Pentagon corner PCB Pad' title='Pentagon corner PCB Pad' style='float: right; border: 1px solid black; margin: 5px; padding: 5px;'>I created a custom “or” pad in Kicad for the connectors between the panels. This custom pad allowed for routing the data path between each panel. I also added three through hole connections on each panel. I ended up using the through hole connections instead of the pads because it was much easier to work with.

Use though holes instead of fancy custom “or” pads.

### Pads on the corners

I added the 5V connection to the corner of the panels. This was hard to connect and weld across three points coming together in a point. All of the corner welds look awkward and misshapen because of it.

Avoid putting pads in the corner. There is lots of unused space along the edge that could have been used instead.

### Unused pads

Each of the corners have a GND pad on either side of them. I thought that this would allow me to add more solder points to each edge to make a stronger connection. This wasn’t necessary and added a lot of extra work to solder these pads together.

For the next version, Only one GND pad in the center of the edge of the panel.

### More LEDs

I only put 10 LEDs on each panel. I could have easily put 40 LEDs with the space that I had. The LEDs are pennies each and it would have made a more impressive project.

When in doubt add more LEDs

### Holes in the center of the panels

I was hoping that the holes in the center of the panels would make assembly easier. They were not needed and I could have used that space for more LEDs!

On a positive side, the holes do allow you to look into the insides of the object to see how it works. It will make it easier to change batteries on the fly.

### Controls on the underside of the panels

There is space on the underside of the panels for me to add pads for buttons and other controls. These components would be added manually by me after the boards arrive and only on the panels that need it.

A button to switch the patterns, and change the brightness of the LEDs. I always forget to add a brightness control

### Test points

I submitted an earlier version of this board that didn’t include any test points. They weren’t needed in the end but my process needs to be updated to prevent this oversight from happening again.
