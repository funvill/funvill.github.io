---
layout: single
title: Idea 091 - Honeypot terrarium
date: 2023-04-28 01:31:00
categories: ideas YearOfIdeas
tags: art projects ideas
excerpt: Visualization of robots as they attack critical infrastructure using Conways Game of Life
---

> This post is part of [the 100 project ideas](https://blog.abluestar.com/projects/2023-100-ideas/) project. [#The100DayProject](https://www.the100dayproject.org/). I am looking for feedback. <a href='#utterances-comments'>Comment</a> below or DM me via social media <a href="https://instagram.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-instagram" aria-hidden="true"></i><span class="label">Instagram</span></a>, <a href="https://twitter.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-twitter" aria-hidden="true"></i><span class="label">Twitter</span></a>.

## One Line Pitch

Visualization of robots as they attack critical infrastructure using Conways Game of Life

## Description

### Honeypot

I once made a fake [BACnet IP](https://en.wikipedia.org/wiki/BACnet) device and put it on the public internet (No firewall). It took 3 mins before it was discovered and a robot tried to write to the changeable values (Analog outputs, Binary outputs). The device mimicked an active coal [power plant](https://en.wikipedia.org/wiki/Power_station) in its object names (dump steam valve, emergency shutdown, etc…) and object lists. 3 mins, and robots tried to destroy a power plant. I did the same thing with [Modbus TCP](https://en.wikipedia.org/wiki/Modbus) with similar results.

It was an eye opening experience for me, to show how much damage could be done by accidentally exposing your critical infrastructure to the internet. Also how important it is to have protocols that have encryption and authentication as a core aspect of the protocol.

Creating these kinds of fake devices to detect and log unauthorized access or attacks on devices is often called [honeypots](https://en.wikipedia.org/wiki/Honeypot_(computing)). You basically bait the robots into attacking you, then ban their accounts or IP address from access to your real devices.

<a href='https://xkcd.com/350/'><img src='\public\uploads\2023\network-xkcd.png' alt='network-xkcd' title='network-xkcd' style="float: center; margin: 10px; border: 1px solid black; padding: 5px"></a>

### Visualizing IPv4

<a href='https://xkcd.com/195/'><img src='\public\uploads\2023\map-of-the-internet.png' alt='map-of-the-internet' title='map-of-the-internet' style="float: right; max-width: 400px; margin: 10px; border: 1px solid black; padding: 5px"></a>The IPv4 address range can be split up and visualized on a grid by using the first two octets of the IP address {One}.{Two}.X.X. Using the example of 104.21.35.195, One=104, Two=21. The last two octets are dropped and ignored.

The first octet (104) you use with a fractal pattern to align the address space on a plane that preserves grouping of IP addresses. See [Map of The internet](https://xkcd.com/195/) by [XKCD](https://xkcd.com/)

The second octet can be split up into a grid. With 1 in the top left corner and 255 in the bottom right hand corner.

This allows us to visualize the IPv4 address range across a grid.

### Conway's Game of Life

<img src='\public\uploads\2023\conway-game-of-life.gif' alt='conway-game-of-life' title='conway-game-of-life' style="float: right; max-width: 400px; margin: 10px; border: 1px solid black; padding: 5px">[Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) is a [cellular automaton](https://en.wikipedia.org/wiki/Cellular_automaton) [zero player game](https://en.wikipedia.org/wiki/Zero-player_game).

The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, live or dead (or populated and unpopulated, respectively). Every cell interacts with its eight neighbors, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:

- Any live cell with fewer than two live neighbors dies, as if by underpopulation.
- Any live cell with two or three live neighbors lives on to the next generation.
- Any live cell with more than three live neighbors dies, as if by overpopulation.
- Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

These rules, which compare the behavior of the automaton to real life, can be condensed into the following:

- Any live cell with two or three live neighbors survives.
- Any dead cell with three live neighbors becomes a live cell.
- All other live cells die in the next generation. Similarly, all other dead cells stay dead.

### Honeypot Terrarium (putting it all together)

Create a series of industrial protocol (BACnet, Modbus, Lonworks, Veeder root, DNP3, SNMP, Danfoss, Siemens, OPC UA, Rockwell, Ethernet/IP, MBus, MQTT, Notifier, OPW) honeypots

Make these honeypots mimic critical infrastructure such as [Electricity generation](https://en.wikipedia.org/wiki/Electricity_generation), communication systems, water treatment plants, fire suppression systems, nuclear research labs, hospitals, airports, telecommunication, banking systems, oil and gas extraction, military complexes, manufacturing. The mimic devices that would cause a lot of damage if someone was to randomly change values. Attractive targets.

When these honeypots are attacked, record the IP address and visualize it on the map of IPv4 address.

The visualization could be as simple as a heat map. Increasing the intensity of the region where the attack happened. It would be informative and you see what regions most of the attacks come from. The image wouldn’t be very active as the whole map slowly intensifies.

<img src='\public\uploads\2023\life-creatures.png' alt='life-creatures' title='life-creatures' style="float: right; max-width: 400px; margin: 10px; border: 1px solid black; padding: 5px">Instead, when an attack happens, create random [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) creatures in the grid where the attack originated from.

- Still lifes: Block, Bee-hive, Loaf, Boat, Tub
- Oscillators: Blinker, Toad, Beacon, Pulsar
- Spaceships: Glider

If a glider goes off the edge of the grid make it loop to the other side. So it doesn’t disappear from the map.

Add ghosts to the dead cells, where they slowly fade away when they die instead of disappearing entirely.

~~Only tick the clock/iteration when a new attack happens. The more attacks the faster the animation occurred. This should mean that the screen will always have some alive cells on the screen at any given time~~

Maybe each attack is colored depending on what industrial protocol that is used for the attack. BACnet=Blue, Modbus=Red, etc…

## Prior art

- [Map of The internet](https://xkcd.com/195/) (#195), and [Network](https://xkcd.com/350/) (#350) by [XKCD](https://xkcd.com/).
- [Inkplate e-ink screen shows Conway's Game of Life, seeded from tarpits](https://brettiverse.com/notice/APuMbqYB5HfTW8mtMG)

## Market

Anyone in security, anyone who works in critical infrastructure.
