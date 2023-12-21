---
layout: single
title: Idea 075 - Birdnet festival mesh network
date: 2023-04-12 01:15:00
categories: ideas YearOfIdeas
tags: art installtion audio projects ideas
excerpt: A mesh network of birdhouses that chirp messages to each other using audio for the physical layer of the network
---

> This post is part of [the 100 project ideas](https://blog.abluestar.com/projects/2023-100-ideas/) project. [#The100DayProject](https://www.the100dayproject.org/). I am looking for feedback. <a href='#utterances-comments'>Comment</a> below or DM me via social media <a href="https://instagram.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-instagram" aria-hidden="true"></i><span class="label">Instagram</span></a>, <a href="https://twitter.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-twitter" aria-hidden="true"></i><span class="label">Twitter</span></a>.

## One Line Pitch

A mesh network of birdhouses that chirp messages to each other using audio for the physical layer of the network

## Description

<img src='\public\uploads\2023\birdnet.png' alt='birdnet' style="float: right; margin: 10px; max-width: 400px; border: 1px solid black; padding: 5px">A series of bird houses strapped to trees at a festival. Each birdhouse has a display for showing the previous messages it has received, and a keyboard for entering in new messages to send out on the network

Users can use these birdhouses to send messages between each of the birdhouses in a festival wide communication network.

All the birdhouses are networked together but not using wires or radios. Instead they use an ultrasonic speaker to transmit messages, and a microphone to listen and receive chirps from other birdhouses ultrasonic speakers.

The ultrasonic speaker, and microphone become the physical layer of the network (Layer 0). The speaker should sound like bird chirps. One type of chirp is used for a “1”, a different chirp is used for a “0”. A very slow baud rate is used for the network so that Humans can hear the chirps and maybe even manually decode it. Something like 30-60 chirps a second (60 bits per second)

A protocol like MS/TP can be used for the data link to the transport layer. This will allow for all the devices to be able to negotiate who is able to talk and who is listening. (Might be able to get sponsorship from BACnet company to make this network)

Depending on the environment and the amount of background noise, some of the bits will be lost during transmission. The microphones will be overwhelmed and won’t hear the different chirps. This means that some messages will show up with missing sections or bytes. Data integrity is not guaranteed.

Because the communication is happening in the “open”. People could listen in on the messages sent on this network.

The network could also use IR LEDs instead of mics and speakers.

## Prior art

Modems used sound to transmit data across telephone wires. This technology has existed since the 50s

- [Data-Over-Sound](https://innovationatwork.ieee.org/transferring-data-over-sound/)
- [Quiet Modem Project](https://github.com/quiet/quiet) - This library uses liquid SDR to transmit data through sound. This makes it suitable for sending data across a 3.5mm headphone jack or via speaker and mic.
- [Audio Modem Communication Library](https://github.com/romanz/amodem) - transmit a file between 2 computers, using a simple headset, allowing true air-gapped communication (via a speaker and a microphone) [Hacker News](https://news.ycombinator.com/item?id=17333257)
- [GGWave](https://github.com/ggerganov/ggwave) - Tiny data-over-sound library. Most of the work is done.

## Market

Neat art project for a music festival
