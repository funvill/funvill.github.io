---
layout: post
title: Wordpress Post via email (wp-mail.php)
date: 2012-07-12 19:08
author: funvill
comments: true
categories: [email, php, Web development, wordpress]
---
For the last few years I have used a plugin called <a href="http://wordpress.org/extend/plugins/postie">postie</a>Â that would let me email automated posts to my blog and they wouldÂ automaticallyÂ get posted for me. It worked great for yearsÂ untilÂ a few months ago (it took me a while to even notice)

I found that the original author had abandoned this project years ago and a another took up the project for a few years and has since abandoned it as well. NotÂ wantingÂ to hunt and peck though his code I searched for an alternative.

I found <strong><a href="https://codex.wordpress.org/Post_to_your_blog_using_email">wp-mail.php</a>Â </strong>a build in to wordpress function to do the same thing. Â It was missing some of the features that I needed but was almost there.

<strong>Notes on setup of wp-mail.phpÂ </strong>
<ul>
	<li>You must post in plain text. RTF or HTML will not work and the body of your email will be stripped from the post. use PLAIN TEXT</li>
	<li>You can force wordpress to check the email box by hitting this url
<em>http://example.com/installdir/wp-mail.php</em></li>
	<li>By default if you send an email from an email account that already has a wordpress account linked to that email. Wordpress willÂ automaticallyÂ PUBLISH that post. Â But if you send an email from an account that does not have publishing access (author) then it will be added with the status of "<em>pending</em>"</li>
	<li>I kept getting this error message when hitting the wp-mail.php check email url. <strong>"Slow down cowboy, no need to check for new mails so often!"Â </strong>This is caused because there is a check in the wp-mail.php file that make sure that you don't call this function more then once every 5 mins. This is hard coded in to the source code. You can remove this limitation by commenting out line 28-29 in Wp-Admin.php.
<pre><span style="color: #339966;">// if ( $last_checked )</span>
<span style="color: #339966;">// wp_die(__('Slow down cowboy, no need to check for new mails so often!'));</span></pre>
</li>
</ul>
