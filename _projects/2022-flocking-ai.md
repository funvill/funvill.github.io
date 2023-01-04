---
title       : (2022) Flocking AI
excerpt     : Generating bird images from Mid Journey
post_date   : 2022-08-20 00:00:00
header      :
  teaser    : /public/uploads/flockingai/banner.png
toc         : true
---

<a href='/flockingai/'><img src='/public/uploads/flockingai/facebook-banner.png' style='margin: 10px; padding: 5px; width: 906px;' /></a>

## What is this

<img src='\public\uploads\2022\002-jackson.png' alt='jackson' style="float: right; margin: 10px; max-width: 400px; border: 1px solid black; padding: 5px" >Flocking AI is a project where I am using Artificial intelligence (AI)/Machine Learning (ML) to generate a "Field guide of imaginary birds".

Every day a new generated bird will be posted to social media (<a href='https://twitter.com/FlockingAI'><i class="fab fa-fw fa-twitter" aria-hidden="true"></i> Twitter</a>, <a href='https://www.instagram.com/flockingai/'><i class="fab fa-fw fa-instagram" aria-hidden="true"></i> Instagram</a>, <a class="btn btn-large" href="https://www.facebook.com/FlockingAI/" target="_blank" title="Follow on Facebook"><span><i class="fab fa-fw fa-facebook" aria-hidden="true"></i> Facebook</span></a>). Using the feedback from social media comments, I improve the process I use to generate the images and the descriptions. Iterating on the idea daily and hopefully getting better over time.

At the end of the year I will take the top voted birds and compile them into a printed trade book that I will give out as gifts to my friends and family.

👉 [Gallery of birds](/flockingai/) 👈

<a href='https://www.instagram.com/flockingai/'><i class="fab fa-fw fa-instagram" aria-hidden="true"></i> Instagram</a>, <a href='https://twitter.com/FlockingAI'><i class="fab fa-fw fa-twitter" aria-hidden="true"></i> Twitter</a>, <a href='https://www.facebook.com/FlockingAI/'><i class="fab fa-fw fa-facebook" aria-hidden="true"></i> Facebook</a>

## How I made this project

### The short version

