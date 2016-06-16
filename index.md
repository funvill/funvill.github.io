---
layout: default
title: Home
published: true
---

This is the main page. This should have some introduction about what I do and some directions on where to go next..

## Projects

<ul>
{% for project in site.pages reversed %}
 {% if project.title != null %}
  {% if project.layout == "project" %}
   <li><a href="{{ project.url }}">{{ project.title }}</a> 
   {% if project.excerpt != null %}
   - {{project.excerpt}}
   {% endif %}
   </li>
  {% endif %}
 {% endif %}
{% endfor %}
</ul>

## [Instagram](instagram.com/funvill) 

<!-- SnapWidget -->
<script src="https://snapwidget.com/js/snapwidget.js"></script>
<iframe src="https://snapwidget.com/embed/189896" class="snapwidget-widget" allowTransparency="true" frameborder="0" scrolling="no" style="border:none; overflow:hidden; width:100%; "></iframe>
