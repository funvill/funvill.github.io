---
layout: single
title: Idea 002 - Keyboard Flute
date: 2023-01-29 00:02:00
categories: ideas YearOfIdeas
tags: electronics music pcb projects ideas
excerpt: Electronic Flute PCB - A product for music lovers and DIY enthusiasts alike. This PCB is designed to be a customizable electronic flute that uses a tiny mems microphone and several buttons to create sound
---

> This post is part of [the 100 project ideas](/projects/2023-100-ideas/) project. [#The100DayProject](https://www.the100dayproject.org/). I am looking for feedback. <a href='#utterances-comments'>Comment</a> below or DM me via social media <a href="https://instagram.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-instagram" aria-hidden="true"></i><span class="label">Instagram</span></a>, <a href="https://twitter.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-twitter" aria-hidden="true"></i><span class="label">Twitter</span></a>.

## One Line Pitch

Electronic Flute PCB - A product for music lovers and DIY enthusiasts alike. This PCB is designed to be a customizable electronic flute that uses a tiny mems microphone and several buttons to create sound.

## Full description

Create a small PCB ruler sized electronic flue, that uses PC keyboard buttons to play notes, a microphone to bend notes, and a few other features to allow for more customization.

The PCB board features a tiny mems microphone that supports the 12S protocol, which allows users to blow into the microphone and the processor will detect the pressure level to modulate the output sound. This should allow for some unique sounds.

The PCB board uses hot swappable keyboard buttons that allow for people to choose what kind of switches and the amount of pressure that is required to activate the switch. Using keyboard keycaps allows people to further personalize the device.

A tiny mems microphone that supports 12S protocol will be at one end of the board. This allows the user to blow on the microphone and the processor can detect the pressure level to mod the output sound.

For the main processor, the PCB uses an ESP32, which allows for both Bluetooth and Wifi connectivity. This allows users to connect to a Bluetooth speaker or act as a Bluetooth keyboard, or stream MIDI and configure the device using wifi.

The ESP32 doesn’t officially support USB Host mode to enable it to act as a USB HID keyboard. There are a few projects where people have hacked the device to support USB.

- [https://hackaday.io/project/178213-esp32-usb-software-host]
- [https://github.com/chegewara/esp32-usb-v2]

The device will not have speakers built into the board. Instead you can connect via Bluetooth or via the lineout headphone jack. The lineout will use a D2A audio amplifier that supports the I2S protocol. I expect that most people will connect it to a bluetooth speaker.

USB-C for power, I considered adding a battery but I didn’t want to make this board too heavy. This way people can add their own batteries via USB power packs.

Adding a SD card to contain the samples that are played when the key is pressed and settings file.

The back side of the PCB features a procedurally generated silkscreen design of balloons for a comedic touch.

Use [I2S](https://en.wikipedia.org/wiki/I%C2%B2S) protocol devices that are supported by the ESP32

Settings will be stored on a file on the SC card. The PCB also includes a series of LEDs that indicate the current mode, as well as a few buttons for quick mode changes.

<img src="/public/uploads/2023/keyboard-flute-mockup.png"  alt="Keyboard flute mockup"/>

## Stretch ideas

- A book of music that you can play with this flute
- LEDs next to each button, then you can play Simon says to follow along with a built in song.
- Maybe default sounds are old phone sounds so you can phreak a phone.

## Prior art

What has already been done in this field, where can I draw ideas from,

- [Picoplanet](https://www.tindie.com/products/bleeptrack/picoplanet/) has a procedurally generated touch pad, that looks similar.
- [haxophone](https://github.com/jcard0na/haxo-hw) - [HackADay](https://hackaday.com/2023/03/14/mechanical-keyboard-as-travel-saxophone/) post
- [Zelda “Ocarina of time”](https://www.youtube.com/watch?v=w84tT7SJ3PY)
- [Hyve Synth](https://www.youtube.com/watch?v=pLG0hqTtlgA) - Touch sensor synth
- [Landscape Stereo Field](https://www.youtube.com/watch?v=B_aMIUOaD-Q) - Touch sensor for voltage
- [Pressure sensitive Touch plate](https://www.youtube.com/watch?v=DT6nZsixP0M)

## Market

Keyboard fetishes, synthesizer nut jobs, geeks, macro pad enthusiasts.
I don’t think the market size is that large as it is a very specialized product. Maybe in the few hundred people level.

## Feedback

> bonus points if you build it in an actual ocarina of time shaped frame.

I considered making it in the same of a "ocarina of time" but, the boards are considerably cheaper if they are in a 10x10cm square. I would also have to 3d print a case for a "ocarina of time" shaped one. That's a lot of 3d printing.

> I like it!  Can it output midi?

Midi requires a RS485 converter. I wasn't going to include one because it would add complexity to the board. Open Sound Control (OSC) supports streaming over ethernet, then you can go OSC to Midi if you needed too.
