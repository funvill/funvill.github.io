---
title: "Idea 022 - Translink map PCB"
date: 2023-02-18 00:22:00
categories:
- Ideas
- YearOfIdeas
tags:
- trains
- vancouver
- pcb
- leds
- Projects
- Ideas
excerpt: A live interactive translink metro map of Vancouver using LEDs on a PCB
slug: idea022-translink-map-pcb

---

> This post is part of [the 100 project ideas](/projects/2023-100-ideas/) project. [#The100DayProject](https://www.the100dayproject.org/). I am looking for feedback. <a href='#utterances-comments'>Comment</a> below or DM me via social media <a href="https://instagram.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-instagram" aria-hidden="true"></i><span class="label">Instagram</span></a>, <a href="https://twitter.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-twitter" aria-hidden="true"></i><span class="label">Twitter</span></a>.


👉 **Done!** project can be found here [Vancouver Skytrain PCB](https://github.com/funvill/vancouver-skytrain-pcb). [PCB Metro maps retrospective](/pcb-metro-maps-retrospective/)

## One Line Pitch

A live interactive translink metro map of Vancouver using LEDs on a PCB

## Description

<img src="/public/uploads/2023/translink-map.png" alt="translink-map" style="float: right; margin: 10px; max-width: 400px; border: 1px solid black; padding: 5px"/>Create a map of vancouver that shows the Translink skytrain stations with PCB and LEDs.  

- The tracks between each station will have a series of LEDs that can be illuminated to show where the skytrains are located on the map.
- The stations will be illustrated and labeled using a silk screen
- Use a ESP32 to connect to the [Translink API](https://www.translink.ca/about-us/doing-business-with-translink/app-developer-resources/rtti) and request information about where the Skytrain cars are located on the map. Update the map in real time with the location of each train.
- The copper pour on the board can indicate the shape of the land mass. No copper pour for water, and copper pour for land.
- The outline of the parks can be shown with skill screen hashing.
- I would not include any translink logos to prevent IP issues.
- For the tracks where both the Expo line, and the Millennium line share the same tracks, there would be two sets of LEDs next to each other. Two parallel lines.
- Use mapbox and open data from [Vancouver's Open Data Portal](https://opendata.vancouver.ca/pages/home/) to create the maps elements like parks, water boards, train tracks, train stations, etc...

<img src="/public/uploads/2023/metrom-circuit.png" alt="metrom-circuit" style="float: center; margin: 10px; border: 1px solid black; padding: 5px"/>


## Prior art

If this existed for vancouver I could buy it, but it doesn't so I gotta make it.

- [Train Trackr](https://www.traintrackr.io/product/tfl1) - Very close to what I am looking to make. It has the LEDs on the tracks to show where the train cards are located as well as the stations. It uses a ESP8266 to be able to track the trains but the PCB is utility only. IT doesn’t show any additional information like the stations. 
- [MetroM PCB Transit Maps Let You Show Off Your Love of Trains](https://www.hackster.io/news/metrom-pcb-transit-maps-let-you-show-off-your-love-of-trains-with-attiny85-controlled-led-lights-aff2c0f31dc0) - This shows more information on the map and uses the copper pour to show the land vs water. But does not have LEDS for the tracks and does not have live updates. [PCB Metro Maps Are A Gorgeous Labor Of Love](https://hackaday.com/2021/09/19/pcb-metro-maps-are-a-gorgeous-labor-of-love/), with [build logs](https://chaijiaxun.com/pcb-metro-map-build-log/), [store](https://metrom.app/)
- [Metro system as a radio](https://yurisuzuki.com/archive/works/tube-map-radio/)
- [RainTrakr](https://www.instagram.com/p/CB1-GHHFKpm/) - The RainTrakr is a PCB that tracks rainfall throughout the UK and Ireland, showing live radar data (updated in five-minute intervals) using 338 white LEDs.

## Market

People who live in vancouver, Train nerds, city infrastructure nerds.
