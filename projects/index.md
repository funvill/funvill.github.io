---
layout: page
title: List of past projects
---

<ul>
{% for project in site.pages reversed %}
 {% if project.title != null %}
  {% if project.layout == 'project' %}
   <li><a href="{{ project.url }}">{{ project.title }}</a> 
   {% if page.excerpt != null %}
   - {{page.excerpt}}
   {% endif %}
   </li>
  {% endif %}
 {% endif %}
{% endfor %}
</ul>