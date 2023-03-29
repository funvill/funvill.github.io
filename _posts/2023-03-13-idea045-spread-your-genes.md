---
layout: single
title: Idea 45 - Spread your genes
date: '2023-03-13 00:45'
categories: ideas
tags: games projects ideas
excerpt: A game that rewards you for spreading your DNA to as many other players as possible
---

> This post is part of [the 100 project ideas](/projects/2023-100-ideas/) project. [#The100DayProject](https://www.the100dayproject.org/). I am looking for feedback. <a href='#utterances-comments'>Comment</a> below or DM me via social media <a href="https://instagram.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-instagram" aria-hidden="true"></i><span class="label">Instagram</span></a>, <a href="https://twitter.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-twitter" aria-hidden="true"></i><span class="label">Twitter</span></a>.

## One Line Pitch

A game that rewards you for spreading your DNA to as many other players as possible

## Description

In this game you are trying to get other people to scan your glyph, and you are trying to scan other players' desirable glyphs to create offspring and spread your DNA.

You can only be invited to this game from someone else by scanning their glyph (Your parent)

When you join the game you are given a glyph that represents your DNA. This glyph/DNA has a history that incorporates all of the parents of this glyph.

The glyph is a modified QR code that looks alien in origin and should be instantly recognizable for anyone who has played the game, but is nonsense to anyone who hasn’t (secret knowledge)

> This feels like more of a game mechanic then a actual game. It feels spammy more then fun. It needs more then this.

### Goals

The goal is to spread your DNA to the largest number of dissimilar offspring as possible.

The player has a few methods for accomplishing this goal.

#### Get your glyph scanned by others

Get as many other players to scan your glyph as possible. You get a small reward for any scan by another player. You get a larger reward when another player uses your DNA to produce offspring.

It's rewarding to spread your DNA as far and as much as possible. No penalty for getting others to scan your glyph.

#### Activate and create offspring

Collect a diverse set of DNA to create an offspring. You get rewards for the diversity of the DNA collected, and penalties for similar DNA.

When you create a new offspring your old glyph is retired (parent), and the new offspring becomes your new glyph. The new glyph shows what generation it is, the higher the generation the less valuable it is in creating offspring.

You need to create offspring to spread your DNA more, but the more you do it the less valuable it is. No penalty if your entire family tree is diverse.

#### Inviting others to play the game

A new player can scan your glyph to join the game. Their first glyph is based off of yours, and you are their only parent. You get a large reward for this action.

New players start with a low generation count and are desirable in the game. You gain a reward for how prolific they are in the game.

#### Your glyph appears in the family tree of a newly created offspring

When your glyph appears in anyone's newly created offspring then you get a reward. A bigger reward for fewer generations since the new offspring's creation.

If this new offspring has your DNA fewer parents ago you get more rewards then one from a dozen generations ago.

### Actions

A player has two actions that they can perform.

#### Scan other players DNA

This action is performed by scanning another player's glyph and adding it to your DNA pool. A player can have a max number of other players' DNAs at any given time.

When you scan another player's glyph to get their DNA, that other player gets a point. (Doesn’t cost you anything)

You can’t tell what is in the DNA before scanning it. You can’t tell if the DNA is useful to you before scanning it.

#### Dump DNA

This action allows you to dump someone's DNA from your DNA pool, freeing up the space for other players' DNA.

Dumping DNA has a cost to you and this offspring.

### Family tree

Every glyph is given a unique ID. Every glyph has a `n` amount of parents all the way back to whoever invited you into the game and who created them, etc…

The family tree of a glyph is visualized once you scan someone else's glyph not before.

A leader board can be created to show how many other players' glyphs include your unique glyph ID in it. You can gain on this board by having other people incorporate your DNA into their offsprings and the offsprings are prolific.

### Rewards and Diversity

Every glyph is given a unique ID. Every glyph has a `n` amount of parents. When an offspring is generated it is calculated the diversity of all the parents from all time. This is done by counting the unique glyph IDs in the family tree, then counting all the sets of similares.

{Unique ID} - {counts of sets of similars} * {count of similars}

For example if a glyph had 100 parents. 95 of them are unique, there are two copies of the same ID, and three copies of another. 100 - (2 * 5) = 90 points.

No offspring can have less than 10 points.

This algorithm should reward diversity, and severely punish duplicates.

I am not sure what to do with these points?

At a certain point it shouldn’t be rewarding to create more offspring, instead it should be more rewarding to get other people into the game.

### Unsorted ideas

- If you scan someone's glyph and it contains a lot of the same IDs that your glyph does then you should be incentivized to dump it.
- Users should be incentivized to invite as many people to the game as possible under them. Maybe give them some multi-level-marketing bonuses
- The requirements to collect DNA become harder each time you create an offspring. You want to choose unique DNA from other players with unique DNA.
- You should still get points when someone scans an old glyph that you have moved on from. This incentivizes people to post the glyph all over.
- Just like life, the DNA wants to be spread around as much as possible.
- Maybe it takes 1 more person’s DNA every time you create a generation. This would make it harder and harder to create new diverse offspring.
- There is a lot of math and game theory that can be used here. Do the math.
- Reward people for taking their glyphs overseas to different countries who are also playing this game. Adds in diversity
- Everyone is going to be related to the first glyphs, is that a problem?
- You should be punished if your offspring stop creating new offspring. Dead lines

## Prior art

There was a time in the 2000s where there was a series of games where you gained a lot of points for adding new people to the game. I think it was vampire themed. I can’t find the name of the game.

## Market

Gamers