I created a chat bot using [Open IA GPT-3](https://gpt3-openai.com/) and filled it with as much bird information as I can. I have a conversation with this 'bird nerd chat bot' to generate a bio for an imaginary bird. I take this bio and use it as the seed text for text-to-image generator called [Mid Journey](https://www.midjourney.com/). Then I post a new imaginary bird to social media each day.

Each bird has its own unique bio and image all created by AI.

### Long version

### Text and description generation

Each bird has a unique description of what it looks like, where it lives, what it eats and some unique feature about it.

To create this description I created a chat bot using [Open IA GPT-3](https://gpt3-openai.com/). For these models to work you need some example good text to work from. I gave the chat bot the descriptions of real birds from [All About Birds](https://www.allaboutbirds.org/guide/), wikipedia, and a book of bird jokes.

What this created was the most enthusiastic bird nerd you have ever met. All it wanted to talk about is birds. Then I have a conversation with this chat bot, asking it stock questions about a new imaginary bird.

Example: [Milo (Knitted Sparrow)](https://blog.abluestar.com/flockingai/061-milo/)

> **Steven:** We are creating a new field guide to birds, with imaginary birds. First, we need to start with a species name for this bird. What should we call this bird?
>
>> **ChatBot:** The bird’s common species name should be “Knitted Sparrow”
>
>**Steven:** What does it eat? Does it have a favorite food?
>
>> **ChatBot:** The Knitted Sparrow typically feeds on insects, seeds, and berries. It has a particular fondness for coffee beans.
>...

At the end of our conversation I ask the chatbot to summerize what we have talked about into a bio for this imaginary bird. I use this bio, some seed text, keywords when generating the images using [Mid Journey](https://www.midjourney.com/)

**Examples:**

[**Zeng - Sharp Eared Owl**](/flockingai/026-zeng/)<img src='/public/uploads/flockingai/026-b.png' alt='Zeng - Sharp Eared Owl' style="float: right; margin: 10px; max-width: 400px; border: 1px solid black; padding: 5px" >

- **Keywords:** Large pointed ears, huge eyes, lives on the ground, the feature pattern looks like a jacket, Many different patterns for the jacket feathers, Fuzzy face feathers, Females will have red feathers on their heads
- **Description:** The Sharp Eared Owl is a ground dwelling Owl with large pointed ears and huge eyes. The feature pattern on their fur looks like a jacket. There are many different patterns for the jacket feathers. The face feathers are fuzzy. Females will have red feathers on their heads. These animals are found in woodlands all over the world.

[**Steven - Eurasian Borrowing duck**](/flockingai/027-steven/)<img src='/public/uploads/flockingai/027-steven.png' alt='Steven - Eurasian Borrowing duck' style="float: right; margin: 10px; max-width: 400px; border: 1px solid black; padding: 5px" >

- **Keywords:** Duck that lives in swamps eating fish and grubs. Mostly brown with sporadic colorful feathers, Loves to dig and bathe in dust and dirt. From Europe.
- **Description:** Eurasian Borrowing ducks are ducks that live in swamps and eat fish and grubs. They are mostly brown with sporadic colorful feathers. They love to dig and bathe in dust and dirt.  Nest in hollowed out tree stumps or borrows. The female lays 8-12 eggs per season. These animals are found in Europe.

### Image generation

The images are generated using [Mid Journey](https://www.midjourney.com/).

<img src='\public\uploads\2022\generation_mid_journey.gif' alt='Mid Journey generating an image' style="float: right; margin: 10px; max-width: 400px; border: 1px solid black; padding: 5px" >Mid Journey in its most basic form is a [Generative Adversarial Networks (GAN)](https://en.wikipedia.org/wiki/Generative_adversarial_network). It starts every image with random noise, then asks an image classifier (discriminator) if the image looks like the keywords (Prompt) provided. Then generates more images from the previous image (Magic), then runs the image classifier again to see what new images are closer to the keywords provided. It uses the one with the biggest improvement to the image classifier keywords. This iterative process continues a few million times until the image classifier reaches a certain threshold for the images provided. This is a gross oversimplification of what they are actually doing but it's the very basics of the process. You can read more about the basics of this process here [Image Generation in 10 Minutes with Generative Adversarial Networks](https://towardsdatascience.com/image-generation-in-10-minutes-with-generative-adversarial-networks-c2afc56bfa3b)

### Image seed text (“prompt”)

To generate the images I needed a seed text (prompt). The prompt is used by [Mid Journey](https://www.midjourney.com/) with its image classifier to generate an image of its understanding of what the prompt should look like. Prompts are highly dependent on the way that the ML algorithm system is trained. A prompt that works well in [Mid Journey](https://www.midjourney.com/), may not work as well in [DALL-E-2](https://openai.com/dall-e-2/) and would produce entirely different results. Creating a good prompt is a complex process that requires a lot of trial and error until you start to get a feel for the way each algorithm “thinks”.

There are a lot of helpful guides and tools online to help with prompt generation. Here are a few that I used when I was starting out

- [Tips for Text-Prompts in Mid Journey](https://midjourney.gitbook.io/docs/resource-links/guide-to-prompting)
- [Mid Journey’s Community Showcase](https://www.midjourney.com/showcase/)
- [Prompt Builder](https://promptomania.com/midjourney-prompt-builder/)
- [Prompts for Portraits](https://www.betchashesews.com/midjourney-portraits/)
- [Prompter spreadsheet](https://www.thedreamingstate.com/portfolio/art/prompter/)

[Mid Journey](https://www.midjourney.com/) is unique in that the image generation is done in public view via a [Discord](https://discord.com/) bot. This allows you to see what other people are using for prompts and the images that these prompts are producing. It's a great way of teaching other people what phrases work. It also allows for live remixing as someone sees a phrase, copies it, slightly changes it and retries the same phrase on the system again.

It feels great when you start a miny trend and people start using your keywords, or remixing off your images to make their own based on your prompt text. For me this is the best feature of [Mid Journey](https://www.midjourney.com/) over other competing systems.

I used the birds bio as the seed text as well as other keywords that I generated using a script of the top keywords used on Mid Journey that month.

The data files and the scriptused to generate the extra keywords are open source and can be downloaded from my github page [FlockingAI/prompt-generation](https://github.com/funvill/FlockingAI/tree/main/prompt-generation)

### Social media and the website

[Instagram](https://www.instagram.com/flockingai/) posts are scheduled using [Facebook creative studio](https://business.facebook.com/creatorstudio/home), and [Twitter](https://twitter.com/FlockingAI) posts are scheduled using [tweetdeck](https://tweetdeck.twitter.com/).

The website is generated using [Jekyll](https://jekyllrb.com/), hosted on [Github pages](https://pages.github.com/). Full source is available on [my github page](https://github.com/funvill/funvill.github.io)

## Why did I make this project

Machine learning is a new exciting field of study that I have been interested in for a while. Some of the tools and content that it has enabled are amazing. [GitHub copilot](https://github.com/features/copilot/), [Google’s Deep dream](https://en.wikipedia.org/wiki/DeepDream), [Dall-E-2](https://openai.com/dall-e-2/) image generation, etc...

I've been playing around with these machine learning algorithms and tools for a while and I was looking for a project that I could use these algorithms for. I was hoping for something that I could iterate over a few years so as the algorithms got better you could see the work getting better over time.

My first idea was to make a comic book. Using [OpenIA](https://openai.com/) GPT-3 text generation, I would write up the basic structure of the comic (overarching plot) and then generate the dialog using [GPT-3](https://en.wikipedia.org/wiki/GPT-3), tweeking it as needed. Then I would write a visual description of the scene I was looking at and use [Mid Journey](https://www.midjourney.com/) to generate the image. Then use the standard three layer comic book format, background, people and things, and foreground to create each frame. <img src='/public/uploads/2022/midjourney-cardgame.png' alt='Mid Journey Cardgame' style="float: right; margin: 10px; max-width: 400px; border: 1px solid black; padding: 5px" >

I found it frustrating to generate believable dialog or images in the same style between two different frames.

Next idea was to create a card game. I designed the rules for a resource management, worker placement card game. The plan was to use the art generated from [Mid Journey](https://www.midjourney.com/) for the cards in a [Magic the Gathering](https://en.wikipedia.org/wiki/Magic:_The_Gathering) style. Art on top, text and rules on the bottom. I play-tested the basic rules a few times and it was just okay, not great. With more work and iterations I think I could convert this into a fun game. This project didn’t feel right as I was looking for more of an iterative project where I could show the changes to the ML algorithms over time.

Eventually I came up with the idea of a Machine Learning (ML) field guide of imaginary birds. This idea came from 2021 when I spent a year photographing birds to create [a deck of playing cards](https://blog.abluestar.com/projects/2021-bird-playing-cards/). I would often use a field guide to help me identify and track the birds that I had seen that year.

## Ethics

TODO: Ethics

(*note*: "ToDo: Ethics" is ment to be a joke)

This is a huge topic that I plan to write some blog posts about in the future. At this moment I want to see what this technology can do and see if there is an audience for it

[Machine Learning: The High Interest Credit Card of Technical Debt](https://research.google/pubs/pub43146/) - Abstract: Machine learning offers a fantastically powerful toolkit for building complex systems quickly. This paper argues that it is dangerous to think of these quick wins as coming for free. Using the framework of technical debt, we note that it is remarkably easy to incur massive ongoing maintenance costs at the system level when applying machine learning. The goal of this paper is highlight several machine learning specific risk factors and design patterns to be avoided or refactored where possible. These include boundary erosion, entanglement, hidden feedback loops, undeclared consumers, data dependencies, changes in the external world, and a variety of system-level anti-patterns.

> That's a bit like saying that musicians should stop listening to music, painters should stop looking at art, directors should stop watching movies, authors should stop reading books. Of course - we can control ourselves to not copy/plagiarize something, to some extent. As should deep learning models / generators. But we're all influences by someone else.

## FAQ

**How did you generate the images?**

[Mid Journey](https://www.midjourney.com/)

**How did you generate the description text?**

[OpenAI](https://openai.com/)

**Are you going to make a [NFT collection](https://www.forbes.com/advisor/ca/investing/cryptocurrency/nft-non-fungible-token/) of these birds?**

No, go away

**How are you making money off of this collection?**

I am not, and I don't need to.

**Are you worried about the ethical and legal problems with using AI generated imagery trained on other peoples copyrighted artwork?**

Yes to both. This is a new field and I am exploring the possibilities of it.

**Can I use the bird pictures in my own project? What license is this collection released under?**

Yes, they are released under Creative Commons - [Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

You are free to:

- **Share** — copy and redistribute the material in any medium or format
- **Adapt** — remix, transform, and build upon the material

Under the following terms:

- **Attribution** — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
- **NonCommercial** — You may not use the material for commercial purposes.
- **ShareAlike** — If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.

You can't use them in a [NFT collection](https://www.forbes.com/advisor/ca/investing/cryptocurrency/nft-non-fungible-token/) (NonCommercial license)

**I noticed a spelling mistake or grammar issue**

Since the description is generated by [Open AI](https://openai.com/) it's very likely that it will produce grammer, or spelling issues. I done by best to fix them when I see them but I have [Dyslexia](https://en.wikipedia.org/wiki/Dyslexia) and I often miss these kinds of issues.

Please report the issue in the comments at the bottom of the page with the bird description.

**How long are you planning on doing this project?**

30 days for the month of September, 2022. If I get positive feedback from the community I will extend the project for another month, until I get bored.

**How do I contact you?**

DM (Direct message) me on one of my social media sites. [Twitter](https://twitter.com/funvill), [Instagram](https://www.instagram.com/funvill/), [Facebook](https://www.facebook.com/FlockingAI/)

**One of the bird names shares my name. I don't like it. Can you change it?**

No.

**Why didn't you just post these images on your own social media instead of creating new accounts?**

I wanted to give my friends and family who follow my personal accounts the choice if they wanted to see the generated content or not. There are some ethical questions involved in AI generative art that I didn't want to force on my friends and family, instead allowing them to "opt in"

**What hashtag should I use when talking about this project on social media?**

Twitter: [\#FlockingAI](https://twitter.com/hashtag/FlockingAI), Instagram: [\#FlockingAI](https://www.instagram.com/explore/tags/flockingai/)

**Why did you choose 'Flocking AI' for this project name?**

Childish reasons. These early AI/ML algorithms make mistakes, lots of them, I was looking for a name that reflected that. Flocking AI sounds like *F_cking AI*, something you might scream at your computer when they mess up badly.

**Why didn't you use OpenAI DALL-E-2 or any of the other image generation algorithms?**

When I started this project I didn't have a [DALL-E-2 OpenAI](https://openai.com/dall-e-2/) beta invite. If this project continues past the initial 30 days I would be open to trying any of the other image generation algorithms. Maybe doing a series on each one.

**The text descriptions aren't very good**

Agreed, I am open to suggestions for creating better text descriptions. Please contact me if you have a suggestion.

**Why aren't you posting to my favorite social media site, (Tiktok, etc...)**

I am lasy and I want to do the lest amount of work possiable. If a social media site doesn't support scheduling posts I ingored it. If I get a lot of feedback saying I need to post on TikTok or any other social media site I might consider it.

At the start I didn't create videos of the generation of the birds and I can't go back and recreate the videos. TicTok is setup for videos and still images don't do well on that site, so it won't be included in the first version.

**Why don't they look like real birds?**

I did not want people to get confused and think this was a real bird.

## Press

- [Stir Cheat Sheet: 5 Eastside Culture Crawl artists using technology and digital tools to catch](https://www.createastir.ca/articles/eastside-culture-crawl-tech-digital#.Y2wo_9IYgFQ.twitter)
- [2022 Culture Crawl Exhibition Catalogue. Page 1-2](https://issuu.com/culturecrawl/docs/2022_culture_crawl_exhibition_catalogue)
- [Makerlabs's #culturecrawlcountdown ](https://www.instagram.com/p/Ck9Dv1nOeB0/)
