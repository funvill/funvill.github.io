---
title: "Idea 061 - The Dark Side Of The Moon in a million parts"
date: 2023-03-29 01:01:00
categories:
- Ideas
- YearOfIdeas
tags:
- generative
- Projects
- Ideas
excerpt: Generative line drawings in sand based on the album The Dark Side Of The Moon by Pink Floyd
slug: idea061-the-dark-side-of-the-moon-in-a-million-parts

---

> This post is part of [the 100 project ideas](/projects/2023-100-ideas/) project. [#The100DayProject](https://www.the100dayproject.org/). I am looking for feedback. <a href='#utterances-comments'>Comment</a> below or DM me via social media <a href="https://instagram.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-instagram" aria-hidden="true"></i><span class="label">Instagram</span></a>, <a href="https://twitter.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-twitter" aria-hidden="true"></i><span class="label">Twitter</span></a>.

## One Line Pitch

Generative line drawings in sand based on the album The Dark Side Of The Moon by Pink Floyd

## Description

This idea is based on [Idea 58 - In a million parts](/idea058-a-quotable-book-in-a-million-parts/). Of splitting a written work into many parts and making transformative art from each part.

For each song on the Dark Side Of The Moon (1973) by Pink Floyd, create a generative line drawing that can be drawn in the sand using the CNC Zen Garden. Recording the creation of this line drawing and upload the video with the music playing in the background to Youtube.

First step is to convert the audio track into something that can be used as an input for the generative application. This tutorial would be a good place to start [How to visualize music (using Python)](https://medium.com/nerd-for-tech/how-to-visualize-music-using-python-5db9440ab23e).

Then using something like paper.js create procedurally generated line drawings for each song in the album. These line drawings should fit in with the working area of the XCarve.

Then convert the line drawings into GCode that the XCarve can understand. Use the XCarve to drag around a magnet. The magnet is attached to a ball-bearing. The Ball-Bearing sits in a frame filled with sand. As the XCarve moves the Magnet that the Ball-bearing is attached to it draws in the sand.

Similar techniques to my [CNC Zen Garden](/projects/2016-CNCZenGarden/) project. But with procedurally generated line drawings based on the sounds from the album.

<img src="/public/uploads/2023/sand1.png" alt="sand1" style="float: right; margin: 10px; border: 1px solid black; padding: 5px"/><img src="/public/uploads/2023/sand2.png" alt="sand1" style="float: right; margin: 10px; border: 1px solid black; padding: 5px"/><img src="/public/uploads/2023/sand3.png" alt="sand1" style="float: right; margin: 10px; border: 1px solid black; padding: 5px"/><img src="/public/uploads/2023/sand4.png" alt="sand1" style="float: right; margin: 10px; border: 1px solid black; padding: 5px"/>

## Prior art

- [CNC Zen Garden](/projects/2016-CNCZenGarden/)
- [Sisyphus Kinetic Art Table](https://sisyphus-industries.com/)
- [Amazing CNC Sand Art Machine Draws Using Magnets](https://www.hackster.io/news/this-amazing-cnc-sand-art-machine-draws-using-magnets-25d3632325a6)

## Market

People who are looking for an interesting visualization of their favorite album.
