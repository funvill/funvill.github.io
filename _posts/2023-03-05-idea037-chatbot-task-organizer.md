---
layout: single
title: Idea 037 - Chatbot Task Organizer
date: 2023-03-05 00:37:00
categories: ideas YearOfIdeas
tags: asstaint ai projects ideas
excerpt: A chatbot that can organize simple tasks by date, location, or person
---

> This post is part of [the 100 project ideas](/projects/2023-100-ideas/) project. [#The100DayProject](https://www.the100dayproject.org/). I am looking for feedback. <a href='#utterances-comments'>Comment</a> below or DM me via social media <a href="https://instagram.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-instagram" aria-hidden="true"></i><span class="label">Instagram</span></a>, <a href="https://twitter.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-twitter" aria-hidden="true"></i><span class="label">Twitter</span></a>.

## One Line Pitch

A chatbot that can organize simple tasks by date, location, or person

## Description

This is an MVP. as small of an app as possible to start testing ideas. Just enough to get the basics down to be able to see if this is a good idea.

Create a chatbot for all the major platforms. Start with whatsapp, and move on to other platforms later on.

When you wake up the chatbot greets you and asks you what you have planned for the day. The user then responds with several statements describing their day and the tasks that they have to accomplish.

- **Chatbot:** Good morning, What do you have planned for the day?
- **User:** I got work at 9am, gotta get the kids off to school and make their lunches, I gotta figure out something for dinner tonight. Probably call my mother to see how she is doing. I hope it doesn’t rain today so I can take a walk later on. Oh and it's Jerry’s birthday on 27th. I need to get him a gift.

The goal of the chatbot is to take the text, parse it to find the tasks that need to be done, then create a list of reminders for the user throughout the day.

For example the chatbot could extract the following tasks out of this text.

- “I got work at 9am”
  - Sets a reminder for when the user needs to leave the house so that they can get to work on time. A reminder is a message from the Chatbot a few mins before they would have to work.
  - **Chatbot:** Reminder: You have 10 mins before you need to leave the house to get to work on time.
- “Gotta get the kids off to school and make their lunches”
  - **Chatbot:** Reminder: You have 10 mins before your kids need to leave the house to get to school on time.
  - The lunch party is tricker in the future. It could offer suggestions for the kids lunches.
- “I gotta figure out something for dinner tonight”
  - Offers a few suggestions on dinner ideas. This task can wait until after the morning schedule is done.
- “Probably call my mother to see how she is doing.”
  - This task can wait until the user is not so busy, they can also push this task to another day if they don’t have the energy to do it.
- “I hope it doesn’t rain today”
  - Not a task. Just information.

If the chatbot needs more information to classify the task it will ask follow up questions.

- **Chatbot:** How long does it normally take to get to work?
- **Chatbot:** When do you need to leave the house to get the kids to school on time?
- **Chatbot:** Do you have anything you need to use in the fridge for dinner?
- **Chatbot:** What would be a good time of day to call your mother?

Each task needs the following information

- When - When to remind them of the task. In most cases the tasks are one and done, while other tasks could be repeated daily (such as getting to work) or yearly (such as a birthday)
- What - This is the description of the task. For the first version it can be the text that the user used when creating the task.

After the user describes its morning taks. The Chatbot can go through any stored tasks that need to be done today. Like an agenda, etc...

All text sent to the charbot is stored for use when the chatbot gets smarter. Then it should be able to recall information that it has already given to make better decisions on advice for the users.

When asking the user for information we can show them the task in a format that is easier for the chatbot to understand

When: at 9am today, What: I got work at 9am

The goal is to start small and work up from there adding more features as you go along.

See [Idea 30 - Chatbot Journaling](https://blog.abluestar.com/idea030-chatbot-journaling/), and [Idea 13 - Speech to Text, always listening, ear badge](https://blog.abluestar.com/idea013-speech-to-text-always-listening-ear-badge/)

## Prior art

Google assistant, Apple Siri, Microsoft Cortana

Big competitors that have huge budgets and massive teams dedicated to this type of task.

## Market

If this could be done right, I could see a very large group of people wanting this type of application
