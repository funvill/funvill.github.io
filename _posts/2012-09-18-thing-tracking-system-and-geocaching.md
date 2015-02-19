---
layout: post
title: Thing tracking system and GeoCaching
date: 2012-09-18 23:29
author: funvill
comments: true
categories: [development, Games, geocoin, Interesting, Projects, software, things, tracking, Vancouver]
---
<a style="color: #ff4b33; line-height: 24px; font-size: 16px;" href="http://www.abluestar.com/blog/wp-content/uploads/2012/09/2012-09-08-14.23.18.jpg"><img class="alignright size-medium wp-image-2847" title="2012-09-08 14.23.18" src="http://www.abluestar.com/blog/wp-content/uploads/2012/09/2012-09-08-14.23.18-225x300.jpg" alt="" width="225" height="300" /></a>

The past few weeks I have been doing a lot ofÂ <a href="http://en.wikipedia.org/wiki/Geocaching">GeoCaching</a>Â in and aroundÂ <a href="https://maps.google.ca/maps?q=Vancouver,+BC&amp;hl=en&amp;ll=49.261307,-123.113823&amp;spn=0.20053,0.528374&amp;sll=49.257735,-123.123904&amp;sspn=0.200544,0.528374&amp;hnear=Vancouver,+Greater+Vancouver+Regional+District,+British+Columbia&amp;t=m&amp;z=12">Vancouver, BC</a> (<a href="http://www.geocaching.com/profile/?guid=ea926a4d-f0ec-430b-806c-62e22649e768">funvill</a> on <a href="https://www.geocaching.com/">Geocaching.org</a>). There are 1000s of Geo Caches with in a 45 min bike ride aroundÂ Vancouver.

I have found about 25 different caches. Most of the caches have only been bigÂ enoughÂ to house a sheet of paper so you can sign your name to it. While others are largeÂ enoughÂ toÂ containÂ a fewÂ trinketsÂ that you can take and some space to leave a few things. A common thing to leave isÂ <a href="http://en.wikipedia.org/wiki/Geocoin">GeoCoins</a>.
<blockquote>AÂ <strong>geocoin</strong>Â is a metal or wooden coin minted in similar fashion to aÂ <a title="Medallion" href="http://en.wikipedia.org/wiki/Medallion">medallion</a>,Â <a title="Token coin" href="http://en.wikipedia.org/wiki/Token_coin">token coin</a>, militaryÂ <a title="Challenge coin" href="http://en.wikipedia.org/wiki/Challenge_coin">challenge coin</a>Â orÂ <a title="Wooden nickel" href="http://en.wikipedia.org/wiki/Wooden_nickel">wooden nickel</a>, for use inÂ <a title="Geocaching" href="http://en.wikipedia.org/wiki/Geocaching">geocaching</a>.

Many of them are made to be trackable on various websites to be able to show the movement around the world and visitors to be able to leave comments when they find the coin.</blockquote>
<a href="http://www.abluestar.com/blog/wp-content/uploads/2012/09/120809-stick2.jpg"><img class="alignleft size-full wp-image-2848" title="120809-stick2" src="http://www.abluestar.com/blog/wp-content/uploads/2012/09/120809-stick2.jpg" alt="" width="300" height="253" /></a>I really liked the idea of the GeoCoins I have been taking any of the GeoCoins that I find and moving them around the city.

Around my 20th find I started to think about creating my own GeoCoins withÂ <a href="http://vancouver.hackspace.ca/wp/">VHS's</a> Laser cuter. I looked in to obtaining some tracking codes that I could use for my coins.

The main site for Geo Caching is GeoCaching.org and for a tracking code it<a href="http://support.groundspeak.com/index.php?pg=kb.page&amp;id=332"> costs $100 set up fee plus $1.50 per tracking code with a minimu of 50 tracking codes</a> that must be purchased. $175 just for the tracking codes. That does not include the coins and the designs of my coins would have to be approved by GeoCaching.org before I could print them.Â I looked in to some <a href="https://secure40.securebuyers.com/~geocoins/buycoins.php">local GeoCoin producers</a> and the coins can cost anywhere from $10-$50 each. So for the whole process I could be paying anywhere from $675-$2675

<a href="http://www.abluestar.com/blog/wp-content/uploads/2012/09/orbit-back4.jpg"><img class="alignright size-medium wp-image-2849" title="orbit-back4" src="http://www.abluestar.com/blog/wp-content/uploads/2012/09/orbit-back4-300x249.jpg" alt="" width="300" height="249" /></a>That was well out of my price range for a hobby I just started. Because of the prohibitingÂ costs a lot of the coins that I found did not have tracking codes on them.

So I decided to make my own <a href="http://www.abluestar.com/utilities/thing/?act=view&amp;id=19">Thing tracking system</a>. Â Its far from done but it has the basics. The ability to add new <em>things</em> to the system with descriptions (using <a href="http://en.wikipedia.org/wiki/Markdown">markdown</a>). Anything that is added to the system isÂ automaticallyÂ given a tracking code. Anyone with the tracking code can add comments (with pictures) to the page with the description of the "<em>thing</em>".

I am planning on adding
<ul>
	<li><a href="http://en.wikipedia.org/wiki/Geolocation">Geo Location</a> data to the comments and description of the "<em>things</em>".</li>
	<li>Visitor tracking to give people stats on how much the "<em>thing</em>" has traveled.</li>
	<li>Global stats page to highlightÂ popularÂ "<em>things</em>".</li>
	<li><a href="http://oauth.net/">OAuth login</a> system to edit "<em>things</em>" that you have added to the system.</li>
	<li>TheÂ abilityÂ toÂ categoriesÂ "things" usingÂ <a href="http://schema.org/">schema.org</a>Â organizationÂ structure of data.</li>
	<li>TheÂ abilityÂ to tag "<em>things</em>" with keywords to make them easier to search.</li>
	<li>The ability to subscribe toÂ notifications on comments, or updates to the description.</li>
</ul>
ObviouslyÂ this is<a href="http://en.wikipedia.org/wiki/Feature_creep"> feature creep</a> for this project. But it does give me an avenueÂ to play with some new web technologiesÂ that have emerged over the past few years.

Now that the tracking system is in its beta stage I can move on to designing my first GeoCoins.
