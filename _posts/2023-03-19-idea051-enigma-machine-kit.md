---
layout: single
title: Idea 051 - Enigma machine kit
date: 2023-03-19 00:51:00
categories: ideas YearOfIdeas
tags: pcb crypto projects ideas
excerpt: Recreate the German Enigma machine cipher device as a kit using PCBs
---

> This post is part of [the 100 project ideas](/projects/2023-100-ideas/) project. [#The100DayProject](https://www.the100dayproject.org/). I am looking for feedback. <a href='#utterances-comments'>Comment</a> below or DM me via social media <a href="https://instagram.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-instagram" aria-hidden="true"></i><span class="label">Instagram</span></a>, <a href="https://twitter.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-twitter" aria-hidden="true"></i><span class="label">Twitter</span></a>.

## One Line Pitch

Recreate the German Enigma machine cipher device as a kit using PCBs

## Description

<img src="/public/uploads/2023/enigma-museum.png" alt="enigma-machine" style="float: right; margin: 10px; border: 1px solid black; padding: 5px"/>The [Enigma machine](https://en.wikipedia.org/wiki/Enigma_machine) is a part of computer history. Germany created and used the Enigma machine during World War 2 as a cipher device to create secret messaging for the war effort.

> The Enigma has an electromechanical rotor mechanism that scrambles the 26 letters of the alphabet. In typical use, one person enters text on the Enigma's keyboard and another person writes down which of the 26 lights above the keyboard illuminated at each key press. If plain text is entered, the illuminated letters are the ciphertext. Entering ciphertext transforms it back into readable plaintext. The rotor mechanism changes the electrical connections between the keys and the lights with each keypress.

There is a great movie called [The Imitation Game (2014)](https://www.imdb.com/title/tt2084970/) about [Alan Turing](https://en.wikipedia.org/wiki/Alan_Turing) creating a device ([British bombe](https://en.wikipedia.org/wiki/Cryptanalysis_of_the_Enigma#British_bombe)) that was able to decipher the messages encoded by the Enigma machine.

This video has a good description of [how the Enigma machine works](https://www.youtube.com/watch?v=ybkkiGtJmkM). The [Enigma Museum](https://enigmamuseum.com/) has a ton of good information on how it works on a fundamental level. [158,962,555,217,826,360,000 (Enigma Machine) - Numberphile](https://www.youtube.com/watch?v=G2_Q9FoD-oQ) is also great because it goes through the math behind this machine.

I propose creating a kit using several PCBs to illustrate how the Enigma machine works.

The Enigma machine is electro-mechanical using rotors. No processors required. A switch that activates a path for the electricity to illuminate a lamp or LED.

The Enigma machine can be broken down into several different parts.

#### Keyboard mechanism

A series of 26 switches that correspond to each letter of the alphabet. This could be created with SMT pushbuttons. In a similar fashion to this project [40% club](https://www.40percent.club/2020/09/smt-assembly.html)

The output of these keys are 27 pin header. 1 pin for +5v, and 26 pins for alphabet. 

#### Plugboard

26 standard headphone jacks. Using GND and +v for the two wires.

#### Roters

This is the hardest section to reproduce with PCB boards.

Each router is just test points on a disk shaped PCB. The traces on the routers are set up in the same way that the original Enigma machine was set up. Several different disks.

Between each router, and the reflector and the input box are a disk with [pogo pins](https://en.wikipedia.org/wiki/Pogo_pin) with springs in them to allow for the electricity to go through each test point, router disk, reflector, and input box. There are SMT based prgo pins.

Rotating the routers is done manually.

There are 5x rotors, Each router has 26 points on it.

#### Output LEDS

26 LEDs, one LED for each letter of the alphabet.

## Prior art

[Open Enigma](https://www.stgeotronics.com/Enigma-Replica_c3.htm) does a very good job on this project and is open source and open hardware.  They are using a microcontroller to do the mancail rotations of the routers instead of real disks.  [KickStarter](https://www.kickstarter.com/projects/438986934/the-open-enigma-project), and  [Instructions](https://www.instructables.com/Make-your-own-Enigma-Replica/) and good article on the subject [Enigma Mark 4](https://spectrum.ieee.org/build-your-own-enigma-cipher-machine). Better than I could make it.

Another project is [Enigma-E](https://www.cryptomuseum.com/kits/enigma/) with less flash or feature then the Open Enigma project

## Market

Cryptography nerds, code breakers, world war 2 enthusiasts.
