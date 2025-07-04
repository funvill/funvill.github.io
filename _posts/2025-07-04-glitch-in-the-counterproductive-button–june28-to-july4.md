---
title: "Glitch in the CounterProductive Button – June 28 to July 4"
date: 2025-07-04 00:01:00
categories:
- projects
tags:
- projects
- art
excerpt: CounterProductive downtime between June 28-July 4
---

The [CounterProductive Button](https://blog.abluestar.com/projects/2025-counterproductive/) experienced downtime between **Saturday, June 28 and Friday, July 4 2025** due to a connectivity issue.

## What Happened

While I was out of town for the week, the button entered an error state and displayed the message: ```W Rec```

This stands for "WiFi Reconnect" and indicates that the device was unable to establish a connection with the server that records button presses. As a result, no presses were logged during this time, and the counter did not increment.

The failure was caused by a network configuration issue that prevented the button from reaching the MQTT server it normally uses to publish updates.

## Why the Project Didn’t End

According to the rules of the project, the button must be pressed regularly to keep the count going. However, I don’t consider this downtime the end of the project. The issue was technical issue, not a failure of participation or interest.

If the button had been functioning properly and no one had pressed it, that would have marked a meaningful end. But this was a system fault, not a social one.

## What’s Changed

As of version 5, now deployed to the button, the following improvements have been made:

- Added backup MQTT server support in case the primary goes down.
- Improved error handling and automatic reconnection logic.
- Added visual feedback to distinguish between network vs. server errors.
- More calls to actions text

## Status

As of *July 4, 2025*, the button is live again and functioning normally.

The count resumes.

The experiment continues.
