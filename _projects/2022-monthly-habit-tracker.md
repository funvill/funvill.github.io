---
title       : (2022) Monthly Habit Tracker
excerpt     : A monthly habit tracker inspired by Simone Giertz “The Every Day Calendar”
post_date   : 2022-08-20 00:00:00
header      :
  teaser    : /public/uploads/2022/habit_tracker_banner.png
toc         : true
---

The project is a single month habit tracker that is inspired by [Simone Giertz](https://www.simonegiertz.com/) “[The Every Day Calendar](https://www.kickstarter.com/projects/simonegiertz/the-every-day-calendar)”. It allows users to track multiple activities throughout the year by clicking on physical buttons corresponding to the activities that they have accomplished. The corresponding date on the calendar will illuminate with RGB LEDs to indicate the completion of the activity. The project features several different "modes" and has the ability to connect multiple boards together. It utilizes an ESP32 to connect to the internet and backup the data from the boards. The project is fabricated using JLPCB SMD placement services, which allows for fully automated manufacturing. Additionally, the months will progress automatically. More information can be found on the [Habit Tracker](https://github.com/funvill/habit-tracker) project page. See this [Instagram video describing this project in more details](https://www.instagram.com/p/CnlbuuUrmj2/)

## Features

- Months will progress automatically.
- Several different "modes". Binary clock, Unix Epoch binary clock, Screensaver mode
- Physical buttons with leads to be able to expand on the board out to a frame.
- Ability to connect the boards together
- Uses a ESP32 to connect to the internet and backup the data from the boards.
- Fabricated using JLPCB SMD placement services. Fully automated manufacturing.

<img src='\public\uploads\2023\habit-tracker-hardware-2022-dec-11.png' alt='habit-tracker-hardware' style="float: right; margin: 10px; max-width: 400px; border: 1px solid black; padding: 5px" >I was inspired to create this project after seeing [Simone Giertz](https://www.simonegiertz.com/) “[The Every Day Calendar](https://www.kickstarter.com/projects/simonegiertz/the-every-day-calendar)” KickStarter. The idea behind the project was to create a tool that would allow me to track multiple activities throughout the year and visualize my progress. I have often been intrigued by the [quantified self](https://quantifiedself.com/) movement. Tracking statistics about yourself to learn about your own blind spots and try and become better person. I been trying to buy one of her full size boards for the last few years but they were always sold out. So I decided that this would be a good opportunity to make one of my own and learn how to make PCBs using kiCad and JLPCB manufacturing.

The habit tracker is a physical device that consists of a calendar with RGB LEDs and physical buttons. On each day, I can click the buttons for the activities that I have accomplished and the corresponding date on the calendar will illuminate with different colors. The device also features several different "modes" such as a binary clock, a Unix Epoch binary clock, and a mode where the leds fade in and out randomly like a screensaver. The device also has the ability to connect multiple boards together to track multiple months or even years worth of data.

Designing and building this device was a great learning experience for me as I am primarily a software person. The biggest challenge I had while creating this this project that I have never designed a PCB before. The first time I selected LEDS from JLPCB parts library, I ended up selecting one that were out of stock. I needed to redesign the board once I found LEDs that were in stock but had a different foot print. The power connector on the board was too small for a normal 5v adapter, and some of the buttons pins were not available when the wifi was enabled. Hardware is new to me as I am primarily a software person.

This project uses a ESP32 as the main controller. This controller can connect to the internet and backup the data from the boards automaticly as well as time synchronization. It uses a captivel portal for configuration on start up.

Overall, I am very happy with the final result of this project. It is a functional and visually appealing device that serves its purpose well. This project was a great learning experience for me, from designing the PCB to fabricating it. It was a fun and challenging project that helped me to improve my skills and knowledge PCB design.

<img src='\public\uploads\2023\habit-tracker-pcb.png' alt='habit-tracker-pcb' >
<img src='\public\uploads\2023\habit-tracker-schematic.png' alt='habit-tracker-schematic' >
