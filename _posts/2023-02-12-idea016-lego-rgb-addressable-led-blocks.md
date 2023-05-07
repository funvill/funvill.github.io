---
layout: single
title: Idea 016 - Lego RGB Addressable LED blocks
date: '2023-02-12 00:17'
categories: ideas YearOfIdeas
tags: lego leds art projects ideas
excerpt: Adding fully addressable RGB light to your lego creation, using lego as light pipes, 
---

> This post is part of [the 100 project ideas](/projects/2023-100-ideas/) project. [#The100DayProject](https://www.the100dayproject.org/). I am looking for feedback. <a href='#utterances-comments'>Comment</a> below or DM me via social media <a href="https://instagram.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-instagram" aria-hidden="true"></i><span class="label">Instagram</span></a>, <a href="https://twitter.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-twitter" aria-hidden="true"></i><span class="label">Twitter</span></a>.

## One Line Pitch

Adding fully addressable RGB light to your lego creation, using lego as light pipes

## Description

A standard 2x2 Lego block with a transparent top, sides are solid/opaque. A Ws2812 addressable LED embedded inside the block. Preferable one of the smaller variants.

Three wires will need to come out of the Lego block to power and control it. These can either use a connector on the bottom that wires can be connected to (mini JST?) or the leads can be built into the block so that connected blocks can pass power and data lines.

An Esp32 can be embedded into another block to control the LEDs. The Esp32 provides Bluetooth for a cellphone app or WiFi to connect online. [WLED](https://github.com/Aircoookie/WLED) could be installed on the controller first

I could see these led blocks being used in cinema banner lights or Broadway theater districts, street lights, car headlights, etc...

To make the prototype I would use a resin printer to make the first block and paint the sides black. A tiny PCB could be created but for the prototype I could hand solder the wires directly on to the SMD LED.

## Prior art

It looks like most of the prior art is of static leds or strait up strips without blocks built around them.

- [LEGO-power-functions-light-8870](https://www.lego.com/en-us/product/lego-power-functions-light-8870) - Lego has a piece for this purpose but it's not addressable
- [LEGO-Compatible-Street-Light-and-LED-Brick](https://www.instructables.com/LEGO-Compatible-Street-Light-and-LED-Brick/)
- [Light up your LEGO #1](https://ramblingbrick.com/2017/04/08/light1/)
- [Lightailing](https://www.lightailing.com/) and [Light My Bricks](https://www.lightmybricks.com/) - sells lighting kits for specific lego sets. not addressable.

## Market

Anyone who bought the lego mindstorm set. Anyone who wants to make art projects using lego.
