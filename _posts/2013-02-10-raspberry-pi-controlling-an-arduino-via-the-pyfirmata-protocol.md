---
layout: post
title: Raspberry PI controlling an Arduino via the pyfirmata protocol 
date: 2013-02-10 21:30
author: funvill
comments: true
categories: [Development, Raspberry PI, Tips and Tricks]
---
The <a href="http://reviews.cnet.co.uk/desktops/25-fun-things-to-do-with-a-raspberry-pi-50009851/">Raspberry PI is good for a lot of things</a> from <a href="http://www.engadget.com/2012/09/13/supercomputer-built-from-raspberry-pi-and-lego/">computer clusters</a> to <a href="http://www.instructables.com/id/Raspberry-Pi-GPIO-home-automation/">homeÂ automation</a>Â but its missing a few things such as a <a href="http://learn.adafruit.com/adding-a-real-time-clock-to-raspberry-pi/overview">real time clock</a>, terminal/barrelÂ power connector, or Â Analog pins. Â The ArduinoÂ has analog pins that can be read by the USBÂ virtualÂ serial port from the Raspberry PI.

<img class="alignright size-medium wp-image-3168" alt="2013-02-10 21.31.34" src="http://www.abluestar.com/blog/wp-content/uploads/2013/02/2013-02-10-21.31.34-300x225.jpg" width="300" height="225" />

In <a href="http://ex.ploit.ws/themagpi/The_MagPi_issue_7.pdf">MagPI issue 7</a>, has a greatÂ article on using the firmata protocol toÂ communicateÂ between Â Â Arduino and the Raspberry PI.

<strong>Requirements</strong>
<ul>
	<li>A <a href="http://www.raspberrypi.org/">raspberry PI</a></li>
	<li>AÂ <a href="http://www.arduino.cc/">Arduino</a></li>
	<li><a href="https://www.sparkfun.com/products/512">USB Cable A to B</a></li>
	<li><a href="https://github.com/tino/pyFirmata">pyFirmata</a> pythonÂ libraryÂ (<a href="https://readthedocs.org/projects/pyfirmata/">documentation</a>)</li>
</ul>
<strong>Install and setupÂ </strong>
<ol>
	<li><a href="http://learn.adafruit.com/adafruits-raspberry-pi-lesson-6-using-ssh">Enable SSH on the Raspberry PI</a></li>
	<li>Install <a href="http://learn.adafruit.com/webide/overview">Adafruit Learning System Raspberry Pi WebIDE</a></li>
	<li>Get the required packages:
<pre>sudo apt-get install python-serial mercurial</pre>
</li>
	<li>Install pyFirmata
<pre>sudo apt-get install python-serial mercurial
hg clone https://bitbucket.org/tino/pyfirmata
cd pyfirmata
sudo python setup.py install
cd .. ; sudo rm -r pyfirmata</pre>
</li>
</ol>
<strong>Source codeÂ </strong>

<a href="https://gist.github.com/anonymous/4752636">Read analog pin 1</a>
<pre>import pyfirmata

# Create a new board, specifying serial port
board = pyfirmata.Arduino('/dev/ttyACM0')

# start an iterator thread so that serial buffer doesn't overflow
it = pyfirmata.util.Iterator(board)
it.start()

# set up pins
pin0=board.get_pin('a:0:i')             # A0 Input      (LM35)
pin3=board.get_pin('d:3:p')             # D3 PWM Output (LED)

# IMPORTANT! discard first reads until A0 gets something valid
while pin0.read() is None:
    pass

while True : 
  print "PWM: " + str( pin0.read() ) 
	board.pass_time(1)                  # pause 1 second

board.exit()<span style="font-size: 16px;">Â </span></pre>
