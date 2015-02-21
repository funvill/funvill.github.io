---
layout: default
title: Home
---

This is the main page. This should have some introduction about what I do and some directions on where to go next..


## Projects

 - 2015 [Pocket Universe](/projects/pocketuniverse.html) - Mirroed dome.
 - 2014 [Thread map of vancouver](/projects/threadmapofvancouver.html) - Laser cut map of vancouver with GPS heat map of a years worth of travel.
 - 2014 [The Giant Claw Game!](/projects/thegiantclawgame.html) - A large claw game made for Vancouver Maker Faire 2014 

## Posts

{% for post in site.posts %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
{% endfor %}

