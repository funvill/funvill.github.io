---
title       : (2025) Counterproductive
excerpt     : A big button in a park
post_date   : 2025-03-30 00:00:00
header      :
  teaser    : /public/uploads/2025/counterproductive-header.png
toc         : false
tags:
- Projects
- Art
---

# Counter Productive

> A social experiment exploring how communities rally around a simple daily interaction to keep an artwork alive.

## Overview

<a href='/public/uploads/2025/counter-productive.png'><img style="float: right; margin: 10px; max-width: 400px; border: 1px solid black; padding: 5px" src="/public/uploads/2025/counter-productive.png" alt="Counter productive button"></a>
Counter Productive is an interactive public art installation. A large red button and an LED countdown matrix display in a public park. The installation “lives” when visitors press the button to reset a 24‑hour timer; if the countdown ever reaches zero, the artwork is removed.

The project explores the interactions and motivations of visitors passing through the park.

Why do people press the button? Is it out of raw curiosity -- wondering what happens when it’s pressed. Or do people feel a sense of care, returning daily to steward its survival.

How long will this project last? Will it be vandalized in the middle of the night? Will a rainy Vancouver day keep people away from the park and the button dies from neglect. Will the city/strata remove the button as matter out of place ([MOOP](https://burningman.org/event/preparation/leaving-no-trace/moop/))

Inspired by two projects. [Useless_machine](https://en.m.wikipedia.org/wiki/Useless_machine), and Reddit’s [The Button](https://en.m.wikipedia.org/wiki/The_Button_(Reddit)). The ***useless machine*** has a switch on it that when turned on an arm reaches out and turns it off. The only purpose of the useless machine is to turn itself off. Reddit’s ***The Button*** an online meta-game and social experiment that featured an online button and 60-second countdown timer that would reset each time the button was pressed but you are only able to push the button once.

The project was installed on **March 31, 2025**, and as of May 9th, 2025 it has been running for 40 days, with 600 button presses. See the [CounterProductive Log Report](https://blog.abluestar.com/other/counterproductive.html) for the current project status.

## Statistics

Each time the button is pressed a log is created and a report is updated. This report contains many statistics about the behavior and frequency of visitors that press the button.

What time of day is the button pressed most often? (3pm) Do people press it once or many times in a row? (many times) How many times has the button been pressed so far? (May 9th there have been 600 presses so far) What day of the week is more popular? (Friday), When were the longest gaps between button presses? Is this project still alive? etc...

The full list of stats can be found here [CounterProductive Log Report](https://blog.abluestar.com/other/counterproductive.html)

[![Counter productive stats](/public/uploads/2025/day-visualizer_example.png)](https://blog.abluestar.com/other/counterproductive.html)

## Technical details

<a href='/public/uploads/2025/counter-productive-zoomed-out.png'><img style="float: right; margin: 10px; max-width: 400px; border: 1px solid black; padding: 5px" src="/public/uploads/2025/counter-productive-zoomed-out.png" alt="Counter productive button"></a>

Built in a single evening (~3 h) with spare parts, the setup uses a Seeed Studio [XIAO ESP32-C6](https://wiki.seeedstudio.com/xiao_esp32c6_getting_started/) for Wi‑Fi connectivity and MQTT. When the button is pressed a MQTT message is sent to a server and relayed to a [custom NodeJS](https://github.com/funvill/counterproductive/tree/main/loggingApp) logging application. Then a report is generated based on this log and sends it to [Github GIST](https://gist.github.com/funvill/95b658729c105829aec9ea0e33cfafdb/).

The logging app uses [NodeJS - Single executable applications](https://nodejs.org/api/single-executable-applications.html) (SEA) to build the NodeJS scripts into a portable Windows application.

The report is stored on [Github Gist](https://gist.github.com/) as an online object storage. Allowing this project to run without having to set up a public web server.

A transparent box was used to allow people to look inside it and see what components were used. The worry was that if people saw a countdown timer with a [big red button](https://en.wikipedia.org/wiki/2007_Boston_Mooninite_panic) that they might think it was a bomb 💣. It turns out that a circuit board with exposed wires, also makes people think it might be a bomb.

A 8x32 RED led matrix is used for the countdown timer and primary display. The display is hard to read in the direct sunlight but glows red at night. This might be a reason that the button is more often pressed in the night than during the day.

The transparent box has a sheet of paper inside that provides instructions.

### Instructions

- Press the button to reset the 24-hour countdown timer.
- If the timer ever reaches zero, the project ends and will be removed.
- To keep the project alive — press the button

All the project source files can be found on the project's Github page. [github.com/funvill/counterproductive](https://github.com/funvill/counterproductive)

## Prior art

- [Useless_machine](https://en.m.wikipedia.org/wiki/Useless_machine) - Is a device whose only function is to turn itself off.
- [The_Button_(Reddit)](https://en.m.wikipedia.org/wiki/The_Button_(Reddit)) - Was an online meta-game and social experiment that featured an online button and 60-second countdown timer that would reset each time the button was pressed.
- [2007 Boston Mooninite panic](https://en.wikipedia.org/wiki/2007_Boston_Mooninite_panic)
