---
layout: single
title: Idea 41 - BioPunks Garden
date: '2023-03-09 00:41'
categories: ideas
tags: games projects ideas
excerpt: Youre a Biopunk building their garden by selectively breeding for DNA markers in plants
---

> This post is part of [the 100 project ideas](https://blog.abluestar.com/projects/2023-100-ideas/) project. [#The100DayProject](https://www.the100dayproject.org/). I am looking for feedback. <a href='#utterances-comments'>Comment</a> below or DM me via social media <a href="https://instagram.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-instagram" aria-hidden="true"></i><span class="label">Instagram</span></a>, <a href="https://twitter.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-twitter" aria-hidden="true"></i><span class="label">Twitter</span></a>.

## One Line Pitch

You're a Biopunk building their garden by selectively breeding for DNA markers in plants.

## Description

<img src="/public/uploads/2023/biopunk1.png" alt="biopunk1" style="float: right; margin: 10px; border: 1px solid black; padding: 5px"/>The theme of this game is longevity. It's part of a thought experiment on how you could get a person to play the game over an entire year. I also wanted a game that wasn't violent or competitive.

Part [Crypto Kitties](https://www.cryptokitties.co/), part [Tamagotchi](https://en.wikipedia.org/wiki/Tamagotchi), part [ScreenSaver](https://en.wikipedia.org/wiki/Screensaver)

In this game you are a [biopunk](https://en.wikipedia.org/wiki/Biopunk) gardener building their [genetically engineered](https://en.wikipedia.org/wiki/Genetic_engineering) garden of super plants. You can create new species of plants by combining DNA from several species together to create new species. These plants fill in your garden and grow over time.

### Plant Genes

<img src="/public/uploads/2023/biopunk2.png" alt="biopunk1" style="float: right; margin: 10px; border: 1px solid black; padding: 5px"/>Each plant has its own set of [genes](https://en.wikipedia.org/wiki/Gene) that dictate how the plant looks and its characteristics. This is heavily based on [Crypto Kitties genes](https://guide.cryptokitties.co/guide/cat-features/genes), this video gives a good description of [how the genes work in Crypto Kitty](https://www.youtube.com/watch?v=MtTyStoOLqo)

For example the genes could represent the following attributes: base color, highlight color, accent color, flower color, flower shape, stem type, accessory type, etc…

For each gene there are 26 possible attributes (a-Z)

For each gene there are dominant (D) and recessive (R) genes. (We could have multiple regressive genes to make this much more complex)

- ```[(A),(Y)]``` =  Base color, has a dominant color of (A), with a recessive color of (Y)
- ```[(D),(K)]``` =  Highlight color, has a dominant color of (D), with a recessive color of (K)
- ```[(G),(B)]``` =  Accent color, has a dominant color of (G), with a recessive color of (B)
Etc…

This plants genes could be represented with this sequence: “AYDKGB”

The dominant gene for each attribute of the plant will be visible. In this case Base color (A), Highlight color (D), Accent color (G). The recessive gene is not used.

### Plant Breeding

<img src="/public/uploads/2023/biopunk3.png" alt="biopunk1" style="float: right; margin: 10px; border: 1px solid black; padding: 5px"/>A more random version of [Punnett_square](https://en.wikipedia.org/wiki/Punnett_square)

When breeding the plants, you take two plants and combine them together. The combination of their parents' genes will produce a new plant with a unique gene sequence.

The dominant gene for each attribute from each parent is worth 30%. The recessive genes from each parent is worth 15%, the last 10% is random mutation.

For example:

- Parent 1: ```[AY][DK][GB]```
- Parent 2: ```[AR][TD][XY]```

The child has the following percentage change for the dominant gene of each trait.

- **Base color**: A=60% (2x Dominant), R=15% (1x Recessive), Y=15% (1x Recessive), ?=10% (Random mutation)
- **Highlight color**: D=45% (Dominant + Recessive), K=15% (1x Recessive), T=30% (1x Dominant), ?=10% (Random mutation)
- **Accent color**: G=30% (1x Dominant), X=30% (1x Dominant), B=15% (1x Recessive), Y=15% (1x Recessive), ?=10% (Random mutation)

The recessive gene can’t be the same as the Dominant. So the same calculation is done with the dominant gene removed as an option.

Child: ```[AR][DJ][BX]``` - This child has the same base color (A), and highlight color (D) as parent 1, but the accent color (B) doesn’t match the physical appearance of either parent. A new random mutation has also occurred adding “J” regressive to the highlight color.

If you want to breed for specific traits, look for parents that have the traits genes in their DNA. You have a better chance to produce a child with this trait if their parents have it as their dominant/physical traits, but there is still a chance if it's regressive.

If people don’t want to do all the work learning about the genes or trying to breed for certain traits, they can just breed the plants and make a pretty garden. It doesn’t have to be more complex than that. But for people who want to deep dive into it they can.

### Real time

<img src="/public/uploads/2023/biopunk4.png" alt="biopunk1" style="float: right; margin: 10px; border: 1px solid black; padding: 5px"/>The game is played in real time. We expect players to log in and play the game for 20-30 mins performing a few actions then log off for the day. All actions are time locked to the plant.

- Each plant can only breed every 24 hours.
- A new plant can’t be bred until it's 3 days old.
- Etc…

Each day the plant will grow until it reaches maturity. Afterwards the plant will gain and lose leaves, the flowers will come and go with the seasons, it will act like a real plant.  

The user has a max amount of space in the gardens. They may need to toss old plants to make room for new plants. This could be visualized by using pots that the plants need to be potted into.

We need some reward for people who “tend” their plants, and return each day to make slight adjustments to the garden. Think feeding the Tamagotchi. Maybe happy plants do something special that tired unhappy plants don’t. Or they gain more pots the more time they spend in the garden allowing them to have more plants.

There should be something to do with the seasons. Spring, Summer, Fall, Winter. Maybe some plants are bloom in different seasons, etc..

We do not want to punish people for not logging in. If they go on vacation that is okay. We don’t want to add stress to peoples lives about their virtual garden.

### Lock screen and viewing your garden

<img src="/public/uploads/2023/biopunk5.png" alt="biopunk1" style="float: right; margin: 10px; border: 1px solid black; padding: 5px"/>The garden should look beautiful, in a way that people will just want to watch it. There should be small animations that each plant does, or it should react to its environment. Maybe little birds and bees come by or ants crawl up the stocks. Some way of showing life.

It should be relaxing and enjoyable just to watch your garden grow.

The garden should be available to view from your computer's screensaver or lock screen or your phone's lock screen. We want some way of reminding people of their plants.

### Visuals

I would love for this to be 3D but I don’t know how to do it in 3D maybe in the future. For the first version it will be.

Stackable SVG images for with different attributes, CSS classes for colors,

### Unsorted ideas

<img src="/public/uploads/2023/biopunk6.png" alt="biopunk1" style="float: right; margin: 10px; border: 1px solid black; padding: 5px"/>
- The gene order could be randomized on start up. This means the user will need to breed to figure out what gene connects with what physical trait. This might be too advanced for most people.
- Radiation, you can scramble the regressive gene. Randomizing it.
- A gene that prevents the plant from breeding.
- If people really don’t want to wait on the time lock for the plants, let them pay us money to speed things up.
- It would be cool if there was some sort of trading mechanism that allowed people to trade plants with each other. This would allow more genetic diversity to your garden.
- Allow people to buy new plants from the store (insert of genetic diversity). This should be hard or expensive to do. Instead we want people to breed traits instead of buying traits.
- Adding in a harvest mechanic. If you find a certain gene sequence that you really love you can splice the gene sequence up and sell it at the market. or buy new gene sequence from the market. You are a gene farmer. (Harvest moon style)
- Maybe a mini game for doing the gene splicing, like match-3, or tetris or something

## Prior art

- [Crypto Kitties](https://www.cryptokitties.co/) - CryptoKitties is a game centered around breedable, collectible, and oh-so-adorable creatures we call CryptoKitties! Each cat is one-of-a-kind and 100% owned by you; it cannot be replicated, taken away, or destroyed.
- [Tamagotchi](https://en.wikipedia.org/wiki/Tamagotchi) - Tamagotchi Is a handheld digital pet that was created in Japan by Akihiro Yokoi of WiZ and Aki Maita of Bandai.
- [Harvest Moon](https://en.wikipedia.org/wiki/Harvest_Moon_(video_game)) - Farming game from SNES.

## Market

People who want to learn about genes and DNA, people who want a relaxing game, gardeners, biopunks
