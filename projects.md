---
layout: page
title: List of past projects
---

{% for projects in site.projects %}
 {% if projects.title != null %}
   * {{ projects.date | date_to_string }} &raquo; [ {{ projects.title }} ]({{ projects.url }})
 {% endif %}
{% endfor %}
bottom v2
