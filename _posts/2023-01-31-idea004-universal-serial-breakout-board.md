---
title: Idea 004 - Universal Serial breakout board
date: 2023-01-31 00:04:00
categories: ideas YearOfIdeas
tags: 
- projects
- ideas
- pcb
- serial
- rs232
- rs485
- ttl
- db9
- db25
excerpt: A USB to Serial port board that supports many different physical layers. TTL 3.3v, 5v, RS232, RS485 2wire and 4 wire. DB9, DB25, Screw down terminals, etc
---

> This post is part of [the 100 project ideas](/projects/2023-100-ideas/) project. [#The100DayProject](https://www.the100dayproject.org/). I am looking for feedback. <a href='#utterances-comments'>Comment</a> below or DM me via social media <a href="https://instagram.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-instagram" aria-hidden="true"></i><span class="label">Instagram</span></a>, <a href="https://twitter.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-twitter" aria-hidden="true"></i><span class="label">Twitter</span></a>.

## One Line Pitch

A USB to Serial port board that supports many different physical layers. TTL 3.3v, 5v, RS232, RS485 2wire and 4 wire. DB9, DB25, Screw down terminals, etc

## Description

For my work I often need devices to connect to the following types of physical layer devices.

- [TTL](https://en.wikipedia.org/wiki/Transistor%E2%80%93transistor_logic) at 3.3v, TTL at 5v for programing microcontrollers (I rarely if at all do 1.8v)
- [RS232](https://en.wikipedia.org/wiki/RS-232) for point to point protocols, Fire Alarm panels, etc..  
- [RS485](https://en.wikipedia.org/wiki/RS-485) for multi drop protocols like Modbus RTU, BACnet MSTP
- [1-Wire](https://en.wikipedia.org/wiki/1-Wire) for [DS18B20](https://www.analog.com/en/products/ds18b20.html) and other one wire sensors
- [4-20ma](https://en.wikipedia.org/wiki/Current_loop) current loop for power meters
- Analog [0-10v](https://en.wikipedia.org/wiki/0-10_V_lighting_control) for lighting controlers
- [i2c](https://en.wikipedia.org/wiki/I%C2%B2C) for Microcontroller devices
- [JTAG](https://en.wikipedia.org/wiki/JTAG) for Microcontroller debugging
- Dry contact, wet contact, Simple [GPIO](https://en.wikipedia.org/wiki/General-purpose_input/output)

In addition to that each of these devices also has their own physical connector.

- [DB25](https://en.wikipedia.org/wiki/D-subminiature) - Old Serial (pre 2000s)
- [DB9](https://en.wikipedia.org/wiki/D-subminiature) - Newer Serial (after 2000)
- 3.5mm audio jack - 5v, GND, data
- [T568A](https://en.wikipedia.org/wiki/ANSI/TIA-568) - Ethernet (often called [RJ45](https://en.wikipedia.org/wiki/Registered_jack#RJ45S))
- 3-pin JST - WS2812B, NeoPixels

I currently have ~12 dongles and many different connectors and converters on my desk to connect all of these devices to my PC.

It's ridiculous! We need to develop one universal standard that covers everyone’s use case.

<img src="/public/uploads/2023/xkcd-927-standards_2x.png" alt="xkcd-927-standards" style="margin: 10px; border: 1px solid black; padding: 5px"/>

[https://xkcd.com/927/](https://xkcd.com/927/)

The [CH348L](https://www.lcsc.com/product-detail/USB-ICs_WCH-Jiangsu-Qin-Heng-CH348L_C2979160.html) supports 8 [UARTS](https://en.wikipedia.org/wiki/Universal_asynchronous_receiver-transmitter) exposing the CTS, RTS, DTR pins. It can Mount as a USB Host and shows up in Windows or Linux as 8x serial ports. It also has several GPIO pins that can be used as input or outputs. It would make a good candidate for this project.

The board would be shaped like a 9 sided polygon. One side for the USB input, and the other 8 sides for each of the UARTs and series of connectors.

All three of the common USB port types could be used in case you have the wrong cable. Not connected at the same time as all the common pins would be connected but would allow for flexibility. USB-C, USB-Mini, USB-Micro. The USB header would also be brought out to a 5x2 header commonly found in ATX motherboards.

Each of the UART sides would have several physical connectors for each UART.

Coming out of the UART a series of jumpers would allow for selection of different level converters.
TTL as 3.3v or 5v. Serial as RS232 or RS485, RS485-2W

After the level selector jumpers, on the edge of the board would have several different holes for many different physical connections such as. DB9 Serial, DB25 Serial, RJ45 Ethernet, 9 Pin screw terminal, 2.54 mm (0.1 in) pitch header in two formats (Tom Connector, and FTDI standards). It's not expected that you would populate each of these physical connector types. Only the ones that you actually need but all the holes would be there if you need them.

The trick is to allow for each of the pins of each of the physical connectors to be brought out to 2.54 mm (0.1 in) pitch header to allow for jumpering using headers if needed.

Side 1, and 5 would be configured in such a way that would allow for a pass through cable. This allows for man in the middle snooping or spying on serial communication. UART 1 connected to the TX, and UART 5 connected to the RX.

<img src="/public/uploads/2023/universal_serial_breakout_board_boardlayout.png" alt="universal_serial_breakout_board_boardlayout" style="margin: 10px; border: 1px solid black; padding: 5px"/>

<img src="/public/uploads/2023/universal_serial_breakout_board_pinouts.png" alt="universal_serial_breakout_board_boardlayout" style="margin: 10px; border: 1px solid black; padding: 5px"/>

## Prior art

- [Dangerous Prototypes Bus Pirate](http://dangerousprototypes.com/docs/Bus_Pirate) - A tool for exposing many different formats in a generic way. Its a wonderful tool but missing the hardware connections that I need.
- [ACON U- 01 USB TO RS232/RS485 CONVERTER (ISOLATED)](https://store.chipkin.com/products/usb-to-rs232-rs485-converter-with-isolation-metal-case) - This is what I am currently using, works great for RS232 and RS485 (2wire, 4wire). But is missing the ability to jumper the connectors
- **Port to terminal blocks** - These work great for wiring unconventional connectors to serial ports.

## Market

Hardware hackers, industrial automation, people that work with many different controllers and industrial sensors.

## Feedback

- Suggest putting lots of thought into the silk screen.  Little things like the arrows I add to TXD and RXD can make the world of difference when the shit is going down and you're doubting everything.
- Add Diodes to prevent back feeding of the signals and biasing resistors for the RS485 connections. RX and TX LEDs to show status.
- For better compatibility you might want to consider ftdi chips and a USB hub chip to combine them.  Better options for leds too.
  - Realistically I never needed more then 3x or 4x UARTs at any given time. Then I can make the shape a hexagon.. Because [hexagon is the bestagon](https://www.youtube.com/watch?v=thOifuHs6eY)
- Use [DP4T switches](https://www.aliexpress.com/item/32827428700.html) like these to select source/destination for uarts.  
- The physical connector side of the board could "break off" then you could extend it with some wires from the UART.
  - You just separate the level converters onto different pcbs that mate with the base
