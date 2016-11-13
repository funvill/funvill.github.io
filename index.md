---
layout: default
title: Home
published: true
---

# Welcome! 


## Recent posts

<ul>
{% for post in site.posts limit: 7 %}
 {% if post.title != null %}
 <li>{{ post.date | date_to_string }} <a href="{{ post.url }}">{{ post.title }}</a></li>
 {% endif %}
{% endfor %}
<li><a href="/archive">More...</a></li>
</ul>

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
<li><a href="/projects">More...</a></li>
</ul>

## [Instagram](https://instagram.com/funvill)

<!-- SnapWidget -->
<script src="https://snapwidget.com/js/snapwidget.js"></script>
<iframe src="https://snapwidget.com/embed/189896" class="snapwidget-widget" allowTransparency="true" frameborder="0" scrolling="no" style="border:none; overflow:hidden; width:100%; "></iframe>
<a href='https://instagram.com/funvill'>More...</a>
