---
title: Idea 026 - Digger game
date: 2023-02-22 00:26:00
categories: ideas YearOfIdeas
tags: game projects ideas
excerpt: Resource management, worker placement, exploration tile game. 
---

> This post is part of [the 100 project ideas](/projects/2023-100-ideas/) project. [#The100DayProject](https://www.the100dayproject.org/). I am looking for feedback. <a href='#utterances-comments'>Comment</a> below or DM me via social media <a href="https://instagram.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-instagram" aria-hidden="true"></i><span class="label">Instagram</span></a>, <a href="https://twitter.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-twitter" aria-hidden="true"></i><span class="label">Twitter</span></a>.

## One Line Pitch

Resource management, worker placement, exploration tile game.

## Description

You need to explore the map to find the minerals that you need to buy the workers, and the diggers to get more minerals.

Very similar to catan, but the diggers are upgradable, It still needs some more unique features that don’t make it too much more complicated.

- Each player starts with 2x workers, 1x Digger, and some starting resources.
- At the start of each turn, a dice is rolled, resources are paid out to players who have diggers and workers on resources with matching number (similar to Catan)
- A player uses their workers to perform actions. Each worker can perform one action, the more workers you have the more actions you can take.
- The goal is to make the most money via resources before the end of the game.

## Actions

These are the actions that a worker can perform.

- **Build Road** - Put a road tile down on the map. If the road meets the end of the map, flip a newly discovered tile over.
  - Building roads consumes gravel resources.
  - Roads can't be built in parallel, meaning if another player already build a road on this segment you can’t.
- **Move a digger** - Put a digger on an unclaimed mineral tile, or move a digger from one claim to another
  - This claims the mineral for yourself.
  - A road must be constructed from the warehouse to the mineral tile before you are able to claim it.
  - Diggers can be moved from one resource to another.
- **Get Gravel** - Gets gravel resources.
  - Get 2 gravel this turn, upgrade the digger on the gravel pit to multiple the amount of gravel you get each turn. Gravel is used to build roads. 
- **Upgrade a digger** - Upgrades a digger to the next level
  - Each upgrade progressively costs more resources but produces more resources when the resource title “pays out”  

### Resources

The following resources can be mined from the map. Each resource has a different “value” and is used to purchase or upgrade things in the game. The resources can be traded with the bank or other players 

- Gravel
- Copper
- Iron
- Gold
- Etc...

### Game Market

The resources can be used to purchase upgrades or more workers, or traded with the bank for other resources.

- 3x Gold will buy a new worker
- 2x Iron will buy a new digger
- 2x gravel will buy new roads

You can trade with the bank for other resources or with each other. Unlimited trades are allowed on your own turn.

### Items

These are the physical things in the game.

- **Starting tile** - This is the starting title,
  - It has locations for all the starting players
  - A permanent gravel mine, and level 1 digger, and resource counter (1)
    - These are printed on the starting title. The player can not move the digger from the gravel mine.
- **Resource tile** - These titles make up the map.
  - Back side is all the same,
  - Front side is one of the resource or rock
- **Resource counter** - This is a circle with a number on it
  - When the player rolls the dice, the resources that match these counter “pay out”
- **Resource cards** - A card that resprences the resource that has been collected.
  - These cards are given to users when they are “paid out” on the resource titles.
- **Road** - This is a block that represents a road
  - Players use these to build roads from the starting title out to the resources.
  - Once they are played they can not be moved.
- **Digger** - A tile to represent the digger.
  - There are multiple “levels” of diggers.

### Example map

#### Starting map

This is the map at the start of the game, Each player has a gravel pit and a digger.
The Gravel resource counter has a “1” in it.

<img src="/public/uploads/2023/digger_turn1.png " alt="digger_turn1" style="float: center; margin: 10px; border: 1px solid black; padding: 5px"/>

#### After a few turns

<img src="/public/uploads/2023/digger_few_turns.png " alt="digger_few_turns" style="float: center; margin: 10px; border: 1px solid black; padding: 5px"/>

### Rules

- **“Paid out”** - When a player rolls a dice,
  - if
    - Resource counter (on a resource tile) matches the roll of the dice.
    - and a digger on the resource.
  - Then
    - The player with the digger gets paid out the corresponding resource.
      - The amount depends on the level of the digger.
        - Level 1 == 1 resource
        - Level 2 == 2 resource
        - Level 3 == 4 resources
        - Level 4 == 8 resources
        - Etc...
- Only one player can build a road on each path between titles
- Only one player can have a digger on a resource at a time

### Example game play

#### Start up

- Everyone is given their starting resources, workers, and a digger.
- The starting tile is placed in the center of the map. The players are evenly distributed around the outside of the starting tile.

#### Round 1 - Player 1 turn

- Player 1 - Rolls the dice, it shows 5, no resource tiles have the “5” resource counter. Nothing pays out.
- Player 1 - Places one of his two workers on the build road tile and pays (2) gravel.
  - He places the road token on the map out from the starting tile towards the edge of the map.
  - The edge of the road reaches the edge of the map. This allows the player to flip over a new title from the deck and place it on the edge of the map where the road meets the starting tile.
  - The new tile is a resource tile of Iron.
    - Since this player discovered the new resource title he immediately gains 1 of that resource. (iron)
    - The player randomly takes a resource counter from the supply and puts it on the resource title. In this case it is 6
- Player 1 - Places his second worker on the “move a digger” space and moves a digger from his supply at the end of the road on the newly discovered resource (iron)
  - This claims the resource for Player 1.
- Player 1 - Has no more workers and ends his turn

#### Round 1 - Player 2 turn

- Player 2 - Rolls the dice, it shows 1,
  - Every player’s starting gravel pit has a 1 resource counter. Everyone collects a gravel resource.
  - No other resources have a “1” for the resource counter.
- Player 2 - Places one of his two workers on the build road tile and pays (2) gravel.
  - He places the road token on the map out from the starting tile towards the edge of the map.
  - The edge of the road reaches the edge of the map. This allows the player to flip over a new title from the deck and place it on the edge of the map where the road meets the starting tile.
  - The new tile is a resource tile of ROCK… Bad luck
    - Rock does not produce any resources.
- Player 2 - Places his second of his two workers on the build road tile and pays (2) gravel.
  - He places the road token on the map at the end of the last one he placed.
    - It doesn’t reach the edge of the map.
- Player 2 - Has no more workers and ends his turn

### Unsorted notes

Roads need to be made between the mine and the warehouses on the surface. Other players may not use your roads. You can block people from resources by putting down roads.

When a mineral is discovered a resource counter is placed on it. A number from 1-6, if this number is rolled then the resource pays out. To whomever is mining the site at the time.

Only one player can mine a site at a time, the player can use multiple workers to mine a site to increase its payout. To mine a site they need to claim it by moving a digger to it. The payout can be further increased by upgrading the digger.

Diggers can be moved to new mining sites, If there is no digger on a mineral deposit then it is “unclaimed” and someone else can claim it. Diggers must be placed on a mining site.

Workers are cheap, we expect that a game will have dozens of workers.

Roads are cheap, we expect that there will be lots of roads placed on the map in a game

Diggers are expensive, We expect that there will be only a few created per game

Upgrading diggers requires minerals, when a digger is upgraded they extract more minerals per turn.

## Prior art

- Catan

## Market

Boardgame lovers

## Feedback

- I would call it the Excavator Game. kids books always call excavators diggers. Kids always play games switching sounds around. And let me tell you. you only have to hear your kid invent the n word one time. To be like "WE CALL THEM EXCAVATORS IN THIS HOUSE!" (this really happened)
