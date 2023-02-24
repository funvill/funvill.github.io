---
layout: single
title: Idea 28 - Finite Future Clock
date: '2023-02-22 00:28'
categories: ideas
tags: keyboards projects ideas
excerpt: Experience the passage of time in a new light with our death clock a stunning LED panel that visualizes the preciousness of life as it counts down Serves as a unique conversation starter and an amazing visualization of life itself
---

> This post is part of [the 100 project ideas](https://blog.abluestar.com/projects/2023-100-ideas/) project. [#The100DayProject](https://www.the100dayproject.org/). I am looking for feedback. <a href='#utterances-comments'>Comment</a> below or DM me via social media <a href="https://instagram.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-instagram" aria-hidden="true"></i><span class="label">Instagram</span></a>, <a href="https://twitter.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-twitter" aria-hidden="true"></i><span class="label">Twitter</span></a>.

## One Line Pitch

Experience the passage of time in a new light with our death clock - a stunning LED panel that visualizes the preciousness of life as it counts down. Serves as a unique conversation starter and an amazing visualization of life itself

## Description

<img src="/public/uploads/2023/finite-future-clock.png" alt="finite-future-clock" style="float: right; margin: 10px; border: 1px solid black; padding: 5px"/>A large panel of LEDs that shows a progress bar of how much of your life has passed and an estimate on how much time is left. Hopefully to motivate people to make the best of our every day.

### Look and feel

This device should be A2 paper size (420mm x 594mm). It has a grid of LEDs across its surface.

On the top row is “the clock”

It has 24 LEDS representing the current hour. Then there is a space followed by 7 LEDS that present the current day of the week starting on Monday. The remaining space on the top row is used for status and user interface. Mins can be represented by the color of the hour LED.

The next 80 rows are “the life”

Each row has 52 LEDS per row. Each LED represents a week. Each row represents a year. 80 rows represent the average lifespan of a North American.

The colors of the LEDs are configurable but by default a consumed week is a dull red, a future week is a twinkling blue, and the current week color shifts between blue and red.  

The top row LEDs are labeled using PCB silkscreen. Above each hour is the hour number in 24 hours, with leading zero. Above the day of the week is the three letter representation of the week day.

Above the life grid is the percentage of the year that has passed each week. 3 leds, 3 weeks, would display 5.8% above the LED. 32 LEDs is 62%, etc…

The PCB will be mounted on a wooden back board, using spacers to lift it off the backboard. This should give it the look of depth. The corners should be rounded. White PCB with Black silkscreen

The LEDs will not have a diffuser. The LEDs themselves will be 2mm large (tiny)

### Configuration

On initial start up the device creates a WiFi access point that you can connect your phone to via wifi. Then a captive portal redirects you to a configuration and settings page.

The configuration page walks you through a wizard asking you questions that allow it to configure the system. Some health questions are asked to help guess how long your expected age will be.

#### Health questions

- Birthday
- Gender
- Country
- Smoker
- Alcohol oz per week
- Exercise on a schedule
- BMI (optional)
- Systolic blood pressure (optional)
- Sleeping pattern (optional)

#### Non health settings

- Wifi connection settings (For network time protocol NTP)
- Time Zone - For automatic clock updates.
- Auto change mode - If checked the panel will slowly cycle through different modes automatically.

### Modes

The mode automatically changes after some time. You can manually change the mode by pressing a button on the device. The device will be powered by a wall power and will have a cable. The device will be configured from a web interface that can be loaded on startup.

Death clock
This is the primary mode. Show a progress bar for how much life is remaining.

Pretty visuals
A bunch of different patterns that use the LED array to make pretty visuals that hopefully start a conversation. Start tunnel, random glowing, constellations, etc...

Soothing, colorful lighting patterns that change based on the time of day

### Unsorted notes

Need a better name then death clock. It's too generic and there are many collisions with the name
[Dethklok](https://en.wikipedia.org/wiki/Dethklok)... Mortality clock, DeadLine, Fatality clock, Mortal Meter, Life Limit, Finite Future, Hourglass Horizon, Vitality Vital, The Inevitable, Lasting Life, Your Ticker, Life Line

Before I create the PCB I can create a mock up as a web page. Using squares as LEDs. This allows me to test the system before I actually get it manufactured.

The potential benefit is that people will realize how precious life is and hopefully work to live it to the fullest possible.

Personalized milestones: Users could set personalized milestones (e.g. career goals, personal achievements, major life events) that the LED panel could display as they are reached. Have the ability to highlight certain dates that have special meanings. Maybe this could be configured in the web page or by pressing a button on the device to highlight a specific day.

Music visualization: The LED panel could have a small mems microphone that detects music, and display visualizations that react to the music.

Clock counts up if you make it past the expected death time. Borrowed time.

## Prior art

- [@Year_Progress](https://twitter.com/year_progress) - Tweets a progress bar with the % of the year that has happened so far.
- [The Big Job by Joe McKay Studio](https://joemckaystudio.com/progress.php) -  Scrolling paper sculpture that shows the year's progress. 
- [Watch Life Tick Away, One Led Segment At A Time](https://hackaday.com/2020/12/21/watch-life-tick-away-one-led-segment-at-a-time/), [Shortlife](https://driesdepoorter.be/shortlife/)
- [Watch Your Life Tick Away With This Lifetime Countdown Clock](https://hackaday.com/2020/02/06/watch-your-life-tick-away-with-this-lifetime-countdown-clock/), [Life Clocc](https://chaijiaxun.com/how-did-i-build-my-life-clock/)
- [Cute Countdown Timer Reminds You Of Impending Doom](https://hackaday.com/2015/08/05/cute-countdown-timer-reminds-you-of-impending-doom/)

## Market

Morbid people, people who like clocks, 40 year old people going through midlife crisis and contemplating their own mortality, people who like conversation starters
