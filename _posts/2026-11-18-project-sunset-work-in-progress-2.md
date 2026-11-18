---
title: "Project Sunset - one Pi, two cameras, and the first good sunsets"
date: 2026-11-18 12:00:00
slug: project-sunset-work-in-progress-2
categories:
  - Projects
tags:
  - raspberry-pi
  - photo
  - video
  - code
  - vancouver
excerpt: "Week three of a five-year sunset time-lapse pilot: daily videos, a sky score, no more RAW files, and both cameras on one Pi."
header:
  teaser: /uploads/2026/project-sunset-nov16-sunset.jpg
---
[Project page](/projects/2026-project-sunset/) - [GitHub repo](https://github.com/funvill/project-sunshine) - [Experiments (issue #3)](https://github.com/funvill/project-sunshine/issues/3) - [Previous update](/project-sunset-work-in-progress/)

A week ago I had two cameras on a shelf, one of which couldn't see the solstice sunset. Now both cameras are on one Pi, the wide one is aimed for the whole year, and the first daily videos exist. I also had two good sunsets in a row.

<iframe width="315" height="560" src="https://www.youtube.com/embed/pc0aXwd3J1c" title="Project Sunset, November 16, 2026" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

November 16, from 7:30 am to dark, on the wide camera. One frame every five minutes during the day, one a minute for the hour around sunset.

![The sun going down on November 16, ten minutes before sunset, with a band of cloud lit from below](/uploads/2026/project-sunset-nov16-sunset.jpg)

## A daily video

Every day now has a short vertical video, built from that day's frames with [ffmpeg](https://ffmpeg.org/). It starts at 7:30 am and runs to dark. Daytime frames are five minutes apart, and the sunset hour has a frame every minute, so the video slows down for the part that matters. Each frame is stamped with the local time, and the bottom line says where it is and which way it looks.

The sunset itself uses two exposures merged together: the normal one, and one two stops darker that keeps the sky from blowing out. Last week that was an experiment. Since November 16 it's part of the real capture: for 45 minutes either side of sunset, every frame is followed by the pair. The merge happens later on the PC or NAS, so the original frames stay untouched.

## A score for the sky

Most November sunsets in Vancouver are grey. I don't want to post a grey video every day, so I needed a way to tell a good sunset from a dull one without looking at each one, and without AI.

The sky score is plain image maths. For the hour around sunset it measures how much of the upper part of the frame is bright and warm (more red than blue), and takes the best few frames. Grey evenings score 5 to 13. The good ones so far:

- **November 8:** 69, the first clear one
- **November 12:** 67, broken cloud
- **November 16:** 71, the best of the pilot, and the first above the posting threshold of 60
- **November 17:** 41, a completely clear sky

![An hour of the November 17 sunset, from 4:52 pm to 6:04 pm, twelve minutes apart](/uploads/2026/project-sunset-nov17-hour.jpg)

November 17 surprised me. It was a beautiful clear evening, and it only scored 41. A clear sky has a thin warm band along the horizon and blue above it. The sunsets that score high need cloud for the colour to land on. That might be the right answer for Instagram, or the score might need a second measure for clear skies. I'll know after a few more.

The score is now written on each video, small, at the bottom right.

## Flicker

The first videos flickered in the fifteen minutes before sunset. I wanted to know whether that was the camera's auto exposure hunting or something real. Both cameras flickered on the same minutes, each with its own lens and its own auto exposure, while the average brightness of the sky barely moved. It's thin cloud crossing the glow. So it's real, and the fix is in the video: each sunset minute is blended lightly with the minutes either side. It still needs work.

## No more RAW files

The RAW (DNG) files were 92% of the data. I compared 19 RAW and JPEG pairs from both cameras. The RAW held 0.3 to 0.6 stops more in the highlights and nothing extra in the shadows. The darker exposure in the sunset pair keeps about twice as much of the sky as the RAW file would. So the RAW files are off, and I deleted the 6,325 already on the NAS, about 157 GB. Both cameras now use about 3.3 GB a day.

## The move: one Pi, two cameras

On the evening of November 16 I moved everything.

- **The Pi 3 is retired** from the window. It was the one with the undervoltage, the freeze and the heat.
- **The wide camera (3.2 mm)** is now upright, and turned so the whole year's sunset swing fits in the frame. The equinox sunset is near the middle.
- **The 6 mm camera** moved to the second camera port on the same Compute Module 4, and points at downtown. I tried the 16 mm lens first, but it wouldn't focus at infinity. I'm probably missing the spacer between the C-mount lens and the CS-mount camera.

The MyPi board has two camera ports, so one Pi now runs both. They take turns: the second camera shoots 30 seconds after the first.

The next evening the sun set inside the wide camera's frame, just left of downtown. That's the first sunset with the new aim, about a month before the solstice.

![The sun just above the horizon on November 17, left of the downtown skyline](/uploads/2026/project-sunset-nov17-sun-in-frame.jpg)

## Things that broke

- **Wi-Fi.** The Compute Module has no Wi-Fi of its own, so it runs on an old 2.4 GHz USB dongle at about 2.4 Mbit/s. On November 13 the dongle dropped off for almost two hours and didn't come back until I unplugged it. No frames were lost, because frames stay on the Pi until the NAS has them, and Home Assistant told me. Now a network watchdog resets the dongle after 10 minutes offline and reboots after 30. It also drops out for about 2 minutes roughly once an hour, and rejoins by itself.
- **The sunset is too much for the Wi-Fi.** Three frames a minute from two cameras is more than the dongle can send. On the first evening with the exposure pair, the copy to the NAS fell more than an hour behind. Nothing was lost, but Home Assistant sees the frames late. The copy now works in smaller batches. A network cable is the real fix.
- **A freeze.** The Compute Module froze once while I was changing a timer over SSH. The hardware watchdog rebooted it by itself.
- **What looked like a power cut** on November 15 rebooted both Pis. Each camera lost one frame while waiting for its clock to sync.

## A UPS

I have a Mini-Box OpenUPS2 for the Compute Module. It takes 11 to 24 V, which suits the MyPi board. I flashed it with the Li-ion firmware and wrote a small reader that logs its state without wearing out the storage. Then I measured the three 18650 cells I had for it: about 1.1 V each, completely dead. New cells are on the list.

## A health check

I check the cameras a lot, so there's now a script that does it in about ten seconds. It reports any missing frames for each camera, the Pi's temperature, throttling, disk, the copy to the NAS and the network, and pulls a small copy of the newest picture from each camera so I can look for bumps, focus or fog on the glass.

![Dusk on November 17, 25 minutes after sunset, with the city lights coming on](/uploads/2026/project-sunset-nov17-dusk.jpg)

## Next

- A network cable to the Pi
- The foam hood and the 3D-printed mount
- New cells for the UPS
- A scale for the downtown camera's sky score, and a few more sunsets to settle the posting threshold
- Settings freeze on December 14, a week before the real start on December 21

Everything is in the [changelog](https://github.com/funvill/project-sunshine/blob/main/changelog.md) and in [issue #3](https://github.com/funvill/project-sunshine/issues/3).
