---
title       : (2023) Skull Game PCB
excerpt     : Skull Card Game designed with PCBs
post_date   : 2023-12-31 00:00:00
header      :
  teaser    : /public/uploads/2024/banner-skull.png
toc         : false
---

<img style="float: right; margin: 10px; max-width: 400px; border: 1px solid black; padding: 5px" src="/public/uploads/2024/skull-stack.png" alt="Stack of skull game disks">The Skull Game PCB project was part of the [100 project ideas project #The100DayProject](https://blog.abluestar.com/projects/2023-100-ideas/) where I tried to come up with a new project every single day for 100 days. The Skull game PCB was idea [025 skull card game](https://blog.abluestar.com/idea025-skull-card-game/)

Skull is one of the best bluffing games. Easy to learn, Quick to play, and a great game for the pub. The rules for this game can be found here [Skull-Game-Rules](https://github.com/funvill/skull-game-pcb/blob/main/Skull%20Game%20Rules.pdf) and a good review of this game can be found on [Shut Up and Sit Down Youtube channel](https://www.youtube.com/watch?v=Cv1_6AfbwlQ)

The idea was to make a copy of [Skull card game](https://boardgamegeek.com/boardgame/92415/skull) using PCB manufacturing.

For each of the six unique sets there are four disks. One disk has a skull on the back of it, while the other three disks have flowers. They all share the same image on the back. That's it, that's all the components.

I manufactured the PCB disks using [JLCPCB](https://jlcpcb.com/) because I was familiar with them from other projects. They also supported “ART” PCBs that did not have valid electrical connections while many other PCB manufacturers don’t. JLCPCB also supports a bunch of different colors for the PCBs.

For the art I used an early version of [MidJourney](https://www.midjourney.com/home) to generate the images. Then I converted the images into vectors using [InkScape](https://inkscape.org/). Then I converted the vectors using [Svg2Shenzhen](https://github.com/badgeek/svg2shenzhen) into [KiCad](https://www.kicad.org/) files.

It was a pretty simple project but there were a few hiccups along the way that caused me to have to do a 2nd iteration. See Skull Game PCB Retrospective.

The original idea notes can be found here [025 skull card game](https://blog.abluestar.com/idea025-skull-card-game/). The project files can be found on my github repository [Skull Game PCB](https://github.com/funvill/skull-game-pcb). Rules can be found here [Skull-Game-Rules](https://github.com/funvill/skull-game-pcb/blob/main/Skull%20Game%20Rules.pdf)

## Designs

|        | Green | Purple | Red | Blue | White | Black |
|-------:|:-----:|:------:|:---:|:----:|:-----:|:-----:|
| Flower | <img src="/public/uploads/2024/flower_05.png" alt="Flower skull PCB"> | <img src="/public/uploads/2024/flower_06.png" alt="Flower skull PCB"> | <img src="/public/uploads/2024/flower_07.png" alt="Flower skull PCB"> | <img src="/public/uploads/2024/flower_08.png" alt="Flower skull PCB"> | <img src="/public/uploads/2024/flower_09.png" alt="Flower skull PCB"> | <img src="/public/uploads/2024/flower_10.png" alt="Flower skull PCB"> |
| Skull  | <img src="/public/uploads/2024/skull_05.png" alt="Skull skull PCB">   | <img src="/public/uploads/2024/skull_06.png" alt="Skull skull PCB">   | <img src="/public/uploads/2024/skull_07.png" alt="Skull skull PCB">   | <img src="/public/uploads/2024/skull_08.png" alt="Skull skull PCB">   | <img src="/public/uploads/2024/skull_09.png" alt="Skull skull PCB">   | <img src="/public/uploads/2024/skull_10.png" alt="Skull skull PCB">   |
| Back   | <img src="/public/uploads/2024/back_05.png" alt="Back skull PCB">     | <img src="/public/uploads/2024/back_06.png" alt="Back skull PCB">     | <img src="/public/uploads/2024/back_07.png" alt="Back skull PCB">     | <img src="/public/uploads/2024/back_08.png" alt="Back skull PCB">     | <img src="/public/uploads/2024/back_09.png" alt="Back skull PCB">     | <img src="/public/uploads/2024/back_10.png" alt="Back skull PCB">     |

## Photos

<img src="/public/uploads/2024/skull_photos_900.jpg" alt="Stack of skull game disks">

<img src="/public/uploads/2024/skull_photos_440.jpg" alt="Stack of skull game disks"><img src="/public/uploads/2024/skull2_photos_440.jpg" alt="Stack of skull game disks">
