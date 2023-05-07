---
layout: single
title: Idea 092 - Command line tools as desktop applications
date: '2023-04-29 01:32'
categories: ideas
tags: tools projects ideas
excerpt: Desktop application UI wrapped around common Windows Linux MacOS command line tools
---

> This post is part of [the 100 project ideas](https://blog.abluestar.com/projects/2023-100-ideas/) project. [#The100DayProject](https://www.the100dayproject.org/). I am looking for feedback. <a href='#utterances-comments'>Comment</a> below or DM me via social media <a href="https://instagram.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-instagram" aria-hidden="true"></i><span class="label">Instagram</span></a>, <a href="https://twitter.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-twitter" aria-hidden="true"></i><span class="label">Twitter</span></a>.

## One Line Pitch

Desktop application UI wrapped around common Windows/Linux/MacOS command line tools

## Description

### The problem, “gap”

A lot of computer users are afraid of the command line. It makes them feel uncomfortable and it is intimidating to the point that people just won’t ever even try to use the command line. This same group prefers to use a desktop application then ever touching a command line tool. 

There are a lot of wonderfully powerful command line tools that can solve everyday problems. This group is missing out on these tools because of their fear of the command line.

### The solution, product

Create a desktop application that wraps the functionality of a command line tool with a friendly UI, with helpful instructions.

Use the [ElectronJS](https://www.electronjs.org/) framework for apps allows for cross platform to Windows, MacOS, and Linux by default.

Use a [Material](https://m3.material.io/) as a UI/UX/component framework to create a unified style for the desktop application. [Figma](https://www.figma.com/) supports Material framework for generating great looking frontends. The great thing about using Figma is that you can outsource the UX/UI design to people that are good at it.

Create a single codebase for all the command line tools. The backend of this application creates an API for each tool. The front end interacts with the backend using this API, and the backend performs the actions of the command line tool. 

Create a custom UI frontend for each command line tool.

When you push a code change or a new version a CI/CD pipeline is used to build the individual applications for each tool and hard code the front end (users can’t change it) with the same backend. One codebase produces dozens if not hundreds of applications. Each tool would have three separate binaries generated for it (Windows, MacOS, and Linux). 9 tools = 27 separate binaries. 

Having a single codebase should help with keeping everything feeling cohesive.

Having separate applications/binaries for each command line tool allows you to sell each application individually.

#### Tools

- **tree** - Displays all the files and folders in a tree that can be expanded. Add options to show the file size, creation date, type of file, allow for filtering on. Allow the tree to be printed to PDF for including in manuals.
- **find/[fd](https://github.com/sharkdp/fd)** - Fuzzy search for files. Allow for looking in files by their file name or for a string within the files. Allow for simple templates for the fuzzy search. “?” for exactly one any character, “*” for one or more of any character.
- **DNS client / Nslookup / [dog](https://github.com/ogham/dog)** - A DNS client for the computer that looks up the DNS records for a domain. Including the contact information and the server information. A AAAA NS MX TXT records.
- **netstat** - What program is using what sockets ports UDP/TCP.
- **Systeminfo** - Create a report of all the hardware and software that is installed on your computer. Like a snapshot of its current state.
- **ipconfig / ifconfig** - Show your adapter settings, allow for release and renew of adapters, or manually setting the adapters ip addresses.
- **Assoc** - Associate file extensions with applications so that the user can double click them and open them up directly.
- **Tracert** - Tell how many computers are between you and another computer on the internet.
- **hosts** - Updates the local host file.
- **Ping** - Tell you how long it takes to communicate with another computer. Provides reports of uptime and downtime. Graphs the response time over a period of time. This can also be used as a speed test for your computer.
- **nmap** - A tool for scanning and probing networks and hosts for security and discovery purposes.

There are literally 1000s of commands that could be converted to a desktop application.
[Windows command line tools](https://www.lifewire.com/list-of-command-prompt-commands-4092302)

Depending on the license of the [NPM package](https://www.npmjs.com/), we could also wrap NPM packages in desktop applications.

We could reach out to NPM package developers and show them the tool that we created using their NPM package. Offer to do a profit share with them. We release the desktop application, they keep working on the NPM package and advertise the desktop application. We split the profit 50/50. Open source gets sponsored for the hard work that they do.

Have two pricing options. Sell each tool as a high, one time fee, unlimited license, free upgrades forever. $50 (10x the subscription rate). Sell access to the entire collection of tools as a low subscription rate. $5 a month. We want the subscription, but we want people to see the “value” of the subscription compared to the single one time fee. False sense of choice.

Ensure that every tool gets a minor update every 6 months. This means holding back new features and bug fixes to ensure that the tools are updated on a regular basis. Ideally we would like the tool to seem like it is constantly being updated so they feel like they are getting value.

Follow [Signal](https://github.com/signalapp/Signal-Desktop/releases/tag/v6.16.0) pattern for their release notes. Nonsense, no information “Hard at work fixing bugs and making other performance improvements to keep the app running smoothly for you.” to seem like we are updating the apps frequently.

All the tools should prompt the user for updates on start up. This allows the tools to call home with usage stats. This notifies the users that there are updates to the tools.

Try and publish all the tools in the app stores for each OS.

Ensure that there is good help included in each tool. Preferably when they look for help it opens their browser window and sends them to our website. This allows the website to have lots of content and should help with SEO. We can also see what people are struggling with and improve the tool UI/UX or the help page.

## Prior art

- [Sysinternals](https://learn.microsoft.com/en-us/sysinternals/) and [Microsoft PowerToys](https://learn.microsoft.com/en-us/windows/powertoys/) are great interfaces and tools for the OS level configurations.
- [Dropbox](https://www.dropbox.com/home) is a fancy version of ‘rsync’.
- [Pingdom](https://www.pingdom.com/) is a fancy version of ‘ping’.
- [Beyond Compare](https://www.scootersoftware.com/) is a fancy version of ‘diff’.
- [GitKraken](https://www.gitkraken.com/) is a fancy version of ‘git’.
- [SpaceMonger](https://www.stardock.com/products/spacemonger/) is a fancy version of ‘tree’

## Market

The target market for this product is computer users who prefer to use desktop applications and are intimidated by the command line interface. This includes individuals and businesses that use Windows, MacOS, and Linux.
