---
layout: page
title: List of past projects
---

{% for project in site.pages reversed %}
 {% if project.title != null %}
  {% if project.layout != project %}
   * [ {{ project.title }} ]({{ project.url }})
  {% endif %}
 {% endif %}
{% endfor %}
bottom v5