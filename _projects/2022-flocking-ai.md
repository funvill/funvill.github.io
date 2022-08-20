---
title       : (2022) Flocking AI
excerpt     : Generating bird images from Mid Journey
post_date   : 2022-08-14 00:00:00
header      :
  teaser    : /public/uploads/flockingai/banner.png
toc         : false
---

## What is this

Flocking AI is a project where I am using Artificial intelligence (AI)/Machine Learning (ML) to generate a "Field guide of imaginary birds".

Every day a new generated bird will be posted to social media (Twitter, Instagram). Using the feedback from social media commend, I improve the process I use to generate the images and the descriptions. Iterating on the idea daily.

At the end of the year I will take the top voted birds and compile them into a printed trade book that I will give out as gifts to my friends and family.

[Instagram](https://www.instagram.com/flockingai/), [Twitter](https://twitter.com/FlockingAI), [Gallery of birds](/flockingai/)

## How I made this project

### Image generation

The images are generated using [Mid Journey](https://www.midjourney.com/).

Mid Journey in its most basic form is a [Generative Adversarial Networks (GAN)](https://en.wikipedia.org/wiki/Generative_adversarial_network). It starts every image with random noise, then asks an image classifier if the image looks like the keywords (Prompt) provided. Then generates more images from the previous image (Magic), then runs the image classifier again to see what new images are closer to the keywords provided. It uses the one with the biggest improvement to the image classifier keywords. This iterative process continues a few million times until the image classifier reaches a certain threshold for the images provided. This is a gross oversimplification of what they are actually doing but it's the very basics of the process. You can read more about the basics of this process here [Image Generation in 10 Minutes with Generative Adversarial Networks](https://towardsdatascience.com/image-generation-in-10-minutes-with-generative-adversarial-networks-c2afc56bfa3b)

### Image seed text (“prompt”)

To generate the images I needed a seed text (prompt). The prompt is used by Mid Journey with its image classifier to generate an image of its understanding of what the prompt should look like. Prompts are highly dependent on the way that the ML algorithm system is trained. A prompt that works well in Mid Journey, may not work as well in DALL-E-2 and would produce entirely different results. Creating a good prompt is a complex process that requires a lot of trial and error until you start to get a feel for the way each algorithm “thinks”.

There are a lot of helpful guides and tools online to help with prompt generation. Here are a few that I used when I was starting out

- [Tips for Text-Prompts in Mid Journey](https://midjourney.gitbook.io/docs/resource-links/guide-to-prompting)
- [Mid Journey’s Community Showcase](https://www.midjourney.com/showcase/)
- [Prompt Builder](https://promptomania.com/midjourney-prompt-builder/)
- [Prompts for Portraits](https://www.betchashesews.com/midjourney-portraits/)
- [Prompter spreadsheet](https://www.thedreamingstate.com/portfolio/art/prompter/)

Mid Journey is unique in that the image generation is done in public view via a Discord bot. This allows you to see what other people are using for prompts and the images that these prompts are producing. It's a great way of teaching other people what phrases work. It also allows for live remixing as someone sees a phrase, copies it, slightly changes it and retries the same phrase on the system again.

It feels great when you start a miny trend and people start using your keywords, or remixing off your images to make their own based on your prompt text. For me this is the best feature of Mid Journey over other competing systems.

For the most part Mid Journey prompts are in this format

```{subject} :: {actions words} :: {series of adjectives} :: In the style of {Artist or movie, etc..} :: {lighting} {renders} :: {Mid Journey specific parameters}```

I created a script that takes a random phrase for each section out of several different text files. Then recombines these phrases into a single phrase. I found these keywords by looking at what prompts other people were using that produced good results. Then I would extract the keywords from the prompts and sort them into the different text files.

**Example keyword input files:**

- **Types of birds:** Bird, Owl, Duck, Lovebirds, Cockatiels, Peacock, Hummingbird, Tucan, Penguin, Atlantic Puffin, Crow, Parrot, Bee-eaters, Northern Cardinal, Kiwi bird
- **Adjectives:** Great, Live, Sea, Beautiful, Tame, Startled, Colored, Sacred, Speaking, Silly, Poor, Noble, Migratory, Frightened, Snow, Divine, Strange, Happy, Cute, funny, beautiful, adorable, fluffy, little, Derpy 
- **Keywords:** wings, feathers, tiny eyes, great big beaked bird, broken feathers, flying, fluffy, masked, flowerpiercer, striped, mustached, painted, broadbill, bearded, rufous-throated, conebill, small beak, glowing eyes
- **Lighting:** volumetric lighting, mood lighting, bright, Soft illumination, soft lights, rays of shimmering light, Crepuscular Ray, bioluminescence, cinematic lighting, Rembrandt Lighting, Split Lighting, front lighting, Back lighting, halfrear lighting, rim lights
- **Feelings:** Happiness, Satisfaction, Amusement, Confident, Optimistic, Cheerful, Carefree, Sweet, Kind, Unhappy, Awkward, Goofy, Focused, Determined, Lonely, Shy
- **Style:** Cthulhu Mythos, by Pixar, old film footage, scientific illustration, vivid technicolor, dripping paint, alcohol inks, ink illustration, ink outline, sacred geometry, low poly, line art coloring page, ultra-realistic, high detail, cinematic, octane render, photorealistic, unreal engine, raytracing, photo, panoramic, cinematic, colorful, 8k, realistic, high quality, highly detail, made of flowers, 1998 pixel computer game style, banksy style, art deco style
- **Artists:** Albert Bierstadt, Frida Kahlo, Takashi Murakami, Caravaggio Michelangelo Merisi, Carl Warner, Beeple, Bisa Butler, Dean Russo, Weta FX, Tim Burton, Norman Rockwell, M. C. Escher, Jeff Koons, Ad Reinhardt, Carl Andre, Alberto Giacometti, Caspar David Friedrich, Charlie Bowater, Weta Digital (See Ethics section)

**Example outputs:**

- Beautiful catbird bird  :: with stars in the sky  :: Red-Violet conebill, circus , aesthetic, aesthetic  :: light scatters through a stained glass window , high detail, 1998 pixel computer game style
- Sacred oriole bird  :: in a forest  :: Violet Countless opal petals radiating from the center, glowing eyes, feathers, tiny eyes  :: Soft lighting , cinematic, high quality
- derpy owl bird  :: in the sky in makoto shinkai style  :: Violet small beak, freedom, tiny eyes, mustached  :: Soft lighting , unreal engine, Cthulhu Mythos
- Noble hornbill bird  :: in the snow  :: Yellow-Orange wings, broadbill, broken feathers, freedom  :: Soft lighting , cinematic, by Pixar
- little  flycatcher bird  :: in the sky in Dean Russo style  :: Orange translucent shells, translucent shells, striped, flying  :: Soft lighting , raytracing, cinematic
- Frightened phoenix  bird  :: flying in the sky  :: Blue broadbill, glowing eyes, feathers, tiny eyes  :: light scatters through a stained glass window , cinematic, ultra-realistic
- Colored duck bird  :: flying in the sky  :: Green fluffy, freedom, translucent shells, painted  :: Soft lighting , by Pixar, panoramic

The data files and the script are open source and can be downloaded from my github page [FlockingAI/prompt-generation](https://github.com/funvill/FlockingAI/tree/main/prompt-generation)

### Text and description generation

Each bird has a description of what it looks like, where it lives, what it eats and some unique feature about it.

The text descriptions are generated using [Open IA GPT-3](https://gpt3-openai.com/), using text-ada model. For these models to work you need to seed the text with good examples. I started with ten real birds descriptions from [All About Birds](https://www.allaboutbirds.org/guide/). Starting birds: [Ring-necked Pheasant](https://www.allaboutbirds.org/guide/Ring-necked_Pheasant), [Northern Hawk Owl](https://www.allaboutbirds.org/guide/Northern_Hawk_Owl), [Barn Owl](https://www.allaboutbirds.org/guide/Barn_Owl), [Pileated Woodpecker](https://www.allaboutbirds.org/guide/Pileated_Woodpecker), [Mallard Duck](https://www.allaboutbirds.org/guide/Mallard/), [Anna's Hummingbird](https://www.allaboutbirds.org/guide/Annas_Hummingbird), [House Finch](https://www.allaboutbirds.org/guide/House_Finch), [Northern Cardinal](https://www.allaboutbirds.org/guide/Northern_Cardinal/)

Then I created a keyword property for each bird. Listed a few keywords from their descriptions and what they looked like in my own words.

When I generate a new image using midjourny, I make up the keyword list for that bird, its physical characteristics and a few different unique non physical attributes, the seed prompt used to generated the image. Then I ask OpenAI to generate a description based on the keyword list, and the examples of the previous 10 birds. Most of the time it generates a reasonable description using my keywords, but other times it will completely ignore my keyword list and generate something entirely unique. Both created realistic and sometimes good descriptions. I would itterate on the description until I found something that would work.

As I generate new keyword lists and descriptions for newly generated birds, I bump the real bird off the list and replace it with a generated one. After the first 10 generations the input file only contains generated text. As I continue with newly generated birds, I bump the older generations off the list starting with the worst ones first. Over time this created a good set of entirely generated and unique input text that I use to generate new descriptions.

**Examples:**

[**Zeng - Sharp Eared Owl**](https://blog.abluestar.com/flockingai/026-zeng/)

- **Keywords:** Large pointed ears, huge eyes, lives on the ground, the feature pattern looks like a jacket, Many different patterns for the jacket feathers, Fuzzy face feathers, Females will have red feathers on their heads
- **Description:** The Sharp Eared Owl is a ground dwelling Owl with large pointed ears and huge eyes. The feature pattern on their fur looks like a jacket. There are many different patterns for the jacket feathers. The face feathers are fuzzy. Females will have red feathers on their heads. These animals are found in woodlands all over the world.

[**Steven - Eurasian Borrowing duck**](https://blog.abluestar.com/flockingai/027-steven/)

- **Keywords:** Duck that lives in swamps eating fish and grubs. Mostly brown with sporadic colorful feathers, Loves to dig and bathe in dust and dirt. From Europe
- **Description:** Eurasian Borrowing ducks are ducks that live in swamps and eat fish and grubs. They are mostly brown with sporadic colorful feathers. They love to dig and bathe in dust and dirt.  Nest in hollowed out tree stumps or borrows. The female lays 8-12 eggs per season. These animals are found in Europe.

### Social media and the website

[Instagram](https://www.instagram.com/flockingai/) posts are scheduled using [Facebook creative studio](https://business.facebook.com/creatorstudio/home), and [Twitter](https://twitter.com/FlockingAI) posts are scheduled using [tweetdeck](https://tweetdeck.twitter.com/).

The website is generated using [Jekyll](https://jekyllrb.com/), hosted on [Github pages](https://pages.github.com/). Full source is available on [my github page](https://github.com/funvill/funvill.github.io)

## Why did I make this project

Machine learning is a new exciting field of study that I have been interested in for a while. Some of the tools and content that it has enabled are amazing. GitLab copilot, Google’s Deep dream, Dall-E-2 image generation, etc...

I've been playing around with these machine learning algorithms and tools for a while and I was looking for a project that I could use these algorithms for. I was hoping for something that I could iterate over a few years so as the algorithms got better you could see the work getting better over time.

My first idea was to make a comic book. Using OpenIA GPT-3 text generation, I would write up the basic structure of the comic (overarching plot) and then generate the dialog using GPT-3, tweeking it as needed. Then I would write a visual description of the scene I was looking at and use Mid journey to generate the image. Then use the standard three layer comic book format, background, people and things, and foreground to create each frame.

I found it frustrating to generate believable dialog or images in the same style between two different frames.

Next idea was to create a card game. I designed the rules for a resource management, worker placement card game. The plan was to use the art generated from Mid journey for the cards in a Magic the Gathering style. Art on top, text and rules on the bottom. I play-tested the basic rules a few times and it was just okay, not great. With more work and iterations I think I could convert this into a fun game. This project didn’t feel right as I was looking for more of an iterative project where I could show the changes to the ML algorithms over time.

Eventually I came up with the idea of a Machine Learning (ML) field guide of imaginary birds. This idea came from 2021 when I spent a year photographing birds to create [a deck of playing cards](https://blog.abluestar.com/projects/2021-bird-playing-cards/). I would often use a field guide to help me identify and track the birds that I had seen that year.

## FAQ

### How did you generate the images?

[Midjourney](https://www.midjourney.com/)

### How did you generate the description text?

[OpenAI](https://openai.com/)

### Are you going to make a [NFT collection](https://www.forbes.com/advisor/ca/investing/cryptocurrency/nft-non-fungible-token/) of these birds?

No, go away

### How are you making money off of this collection?

I am not, and I don't need to.

### Are you worried about the ethical and legal problems with using AI generated imagery trained on other peoples copyrighted artwork?

Yes to both. This is a new field and I am exploring the possibilities of it.

### Can I use the bird pictures in my own project? What license is this collection released under?

Yes, they are released under Creative Commons - [Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

You are free to:

- **Share** — copy and redistribute the material in any medium or format
- **Adapt** — remix, transform, and build upon the material

Under the following terms:

- **Attribution** — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
- **NonCommercial** — You may not use the material for commercial purposes.
- **ShareAlike** — If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.

You can't use them in a NFT collection (NonCommercial)

### I noticed a spelling mistake or grammar issue

Since the description is generated by [Open AI](https://openai.com/) it's very likely that it will produce grammer, or spelling issues. I done by best to fix them when I see them but I have [Dyslexia](https://en.wikipedia.org/wiki/Dyslexia) and I often miss these kinds of issues.

Please report the issue in the comments at the bottom of the page with the bird description.

### How long are you planning on doing this project?

30 days for the month of September, 2022. If I get positive feedback from the community I will extend the project for another month, until I get bored.

### How do I contact you?

DM (Direct message) me on one of my social media sites. [Twitter](https://twitter.com/funvill), [Instagram](https://www.instagram.com/funvill/)

### One of the bird names shares my name. I don't like it. Can you change it?

No.

### Why didn't you just post these images on your own social media instead of creating new accounts?

I wanted to give my friends and family who follow my personal accounts the choice if they wanted to see the generated content or not. There are some ethical questions involved in AI generative art that I didn't want to force on my friends and family, instead allowing them to "opt in"

### What hashtag should I use when talking about this project on social media?

\#FlockingAI

### Why did you choose 'Flocking AI' for this project name?

Childish reasons. These early AI/ML algorithms make mistakes, lots of them, I was looking for a name that reflected that. Flocking AI sounds like *F_cking AI*, something you might scream at your computer when they mess up badly.

### Why didn't you use OpenAI DALL-E-2 or any of the other image generation algorithms?

When I started this project I didn't have a [DALL-E-2 OpenAI](https://openai.com/dall-e-2/) beta invite. If this project continues past the initial 30 days I would be open to trying any of the other image generation algorithms. Maybe doing a series on each one.

### The text descriptions aren't very good

Agreed, I am open to suggestions for creating better text descriptions. Please contact me if you have a suggestion.
