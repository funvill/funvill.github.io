---
title: "Game Idea 4 - Mini Golf 'It can't be this easy' (Theme: It can't be this easy)"
date: 2026-07-10 00:03:00
slug: game-idea-4-mini-golf-it-cant-be-this-easy
categories:
  - Development
tags:
  - game-idea
  - puzzle
excerpt: "A puzzle mini golf game, where every round is a hole-in-one"
---

> This idea was part of the 2025 [game jam](/projects/2026-100-game-ideas/) ideas project.

## Mini Golf 'It can't be this easy'

One Liner: A puzzle mini golf game, where every round is a hole-in-one

A mini-golf game where you must get a hole in one to progress to the next round. Courses are scored based on the `amount of bounces` that it "normally" takes to get a hole in one.

The first attempt on any map is done without ghost lines (see below), it's expected that you will not get it on the first attempt.

After the first failed shot, it shows an animation of every shot that other players have ever made on the course (Download an online pack of every shot). With gray ghost lines for failed shots, and green ghost lines for successful shots. Thousands and thousands of ghost lines in all directions as people try different things. (See ghost lines)

If players follow the green ghost line shots, they will get a hole in one and they can progress to the next level. Or they can try to improve on the score for this map by trying to reduce the amount of bounces.

A global leader board shows the following stats for each course.

- The first three people to find a solution to this map, regardless of how many bounces they took.
- The players that first found a solution to this map, ordered in the amount of bounces they took (3,4,5….)

The main goal is to improve on the scores of others and be the first to figure out the puzzle of how to get a hole in one.

### Controls

The player moves a slider to control the following attributes of the stroke. Use "0.1 degree increments" to allow for finite selections.

- Power - 1-100
- Horizontal Angle (Azimuth) - 0-360
- Arc (Elevation) - 0-360

There should be enough values to make brute forcing the game time consuming. 1000 × 3600 × 3600 = 12,960,000,000 (13 Billion)

### Ghost lines

Since there are only three inputs for every hole, when the user takes a shot, we can send these three values to the cloud and record it. Then run a simulator to see if it was a successful hole in one for global leader board scoring. Then we have a "pack" of data of every shot other players have made on this course. Before the map the game downloads this pack to generate the ghost lines for the map.

We only need to store the first time a shot was taken with the 3 values.

See example of ghost lines from this video of track mania <https://www.youtube.com/watch?v=Dw3BZ6O_8LY&t=24s>

### Physics

The physics is deterministic (no random)

### Maps / Course

The main branch of the campaign will be human-created courses to ensure that the quality is high and they slowly introduce concepts, etc…

There should also be an infinity level of procedurally generated content using a user entered seed. This allows players to try and find their own seed that has not been used by others and get the hole in one on a map that no one has found the solution for yet.

Maybe a ladder, where there is 1 bounce course, then 2, then 3, etc… Lets see what a 50 bounce course looks like.
