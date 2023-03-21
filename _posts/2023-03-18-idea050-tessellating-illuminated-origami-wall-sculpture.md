---
layout: single
title: Idea 50 - Tessellating Illuminated Origami Wall Sculpture
date: '2023-03-18 00:50'
categories: ideas
tags: art origami tessellating led projects ideas
excerpt: Origami Sacred Geometry + Individually addressable RGB LEDs + Wall Sculpture + interactive
---

> This post is part of [the 100 project ideas](https://blog.abluestar.com/projects/2023-100-ideas/) project. [#The100DayProject](https://www.the100dayproject.org/). I am looking for feedback. <a href='#utterances-comments'>Comment</a> below or DM me via social media <a href="https://instagram.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-instagram" aria-hidden="true"></i><span class="label">Instagram</span></a>, <a href="https://twitter.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-twitter" aria-hidden="true"></i><span class="label">Twitter</span></a>.

## One Line Pitch

Origami Sacred Geometry + Individually addressable RGB LEDs + Wall Sculpture + interactive

## Description

<a href='https://www.flickr.com/photos/origamimosaicworks/8333076712/in/photostream/'><img src="/public/uploads/2023/kota-hiratsuka--red-mini-flower.png" alt="kota-hiratsuka--red-mini-flower" style="float: right; margin: 10px; border: 1px solid black; padding: 5px"/></a>Tiling [tessellating](https://en.wikipedia.org/wiki/Tessellation) star shaped modular Origami in a repeating pattern. Similar to [Kinga Kubowicz - Moduuli](https://www.instagram.com/p/Cbcz24_q4Er/?hl=en) [2](https://www.kingkongdesign.com/moduulipaperpanels) or [Origami Mosaics by Kota Hiratsuka](https://www.thisiscolossal.com/2012/12/origami-mosaics-by-kota-hiratsuka/)

Each cell will have its own Individually addressable RGB LEDs similar to my [Digital Stained Glass Windows](https://blog.abluestar.com/projects/2018-stained-glass-window/) project.

Though the sculpture scatters a few human detection sensors like [Passive infrared](https://en.wikipedia.org/wiki/Passive_infrared_sensor) (PIR) sensor or [Nondispersive Infrared](https://en.wikipedia.org/wiki/Nondispersive_infrared_sensor) (NDIR) Sensor. This allows me to determine if there is a person looking at the sculpture or where in the sculpture they are located. This information can be used in the LED animations.

<a href='https://www.re-thinkingthefuture.com/article/kinga-kubowicz-has-created-moduuli-a-collection-of-geometric-origami-wall-art/'><img src="/public/uploads/2023/kinga-kubowicz--moduuli.png" alt="kinga-kubowicz--moduuli." style="float: right; margin: 10px; border: 1px solid black; padding: 5px"/></a>Mount the whole sculpture onto a plywood board that can be hung on the wall with a [French cleat](https://en.wikipedia.org/wiki/French_cleat).

The tiling Origami shapes would be created with plastic [Vellum Paper](https://www.amazon.com/gp/product/B082D1FYTL). Semi transparent and a good diffuser for LED light as well as foldable for Origami shapes. It's also plastic so it should hold its shape well and could be cleaned with a damp cloth. It is more expensive then normal paper at $12 for 50x sheets but the advantages over normal paper should be worth it.

Use a [ESP32](https://www.espressif.com/en/products/socs/esp32) for the brains, then it can connect to the internet or home assistant to provide more information.

<img src="/public/uploads/2023/charlyn-serenity.png" alt="serenity" style="float: center; margin: 10px; border: 1px solid black; padding: 5px"/>

## Prior art

- [Serenity: An origami wall sculpture](https://charlyn.codes/origami-wall-art/) - Includes LEDs but not every title has its own LED, and it uses pyramids instead of stars.
- [Origami Sacred Geometry](http://cocosato.co.uk/portfolio/origami-sacred-geometry/) - Tiling, tessellating, module Origami in similar shapes.
- [Kinga kubowicz’s Moduuli](https://www.re-thinkingthefuture.com/article/kinga-kubowicz-has-created-moduuli-a-collection-of-geometric-origami-wall-art/) - The shape I am looking for. The paper already has the shape and uses staples to connect each section. A lot easier to manufacture than traditional Origami.
- [Video on how to make piramide](https://www.youtube.com/watch?v=0yioThqkxvg)

## Market

People who want interactive beautiful wall sculptures that display information as well as pretty colors.

## Implementation

- [Prototype 2](https://www.instagram.com/p/CqAPSS0Oa6i/)
- [Prototype 1](https://www.instagram.com/p/CqAKRklum_4/) - Fail
- Animation of [how to fold the segments](https://images.squarespace-cdn.com/content/v1/53566d65e4b0b45ae5d4fefd/1416584597050-0ZXT6DJWA4U82ADIUNCO/05_Folding-the-module_web.gif?format=1000w)
- [Printable files of the segments](https://github.com/funvill/tiling-lasercutter/tree/main/star)
