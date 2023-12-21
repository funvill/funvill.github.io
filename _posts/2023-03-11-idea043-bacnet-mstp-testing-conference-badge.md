---
layout: single
title: Idea 043 - BACnet MSTP Testing conference Badge
date: 2023-03-11 00:43:00
categories: ideas YearOfIdeas
tags: electronics pcb conference projects ideas
excerpt: A convention badge for BACnet plugfest that is useful for testing
---

> This post is part of [the 100 project ideas](/projects/2023-100-ideas/) project. [#The100DayProject](https://www.the100dayproject.org/). I am looking for feedback. <a href='#utterances-comments'>Comment</a> below or DM me via social media <a href="https://instagram.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-instagram" aria-hidden="true"></i><span class="label">Instagram</span></a>, <a href="https://twitter.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-twitter" aria-hidden="true"></i><span class="label">Twitter</span></a>.

## One Line Pitch

A convention badge for BACnet plugfest that is useful for testing

## Description

<img src="/public/uploads/2023/mstp_lighthouse.png" alt="mstp_lighthouse" style="float: right; margin: 10px; border: 1px solid black; padding: 5px"/>Goal is to make a conference badge that people can use to test their BACnet equipment with, while at the BACnet Plugfest conference. They should be able to take it home with them as a token of the conference and hopefully use it for something useful.

These badges should also be able to be used as ID tags. The badge should have space for people to enter in their name and company name. These badges should look better then the normal magnetic conference badges that are provided.

The main restriction of these badges is that they need to be extremely cheap. <$10 USD per board (Shipped to the door). This means that the components are severely limited. To keep the BOM down and the functionality high, some of the component footprints will not be populated and the user can populate them if they want to.

To be useful as a BACnet test tool it needs to act as both a BACnet Server (B-SA, or B-AAC) and a BACnet client (operator interface, B-OB, B-OWS).

The device should support MSTP using RS485 transceivers as they are cheaper than Ethernet interfaces. A BACnet router can be used to convert from BACnet MSTP to BACnet IP.

The BACnet server should contain as many of the BACnet objects as possible. For outputs these objects should have some visual representation of the present value. For input the user should have some physical interface to interact with. While keeping the BOM, and costs low.

BACnet object types visualization and interfaces
This should be workshopped so that as many different types of objects are represented as possible.

- **Binary input**
  - A series of push buttons and LEDs to indicate the current state
  - A series of unpopulated solder pads for a terminal block
- **Binary output** - A series of LEDs to indicate the current state.
- **Analog input**
  - Temperature sensor - Might be too expensive, costs ~$1.3… Humidity, light sensor, etc…
  - A MSO could set the mode of this input to Sine Wave, Square wave, saw tooth, etc…
- **Analog output** - RGB LED where the brightness or color represents the value
- **Multi-state Input**
- **Multi-state output**
  - Set the mode of a Analog input
- **BitString Value**
  - Current state of all the LEDS. On or Off
  - Current state of all the button, Up or down
- **Network Port** - The settings for the MSTP network
- **Device** - The actual device
- **Positive Integer Value** - Time in MS since the board started up
- **Accumulator** - How many times any button has been pressed.
- Etc...

Virtual networks could be added to the device to add more complexity to its internal BACnet object list.

### Bill of materials

For every extended part add $1+ for reeling fees.

- **Microcontroller** - RP2040 https://jlcpcb.com/partdetail/RaspberryPi-RP2040/C2040 (Extended $0.8181)
  - 2 UARTs
  - USB 1.1 Host/Device
  - 30 multifunction GPIO
  - 264kB of embedded SRAM
  - 4 channel ADC with internal temperature sensor
- **Push buttons** - https://jlcpcb.com/partdetail/XkbConnectivity-TS_1187A_B_AB/C318884 (Basic $0.0118)
- **RS485 Transceiver** - https://jlcpcb.com/partdetail/utc_unisonic_tech-UTRS485G_S08R/C2848650 (Extended $0.1903)  
- **RGB LEDS (10x10mm)** - [XL-1010RGBC-WS2812B](https://jlcpcb.com/partdetail/Xinglight-XL_1010RGBCWS2812B/C5349953) (Extended $0.0453) 
- **3 pin screw terminals for MSTP connection** - [XY636-6.35-3P](https://jlcpcb.com/partdetail/Ningbo_Xinlaiya_elec-XY636_6_353P/C880592) (Extended $0.2524)

Estimated: ~$6 + PCB + Shipping + Assembly  

### Configuration

Most of the configuration should be done via the BACnet interface. Any setting that can be writable should be saved to the persistent storage. Some settings like the MSTP.MACAddress, MSTP.Baud, DeviceID should be visible on the badge (LEDs). MSTP settings should be configured using the network port object.

Good default values

- Device ID = 389023 - 389 = Chipkin’s Vendor ID, 023 is for the year that the board was created (2023)
- MSTP.MaxMaster = 127
- MSTP.MACAddress = 127
- MSTP.Baud = 115200

### Shape

It would be good to shape this board like something interesting

#### A Lighthouse

The lighthouse is a set of stacked blocks. Each block represents a different set of BACnet objects. The top has a set of 3x RGB LEDs that are settable. This allows the top LEDS to look like they are rotating around. Like a lighthouse.

#### A building with many floors

A building with many blocks, each block representing a different set of BACnet objects. The building is a good analog for what BACnet is used for

Each floor could also have LEDS that represent an elevator or escalator states of the elevator, and escalator objects. Double doors, single doors, showing the elevator going up and down the building.

## Prior art

There are a lot of conference badges out there. A technical conference like this for a specific protocol probably hasn’t had anything like this before. I think it would make a good splash

## Market

People who develop for the BACnet protocol, or who work with BACnet devices.
