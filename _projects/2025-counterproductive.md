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

## Counter Productive

<a href='/public/uploads/2025/counter-productive.png'><img style="float: right; margin: 10px; max-width: 400px; border: 1px solid black; padding: 5px" src="/public/uploads/2025/counter-productive.png" alt="Counter productive button"></a>

This is an art project

- Press the button to reset the 24-hour countdown timer.
- If the timer ever reaches zero, the project ends and will be removed.
- To keep the project alive — press the button

This is a social experiment. To see how long this project survives and how people interact with the button. Will they keep pressing the button to keep it alive?

When the button is pressed a signal is sent to a server that records the time it was pressed. With these logs I can determine how frequently the button was pressed, how long between presses, what time of day the button is pressed most frequently, etc…

This art work was installed in a small park during spring of 2025.

[Current project status and stats](https://blog.abluestar.com/other/counterproductive.html)

![Counter productive stats](/public/uploads/2025/day-visualizer.png)

## Build details

<a href='/public/uploads/2025/counter-productive-zoomed-out.png'><img style="float: right; margin: 10px; max-width: 400px; border: 1px solid black; padding: 5px" src="/public/uploads/2025/counter-productive-zoomed-out.png" alt="Counter productive button"></a>
This project was built in 3 hours with spare parts I had in my workshop. I was looking for a quick project that I could do in a single night.

Uses a [XIAO ESP32-C6](https://wiki.seeedstudio.com/xiao_esp32c6_getting_started/) as a microcontroller for this project. It connects to the internet via wifi and sends MQTT payloads when ever someone presses the button. The MQTT payloads are captured by a [custom NodeJS app](https://github.com/funvill/counterproductive/tree/main/loggingApp) and logged with a timestamp to a file. Then generates a report based on this log and sends it to [Github GIST](https://gist.github.com/funvill/95b658729c105829aec9ea0e33cfafdb/). The stats page loads the report from the GIST and auto updates every 60 seconds.

I used [NodeJS - Single executable applications](https://nodejs.org/api/single-executable-applications.html) (SEA) to build the NodeJS scripts into a portable windows application.

This is the first project where I have used a [Github Gist](https://gist.github.com/) as a online object storage to store the reports. This allows me to not have to run a public web server.

I used a transparent box so people could look inside it and see what components were used. I was worried that people would see a count down timer with a big red button and think bomb. It turns out that exposed wires also makes people think it might be a bomb 💣.

All the project source files can be found on the projects github page. [github.com/funvill/counterproductive](https://github.com/funvill/counterproductive)

## Prior art

- [Useless_machine](https://en.m.wikipedia.org/wiki/Useless_machine) - Is a device whose only function is to turn itself off.
- [The_Button_(Reddit)](https://en.m.wikipedia.org/wiki/The_Button_(Reddit)) - Was an online meta-game and social experiment that featured an online button and 60-second countdown timer that would reset each time the button was pressed.
