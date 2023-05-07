---
layout: single
title: Idea 079 - "Gorilla" water quality monitoring device
date: '2023-04-16 01:19'
categories: ideas
tags: pcb sensors science water projects ideas
excerpt: Citizen science water quality monitoring device
---

> This post is part of [the 100 project ideas](https://blog.abluestar.com/projects/2023-100-ideas/) project. [#The100DayProject](https://www.the100dayproject.org/). I am looking for feedback. <a href='#utterances-comments'>Comment</a> below or DM me via social media <a href="https://instagram.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-instagram" aria-hidden="true"></i><span class="label">Instagram</span></a>, <a href="https://twitter.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-twitter" aria-hidden="true"></i><span class="label">Twitter</span></a>.

## One Line Pitch

Citizen science water quality monitoring device

## Description

When an industry or mining operation accidentally contaminated a river or stream it can take months to years for the damage to be detected. The larger rivers are monitored but the smaller streams can go unnoticed for a long time.

I propose creating a ~gorilla~ [guerrilla](https://en.wikipedia.org/wiki/Guerrilla_warfare) water quality monitoring device ([citizen science](https://citizenscience.org/)) that is cheap enough to be put in EVERY STREAM in the province, to do the very basic monitoring and data logging. These devices would be purchased by individual members of society, then installed, and eventually recovered and replaced a few months/years later.

With a Bill of Materials costs of <$10-$20 there is a limited amount of sensors and features that can be put on this device. A radio (loWAN, GSM, 3G, etc..) or mesh networking is out of the question. Fancy solar panels or charging is out, it needs to be dead simple.

Because of the restrictions on the cost, the device won’t be able to definitely tell if there is a problem with the stream. Instead it provides many different data points that can indicate that something is not normal. If a non-normal state is detected, then people can use a higher quality, lab certified, water quality test to determine with certainty if there is an actual problem with the stream.

Cheap early detection as a precursor for an actual test. These devices are in no way a replacement for the existing procedures, systems, or tests.

The change in water conductivity is a good indicator of a change in the water. Not necessarily a bad change, just a chance. Temperature is another easy sensor and if the range of temperature changes a lot, suddenly it's a good indicator that something has happened. Water oxygen levels (how much air is in the water) is an expensive analog sensor but there are cheap versions of it that provide a binary value of the water oxygen levels lower than a certain value.

pH (acidity) levels would be a great indicator but it is a consumable sensor that only lasts a few weeks or months before being exhausted. Turbidity (suspended particles) would also be good too but it needs to be cleaned regularly.

The device should be waterproof with a battery, SD card, serial number and other information on a label on the bottom. The device should sleep between reading the sensors and last at least a year. It should be weighed and anchored at the bottom of the stream.

To extract data off of the device. There is a LED on the inside of the device. When the device is switched to data transmit mode the device will stream out the data via the LED, Blinking the LED on and Off for the bits in the data payload.. The LED on and off can be read by a cellphone camera / app and turned back into data that can be uploaded to a website. This way the device can remain sealed and waterproof.

The data can be analyzed by the installer or by uploading it to our website where we do the analytics on the data.

If there is a non-normal (maybe a problem) we provide the individual with a report, and instructions on how to submit the report to a responsible government entity. We provide them with the script that they can use to help navigate the bureaucracy to get it to the right person.

## Prior art

- [DIY science water quality sampling](https://www.cuahsi.org/workshops/diy-water-monitoring-data-portals-and-watershed-modeling)
- [Monitor My Watershed](https://monitormywatershed.org/)
- [Monitoring Water Quality Using Lots Of Sensors](https://hackaday.com/2022/04/02/monitoring-water-quality-using-lots-of-sensors-and-machine-learning/)
- [Why Citizen Science for Water Quality?](https://terra.nasa.gov/citizen-science/water-quality)
