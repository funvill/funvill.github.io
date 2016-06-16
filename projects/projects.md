---
layout: page
title: List of past projects
---

<ul>
{% for node in pages_list %}
  {% if node.title != null %}
    {% if node.layout == "project" %}
      <li><a href="{{ node.url }}">{{ node.title }}</a></li>
    {% endif %}
  {% endif %}
{% endfor %}
</ul>
