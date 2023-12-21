---
title: "Idea 032 - Cistercian stained glass Swatch internet .beat clock"
date: 2023-02-28 00:32:00
categories:
- ideas
- YearOfIdeas
tags:
- clock
- stainedglass
- projects
- ideas
excerpt: A segmented display that combines a forgotten numbering system and a method for telling time that no one uses
slug: idea032-cistercian-stained-glass-swatch-internet-beatclock

---

> This post is part of [the 100 project ideas](/projects/2023-100-ideas/) project. [#The100DayProject](https://www.the100dayproject.org/). I am looking for feedback. <a href='#utterances-comments'>Comment</a> below or DM me via social media <a href="https://instagram.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-instagram" aria-hidden="true"></i><span class="label">Instagram</span></a>, <a href="https://twitter.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-twitter" aria-hidden="true"></i><span class="label">Twitter</span></a>.

## One Line Pitch

A segmented display that combines a forgotten numbering system and a method for telling time that no one uses.

## Description

The [Order of Cistercians](https://en.wikipedia.org/wiki/Cistercians) is a catholic religious order of monks and nuns known as White Monks. They had their own numbering system [Cistercian numerals](https://en.wikipedia.org/wiki/Cistercian_numerals), which could express numbers from 0 to 9999 in a single sign.

Digits are based on a horizontal or vertical stave, with the position of the digit on the stave indicating its place value (units, tens, hundreds or thousands). These digits are compounded on a single stave to indicate more complex numbers.

### Cistercian numerals key

<img src="/public/uploads/2023/cistercian_numbers.png" alt="cistercian_numbers" style="float: center; margin: 10px; border: 1px solid black; padding: 5px"/>

### Example of Cistercian numbers

<img src="/public/uploads/2023/cistercian_numbers_example.png" alt="cistercian_numbers_example" style="float: center; margin: 10px; border: 1px solid black; padding: 5px"/>

I would like to use the same technique that I used in my [Illuminated stained glass sixteen segment display](https://blog.abluestar.com/projects/2019-illuminated-stained-glass-sixteen-segment-display/) project from 2019 and make a single digit cistercian numerals segmented display.

It should only need 31 segments and I can use an ESP32 to connect it to the internet and get the current [Swatch Internet Time (.beat time)](https://en.wikipedia.org/wiki/Swatch_Internet_Time). Instead of hours and minutes, the mean solar day is divided into 1,000 parts called .beats. Each .beat is equal to one decimal minute in the French Revolutionary decimal time system and lasts 1 minute and 26.4 seconds (86.4 seconds) in standard time.

There is something special about combining a forgotten numbering system and a method for telling time that no one uses.

## Prior art

- [Oh Brother, Would You Look At This Cistercian Clock](https://hackaday.com/2021/03/29/oh-brother-would-you-look-at-this-cistercian-clock/)

## Market

Number dorks, clock dorks, people who hate timezones, people looking for a conversational piece.
