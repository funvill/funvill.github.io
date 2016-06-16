---
layout: page
title: List of past projects
---

<ul>
{% for project in site.pages reversed %}
 {% if project.title != null %}
  {% if project.layout == 'project' %}
   <li> 
   [ {{ project.title }} ]({{ project.url }})
   
   {% if page.excerpt != null %}
   -  {{page.excerpt}} 
   {% endif %}
   </li>
  {% endif %}
 {% endif %}
{% endfor %}
</ul>