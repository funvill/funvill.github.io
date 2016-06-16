---
layout: page
title: Projects
---

## Projects

{% for node in pages_list %}
  {% if node.title != null %}
    {% if node.layout == "project" %}
      <li class="sidebar-nav-item{% if page.url == node.url %} active{% endif %}">
        <a href="{{ node.url }}">{{ node.title }}</a>
      </li>
    {% endif %}
  {% endif %}
{% endfor %}
