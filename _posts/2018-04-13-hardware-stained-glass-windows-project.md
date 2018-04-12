---
published: true
layout: post
title: Designing panels - Stained glass windows project
date: '2018-04-13 00:01'
author: funvill
---


This post is part of a series on the [stained glass windows project](https://blog.abluestar.com/projects/2018-stained-glass-window). 

Below is the hardware and parts that I am using this project. 

### 6 mm semi-transparent white acrylic 

6 mm is the most common and cheapest thickness of acrylic that is available. This acrylic is 60% transparent creating a good difusion pattern to scatter the LED light. I also have a bunch of it that I salvaged from a dumpster behind a sign shop. 

### Square 12mm WS2812B RGB LEDS (NeoPixels) 

The [WS2812 RGB LEDs](https://cdn-shop.adafruit.com/datasheets/WS2812.pdf) are cheap on [Aliexpress](https://www.aliexpress.com/) as most people are moving to the better APA106 version. I picked up a few thousand of these square versions a few years ago in a massive group buy and I am still making my way through the stockpile. 

I selected the square version over the bullet version to keep the profile of the panels smaller. 
<img src="https://blog.abluestar.com/public/uploads/led_pixels_square-profile.jpg" alt="Square LEDS" />

### ESP8266 with Arduino firmware 

For most of my projects I have moved on to using the [Adafruit HUZZAH32 - ESP32 Feather Board](https://www.adafruit.com/product/3405) as the CPU speed is much better then ESP8266, but I have a stockpile of these older chips and the requirements of this project are well within the capability of the [ESP8266](https://www.espressif.com/en/products/hardware/esp8266ex/overview) .

I am using the [ESP826 arduino core library](https://github.com/esp8266/Arduino), and [FastLED](https://github.com/FastLED/FastLED).  

### 5 volt 5 amp AC to DC power supply 

Each LED at full brightness consumes 60 mA, normally running at 20 mA. Each panel has between 30-45 LEDs. With a total of 7 panels. I needed around 6 Amps power supply but Power supplies larger than 5 Amps is expensive. I programed the LEDs to be 20% darker than their max, to reduce the power requirement to be less than 5 Amp so I could use this cheaper power supply. 
