---
layout: single
title: Idea 13 - Speech to Text,  always listening,  ear badge 
date: '2023-02-09 00:13'
categories: ideas
tags: qs audio ai eletronics pcb art projects ideas
excerpt: An electronic badge in the shape of an ear that listens then does speech to text recording using OpenAI Whisper, 24 hours a day. Data is used to create a personalized AI virtual assistant on your own data
---

> This post is part of [the 100 project ideas](https://blog.abluestar.com/projects/2023-100-ideas/) project. [#The100DayProject](https://www.the100dayproject.org/). I am looking for feedback. <a href='#utterances-comments'>Comment</a> below or DM me via social media <a href="https://instagram.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-instagram" aria-hidden="true"></i><span class="label">Instagram</span></a>, <a href="https://twitter.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-twitter" aria-hidden="true"></i><span class="label">Twitter</span></a>.


## One Line Pitch

An electronic badge in the shape of an ear that listens then does speech to text recording using OpenAI Whisper, 24 hours a day. Data is used to create a personalized AI virtual assistant on your own data.

## Description

We live in a world where personalized AI virtual assistants are very close. To build the model for a  personalized AI virtual assistant we need an enormous amount of personal data about a specific person. This is where the [Quantified Self](https://en.wikipedia.org/wiki/Quantified_self) movement comes into play. Tracking, recording your daily life to gain insight into your blind spots.

Recently Open AI released a “good enough” model ([Whisper](https://openai.com/blog/whisper/)) to do real time Speech to text conversions. Using this model on small hardware we could build a device that continuously listens to all conversations around you. Then converts this voice into text. We could in theory record everything someone says all day and store it as a highly compressible text file. A year's worth of conversation data in text format would consume less than 50mb compressed. Think of it as a conversation body cam for yourself.

The text could be geolocated and timestamped, then it could be retrieved for recounting what happened (memory) or analyzed and turned into reports about specific events in your life (analytics). Actions could be extracted from the text and turned into todo lists. “Remember to pick up milk after work today”. or events into a timeline or journal of your day.

Currently the full version of the Open AI Whisper model can run on a Raspberry PI, but smaller versions of the model can run on small microprocessors like R2040. A 1 inch badge, with a microphone, SD card to store the text files, and a battery capable of running for the whole day. The badge itself would look like an ear..

The idea is that in 5 years, you will have 1000s of hours of text communications logs that you can use to generate your own personalized models that could be used in personalized virtual instances that really knows and understands you.

Analyze the data and assign reward labels (more/good, less/bad) to state and transition actions. What triggers you when you get mad, what makes you happy.

### Legal / Morality

- I think this would be only legal in places where one sided recordings are legal.
- Recording people without their prior knowledge is definitely on the line for morality.
- In some places if you have a dash camera and you perform an illegal act the footage can be used against you. The data on this device should be encrypted to prevent self incrimination.

## Prior art

- [I record myself on audio 24x7 and use an AI to process the information. Is this the future?](https://roberdam.com/en/wisper.html), [Hackernews comments](https://news.ycombinator.com/item?id=33608437)
- "Zima Blue" by Alastair Reynolds
- [Little Brother](https://craphound.com/littlebrother/about/) by Cory Doctorow
- Black mirror [The Entire History of You](https://en.m.wikipedia.org/wiki/The_Entire_History_of_You) - The ability to record and playback any moment of your life.  
- Steve Mann’s “EyeTap” augmented reality glasses.

## Market

Quantified selves, people who want a personalized AI virtual assistant. Early adopters. Cyborgs.
