---
layout: post
title: Our privacy policy: We sell your data. You get our content for â€œfree.â€ Deal?
date: 2010-12-10 12:12
author: funvill
comments: true
categories: [Interesting, Rants, Web development]
---
You have no expectation of privacy. We will collect any and all information you or your computer is willing to give us and do whatever we want with that information. Use of this site is entirely optional. Use at your own risk.

Today on Slashdot they have anÂ articleÂ on <a href="http://yro.slashdot.org/story/10/12/09/1718255/The-First-Truly-Honest-Privacy-Policy?from=rss">privacy policy</a> and it got me thinking about how much information I can collect about you just by viewing some of my content hosted by my server.

<strong>What is my content?</strong>
It could be 'this page' or Image or aÂ JavaScriptÂ that does something interesting or an IFrame or something along thous lines. But it could also be a ad placed on anther persons website or any 3rd party script. just viewing this post exposes your information to at lest three people {Google, Yahoo, Me}

<strong>Three people isn't so bad right?
</strong>Its not too bad but Google could share that information with other 3rd parties and other people could share that info with others. Once it leaves your browser you really don't have control of it any longer. For exampleÂ <a href="http://dictionary.reference.com/">Dictionary.com</a> has <a href="http://blogs.wsj.com/wtk/">240+ trackers</a>

<strong>Why would people do that?</strong>
We give away "free" content but the time it takes to make that content isn't free. We need a way to recoup some of that invested time and the information we collect helps us make better more directed content.

In other words we need to eat, and ads pay very little but could keep us afloat. Also I amÂ <a href="http://en.wikipedia.org/wiki/Greed">greedy</a> andÂ <a href="http://en.wikipedia.org/wiki/Gluttony">gluttonous</a> and I wouldÂ preferÂ to eat <a href="http://www.youtube.com/watch?v=0ikR1H3mh90">lobstered stuffed with tacos</a> instead of <a href="http://en.wikipedia.org/wiki/Ramen">Ramen</a>. So I use your data in anyway that makes me more money and helps me buy more tacos.

<strong>What kind of information do you collect?</strong>
Anything and everything you are willing to give me and I plan to keep it for as long asÂ possibleÂ to reference it back toÂ previousÂ times youÂ visitedÂ to check for changes. Every time you view some of my content IÂ collect more and moreÂ informationÂ about you trying to a better profile of you for myÂ advertisers.

For example;
<ul>
	<li><a href="http://tools.ietf.org/html/rfc2616#page-53">HTTP Get request</a> - Your browser has to make a request of my server for some content this request must contain a bunch of information about your system for me to correctly route it back to you. <a href="http://www.abluestar.com/blog/wp-content/uploads/2010/12/GetRequest.txt">Example</a>, Including;
<ul>
	<li>YourÂ <a href="http://en.wikipedia.org/wiki/MAC_address">MAC address</a> and yourÂ <a href="http://en.wikipedia.org/wiki/IP_address">IP address</a></li>
	<li>Your "<a href="http://en.wikipedia.org/wiki/User_agent">User-Agent</a>"</li>
	<li>A <a href="http://en.wikipedia.org/wiki/HTTP_cookie">cookie</a> if this is not your first visit</li>
	<li>Accept-Encoding, Accept-Language, Accept-Charset, Accept</li>
	<li>What file types you can read "Accept: application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5\r\n"</li>
</ul>
</li>
</ul>
<ul>
	<li><a href="http://en.wikipedia.org/wiki/MAC_address">MAC address</a> andÂ <a href="http://en.wikipedia.org/wiki/IP_address">IP Address</a> - You have to give me this information or I don't know where to send my content to. You could use a <a href="http://en.wikipedia.org/wiki/Proxy_server">proxy</a> or <a href="http://www.torproject.org/">TOR server</a> but that will slow down your requests and people like instantÂ gratification when browsing online. Based off your IP address I know lots of information about you
<ul>
	<li>The <a href="http://en.wikipedia.org/wiki/Internet_service_provider">ISP</a> you are currently using.</li>
	<li>Your location that you are currently browsing the web from. (<a href="http://www.abluestar.com/utilities/what_is_my_ip/where_did_this_ip_addrss_come_from.php">Where does this IP Address come from</a>)</li>
	<li>Your name and exact billing address with a legal "court order"</li>
</ul>
</li>
	<li><a href="http://en.wikipedia.org/wiki/User_agent">User agent string</a> - This is a string that your browser is kindÂ enoughÂ to send us telling us what your browser supports. (<a href="http://www.useragentstring.com/">http://www.useragentstring.com</a>) This string looks like this "Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US) AppleWebKit/534.10 (KHTML, like Gecko) Chrome/8.0.552.215 Safari/534.10" and may seem harmless but when you break it down it tells me a lot about you. I can also use this string to "uniquely Identify you"Â encaseÂ you are using a proxy or a public Wify, ect, because the string is soÂ uniquelyÂ tied to your computer. With this information I can learn the following about you.
<ul>
	<li>What browser you are using</li>
	<li>What operating system, Windows, MAC, Linus, What versions, ect.</li>
	<li>If your software is up to date and how old your equipment is.</li>
</ul>
</li>
</ul>
A lot of thisÂ informationÂ is harmless by its self but the information that it infers about you can help meÂ tremendousness while building a profile of you. After your first visit I can set a cookie to "uniquely Identify you"Â amongÂ all theÂ visitorsÂ to my site. If you don't accept cookies then i can use your MAC address and your user adgent Â to create a pretty good uniqueÂ Identifier.

Now that I have a "uniqueÂ Identifier" for you I can keep a log of all the pages that you visit on my site and all the pages you visit on my "friends" pages where they include my content or any 3rd party that shares there logs with me.Â I can track how long you stay on each page, how big your monitor is, what is your resolution, howÂ oftenÂ you are on line, where you go to getÂ online, what devices you use to get online, who else uses the same devices (who your family members or friends are), ect. ect.

<strong>Your kind of evilÂ aren'tÂ you?</strong>
Nope just hungry.

<strong>Is everyone doing this?</strong>
Most people are collecting this information with out even knowing the value of the information and are only using the top level. (How many people visited this website in this time frame). But all the big guys (Google, Yahoo,Â Microsoft, ect) areÂ exploitingÂ anything they can get from you, anything that they can use to gain an advantage over their competitors. Its safer to justÂ assumeÂ that its happening all the time.

<strong>There has to be lawsÂ againstÂ this kind of thing</strong>
Yes there are laws, mostly to do with trackingÂ childrenÂ under the age of ~13 but as a user it is extreamly hard to tell what information "they" are collecting and even if they say they delete it, it doesn't mean that they did from all their backups or network storage, ect... Or the laws on data retention are pretty toothless.

<strong>Is their anyway to stop them from getting this information?</strong>
Yes, but why do you care? Your getting their content for "free" and they are getting information about you that helps them make better more directed content for you. making yourÂ experienceÂ better. ItsÂ sort-ofÂ kind-ofÂ a "good thing" almost...

But if you really want to stop people from getting your information I suggest going <strong>out side for a walk</strong> or doing anything that does notÂ evolveÂ a computer that is or will ever be connected to the internet.
