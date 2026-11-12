---
title: "(2026) Project Sunset"
date: 2026-11-02 00:00:00
slug: 2026-project-sunset
categories:
  - Projects
tags:
  - raspberry-pi
  - photo
  - video
  - code
  - vancouver
excerpt: "A five-year time-lapse of the sunset over Vancouver, one frame every five minutes from a window in Burnaby, starting on the 2026 winter solstice."
header:
  teaser: /uploads/2026/project-sunset-clear-sunset.jpg
toc: false
---
> Five years of sunsets from one window

## Overview

![The sun setting just left of the downtown Vancouver skyline, with the nearby towers blurred](/uploads/2026/project-sunset-clear-sunset.jpg)

My apartment window in Burnaby faces due west, toward downtown Vancouver. The sun sets somewhere in that view every evening, but where it sets moves a long way over the year. In December it goes down behind the city on the left. In June it sets far off to the right, behind the mountains.

Project Sunset is a camera at that window for five years. It takes a photo every five minutes, day and night, and saves every one. The sunset is the subject. The real run starts on the winter solstice, **December 21, 2026**, and the pilot is running now.

At the end I want to be able to show the sun walking back and forth along the horizon, solstice to solstice, five times.

Everything is open source on GitHub at [funvill/project-sunshine](https://github.com/funvill/project-sunshine). The progress reports are in the [work-in-progress post](/project-sunset-work-in-progress/).

## Why five years

I've done long time-lapses before, and they always stopped too early. Something broke, a card filled up, I moved the camera. This time I plan to stay at this address for at least five years, so the window is the fixed point. Five years is long enough to see the same sunset at the same spot five times and compare them, and long enough to catch the odd weather: smoke from wildfire summers, snow, the rare clear week in November.

## What it sees

![24 hours from the window, one frame an hour, from 5 pm on November 9 to 4 pm on November 10](/uploads/2026/project-sunset-one-day.jpg)

One frame an hour across a day in November. Most November days in Vancouver are grey. The camera doesn't care; it saves them anyway. Picking the good ones comes later.

Downtown is about 10 to 12 km away and the mountains behind it are more than 50 km away, so most days there's a layer of haze between the camera and the skyline.

![The sun touching the skyline, shot two stops darker so the sky keeps its colour](/uploads/2026/project-sunset-sun-on-skyline.jpg)

![Dusk ten minutes after sunset, with the city lights coming on](/uploads/2026/project-sunset-dusk.jpg)

![The view at 1 am, a 4 second exposure](/uploads/2026/project-sunset-night.jpg)

The nearby towers are blurred in every photo I post. The neighbours didn't sign up for a five-year time-lapse.

## The swing problem

The sun sets at about 234° (true north) on the December solstice and about 309° on the June one. That's a 75° swing, and the camera has to see all of it from one spot without moving.

![A chart of where the sun sets over a year against what each camera can see. The 6 mm camera misses both ends; the 3.2 mm camera covers nearly all of it](/uploads/2026/project-sunset-sun-swing.png)

The first camera has a 6 mm lens, about 58° wide. It can't see the sunset from late November to mid-January, or for about three months around June. That's in [issue #4](https://github.com/funvill/project-sunshine/issues/4). The fix is the second camera, with a 3.2 mm lens. It should see the whole swing, but the June end is tight on my estimate, so it gets measured on the sun before I trust it.

The bearings are calculated with the [NOAA solar equations](https://gml.noaa.gov/grad/solcalc/calcdetails.html), not measured yet. Checking them against the real sunsets is part of the pilot.

## How it works

1. **Capture.** A [Raspberry Pi](https://www.raspberrypi.com/) takes a photo every five minutes with [rpicam-still](https://www.raspberrypi.com/documentation/computers/camera_software.html). Each frame is saved three ways: a JPEG, the RAW (DNG), and a JSON file with how it was taken, where the sun was, and the Pi's temperature and disk space. When it's dark, it takes a second 4 second exposure as well.
2. **Dense frames.** From an hour before sunset until well after dark, and the same around sunrise, it adds a frame every minute. That gives the sunset itself five times as many frames.
3. **Copy to the NAS.** Frames are written to the Pi's SD card first and copied to my NAS with rsync. The Pi only deletes its copy once the NAS has it. A previous year-long Pi project of mine lost frames when the NAS share didn't come back after a power cut, so the Pi never writes to the NAS directly.
4. **Alert.** [Home Assistant](https://www.home-assistant.io/) checks the age of the newest frame on the NAS for each camera. If nothing new has arrived in an hour, my phone gets a notification. It reads the NAS, not the Pi, so it also catches a dead Pi, a dead camera, or a stuck copy.
5. **Daily video.** A Docker job for the NAS turns a day's frames into a short vertical video using [ffmpeg](https://ffmpeg.org/), with the local time stamped on each frame. It works on real frames but isn't scheduled on the NAS yet.
6. **Recovery.** If a Pi freezes, the hardware watchdog reboots it and the timers start again by themselves. It came back on the network in 44 seconds in a test with a deliberate kernel panic.

Filenames are in UTC, so daylight saving never makes a gap or a duplicate. Every frame is about 27 MB with its RAW file, which works out to somewhere between 8 and 15 GB a day per camera. The NAS has the room.

## Equipment

Two cameras are running in the pilot. Both use the same Sony IMX477 sensor as the Raspberry Pi HQ Camera, so they can share settings.

**Camera 1, `timelaps` (6 mm)**

- [Raspberry Pi 3 Model B+](https://www.raspberrypi.com/products/raspberry-pi-3-model-b-plus/), 1 GB, wired Ethernet
- [Arducam](https://www.arducam.com/) UC-517 camera board (IMX477, 12.3 MP) with a switchable IR-cut filter
- [Raspberry Pi 6 mm wide-angle CS lens](https://www.adafruit.com/product/4563), about 58° wide
- 32 GB SD card, Raspberry Pi OS Bookworm (32-bit), trimmed from 1,624 packages to 362

**Camera 2, `sunshine` (3.2 mm)**

![The second camera's view at night. The 3.2 mm lens takes in much more of the skyline than the 6 mm one](/uploads/2026/project-sunset-wide-camera-night.jpg)

- [Raspberry Pi Compute Module 4](https://www.raspberrypi.com/products/compute-module-4/), 8 GB RAM, 32 GB eMMC
- [Embedded Micro Technology MyPi Industrial IoT Integrator Board](https://www.embeddedpi.com/raspberry-pi-compute-module-4-iot-carrier-board), which has two camera ports, a battery-backed real-time clock, a hardware watchdog and a 9-28 V input
- [Arducam IMX477 HQ camera](https://www.amazon.ca/dp/B0F2S6X9F8) (B0240E)
- [Arducam 3.2 mm CS lens](https://www.amazon.ca/dp/B08GLYR572), sold as 120°. My estimate from the frames is at least 93° wide
- A 2.4 GHz Buffalo USB Wi-Fi dongle from a drawer, because this CM4 has no Wi-Fi of its own
- Sits upside down for now, so the software flips every frame

**Shared**

- A NAS with plenty of space, where all frames end up
- [Home Assistant](https://www.home-assistant.io/) for the alert
- [Open-Meteo](https://open-meteo.com/) for an hourly weather and air-quality forecast that gets logged next to the frames

**Planned for the real run**

- A 3D-printed mount in PETG or ASA (PLA softens in the sun), stuck to the glass with 3M VHB tape, keyed so a replacement camera goes back to the same framing
- A black foam hood sealed against the glass to stop reflections of the room
- A temperature and humidity sensor at the glass for condensation, a lux sensor, and maybe a small dew heater
- High-endurance SD cards, a small UPS, and a heatsink for the Pi 3
- A 16 mm lens on a second camera for a tight shot of downtown

## The software

- Bash and a little Python, so it still runs on a Pi Zero if it has to
- [rpicam-apps](https://github.com/raspberrypi/rpicam-apps) for the camera
- systemd timers instead of cron, with the hardware watchdog on
- A sun-position module using the NOAA equations, standard library only, no network
- A diagnostics page with a live view and focus peaking, which I used to focus both lenses
- Offline tests with a fake camera and a fake NAS, so nothing needs a Pi to test

Repo: [github.com/funvill/project-sunshine](https://github.com/funvill/project-sunshine)

## What I want to make from it

- **The sun along the horizon.** The frame nearest each sunset, every day for five years.
- **A long time-lapse** of the whole run, deflickered and stabilised.
- **Time slices.** One image built from strips taken at different times, in straight, curved and radial versions.
- **A sky calendar.** One row per day, one column per time of day, five years tall.
- **A daily sunset video** for Instagram, but only on days when the sunset is worth posting ([issue #2](https://github.com/funvill/project-sunshine/issues/2)). Most November sunsets aren't. A simple image score (no AI) will pick the good ones once there are enough clear evenings to set the threshold.

## Status

The pilot started on November 2, 2026, and both cameras are capturing. The open questions and experiments are in [issue #3](https://github.com/funvill/project-sunshine/issues/3), and the write-up is in the [work-in-progress post](/project-sunset-work-in-progress/).

## Inspiration

- [Eirik Solheim](https://eirikso.com/)'s year-in-one-image photos
- [Dan Marker-Moore](https://danorst.tumblr.com/tagged/timeslice)'s time slices
- Richard Silver's time-slice photos of city skylines
- Fong Qi Wei's time-folding photos
- [pconwell/rpi-long-timelapse](https://github.com/pconwell/rpi-long-timelapse), for its lessons from a year-long Pi time-lapse
- My own [Skypixels](/projects/2025-skypixles/), which samples the sky colour from webcams every five minutes
