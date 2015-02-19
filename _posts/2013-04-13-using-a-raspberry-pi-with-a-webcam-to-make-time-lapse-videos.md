---
layout: post
title: Using a Raspberry PI with a webcam to make time lapse videos. 
date: 2013-04-13 14:38
author: funvill
comments: true
categories: [Projects, Raspberry PI]
---
<a href="http://www.abluestar.com/blog/wp-content/uploads/2013/04/64807.jpg"><img class="size-thumbnail wp-image-3236 alignright" alt="64807" src="http://www.abluestar.com/blog/wp-content/uploads/2013/04/64807-150x150.jpg" width="150" height="150" /></a>I have made a bunch of timeÂ lapseÂ videos in the past with my Cannon S90 using theÂ <a href="http://chdk.wikia.com/wiki/CHDK">CHDK</a>Â hacked firmware. These videos turn out great and I have very happy with the results. The problem is that I have to leave myÂ expensiveÂ cameraÂ unattendedÂ for hours or days at a time and I am unable to use the camera while it is in use.

A few weeks ago I found a few cheap HD webcams (<a href="http://ncix.com/products/?sku=64807&amp;promoid=1371">HP HD-3110 Autofocus 720p 30FPS Widescreen Webcam</a>) onÂ <a href="http://ncix.com/">NCIX</a>.Â These Webcams work with theÂ <a href="http://www.raspberrypi.org">Raspberry PI</a>Â and consumes a less power then other webcams I have tested in the past.

I wrote up a little bash script that usesÂ <a href="http://www.sanslogic.co.uk/fswebcam/">fswebcam</a>Â to take a picture once every 10 secs and store it on the local disk (SD Card).

<strong>InstructionsÂ </strong>
<ol>
	<li>Connect to your Raspberry PI via SSH terminal</li>
	<li>Update your Raspberry PI
<code>sudo apt-get updateÂ </code></li>
	<li>Install <a href="http://www.sanslogic.co.uk/fswebcam/">fswebcam</a>
<code>sudo apt-get install fswebcam</code></li>
	<li>TestÂ fswebcam. This should take an image from the webcam and store it in your local directory.
<code>fswebcam -d /dev/video0 -l 10 test-fswebcam.jpeg</code></li>
	<li>Write a script forÂ fswebcam and automate
<ol>
	<li>Open up a terminal text editor such as <em>nano</em>
<code>sudo nano timelapse.sh</code></li>
	<li>In the nano editor type the follow script
<code>#!/bin/bash
fswebcam -d /dev/video0 -l 10 test-%Y-%m-%d--%H-%M-%S.jpeg</code></li>
	<li>Use [ctrl]+[x] to save and close this file.</li>
</ol>
</li>
	<li>Change the scripts permissions to allow forÂ execution
<code>chmod +x timelapse.sh</code></li>
	<li>Run the script
<code>./timelapse.sh</code></li>
</ol>
