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
  teaser: /uploads/2026/project-sunset-nov16-sunset.jpg
toc: false
---
> Five years of sunsets from one window

## Overview

![The sun going down on November 16, ten minutes before sunset, with a band of cloud lit from below](/uploads/2026/project-sunset-nov16-sunset.jpg)

My apartment window in Burnaby faces due west, toward downtown Vancouver. The sun sets somewhere in that view every evening, but where it sets moves a long way over the year. In December it goes down left of the city. In June it sets far off to the right, behind the mountains.

Project Sunset is a camera at that window for five years. It takes a photo every five minutes, day and night, and keeps every one. The sunset is the subject. The real run starts on the winter solstice, **December 21, 2026**. The pilot is running now.

At the end I want to show the sun walking back and forth along the horizon, solstice to solstice, five times.

This page always has the current state of the project. The progress reports are blog posts, listed under Updates near the end. Everything is open source on GitHub at [funvill/project-sunshine](https://github.com/funvill/project-sunshine).

<iframe width="315" height="560" src="https://www.youtube.com/embed/pc0aXwd3J1c" title="Project Sunset, November 16, 2026" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

One day from the pilot, November 16, 2026: 7:30 am to dark, with a frame a minute for the hour around sunset. Its sky score was 71, the best so far.

## Status

As of **November 18, 2026**:

- **Capturing:** both cameras, on one Pi, every five minutes, plus a frame a minute around sunset. The wide camera is aimed for the whole year as of November 17, and the next evening the sun set inside its frame.
- **Daily video:** built from real frames on my PC. The NAS job that will make it every day isn't scheduled yet.
- **Instagram:** nothing posts yet. The sky score works, but the posting threshold isn't settled.
- **Weak spot:** the Pi is on an old Wi-Fi dongle. It drops for a couple of minutes about once an hour, and at sunset the copy to the NAS falls behind. No frames have been lost, because frames stay on the Pi until the NAS has them. A network cable is coming.
- **Before the real run:** the foam hood and the 3D-printed mount, the network cable, and new cells for the UPS. Settings freeze on **December 14**, a week before the start.

The open questions and experiments are in [issue #3](https://github.com/funvill/project-sunshine/issues/3), and every change and event is in the [changelog](https://github.com/funvill/project-sunshine/blob/main/changelog.md).

## Why five years

I've done long time-lapses before, and they always stopped too early. Something broke, a card filled up, I moved the camera. This time I plan to stay at this address for at least five years, so the window is the fixed point. Five years is long enough to see the same sunset at the same spot five times and compare them, and long enough to catch the odd weather: smoke from wildfire summers, snow, the rare clear week in November.

## What it sees

![An hour of the November 17 sunset, from 4:52 pm to 6:04 pm, twelve minutes apart](/uploads/2026/project-sunset-nov17-hour.jpg)

Downtown is about 10 to 12 km away and the mountains behind it are more than 50 km away, so most days there's a layer of haze between the camera and the skyline. Most November days in Vancouver are grey. The camera doesn't care; it keeps them anyway. Picking the good ones comes later.

![Dusk on November 17, 25 minutes after sunset, with the city lights coming on](/uploads/2026/project-sunset-nov17-dusk.jpg)

![The wide camera at night on November 12, before it was turned to its final aim](/uploads/2026/project-sunset-wide-camera-night.jpg)

The nearby towers are blurred in every photo I post. The neighbours didn't sign up for a five-year time-lapse.

## The swing problem

The sun sets at about 234° (true north) on the December solstice and about 309° on the June one. That's a 75° swing, and the camera has to see all of it from one spot without moving.

![A chart of where the sun sets over the first year of the run against what each camera can see. The wide camera covers the whole swing; the downtown camera misses early November to early February](/uploads/2026/project-sunset-sun-swing-current.png)

The pilot started with a 6 mm lens, about 58° wide. It couldn't see the sunset from late November to mid-January, or for about three months around June ([issue #4](https://github.com/funvill/project-sunshine/issues/4)). The fix is a 3.2 mm lens, now the main camera. Since November 17 it's aimed at about 272°, so the equinox sunset is near the middle of the frame. My estimate is that it sees about 225° to 320°, which leaves about 8° spare past the December sunset and 11° past the June one. The lens has barrel distortion, so the real view is probably a little wider. On November 17 the sun set at about 238°, in the left third of the frame.

![The sun just above the horizon on November 17, left of the downtown skyline, on the 3.2 mm camera](/uploads/2026/project-sunset-nov17-sun-in-frame.jpg)

The 6 mm camera now points at downtown instead. It isn't meant to see every sunset.

The bearings come from the [NOAA solar equations](https://gml.noaa.gov/grad/solcalc/calcdetails.html) and a fit of the frame to skyline landmarks. Checking the edges against the real sun is part of the pilot.

## How it works

1. **Capture.** A [Raspberry Pi](https://www.raspberrypi.com/) takes a photo every five minutes with [rpicam-still](https://www.raspberrypi.com/documentation/computers/camera_software.html). Each frame is a JPEG and a JSON file of how it was taken, where the sun was, and the Pi's temperature and disk space. When it's dark, it takes a second, longer exposure as well. RAW (DNG) files were saved too until November 16, when a test showed they added almost nothing.
2. **Dense frames.** From an hour before sunset until well after dark, it adds a frame every minute. That gives the sunset itself five times as many frames.
3. **The sunset pair.** For 45 minutes either side of sunset, every frame is followed by two more: one at the normal exposure and one two stops darker. Until ten minutes after sunset both use fixed daylight colour, so the glow isn't pulled toward blue. They are merged later, so the sky doesn't blow out.
4. **Copy to the NAS.** Frames are written to the Pi first and copied to my NAS with rsync. The Pi reads the NAS copy back and only deletes its own once they match. A previous year-long Pi project of mine lost frames when the NAS share didn't come back after a power cut, so the Pi never writes to the NAS directly.
5. **Alert.** [Home Assistant](https://www.home-assistant.io/) checks the age of the newest frame on the NAS. If nothing new has arrived in an hour, my phone gets a notification. It reads the NAS, not the Pi, so it also catches a dead Pi, a dead camera, or a stuck copy.
6. **Daily video.** A Docker job for the NAS turns a day's frames into a short vertical video using [ffmpeg](https://ffmpeg.org/), from 7:30 am to dark. It merges the sunset pair, blends each sunset minute lightly with the ones either side to calm the flicker from passing cloud, and writes the local time and the day's sky score on the video.
7. **Recovery.** If the Pi freezes, the hardware watchdog reboots it and the timers start again by themselves. It came back on the network in 44 seconds in a test with a deliberate kernel panic. A network watchdog resets the Wi-Fi dongle after 10 minutes offline, and reboots the Pi after 30.

Filenames are in UTC, so a change of clocks never makes a gap or a duplicate. Both cameras together use about 3.3 GB a day. The NAS has the room.

## The sky score

Most sunsets here are grey, and I don't want to post a grey video every day. The sky score picks the good ones with plain image maths, no AI. For the hour around sunset it measures how much of the upper part of the frame is bright and warm (more red than blue), and takes the best few frames.

| Evening | Score | Sky |
| --- | --- | --- |
| Grey evenings | 5 to 13 | Overcast |
| November 8 | 69 | Clear, first good one |
| November 12 | 67 | Broken cloud |
| November 16 | 71 | Cloud lit from below, best so far |
| November 17 | 41 | Completely clear |

The plan is to post days above 60. A clear sky has only a thin warm band along the horizon, which is why November 17 scored 41, so the threshold may still change. The downtown camera needs its own scale before its scores mean anything.

## Equipment

Both cameras run on one Pi, `sunshine`. Both use the same Sony IMX477 sensor as the Raspberry Pi HQ Camera, so they share settings. They take turns: the second camera shoots 30 seconds after the first.

**The Pi**

- [Raspberry Pi Compute Module 4](https://www.raspberrypi.com/products/compute-module-4/), 8 GB RAM, 32 GB eMMC
- [Embedded Micro Technology MyPi Industrial IoT Integrator Board](https://www.embeddedpi.com/raspberry-pi-compute-module-4-iot-carrier-board), which has two camera ports, a battery-backed real-time clock, a hardware watchdog and a 9-28 V input
- A 2.4 GHz Buffalo USB Wi-Fi dongle from a drawer, because this CM4 has no Wi-Fi of its own
- Every LED on the board is turned off, because they reflected in the window

**Wide camera, `cm4wide` (3.2 mm): the main five-year series**

- [Arducam IMX477 HQ camera](https://www.amazon.ca/dp/B0F2S6X9F8) (B0240E)
- [Arducam 3.2 mm CS lens](https://www.amazon.ca/dp/B08GLYR572), sold as 120°. My estimate from the frames is at least 95° wide
- Aimed at about 272°

**Downtown camera, `cm4city` (6 mm)**

- [Arducam](https://www.arducam.com/) UC-517 camera board (IMX477, 12.3 MP) with a switchable IR-cut filter
- [Raspberry Pi 6 mm wide-angle CS lens](https://www.adafruit.com/product/4563), about 58° wide
- Aimed at about 281°, at downtown

**Shared**

- A NAS with plenty of space, where all frames end up
- [Home Assistant](https://www.home-assistant.io/) for the alerts
- [Open-Meteo](https://open-meteo.com/) for an hourly weather and air-quality forecast that gets logged next to the frames

**Planned for the real run**

- A 3D-printed mount in PETG or ASA (PLA softens in the sun), stuck to the glass with 3M VHB tape, keyed so a replacement camera goes back to the same framing
- A black foam hood sealed against the glass to stop reflections of the room
- A network cable to the Pi
- A Mini-Box OpenUPS2, which takes 11 to 24 V and suits the MyPi board. It's flashed with the Li-ion firmware, but the 18650 cells I had for it were dead, so it needs new ones
- A temperature and humidity sensor at the glass for condensation, a lux sensor, and maybe a small dew heater
- A 16 mm lens for a tighter shot of downtown, once I find the spacer it needs to focus at infinity

**Retired**

- The pilot's first Pi, a [Raspberry Pi 3 Model B+](https://www.raspberrypi.com/products/raspberry-pi-3-model-b-plus/) (`timelaps`), ran the 6 mm camera from November 2 to 16. It had undervoltage, a freeze and ran hot, and the CM4 board can run both cameras.

## The software

- Bash and a little Python, so it still runs on a Pi Zero if it has to
- [rpicam-apps](https://github.com/raspberrypi/rpicam-apps) for the camera
- systemd timers instead of cron, with the hardware watchdog on
- A sun-position module using the NOAA equations, standard library only, no network
- A diagnostics page with a live view and focus peaking, which I used to focus both lenses. Capture pauses while it's open
- The daily video job, the sunset merge and the sky score, all plain scripts that give the same result every run
- A health check that reports missing frames, temperature, throttling, disk, the NAS copy and the network in about ten seconds
- A reader for the UPS that logs its state without wearing out the storage (built, not installed yet)
- Offline tests with a fake camera and a fake NAS, so nothing needs a Pi to test

Repo: [github.com/funvill/project-sunshine](https://github.com/funvill/project-sunshine)

## What I want to make from it

- **The sun along the horizon.** The frame nearest each sunset, every day for five years.
- **A long time-lapse** of the whole run, deflickered and stabilised.
- **Time slices.** One image built from strips taken at different times, in straight, curved and radial versions.
- **A sky calendar.** One row per day, one column per time of day, five years tall.
- **A daily sunset video** for Instagram, only on days the sky score says are worth it ([issue #2](https://github.com/funvill/project-sunshine/issues/2)).

## Updates

Progress reports, newest first:

- [November 18, 2026: one Pi, two cameras, and the first good sunsets](/project-sunset-work-in-progress-2/)
- [November 11, 2026: the first ten days](/project-sunset-work-in-progress/)

## Inspiration

- [Eirik Solheim](https://eirikso.com/)'s year-in-one-image photos
- [Dan Marker-Moore](https://danorst.tumblr.com/tagged/timeslice)'s time slices
- Richard Silver's time-slice photos of city skylines
- Fong Qi Wei's time-folding photos
- [pconwell/rpi-long-timelapse](https://github.com/pconwell/rpi-long-timelapse), for its lessons from a year-long Pi time-lapse
- My own [Skypixels](/projects/2025-skypixles/), which samples the sky colour from webcams every five minutes
