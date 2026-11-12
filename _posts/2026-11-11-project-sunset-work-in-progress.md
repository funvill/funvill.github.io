---
title: "Project Sunset - the pilot, work in progress"
date: 2026-11-11 21:00:00
slug: project-sunset-work-in-progress
categories:
  - Projects
tags:
  - raspberry-pi
  - photo
  - code
  - vancouver
excerpt: "Ten days into the pilot of a five-year sunset time-lapse: exposure tests, a camera that can't see June, power trouble, reflections and a second camera."
header:
  teaser: /uploads/2026/project-sunset-sun-on-skyline.jpg
---
[Project page](/projects/2026-project-sunset/) - [GitHub repo](https://github.com/funvill/project-sunshine) - [Experiments (issue #3)](https://github.com/funvill/project-sunshine/issues/3)

The real run starts on the winter solstice, December 21. Until then the pilot is about finding everything that will go wrong over five years while it's still cheap to change. It has been running since November 2, and a lot has gone wrong.

![The sun touching the downtown skyline on November 8, the first clear sunset of the pilot](/uploads/2026/project-sunset-sun-on-skyline.jpg)

## Where it is now

Two cameras are capturing a frame every five minutes, plus a frame a minute around sunrise and sunset. Frames reach the NAS within a few minutes. Home Assistant tells my phone if either camera goes quiet for an hour. Both Pis have a hardware watchdog, so a freeze turns into a reboot instead of a dead camera.

None of it is mounted yet. Both cameras sit on a shelf at the window, so every time I water the plants the framing moves a bit. Each change of camera, lens, focus or position gets a new setup ID in every frame's metadata, so later processing can tell the periods apart. We're on the fourth one already.

## The camera can't see June

The sun sets about 75° further right in June than in December. The first camera has a 6 mm lens, about 58° wide. On the first clear evening (November 8) I measured where the sun actually left the frame. That pushed the left edge to about 238°, which means the camera misses the sunset from about November 24 to January 16, the solstice included. That's a bad start for a project that starts on the solstice. On the right side it misses the sunset for about three months around June.

![A chart of where the sun sets over a year against what each camera can see](/uploads/2026/project-sunset-sun-swing.png)

No 6 mm framing covers both ends, so the answer is a wider lens on a second camera. More on that below. Details are in [issue #4](https://github.com/funvill/project-sunshine/issues/4).

## Exposure at sunset

A sunset is the hardest thing in the day to expose. The sky is far brighter than the city, and the auto exposure is set for the whole frame. On the clear evening, auto exposure blew out 7 to 12% of the sky in the minutes around sunset. Two stops darker (ev-2) kept all of it except the sun's disc and its glow. Two stops brighter added nothing.

Auto white balance was the other surprise. It pulls the orange glow toward blue, which is the opposite of what I want.

So the camera has been shooting extra test frames between the real ones: every minute through the sunset window, at the normal exposure, two stops darker, and both again with fixed daylight white balance. Then I merge pairs together with exposure fusion and compare.

![Four ways to expose a sunset, at 5 minutes before sunset and 10, 20 and 40 minutes after](/uploads/2026/project-sunset-exposure-options.jpg)

Columns, left to right: today's frame (auto everything), two stops darker, the two merged, and the two merged with daylight white balance. I picked the last one as my favourite. I'd rather have the sky held back than a bright city.

The catch: about 15 to 30 minutes after sunset, the clouds stop being lit by the sun and start being lit by the city. Daylight white balance turns that sky brown. So the setting has to hand back to auto (or to the fixed night colour) partway through dusk. Three runs so far, all overcast. I need a clear evening to decide. Three more runs are scheduled for November 12 to 14.

## Night

Night was easier. After a sweep of every shutter and gain combination, the night frame is a 4 second exposure at the lowest gain, with fixed colour gains that make the sky a neutral grey. Auto white balance drifted all night, and the first fixed gains I tried left the sky green.

![The view at 1 am, a 4 second exposure](/uploads/2026/project-sunset-night.jpg)

## Focus

The first camera was focused by eye and looked fine until I measured it. On November 8 I refocused using focus peaking on the camera's live diagnostics page. Night frames got about 3 times sharper on the distant city, and lit windows that were blobs now have edges.

![Downtown Vancouver at night before and after refocusing](/uploads/2026/project-sunset-focus.jpg)

## Power, freezes and a camera that stopped

- **Undervoltage.** The first Pi restart-looped until I changed the USB cable, and kept reporting low voltage with the new one. On November 5 it froze solid for four and a half hours during an experiment and lost 19 frames. The logs were in RAM, so I can't prove the cause, but undervoltage is the main suspect. After that freeze I turned on the hardware watchdog and started keeping kernel messages on the SD card.
- **The camera stopped.** The same day the camera stopped sending frames for 41 slots. Reloading the driver, rebooting and power cycling didn't help. Reseating the ribbon cable at both ends did. I still don't know why.
- **New power supply.** I swapped the power supply on November 8, and there has been no undervoltage warning since. I'm watching it for a few more days before calling it fixed.
- **Heat.** The Pi 3 sits close to its 60 °C soft limit and hit it on a sunny afternoon. Captures were fine, but summer sun through the window will be worse. It needs a heatsink.

## Reflections

The camera shoots through double glazing from inside a lit room, so anything bright behind it can show up in the glass. Today I checked both cameras by taking night frames with the Pis' LEDs on and off.

- On the second camera, the board's green and red LEDs showed up as pairs of out-of-focus spots in every frame, one from each pane of glass.
- On the first camera, the red power LED put a faint red wash in the sky.

Now every LED on both Pis is switched off at boot, and both are gone. A lamp in the room still shows as an orange glow on one side of the wide camera. The fix for that is the black foam hood that will seal the camera against the glass. It's about three weeks away.

## The second camera

![The second camera's 3.2 mm view at night, much wider than the first camera's. The orange glow at the bottom left is a lamp in the room reflected in the window](/uploads/2026/project-sunset-wide-camera-night.jpg)

To cover the whole swing I set up a second camera: a Compute Module 4 on a MyPi industrial carrier board, with an IMX477 and a 3.2 mm lens. It went to the window last night (November 11) and has been capturing since. Matching it against the first camera, I estimate it's at least 93° wide, enough for both solstices, though the June end is tight. I'll measure it on the sun.

Things that got in the way:

- This CM4 has no Wi-Fi, and there's no antenna socket on the module. I tried two dongles from a drawer. The first one was Bluetooth. The second is a 2.4 GHz Buffalo, which needed 2.4 GHz turned back on at the access point and moving the CM4 closer. It does about 2.4 Mbit/s to the NAS, which is enough.
- The 3.2 mm lens has no focus ring. It focuses with the camera's back-focus ring, which was so stiff I thought it would break.
- It sits upside down, so I added a rotation setting that flips the frames, the RAW files and the live view.

Tonight it's running a night settings sweep of its own, because its lens lets in about 1.5 stops less light than the 6 mm one. Over the next three evenings it shoots the same sunset tests as the first camera, side by side.

## Smaller things in flight

- **Weather.** The weather and air-quality forecast is logged every hour. After two weeks I'll check whether it predicts which settings work best. I expect what the camera measures to set the exposure in the end, with the forecast only deciding when to take extra frames.
- **The moon.** By my estimate the moon is in frame on about 41% of nights over five years. Runs from November 16 to 25 test how to expose it and how it ghosts in the double glazing.
- **RAW or not.** The RAW files are 92% of the data and add almost nothing to the image, except around bright lights at night. Whether to keep them is [issue #5](https://github.com/funvill/project-sunshine/issues/5).
- **Posting.** A daily video will go to Instagram, but only on days whose sunset scores above a threshold on a simple image measure, no AI. Only one clear sunset so far, so not enough to set it. [Issue #2](https://github.com/funvill/project-sunshine/issues/2).

## Next

Get a clear sunset. Measure the wide lens on the sun. Print the mount, fit the hood, buy a heatsink and a high-endurance SD card, and freeze the software before December 21.

All the measurements, with more photos, are in [issue #3](https://github.com/funvill/project-sunshine/issues/3). The [project page](/projects/2026-project-sunset/) has the equipment list and the overall plan.
