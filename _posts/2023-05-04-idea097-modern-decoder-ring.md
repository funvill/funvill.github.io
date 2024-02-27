---
title: "Idea 097 - Modern decoder ring"
date: 2023-05-04 01:37:00
categories:
- Ideas
- YearOfIdeas
tags:
- pcb
- cryptography
- electronics
- Projects
- Ideas
excerpt: A modern decoder ring that uses strong modern cryptography encryption methods
slug: idea097-modern-decoder-ring

---

> This post is part of [the 100 project ideas](/projects/2023-100-ideas/) project. [#The100DayProject](https://www.the100dayproject.org/). I am looking for feedback. <a href='#utterances-comments'>Comment</a> below or DM me via social media <a href="https://instagram.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-instagram" aria-hidden="true"></i><span class="label">Instagram</span></a>, <a href="https://twitter.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-twitter" aria-hidden="true"></i><span class="label">Twitter</span></a>.

## One Line Pitch

A modern decoder ring that uses strong modern cryptography encryption methods

## Description

<img src='\public\uploads\2023\ovaltine-decoder-ring.png' alt='ovaltine-decoder-ring' title='ovaltine-decoder-ring' style="float: right; max-width: 400px; margin: 10px; border: 1px solid black; padding: 5px">This device is a modern version of a [decoder ring](https://en.wikipedia.org/wiki/Secret_decoder_ring) or a [Enigma machine](https://en.wikipedia.org/wiki/Enigma_machine). Instead of a [Substitution Cipher](https://en.wikipedia.org/wiki/Substitution_cipher) like the original [Secret decoder ring](https://en.wikipedia.org/wiki/Secret_decoder_ring) that was easily broken. These devices will use strong modern cryptography encryption.

Each device has their own private key (can be regenerated). Two devices then can be connected together to transfer public keys to each other. The device can store many public keys for many different devices.

A user then can type in a message into the device using a series of buttons. The plain text message is displayed on the device's screen. Then the message can be encrypted using the public key of another device. The encrypted message then is displayed on the screen.

The encrypted message can be sent to another device using one of many methods

- Pen and paper, then typed in manually
- The connectors used to transfer the public key could also be used to send the message.
- LED and Light sensor to blink the message between two devices
- An ultrasonic speaker and microphone using the [GGWave](https://github.com/ggerganov/ggwave) protocol.

This device allows you to send offline, encrypted messages between two or more people.

Parts list

- 27x buttons in the shape of a keyboard (26x) with a space button (1x).
- A small LED panel in the center for displaying the messages.
- 5 button DPad with center button (Like the flipper zero)
- Physical connector on the side of the board that allows for two devices to connect to each other.

### Other ideas

- Ability to set the encryption method
- Group messages
- Bluetooth or Wifi captive portal instead of manually entering in messages
- A code is required to unlock the device

## Prior art

- [Secret decoder ring](https://en.wikipedia.org/wiki/Secret_decoder_ring) - [Be sure to drink your Ovaltine](https://www.youtube.com/watch?v=zdA__2tKoIU)
- [Enigma machine](https://en.wikipedia.org/wiki/Enigma_machine), and [Idea 51 - Enigma machine kit](/idea051-enigma-machine-kit/) but instead of trying to copy the Enigma machine this would be modern device with modern encryption method.
- [One-time pad](https://en.wikipedia.org/wiki/One-time_pad)

## Market

Anyone who likes cryptography, encryption, and secret messages
