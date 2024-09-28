---
title: "Idea 044 - Bio Punk Conference badge"
date: 2023-03-12 00:44:00
categories:
- Ideas
- YearOfIdeas
tags:
- electronics
- pcb
- conference
- Projects
- Ideas
excerpt: A convention badge
slug: idea044-biopunk-conference-badge

---

> This post is part of [the 100 project ideas](/projects/2023-100-ideas/) project. [#The100DayProject](https://www.the100dayproject.org/). I am looking for feedback. <a href='#utterances-comments'>Comment</a> below or DM me via social media <a href="https://instagram.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-instagram" aria-hidden="true"></i><span class="label">Instagram</span></a>, <a href="https://twitter.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-twitter" aria-hidden="true"></i><span class="label">Twitter</span></a>.

## One Line Pitch

A electronic badge that lets you mix your badge’s pet’s DNA with others

## Description

<img src="/public/uploads/2023/digital_pet1.png" alt="digital_pet1" style="float: right; margin: 10px; border: 1px solid black; padding: 5px"/>A conference badge that has an animated electronic pet on the front of it. This can be either a small LCD screen or a LED matrix. If it's a matrix then the LEDs should be the small 10mm ones in a tight array of at least 16x16, preferably 32x32 so that better higher resolution pets can be animated.

The electronic pets visualization and mannerisms of the pet are dictated by its DNA/genes.

Connectors on the side of the badge that lets you connect two badges together. When they are connected the DNA is mixed and both badges get a new modified Badge pet. The new pet has different visualization and mannerisms.

The board's genes and breeding follow the [idea041 BIO Punks Garden](/idea041-biopunks-garden) methods.

<img src="/public/uploads/2023/digital_pet4.png" alt="digital_pet4" style="float: right; margin: 10px; border: 1px solid black; padding: 5px"/>Every time the badge connects and mixes with another badge, the electron pet gains more options and features. This encourages participants to mix the DNA of their digital pets as much as possible to gain more features.

When two badges are connected together the LED matrix shows the current DNA of each pet. The main display of the board is a 16x16 LED grid

You can visualize the DNA of the pet using a series of LEDS.

Each pet has 16 genes.

<img src="/public/uploads/2023/digital_pet2.png" alt="digital_pet2" style="float: right; margin: 10px; border: 1px solid black; padding: 5px"/>Each gene is represented by 4 LEDs. These 4 LEDS represent: Dominate, Recessive 1, Recessive 2, Recessive 3,  

Each gene has 6 different options. These options are represented by RGB LED colors. Red(0), Magenta(1), Blue(2), Cyan(3), Green(4), Yellow (5)

When badges are connected to each other, it goes into “mixing” mode. The user has to agree to mix the two pets' DNA together.

The Grid looks like this

```txt
[G01 DRRR] [G02 DRRR]
[G03 DRRR] [G04 DRRR]
[G05 DRRR] [G06 DRRR]
[G07 DRRR] [G08 DRRR]
[G09 DRRR] [G10 DRRR]
[G11 DRRR] [G12 DRRR]
[G13 DRRR] [G14 DRRR]
[G15 DRRR] [G16 DRRR]
```

The LED grid should be at least 16x16, preferably 32x32 so that it can be animated and visualizations can be better. The LED grid shows off your Badge pet. There are more LEDs then there are DNA sections. I don’t want to have to deal with that many genes.

<img src="/public/uploads/2023/digital_pet3.png" alt="digital_pet3" style="float: right; margin: 10px; border: 1px solid black; padding: 5px"/>You badge pet has many features that are derived from the pets DNA

You want to walk around the conference and mix your Pets DNA with others to try and get all the desirable traits. Then it's a Tamagotchi style pet that you need to raise and keep alive.

When a pet is mixed, it restarts in “game+” style mode. Where its previous stats are kept but age is reset allowing it to grow faster.

Whenever a pet is restarted (mixing of the dna), it should start as an egg. The egg needs to be warmed up by rubbing a temperature sensor to hatch the egg. Etc…

The more you use a sensor it directs the way that it evolves. Bounce the badge up and down stressing the accelerometer and it will evolve with bird attributes. Etc...

Temperature sensor, accelerometer/gyro, microphone, screen to show the "pet" evolving

## Prior art

- [DNA Conference Badge](https://www.youtube.com/watch?v=Q9mJOtU8WjQ) - I love the look of this badge for the DNA connector.
- [Tamagotchi](https://en.wikipedia.org/wiki/Tamagotchi)
- [Arduinogotchi](https://hackaday.io/project/184723-arduinogotchi)

## Market

People who want to learn about genes and DNA, people who are looking for conference badges.
