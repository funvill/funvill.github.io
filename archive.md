---
layout: page
title: Blog Archives
---
<ul>
{% for post in site.posts %}
 {% if post.title != null %}
 <li>{{ post.date | date_to_string }} <a href="{{ post.url }}">{{ post.title }}</a></li>
 {% endif %}
{% endfor %}
</ul>