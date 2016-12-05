---
layout: page
title: Blog Archives
---
{% capture written_year %}'None'{% endcapture %}
{% for post in site.posts %}
{% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
{% if year != written_year %}
<h3>{{ year }}</h3>
{% capture written_year %}{{ year }}{% endcapture %}
{% endif %}
<h4><a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a> {{ post.date | date: "%B %-d" }} </h4><p>{{ post.excerpt | strip_html | truncate: 160 }}</p>
{% endfor %}