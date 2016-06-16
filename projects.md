---
layout: page
title: List of past projects
---

{% for post in site.projects %}
 {% if post.title != null %}
   * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
 {% endif %}
{% endfor %}

