---
title: "Fatal error: Call to undefined function: php_info() in /home/*/public_html/info.php on line 2"
date: 2010-04-21 13:35:00
slug: php_info-fatal-error-call-to-undefined-function-php_info-in-homepublic_htmlinfo-php-on-line-2
categories:
  - Tips
tags:
  - code
  - tutorial
  - php
excerpt: "A quick fix for a PHP fatal error caused by calling php_info() instead of phpinfo()."
---
<strong>Source code:</strong>
<code>&lt;?php
php_info();
?&gt;</code>

<strong>Error message:</strong>
<code>Fatal error: Call to undefined function: php_info() in /home/tim/public_html/test.php on line 2</code>

<strong>Answer:</strong>
Because it's <strong>phpinfo</strong>(); and not <em>php_info</em>();
