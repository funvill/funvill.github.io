---
title: "Idea 077 - Equilateral triangles LED panels"
date: 2023-04-14 01:17:00
categories:
- ideas
- YearOfIdeas
tags:
- art
- led
- polyhedron
- projects
- ideas
excerpt: Create equilateral triangles LED panels to construct LED polyhedron shapes
slug: idea077-equilateral-triangles-led-panels

---

> This post is part of [the 100 project ideas](/projects/2023-100-ideas/) project. [#The100DayProject](https://www.the100dayproject.org/). I am looking for feedback. <a href='#utterances-comments'>Comment</a> below or DM me via social media <a href="https://instagram.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-instagram" aria-hidden="true"></i><span class="label">Instagram</span></a>, <a href="https://twitter.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-twitter" aria-hidden="true"></i><span class="label">Twitter</span></a>.

## One Line Pitch

Create equilateral triangles LED panels to construct LED polyhedron shapes

## Description

<img src='\public\uploads\2023\led_cube.png' alt='led_cube' title='LED Cube by Greg Davill' style="float: right; max-width: 400px; margin: 10px; border: 1px solid black; padding: 5px">It seems to be a right of passage that people learning how to design PCBs make an LED Cube. 6x identical sides all the same shape. There are a few interesting tricks about wiring it so that the data path flows continuously through all the faces, and you need to leave room for the CPU, battery, and some way of charging it. It's an interesting project that is great for learning.

Instead of a cube with square faces. I was thinking of making a [Equilateral Triangles](https://en.wikipedia.org/wiki/Equilateral_triangle) PCB with an array of LEDs on it. Two equilateral triangles make a square that can be used to make a LED cube. Five equilateral triangles makes a pentagon.

Using equilateral triangles I should be able to make all of the [regular polyhedron](https://en.wikipedia.org/wiki/Regular_polyhedron)

- [Tetrahedron](https://en.wikipedia.org/wiki/Tetrahedron) - Has 4 equilateral triangles for its faces
- [Cube](https://en.wikipedia.org/wiki/Regular_polyhedron) - Uses 6 squares for its faces meaning it will take 12 equilateral triangles to make this polyhedron
- [Octahedron](https://en.wikipedia.org/wiki/Octahedron) - Has 8 equilateral triangles for its faces
- [Dodecahedron](https://en.wikipedia.org/wiki/Regular_dodecahedron) - Has 12 regular pentagonal faces, each pentagonal requires 5 equilateral triangles to construct meaning it would take 56 panels to construct this polyhedron and it would be pretty large!
- [Icosahedron](https://en.wikipedia.org/wiki/Regular_icosahedron) Has 20 equilateral triangles for its faces

With a little more effort the [Kepler–Poinsot polyhedra](https://en.wikipedia.org/wiki/Regular_polyhedron) could also be created using equilateral triangles. They would be physically large and have many faces but it could be done.

<img src='\public\uploads\2023\regular_polyhedron.png' alt='regular_polyhedron' title='regular_polyhedron from Wikipedia' style="margin: 10px; border: 1px solid black; padding: 5px">

[Catalan_solid](https://en.wikipedia.org/wiki/Catalan_solid) are also interesting for this idea because they are [face-transitive](https://en.wikipedia.org/wiki/Isohedral_figure) (all of the faces of the object have the same shape) but the shapes aren’t as reckonable as [regular polyhedron](https://en.wikipedia.org/wiki/Regular_polyhedron) by normal people.

Wiring for the equilateral triangles to allow for Data, Power and GND wires to come off every face and connect to each other face will be tricky. Power at the corners that can all be soldered together. The GND can be along the edge of each triangle and be a large enough pad that can be used to solder the different triangles together to form the shape.

The data lines are a bit more complicated as they are one directional. Having a solder jumper that can be connected or disconnected as needed for each of the faces They should be in the center of each edge of the triangle. Each triangle will have at least one data line on an edge that is not connected. Maybe using a default 0 ohm that connects the data line on each face as a default would make it easier to remove the resistor if needed.

A few angled jigs could be created to help with the soldering of angles. Another jig could be created for charging that connects the 5v and the GND to the edge of the objects.

The main processor and the battery could be floating in the center of the object or tapped to one of the inner faces of the object. The main processor should have a accelerometer and a gyro in it so it can detect the angle that the object is at.

These objects could also be attached to wires and hung from a mobile in the ceiling. Very similar to [Idea 10 - Polyhedron Papercraft Mobile](/idea010-polyhedron-papercraft-mobile/)

## Prior art

- [Polyhedrone](https://hackaday.com/2016/03/04/polyhedrone/) - Uses catalan solid.
- [LED D20](https://gregdavill.com/posts/d20/) - Very tight LED grid
- [Glowing LED cube](https://hackaday.com/2022/04/20/2022-sci-fi-contest-glowing-led-cubes-make-captivating-artifacts/) - A cube
