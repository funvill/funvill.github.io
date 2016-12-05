---
layout: page
title: Blog Archives
---
<ul>
{% capture written_year %}'None'{% endcapture %}
{% for post in site.posts %}
    {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
    {% if year != written_year %}
        </ul>
        <h3>{{ year }}</h3>
        <ul>
        {% capture written_year %}{{ year }}{% endcapture %}
    {% endif %}
    <li>{{ post.date | date: "%B %-d" }} <a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a> <br />{{ post.excerpt | strip_html | truncate: 160 }}</li>
{% endfor %}
</ul>