---
layout: project
title: (2019) Illuminated Stained Glass Sixteen Segment Display
excerpt: Illuminated Stained Glass Sixteen Segment Display
---

<img src="/public/uploads/foam-16-segments.png" alt="foam-16-segments"/>

I have always been fascinated by segmented displays. Maybe it that I came from a time that most display on microwaves, stoves, clocks were all segmented display. It reminds me of a simpler time. 

There are several different types of segmented displays. Each with a different amount of segments 7, 9, 14, 16 or a different organization of the segments. 

<img src="/public/uploads/1024px-Common_segment_displays.svg.png" alt="segment_displays"/>

The advantage of a 16 segment display is that you can display a full set of alphanumeric, lower and upper case of numbers and letters.

<img src="/public/uploads/16-Segment-ASCII-All.jpg" alt="16-Segment-ASCII"/>
 
My first version I made, I used paper divers to separate the different segments. But I could never get the paper to be in perfect lines. 

<img src="/public/uploads/paper_16-Segment.png" alt="paper_16-Segment"/>

The results were not great. It also took a lot of time to make the paper folded segments. The cost of the white and black sandwiched acrylic was prohibited. It would have been a daunting task to make more than a few of these. I ended up shelving this idea for a few months.   

After I built the [illuminated Stained Glass Tetragonal Trapezohedron](https://blog.abluestar.com/projects/2019-illuminated-stained-glass-tetragonal-trapezohedron/) using the new foam method. I decided to try and use this new method to make a series of sixteen segmented displays. 

A foam center was cut using a [Inventables X-Carve](https://www.inventables.com/technologies/x-carve). The foam separates the light from bleeding from one pocket/cell to another. An acrylic top plate was added as a diffuser.

<img src="/public/uploads/foam-16-segments.png" alt="foam-16-segments"/>

Cheaper, and easier to make. I was able to make an 8 digit display, with scrolling text. I wrote some firmware to print tweets, show the time, and make colorful patterns. 

All source code files, firmware, etc can be found here on my github repo [segmented-display](https://github.com/funvill/segmented-display)

I designed the panels using Fusion-360. I used a [ESP8266](http://esp8266.net/) ( [Wemos D1 mini](https://docs.wemos.cc/en/latest/d1/index.html) ) to control the LEDS. The parts to make this project cost ~$300 CAD. (LEDs, controller, foam, acrylic, glue)
