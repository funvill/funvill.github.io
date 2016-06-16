---
layout: page
title: List of past projects
---

{% for project in site.projects %}
 {% if project.title != null %}
   * {{ project.date | date_to_string }} &raquo; [ {{ project.title }} ]({{ project.url }})
 {% endif %}
{% endfor %}
bottom v3
