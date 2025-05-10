---
title       : (2025) Skypixels
excerpt     : Snapshot of the sky
post_date   : 2025-05-09 00:00:00
header      :
  teaser    : /public/uploads/2025/skypixels-header.png
toc         : false
tags:
- Projects
- Art
---

> Snapshot of the sky

## Overview

Every 5 mins an image is taken from publicly accessible web cams around the world. The image is then processes to determine the average color of the sky and plotted over time.

The images show the weather patterns from around the world. Was it a sunny day? How many blue-sky days do they get in a year. It’s a history of the sky, a timeline.

This project was started in May 2025 and is in progress.

A sneak peak of the data collected so far can be found on the project’s [Github Repo](https://github.com/funvill/skypixel/). [Preview](https://htmlpreview.github.io/?https://github.com/funvill/skypixel/blob/main/index.html)

### Whistler Olympic Plaza

***VogelSpiral***

<img style='max-width: 100%; height: auto; padding: 2px; border: 1px sold black;' alt='Whistler Olympic Plaza - VogelSpiral' src='https://raw.githubusercontent.com/funvill/skypixel/main/images/IEhDUXECe_k/VogelSpiral.svg'>

***Evenly spaced spiral***

<img style='max-width: 100%; height: auto; padding: 2px; border: 1px sold black;' alt='Whistler Olympic Plaza - EvenSpiral' src='https://raw.githubusercontent.com/funvill/skypixel/main/images/IEhDUXECe_k/evenSpiral.svg'>

## Technical details

The process is split up into several different phases. This allows optimizations at each phase of the process, independently.

### Capture

A schedule task run a NodeJS application every 5 mins. The application loops though a list of configured webcam and YouTube streams downloading a frame from the camera. These images tend to be quite large with a 4k resolution and a file size of 10mb-15mb.

The raw images need to be processed and removed regularly to prevent the hard drive from being filled up.

### Extract

Each frame is then processed to extract the sky from the images. Each webcam has a unique settings file that defines the area in the image that is the sky and what to extract.

These files tend to be much smaller than the raw images. 10-20kb. I keep these files as I may want to analyze them in a different way in the future.

### Analyze

The smaller extract sky images are then processed to find the average color in the sky. This average color is then logged to a file for future processing.

This part of the process has been updated several times. The algorithm that determines the sky color, now corrects for different color modes in the camera that took the image.

The output of this step is a text file.

### Visualize

Using the output from the analyze step, this NodeJS application creates several SVG layouts. SVG (Scalable Vector Graphic) was chosen as it can be scaled to higher resolution when the images need to be printed.

Currently there are two layouts; Evenly spaced spiral, and Vogel spiral.

## Ploting and Pating

Once enough data is collected (1 Month, 6 months, 1 year), the layouts are printed to canvas using a plotter.

A talented artist, then attempts to color mix and match acrylic paint to paint over each pixels. Creating a pointillism photo of the time-lapse of the sky.

## Inspiration

This project was initially inspired by [Lee UFan]( https://en.wikipedia.org/wiki/Lee_Ufan)‘s artwork [From Point](https://www.christies.com/lot/lot-lee-ufan-from-point-5803245) (1979) that I saw in Japan 2025. I liked the visual look of the patterns created by stamping with ink over 12 steps before reapplying the ink. Creating a fading block pattern.

At the start of 2025 I went to a [Kostuik Gallery]( https://www.kostuikgallery.com/) in Vancouver, BC and saw [AJ Oishi](https://www.ajoishi.com/) work [Endurance](https://www.ajoishi.com/artwork-featured-endurance). A great example of abstract [Pointillism](https://en.wikipedia.org/wiki/Pointillism). I loved the scale of her work as well as the precision of the circles.

[Dan Marker-Moore]( https://danorst.tumblr.com/tagged/timeslice)’s [Time-Slice photography]( https://amateurphotographer.com/technique/how-to-create-a-time-slice-photograph/) has always interested me. Photos of skylines with the change of the sky over time.

Many of my previous projects included documentation using time-lapse photography. I have always enjoyed showing the visualization of time.

