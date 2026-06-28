---
title: "CakePHP - Disable validation in controler"
date: 2009-12-10 14:52:00
slug: cakephp-disable-validation-in-controler
categories:
  - Development
tags:
  - php
  - code
  - tutorial
  - web
excerpt: "A one-line CakePHP trick to skip model validation in a controller so you can update legacy records full of bad data."
---
When upgrading an old web application to start using CakePHP but the old systems was riddled with invalid data. When the creating the CRUD system I need a way of updating this invalid data.

The following line of code will disable the validation in the controller.

<code>$this-&gt;Story-&gt;validate = array(); // Stop valadation on the story.</code>

Source: <a href="http://stackoverflow.com/questions/1766862/cakephp-save-with-a-table-where-the-primary-key-is-not-id/1767133">Cakephp Save with a table where the primary key is not €˜id&quot;</a>
