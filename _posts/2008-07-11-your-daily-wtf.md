---
title: "Your daily WTF"
date: 2008-07-11 14:26:00
slug: your-daily-wtf
categories:
  - Tips
tags:
  - code
  - journal
excerpt: "A code-review WTF: a sleep loop written as for(int i=0; i<PAUSE_LENGTH; i++) { i++; }."
---
I found this today while doing code review.

it was ment to be a sleep timer...
I just about shit a brick when I saw this.
<blockquote>
<pre>for(int i=0; i&lt;PAUSE_LENGTH; i++)
{
i++;
}</pre>
</blockquote>
