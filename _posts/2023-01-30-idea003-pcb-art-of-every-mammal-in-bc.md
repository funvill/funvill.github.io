---
layout: single
title: Idea 3 - PCB Art of Every Mammal in BC
date: '2023-01-30 00:03'
categories: ideas
tags: electronics pdb aniamls projects ideas
excerpt: A series of PCB art badges, one for each mammal in BC. Each badge has a small sensor and some LEDs that relate to the mammal. Make a limited edition series of each mammal and show off the series at an art show.
---

> This post is part of [the 100 project ideas](https://blog.abluestar.com/projects/2023-100-ideas/) project. [#The100DayProject](https://www.the100dayproject.org/). I am looking for feedback. <a href='#utterances-comments'>Comment</a> below or DM me via social media <a href="https://instagram.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-instagram" aria-hidden="true"></i><span class="label">Instagram</span></a>, <a href="https://twitter.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-twitter" aria-hidden="true"></i><span class="label">Twitter</span></a>.

## One Line Pitch

A series of PCB art badges, one for each mammal in BC. Each badge has a small sensor and some LEDs that relate to the mammal. Make a limited edition series of each mammal and show off the series at an art show.

## Description

Create a small PCB badge of every mammal in British Columbia. Doing this many iterations on PCBs should give me better practice with PCB Art design and allow me to learn a lot of the intricacies with PCB Art.

Everyone has their favorite animal, making one badge for each mammal ensures that everyone wants at least one of these badges.

There are ~130 mammals in BC. Many of the mammals in the same families look very similar, such as the plethora of rodents. I suspect that I can reduce this number to the major family instead of every rodent in the group. It would be worthwhile to find a way to reduce this list if possible. Just the most recognizable animals would be 15.

To help reduce the amount of design effort that would be required. I would use a mixture of SVGs from “the noun project” and outlines of photos to make the PCB outlines. Looking for “Badges” “patches”, “enabled pins”, “Stickers” would also be a source of inspiration.

In most cases it would be just the head. With LEDs for the eyes or teeth. One sided board, for simplicity of board design. SAO connector as well as a battery clip for the back. If required the programming pins should be in the same format for every badge. Because the SAO uses 3.3v this limits the kind of electronics that I can use. Reverse leds that use the fiberglass of the badge as a diffuser. Think eyes 👀

If it needs brains then use a small cheap processor like the [attiny85](https://jlcpcb.com/partdetail/MicrochipTech-ATTINY1616MNR/C507118) ($0.83 each)

[List of every mammal](https://northamericannature.com/which-mammals-live-in-british-columbia/)


### Most recognizable

<table width='100%'><tr><td width='33%'><ul>
<li>American Badger</li>
<li>American Bison</li>
<li>American Black Bear</li>
<li>Big Brown Bat</li>
<li>Bighorn Sheep</li>
<li>Black Rat</li>
<li>Blue Whale</li>
<li>Bobcat</li>
<li>California Sea Lion</li>
<li>Cougar</li>
</ul></td><td width='33%'><ul>
<li>Coyote</li>
<li>Douglas Squirrel</li>
<li>European Rabbit</li>
<li>Fallow Deer</li>
<li>Gray Whale</li>
<li>Groundhog</li>
<li>Humpback Whale</li>
<li>Killer Whale</li>
<li>Least Chipmunk</li>
<li>Moose</li>
</ul></td><td width='33%'><ul>
<li>Mountain Goat</li>
<li>North American Beaver</li>
<li>North American</li>
<li>Porcupine</li>
<li>Northern Elephant Seal</li>
<li>Raccoon</li>
<li>Red Fox</li>
<li>River Otter</li>
<li>Striped Dolphin</li>
<li>Striped Skunk</li>
<li>Wolverine</li>
</ul></td></tr></table>

### Everything else

<table width='100%'><tr><td width='33%'><ul>
<li>American Marten</li>
<li>American Mink</li>
<li>American Pika</li>
<li>American Pygmy Shrew</li>
<li>American Red Squirrel</li>
<li>American Water Shrew</li>
<li>Arctic Ground Squirrel</li>
<li>Arctic Shrew</li>
<li>Baird's Beaked Whale</li>
<li>Boreal Woodland Caribou</li>
<li>Brown Bear</li>
<li>Brown Lemming</li>
<li>Brown Rat</li>
<li>Bushy-tailed Woodrat</li>
<li>California Myotis</li>
<li>Canadian Lynx</li>
<li>Cascade Golden-mantled ground Squirrel</li>
<li>Collared pika</li>
<li>Columbian Ground Squirrel</li>
<li>Creeping vole</li>
<li>Cuvier's Beaked Whale</li>
<li>Dall's Porpoise</li>
<li>Dall's Sheep</li>
<li>Deer Mouse</li>
<li>Desert Red Bat</li>
<li>Dwarf Sperm Whale</li>
<li>Eastern Gray Squirrel</li>
<li>Eastern Heather Vole</li>
<li>False Killer Whale</li>
<li>Fin Whale</li>
<li>Fisher</li>
<li>Fox Squirrel</li>
<li>Fringed Myotis</li>
<li>Golden-mantled Ground Squirrel</li>
<li>Great Basin Pocket Mouse</li>
</ul></td><td width='33%'><ul>
<li>Harbor Porpoise</li>
<li>Harbor Seal</li>
<li>Hoary Bat</li>
<li>Hoary Marmot</li>
<li>House Mouse</li>
<li>Humboldt's Flying Squirrel</li>
<li>Keen's Myotis</li>
<li>Least Weasel</li>
<li>Little Brown Bat</li>
<li>Long-eared Myotis</li>
<li>Long-legged Myotis</li>
<li>Long-tailed Weasel</li>
<li>Masked Shrew</li>
<li>Meadow Jumping Mouse</li>
<li>Meadow Vole</li>
<li>Merriam's Shrew</li>
<li>Montane Shrew</li>
<li>Montane Vole</li>
<li>Mountain Beaver</li>
<li>Mountain Cottontail</li>
<li>Mule Deer</li>
<li>Muskrat</li>
<li>Northern Bog Lemming</li>
<li>Northern Flying Squirrel</li>
<li>Northern Fur Seal</li>
<li>Northern Long-eared Myotis</li>
<li>Northern Pocket Gopher</li>
<li>Northern red-backed vole</li>
<li>Northern Right-whale Dolphin</li>
<li>Northwestern Deer Mouse</li>
<li>Pacific Jumping Mouse</li>
<li>Pacific White-sided dolphin</li>
<li>Pallid Bat</li>
<li>Preble's Shrew</li>
<li>Pygmy Sperm Whale</li>
</ul></td><td width='33%'><ul>
<li>Red-tailed Chipmunk</li>
<li>Risso's Dolphin</li>
<li>Roosevelt Elk</li>
<li>Sea Otter</li>
<li>Sei Whale</li>
<li>Short-beaked Common Dolphin</li>
<li>Short-finned Pilot Whale</li>
<li>Silver-haired Bat</li>
<li>Snowshoe Hare</li>
<li>Southern Red-backed Vole</li>
<li>Sperm Whale</li>
<li>Spotted Bat</li>
<li>Stejneger's Beaked Whale</li>
<li>Steller Sea Lion</li>
<li>Townsend's Big-eared Bat</li>
<li>Townsend's Chipmunk</li>
<li>Townsend's Mole</li>
<li>Townsend's Vole</li>
<li>Trowbridge's Shrew</li>
<li>Tundra Vole</li>
<li>Vagrant Shrew</li>
<li>Vancouver Island Marmot</li>
<li>Water Vole</li>
<li>Western Harvest Mouse</li>
<li>Western Heather Vole</li>
<li>Western Small-footed Bat</li>
<li>Western Spotted Skunk</li>
<li>White-tailed Deer</li>
<li>White-tailed jackrabbit</li>
<li>Woodland Jumping Mouse</li>
<li>Yellow-bellied Marmot</li>
<li>Yellow-pine Chipmunk</li>
</ul></td></tr></table>

## Prior art

Primary inspiration came from this youtuber [Michael Alm](https://www.almfab.com ) where he water painted ~141 pictures of mammals over a 2 year period. The video is about him [making 141 frames](https://www.youtube.com/watch?v=012r8PZKsEE ) for the art show but near the end he talks about this project.  

<img src="/public/uploads/2023/michael-alm.png" alt="michael-alm"/>

Other inspiration came from existing PCB BadgeLife badges.

[#Badgelife Trash Panda - SAO Badge](https://www.tindie.com/products/brandon-satrom/badgelife-trash-panda-sao-badge/)

<img src="/public/uploads/2023/TrashPanda.png" alt="TrashPanda"/>

[Kawaii PandaCorn](https://www.tindie.com/products/maepa/kawaii-pandacorn/)

<img src="/public/uploads/2023/KawaiiPandaCorn.png" alt="Kawaii Panda Corn"/>

[HelloPenguin](https://www.tindie.com/products/nwmaker/hellopenguin/)

<img src="/public/uploads/2023/HelloPenguin.png" alt="Hello Penguin"/>

[SnowyOwl2](https://www.tindie.com/products/nwmaker/snowyowl2/)

<img src="/public/uploads/2023/SnowyOwl2.png" alt="Snowy Owl 2"/>

## Market

Art lovers, Electrons enthoists, anyone who loves animals.

## Feedback

> Rather than the attiny, I would choose one of the chinese chips like [WCH(Jiangsu Qin Heng) CH32V203C8T6](https://www.lcsc.com/product-detail/Microcontroller-Units-MCUs-MPUs-SOCs_WCH-Jiangsu-Qin-Heng-CH32V203C8T6_C3001172.html) ($0.55) lots more capability. 64KB Flash, RISC-V 20KB RAM, 144MHz, 16 TouchKeys, 8 UART, Analog, and digitial pins.
