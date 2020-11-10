---
title: Tao of Steven
date: '2017-03-01 00:01'
---

Tao or Dao is a Chinese word signifying 'way', 'path', 'route', 'key' or sometimes more loosely 'doctrine' or 'principle'.

ToDo: Flesh this out with examples and reasons.

## Development

- Backup plan, and Git from DAY 1
- Version number should be easily accessible, if not visible on all pages.
- Use a auto incrementing build number. Never release two programs with the same version and different functionality.
- Write enough documentation that someone not involved in your project can setup a dev environment and make simple changes/deploys/rollbacks
- Have a lot of logging, and a way of easily viewing/sending them. You can always turn logging down fairly easily, but adding it after the fact is a lot more work.
- Eat your own dogfood - Any product/tool that you sell you should also be using. [Why Amazon is eating the world](https://techcrunch.com/2017/05/14/why-amazon-is-eating-the-world/)

### Never Ship a product with out at lest 1 hour of testing

Its late Friday afternoon, we had a working build with a new feature that we just added, all the unit tests worked, and the manual tests of the new features was looking good. So we pushed it to production and did a and shipped it to the customer. When the production build was done, it was already after normal working hours. We wanted to go home, so we didn't manually re-test everything. On monday we returned to work to find an angry email from the customer. The new feature has broken the app, the error was obvious and if we had done even the most basic manual testing we would have caught it.

Always allow for at lest 1 hour of testing before shipping a product.

## Project management

- Code review every single line of code that is added to your codebase. By at lest one person
- Make your _business_ case, not a technical case - go solve peoples problems to save them money or time, Using the latest framework or language maybe interesting but unless it makes it easier to solves the customers problems its not worth doing. [1](https://news.ycombinator.com/item?id=14366305)

## General

- You can only learn new skills when you have the freedom to try new stuff.
- You can read about anything but unless you actually do it, you will never know anything. Also practical work is better then just test jigs
- Bad news early is fixable, bad news late is a disasters
- You may not need the tools to last a lifetime; you buy a cheap set first, and then replace the ones you actually use with the quality ones, for the reasons you explain. This prevents you from spending excess money on tools you don't use. "when you break a tool, replace it with one twice as expensive. When you lose a tool, replace it with one half as expensive."

## DIY

- Always cut away from yourself.

## People

- **Being good at something doesn’t promise rewards.** It doesn’t even promise a compliment. What’s rewarded in the world is scarcity, so what matters is what you can do that other people are bad at. [Source](https://www.collaborativefund.com/blog/a-few-rules/)
- **Don’t expect balance from very talented people.** People who are exceptionally good at one thing tend to be exceptionally bad at another, due to overconfidence and mental bandwidth taken up by the exceptional skill. Skills also have two sides: No one should be shocked when people who think about the world in unique ways you like also think about the world in unique ways you don’t like. [Source](https://www.collaborativefund.com/blog/a-few-rules/)
- **It is way easier to spot other people’s mistakes than your own.** We judge others based solely on their actions, but when judging ourselves we have an internal dialogue that justifies our mistakes and bad decisions. [Source](https://www.collaborativefund.com/blog/a-few-rules/)
