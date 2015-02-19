---
layout: post
title: Getting started with your Raspberry PI
date: 2013-09-10 22:20
author: funvill
comments: true
categories: [Raspberry PI]
---
The Raspberry Pi is a credit-card-sized single-board computer developed in the UK by the Raspberry Pi Foundation with the intention of promoting the teaching of basic computer science in schools

A good place to start is the <a href="http://www.raspberrypi.org/wp-content/uploads/2012/04/quick-start-guide-v2_1.pdf">Raspberry PI quick start guide</a>Â This will describe the different components on the board and what they can be used for.

<strong>Downloading, installing and perparingÂ the Raspberry PI OS</strong>

The Raspberry PI will run several different specialty prepared versions of Linux that have been compiled specifically for the Raspberry PI. The Raspberry PI team have created a image of several different compatible Raspberry PI Operating systems that can fit on a 4gb SD card. They called this imageÂ <em>New Out of Box Software </em>(NOOBS) and it can be <a href="http://www.raspberrypi.org/downloads">downloaded from theÂ Raspberry PI</a> main site. The NOOBS Image makes this whole process a lot easier.
<ol>
	<li>Format your SD card using the SD Card Associationâ€™s formatting tool.Â <a href="https://www.sdcard.org/downloads/formatter_4/ ">https://www.sdcard.org/downloads/formatter_4/Â </a></li>
	<li>Download the NOOBS image file
<a href="http://www.raspberrypi.org/downloads">http://www.raspberrypi.org/downloads</a></li>
	<li>Unpack the NOOBS zip file onto the SD card (in to the root not a sub directory)</li>
	<li>Insert the SD card in to the Raspberry PI, Connect the monitor, keyboard and power.</li>
</ol>
For this tutorial we will be using theÂ Raspbian OS. Raspbian is an unofficial port of Debian Wheezy and has been specifically modified to work with the Raspberry PI. Its also part of the NOOBS image provided by the Raspberry PI team.
<ol>
	<li>On start up you will be asked what OS you want to boot to, Select theÂ Raspbian OS</li>
	<li>After the RaspbianÂ has been installed, Your Raspberry PI should restart and display the Rasppi-Configuration screen. Select "advanced options" from the menu and change the Host name to something unique. The new hostname will not come in to effect until you restart your device.</li>
	<li>Before restarting your Raspberry PI, write down its MAC address (HWaddr) and IP address (inet addr)
<ol>
	<li>From the terminal window type
<pre><span style="color: #008000;">ifconfig</span></pre>
<a href="http://www.abluestar.com/blog/wp-content/uploads/2013/09/ifconfig.png"><img alt="ifconfig" src="http://www.abluestar.com/blog/wp-content/uploads/2013/09/ifconfig-300x151.png" width="300" height="151" /></a></li>
</ol>
</li>
	<li>Restart your Raspberry PI</li>
</ol>
<strong>Connecting to your Raspberry PI with SSH (running headless)Â </strong>

By default theÂ Raspbian OS comes with SSH enabled. This allows us to run the Raspberry PI without a monitor or keyboard (headless) and connect to it from another computer (our laptops) remotely.

If you are on windows you can use Putty (Â <a href="http://www.putty.org/" target="_new">http://www.putty.org</a>Â )Â as your SSH client. MAC and Linux both have built in SSH clients.

The default username is <em>pi</em> and the password is <em>raspberry</em>

<strong>Installing the AdaFruit WebIDE</strong>

The instructions on AdaFruit's website are straight forward with plenty of pictures.

<a href="http://learn.adafruit.com/webide/overview">http://learn.adafruit.com/webide/overview</a>

<strong>Raspberry PI and the GPIO pins</strong>

More details: <a href="http://www.abluestar.com/blog/raspberry-pi-and-the-gpio-pins/">http://www.abluestar.com/blog/raspberry-pi-and-the-gpio-pins/</a>

<strong>HardwareÂ </strong>

<a href="http://www.abluestar.com/blog/wp-content/uploads/2013/02/2013-01-31-23.07.11.jpg"><img class="alignright" alt="Home made Raspberry PI GPIO ribbon cable" src="http://www.abluestar.com/blog/wp-content/uploads/2013/02/2013-01-31-23.07.11-225x300.jpg" width="225" height="300" /></a>The Raspberry PI has a 26pin mail connector that connects to its GPIO pins. These ribbon cables and breakout boards can be found onÂ <a href="http://www.adafruit.com/products/862">adafruit.com</a>Â ($2.95) andÂ <a href="https://www.sparkfun.com/products/11489">Sparkfun</a>Â ($2.95)

You can also make your own.Â <a href="http://www.raspberrypi.org/archives/1404">Hardware lesson with Gert: make your own ribbon cable connector</a>.

<strong>Source codeÂ </strong>

Since I am usingÂ <a href="https://bitbucket.org/">bitbucket</a>Â <a href="https://github.com/funvill/RaspberryPIExamples/tree/master/examples">all my source code is public</a>. I created a few learning scripts to understand how the GPIO pins work on the Raspberry PI. The first script I made was a simpleÂ <a href="https://bitbucket.org/funvill/my-pi-projects/src/d0ebc27c2dd1/examples/Blinky.py?at=master">blinking LED</a>, just like theÂ <a href="https://gist.github.com/anonymous/4728721">arduino blinking LED script</a>. Next was to read theÂ <a href="https://bitbucket.org/funvill/my-pi-projects/src/d0ebc27c2dd1/examples/DigitalRead.py?at=master">current state of a switch</a>Â and print the results to the screen.

This image wasÂ tremendouslyÂ helpful in figuring out what pins go where<a href="http://www.abluestar.com/blog/wp-content/uploads/2013/02/Raspberry-Pi-GPIO-Layout-Revision-1-e1347664808358.png"><img alt="Raspberry-Pi-GPIO-Layout-Revision-1-e1347664808358" src="http://www.abluestar.com/blog/wp-content/uploads/2013/02/Raspberry-Pi-GPIO-Layout-Revision-1-e1347664808358-300x141.png" width="300" height="141" /></a>

<code># Blinkly Script
# This script will blink a LED ON and OFF again.
#
# Created on Feb 2, 2013 by Steven Smethurst
# Version: 1.00
#
# Directions
# Connect a LED between Pin 6 ( Ground) and pin 12 (GPIO18)
#
from time import sleep
import RPi.GPIO as GPIO
# print about info
print "Blinky script, v1.0"
GPIO.setmode(GPIO.BOARD)
GPIO.setup(12, GPIO.OUT )
while 1:
GPIO.output(12, GPIO.HIGH )
sleep(1)
GPIO.output(12, GPIO.LOW )
sleep(1)
</code>
