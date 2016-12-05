---
layout: default
title: Home
published: true
---

# Welcome
I make things, sometimes they are awesome things.

## <i class="fa fa-file" aria-hidden="true"></i> [Recent posts](/archive)

<ul>
{% for post in site.posts limit: 10 %}
 {% if post.title != null %}
 <li><a href="{{ post.url }}">{{ post.title }}</a> {{ post.date | date: "%B %-d %Y" }}</li>
 {% endif %}
{% endfor %}
</ul>
<a href="/archive">More...</a>

## <i class="fa fa-cubes" aria-hidden="true"></i> [Projects](/projects)

<ul>
{% for project in site.pages reversed %}
 {% if project.title != null %}
  {% if project.layout == "project" %}
   <li><a href="{{ project.url }}">{{ project.title }}</a>
   {% if project.excerpt != null %}
   - {{project.excerpt | strip_html }}
   {% endif %}
   </li>
  {% endif %}
 {% endif %}
{% endfor %}
</ul>
<a href="/projects">More...</a>

## <i class="fa fa-instagram"></i> [Instagram](https://instagram.com/funvill)

<!-- SnapWidget -->
<script src="https://snapwidget.com/js/snapwidget.js"></script>
<iframe src="https://snapwidget.com/embed/189896" class="snapwidget-widget" allowTransparency="true" frameborder="0" scrolling="no" style="border:none; overflow:hidden; width:38rem; "></iframe>
<a href='https://instagram.com/funvill'>More...</a>
