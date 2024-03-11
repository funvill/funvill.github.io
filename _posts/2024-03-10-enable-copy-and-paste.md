---
title: "Enable copy and paste on website that disable copy and paste"
date: 2024-03-09 00:01:00
excerpt: A tutorial on how to enable copy and paste on website that disable copy and paste. Specifically BrimFinancial
categories:
- Tips
- devlopment
tags:
- security
---

I hate it when web sites and web applications prevent me from being able to paste text into input fields. I use a [password manager](https://www.pcmag.com/how-to/why-you-need-a-password-manager-and-how-to-choose-the-right-one) and every website gets its own specific email address and password. If I have to type in my password it's guaranteed to be less secure then anything that my password manager would generate.

They think they are making their websites more secure but are in fact just annoying normal users.

I got angry enough with [BrimFinancial](https://brimfinancial.com/) to create my own [TamperMonkey](https://www.tampermonkey.net/) script specifically to bypass their copy and paste prevention.

Specifically *FUCK YOU* BrimFinancial

```js

// ==UserScript==
// @name         Enable copy and paste
// @namespace    http://tampermonkey.net/
// @version      2024-03-10
// @description  This script enables copy and paste. Has specificall functionality for Brim Financial
// @author       Steven Smethurst
// @match        http://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=brimfinancial.com
// @grant        none
// ==/UserScript==


function clearEventListeners() {
    document.oncontextmenu = undefined;
    document.oncopy = undefined;
    document.oncut = undefined;
    document.onpaste = undefined;
    document.onselectstart = undefined;

    document.onkeydown = function(){return true;};
    window.onkeydown = function(){return true;};

    document.body.removeAttribute("oncopy");
    document.body.removeAttribute("ondrag");
    document.body.removeAttribute("oncontextmenu");
    document.body.removeAttribute("onselectstart");

    // Needed specifically for brimfinancial
    document.body.removeAttribute("onkeydown");
    

    document.body.addEventListener("contextmenu", function (e) { e.stopPropagation(); e.stopImmediatePropagation(); });
    document.body.addEventListener("contextmenu", function (e) { e.stopPropagation(); e.stopImmediatePropagation(); return false; }, true);
}

(function() {
    'use strict';

    // Your code here...
    clearEventListeners();
})();
```

This public script also works [Absolute Enable Right Click Copy](https://greasyfork.org/en/scripts/23772-absolute-enable-right-click-copy)
