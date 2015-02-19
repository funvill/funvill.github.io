---
layout: post
title: RGB LED POV Globe â€“ Software
date: 2011-05-16 21:07
author: funvill
comments: true
categories: [Projects]
---
<a href="http://www.abluestar.com/blog/wp-content/uploads/2011/05/IMG_3300.jpg"><img class="size-thumbnail wp-image-1481 alignright" title="IMG_3300" src="http://www.abluestar.com/blog/wp-content/uploads/2011/05/IMG_3300-150x150.jpg" alt="" width="150" height="150" /></a>I beenÂ travailingÂ a lot the past few weeks making it hard to work on theÂ mechanicsÂ of this project and with only 50 days left till <a href="http://makerfaire.ca/">Maker Faire</a> I am running short on time.Â TravailingÂ doesn't prevent me from working on the software side of things though but it make it hard to test it. I have created this testing board to use while I finish the mechanics parts.

I created a base class (<em>CFrameBase</em>) for the frame animation thenÂ inheritedÂ from it for theÂ algorithmicÂ generated animations (test patterns, ect...). I also created a frame buffer class thatÂ inheritedÂ fromÂ <em>CFrameBase </em>that isÂ basicallyÂ just a big memory block that you can load via the serial port.

Next I added a <a href="http://www.sparkfun.com/products/9358">blue tooth module</a> so I could load the configurations overÂ wireless via serial. Currently the serial can't keep up with the data rate needed to do even modestÂ frame fate. I will probably end up loading the entire animation in to memory before I start to display it. The draw back of this is that I will only be able to show 19 frames of animation at any given time.

Next I added a <a href="http://www.sparkfun.com/products/9836">Triple Axis Accelerometer</a> (ADXL345)Â and aÂ <a href="http://www.sparkfun.com/products/9990">Gyro</a> (LPR530AL Dual 300), these will help determining the position of the ring as it spins around its axis. I have tested each of these parts on its own but without theÂ mechanicsÂ I can do real world tests. I'm adding in software toÂ manuallyÂ correct for the motors speed as well just in case.

This source code is still a work in progress butÂ functionallyÂ its working.

<a href="http://www.abluestar.com/blog/wp-content/uploads/2011/05/HBDOS_2011-05-16_220511.zip">HBDOS_[2011-05-16_220511]</a>

[nggallery id=4]

<strong>RGB LED POV Globe</strong>
<ol>
	<li><a href="http://www.abluestar.com/blog/rgb-led-pov-globe-research/">RGB LED POV Globe â€“ Research</a><strong>
</strong></li>
	<li><a href="http://www.abluestar.com/blog/rgb-led-pov-globe-%E2%80%93-research-led/">RGB LED POV Globe â€“ Research LED</a></li>
	<li><a href="http://www.abluestar.com/blog/rgb-led-pov-globe-parts-shopping/">RGB LED POV Globe</a><a href="http://www.abluestar.com/blog/rgb-led-pov-globe-%E2%80%93-research-led/"> â€“ Parts shopping</a></li>
	<li><a href="http://http//www.abluestar.com/blog/rgb-led-pov-globe-%E2%80%93-research-other-peoples-projects">RGB LED POV Globe â€“ Research other peoples projects.</a></li>
	<li><a href="http://www.abluestar.com/blog/rgb-led-pov-globe-%e2%80%93-software/">RGB LED POV Globe â€“ Software</a></li>
</ol>
&nbsp;

&nbsp;
