---
layout: single
title: Idea 47 - Weekly Scavenger Hunt
date: '2023-03-12 00:47'
categories: ideas
tags: ML scavenger-hunt game projects ideas
excerpt: An automatically weekly generated global scavenger hunt with leaderboard
---

## One Line Pitch

An automatically weekly generated global scavenger hunt with leaderboard

## Description

Every Saturday at noon, a website automatically generates a list of 15 random objects. Your goal is to collect all of these objects and take a selfie or team photo with all these objects in frame and visible.

Points are provided based on how quickly a validated image gets uploaded to the server. A leader board is shown for all the players playing. No prizes, just a leaderboard.

The whole thing must be end-to-end automated. No human interaction.

The data set that is used for the random object is the [Microsoft Common Objects in Context](https://paperswithcode.com/dataset/coco) (MS COCO). This includes common names and images of many different objects.

The random number generator to determine what 15 objects are selected from the data set is [https://www.random.org/](https://www.random.org/) guaranteed to be an audible random number.

### When is noon?

Time zones suck, they [really](https://xkcd.com/1883/) [really](https://xkcd.com/1799/) [really](https://xkcd.com/1061/) [suck](https://xkcd.com/1335/). There are few things that have caused as much damage as timezones.

We will have a different scavenger hunt for every timezone. The user enters a city or timezone to see the current scavenger hunt items. Use [Time And Date](https://www.timeanddate.com/) to look up the city vs timezone.

You gain an extra hour or lose an hour based on daylight saving. I hate daylight savings too.

### Validation

Use one of the many image classification ML system lists on [Hugging face image classification page](https://huggingface.co/docs/transformers/tasks/image_classification). The user uploads a photo to our servers and the script tries to identify all the objects in the photo then checks to see if these objects match what was in the scavenger hunt photo.

We ask the users if the image can be used for publicity and/or the leader board or research.

If the image can’t detect all the items from the scavenger hunt list and the users say that all the objects are in frame. Then this is a good image to use in future image classification training. (How we make money)

#### Points

Point count starts at 10,080 points and counts down by 1 point per mins until it reaches zero (10,080 is 7 days of mins) The quicker that you upload the validated photo the more points you get.

Leaderboards can be created for many different scenarios; global, per timezone, last year, all time, etc…

#### Abuse and content submission

Have a report button next to any image that is uploaded publicly. Manually check the top few images from each week to ensure that they aren’t breaking the rules.

Sooner or later someone is going to upload photos of photos of the objects, or photoshopped versions of the scavenger hunt objects. We will let the community find these and report them.

#### Unsorted ideas

- Users don't need to submit all the items. Instead they can just submit some. The easy to find items are worth less then the ones that are harder to find.
- Holliday or themed versions. Items around easter are easter themed or xmas themed, etc...
- Instead of people uploading images to a private website the could have to post them on social media with a hashtag. Then we don't need to create accounts we just use the social meida user name.
- Locations as well as objects so people need to leave there house. Generic locations like infront of a tree or near a stop sign.

## Prior art

- [GeoHashing](https://xkcd.com/426/) - In this comic they make a meeting location by combining several variables together. This creates a bouncing meeting location that changes every single day.

## Market

We can make our own image recognition data set from the images that are uploaded and marked as can be used in research. All the images will have tags of what is in them, and we will have hundreds of different common objects labeled.

People who are looking for something fun to do on a saturday, People with kids.
