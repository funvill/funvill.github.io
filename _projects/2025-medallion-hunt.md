---
title       : (2025) The Medallion Hunt
excerpt     : Hunt and seek game for Burnaby BC
post_date   : 2025-06-01 00:00:00
header      :
  teaser    : /public/uploads/2025/medallion-hunt-header.png
toc         : false
tags:
- Projects
- Art
---


## Overview

Between **June 15th and August 15th, 2025**, I built and ran a project called **The Medallion Hunt** — an interactive, city-wide treasure hunt where players could find animal-themed medallions hidden around **Burnaby, BC**.  

Each medallion was represented by a poster showing the silhouette of a local British Columbia mammal with a QR code. When players scanned the code, it opened a web page that:

- Displayed the animal they had just “collected”  
- Shared educational facts and a short video about that species  
- Revealed clues and GPS hints to find additional medallions  
- Unlocked a new chapter in an ongoing fictional story  

As players discovered more medallions, they gradually pieced together a narrative about a mysterious **aurora event** that allows animals to speak with humans. The more medallions a player found, the more of the story they unlocked.

In total, there were **50 medallions**, each linked to a different B.C. mammal — from beavers and coyotes to whales and porcupines.

---

## Inspiration

The idea started when I was looking for a project that combined **riddles, exploration, and cryptography**. I wanted to create something that encouraged people to go outside and solve puzzles in the real world — a hybrid between [geocaching](https://en.wikipedia.org/wiki/Geocaching) and **hide-and-seek**.

Originally, I wanted to use cryptographic puzzles hidden across the city, but that scope was too big for a first version. I scaled it down into a simpler, family-friendly version focused on curiosity and storytelling.

The storyline was inspired by a real **aurora event** that lit up Vancouver’s sky in 2025. That became the foundation of the narrative:  
*What if the aurora awoke the animals and gave them the ability to talk?*

Each animal collected unlocked a short, self-contained fable about this new world.  The stories could be read in any order and still make sense.

---

## Story

I wrote **50 story chapters** using a fixed template to keep them consistent:

The animal introduces itself → comments on the magical aurora event → explains its perspective or personality → references two other animals → ends with a reason to move on.

This “Mad Libs” - style approach made it possible to finish all 50 chapters in a manageable timeframe while keeping tone and pacing consistent.

Because players could find the medallions in any order, every story needed to be **independent** while still contributing to the larger narrative.  

To keep the story cohesive, every five chapters included a **main storyline event** that advanced the overall plot.

---

## Technical Details

<a href='/public/uploads/2025/medallion-hunt-webpage-screenshot.png'><img style="float: center; margin: 10px; max-width: 400px; border: 1px solid black; padding: 5px" src="/public/uploads/2025/medallion-hunt-webpage-screenshot.png" alt="Website screenshot"></a>

I wanted the project to be free to host and permanently accessible, so everything was done **client-side** using JavaScript and precompiled data.  
The goal was to make the experience self-contained — an artifact that would live on even after the physical posters were gone.

Each medallion page included:

- The animal the player had just collected  
- Five kid-friendly facts and an embedded YouTube documentary  
- The current chapter of the story, ordered by the player’s discovery sequence  
- A map showing discovered medallions and clues to the next ones  
- Stats showing total medallions unlocked, remaining, and clues found  

### Tech Stack

- **Leaflet.js** — Mapping and marker clustering  
- **JSON database** — Generated from a SQLite database for hosting on the site  
- **TypeScript** — Used to generate HTML and static content  
- **Vanilla JavaScript & HTML** — Simple, framework-free frontend

Full scource code can be found on the [medallion-hunt](https://github.com/funvill/medallion-hunt) github page.

### Posters

I used TypeScript and a template to generate each of the posters, which included the animal name, silhouette, and a QR code.

All animal silhouettes were sourced from **The Noun Project**.

Each QR code contained a unique URL with an 8-character alphanumeric slug — small enough for compact QR codes but long enough to prevent easy guessing.

The posters were printed in full color and laminated for outdoor use.

<a href='/public/uploads/2025/Bighorn_Sheep.png'><img style="float: center; margin: 10px; max-width: 400px; border: 1px solid black; padding: 5px" src="/public/uploads/2025/Bighorn_Sheep.png" alt="Bighorn_Sheep poster"></a>

## Stats

- **Total scans:** 178 over 3 months (June–August)  
- **Single-medallion users:** 105 people scanned only one  
- **Most popular animal:** *Bighorn Sheep* (50 scans), followed by *American Marten* (19)  
- **Most medallions found by a single user:** 32 of 50  
- **Most medallions found in one day by one user:** 4  
- **Most medallions found in one day (total):** 19 (June 17th)  
- **User locations:** 65% Burnaby, 25% Vancouver, 3% Osoyoos, remainder <1%  

## Feedback

One of the posters was placed near my house. During an evening walk, I saw a group of children and their parents scanning it.  
After they finished reading the story aloud, I introduced myself.  
They told me it was their third poster, described their favorites, and mentioned that two others they’d searched for were missing.  

It was rewarding to see people — especially kids — out exploring and engaging with something I had made in the real world.

## What Worked Well

- **Limiting the scope** — Early versions involved complex cryptography that few would have appreciated. Simplifying it made the project accessible and fun.  
- **Client-side only** — No server, no maintenance costs. While users could technically view the full database, very few did.  
- **Local storage** — User progress was stored on their device, eliminating the need for accounts or logins.  
- **Community engagement** — Every player was local. Seeing real people in my community interact with it made the effort deeply personal.  
- **Poster design** — Clean layout, strong visuals, and a bold call to action helped the posters stand out.  
- **Mobile-friendly website** — The simple, responsive layout worked flawlessly on phones.  
- **Google Analytics** — Event tracking provided valuable insights into user behavior and feature engagement.  
- **AI-generated logo** — I used Gemini to create the project logo. It fit well and saved a lot of time.  

## What I’d Do Differently Next Time

- **Add the website URL to posters.** Rookie mistake — some people couldn’t access the project without scanning.  
- **Include a claim code.** A short alphanumeric code would let users manually enter a medallion if they didn’t want to scan the QR code.  
- **Avoid angled QR placement.** Posters on hexagonal lamp posts made scanning difficult.  
- **Simplify riddles and clues.** I spent too much time writing them; most players preferred straightforward exploration.  
- **Upgrade materials.** Future versions should use metal medallions or acrylic plaques for long-term durability.  

## Final Thoughts

Building *The Medallion Hunt* taught me how to merge digital storytelling, physical design, and local engagement into one experience.  

It reminded me that art and technology don’t have to live on screens — sometimes they work best taped to a lamppost where a curious kid might find them first.
