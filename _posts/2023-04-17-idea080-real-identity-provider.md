---
layout: single
title: Idea 080 - Real Identity provider
date: '2023-04-17 01:19'
categories: ideas
tags: crypto idenification projects ideas
excerpt: A identify provider for all digital platforms
---

> This post is part of [the 100 project ideas](https://blog.abluestar.com/projects/2023-100-ideas/) project. [#The100DayProject](https://www.the100dayproject.org/). I am looking for feedback. <a href='#utterances-comments'>Comment</a> below or DM me via social media <a href="https://instagram.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-instagram" aria-hidden="true"></i><span class="label">Instagram</span></a>, <a href="https://twitter.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-twitter" aria-hidden="true"></i><span class="label">Twitter</span></a>.

## One Line Pitch

A identify provider for all digital platforms

## Description

### The problem or “gap”

Currently we have to rely on documentation (drivers license, passport, ATM card, etc…) that a person is who they say they are. There is no method for proving that a document is real. With current technology it's easy to create counterfeit documents. If a truly dedicated person tries to impersonate you they could cause a large amount of financial and reputational damage that could last the rest of your life. (identity thrift)

The current system only “kind of” works because most major life changing actions require someone to be physically present for it to happen. A dedicated person can easily work around these in person requirements.

When you are online it's even harder to prove that you are who you say you are, anyone can create an account on any service with any name. It becomes extremely hard to prove someone’s real name, or that they control a social media account, or are the owner of a digital or physical asset.

### The goal

Create a service that allows someone to prove that they are who they say they are, or that they own or control social media accounts, or are the owner of a digital or physical asset.

### The Market

Anyone who needs to prove that they are who they say they are. This could be when transferring a large asset like a house or setting up marketing agreements with influencers, etc...

### User story

A website/app that allows users to create an account. The account starts with no assets. When the user creates an account a OG private key is generated for them. This OG private key is shown to the user as a QR code and twelve words. The user prints his private key and stores it somewhere safe.

The user then uses the OG private key to sign sub private keys for each of his devices. Such as a laptop or a phone, desktop computer, etc… This process adds these new devices to his assets, asserting that they are his by cryptographic signature.

The user then can assert that they own social media accounts or web sites that they own or control. This is done by filling out a form in the service with the social media information, The form uses a private key to sign a notification that this user owns this account.

```txt
----
User AAAAAA {profile link}
Is asserting that they are the owner or in-control of this social media account XXXXX
Signature phrase: Clever-Magenta-Owl-Jolly-Olive-Hamster-Witty-Orange-Chicken-Eager-Gray-Otter
Find out more about this {service}
-----
```

The user then posts this text to their social media accounts. The service then checks the public profile of this social media account and validates the signature. The service then signs the assertion that this user owns this social media account. The social media account is added to the user's profile.

The user can do this for many different social media accounts, or website/domains, or github accounts, etc…

The user then wants to confirm their real name. There are two methods for doing this both have the same procedure.

The user “Alice” could find another person “Bob” and show them their government identification. Drivers license, passport, student ID, whatever “Bob” needs to confirm their identity. “Bob” then makes a judgment call if he believes “Alice” and her assertion of her real name based on the documents that she has provided. “Alice” shows “Bob” the assertion as a QR code, Bob scans the QR code and signs it with his private key, and uploads the assertion to the service. The service shows the assertion and the list of people that have signed it.

The same thing could happen from any provider including a government agent. The government would act as “Bob” and check the documents and sign the assertion and send it to the service for a fee. This could happen at a post office or any other government building. The same thing could happen with an agent at any other service such as your bank, 7/11, a librarian, etc…

“Alice” now has a few signatures on her assertion of her real name. All of these people believe that she is who she says she is. The signature from the government agent should have more weight then a random person from the street. The service weights different signatures differently, and provides a confidence score for this assertion. The more signatures from users that have a high social proof the more confidence the system has that  “Alice” is who she says she is.

If the assertion for “Alice” is ever determined to be false, then everyone who signed the assertion will be punished and their social weight will be decreased. There is an incentive to only sign people’s assertions that are correct.

The users can assert anything

The service only maintains a database of signatures, It does not hold the private key or have any knowledge of the documents that were used to prove one thing or another. This means that the service isn’t a high target for attacks because it doesn’t have anything useful to take. Low knowledge system.

#### Vocabulary

- User - A private key, a user could make as any private keys as they want
- Signature - A user creates a hash of some content then uses their private key to sign the content.
- An assertion - A claim by a user. Normally this would be a claim that they own something.
- Asset - Any assertion by the user that has been signed by other users.

### Service actions

These are the actions that the service provides.

- **Generation of private keys** - The generation of an OG private key is required to create an account. This is a 256-1024 bit private key. The key is represented as both a QR code and twelve words. This QR code and the 12 words should be printed out and saved somewhere secret.
  - **Sub keys** - The OG private key can be used to generate new private keys based on the OG private key. This allows you to put the “private sub keys” anywhere that you would normally use a private key. This also allows the OG private key to be able to supersede the sub keys. Think a cell phone, or a laptop might use a subkey instead of the OG Private key in case it gets stolen.
- **Sign content** - A user can upload a file, or past text into a box on the service’s web page. Then they use a private key to “sign” the content. A signature is produced that can be used to prove that this content came from this user.
- **Check signature** - A user can upload a file or past text onto the service’s web page, then attach the signature that is associated with this content. The service checks the content and proves that the content matches the signature.
- **Profile page** - Lists all the assets that the user owns/controls. Lists the user reputation, shows the user social poof score.
  - A user can “hide” certain assets with a visibility flag so that they are not automatically shown publicly.
- **Assert that you own/control social media accounts**
  - Similar to Keybase - Lists all the assets that they have cryptography proven that they have control of. To prove that a user has control of a social media platform the user needs to post a message to that social media platform using their account that includes a series of words. The service then checks the public social media  profile to see if that message is available, if it is then the user has proven that they own that social media account. This has a side effect of people hearing about this service from other people proving the social media proof on their social media accounts
- **Prove that you are who you say you are** - Using this process two people can prove to each other that they are who they say they are cryptography.
- **Add social proof** - Using this process a person can stake their reputation on proving that a different user is who they say they are or owns something that can’t easily be digitally asserted.
  - “Alice” can show Bob some documents that prove that her name is “Alice” (her driver's license, passport, and any other information that Bob asks for). Bob then would make a human judgment if “Alice” is who

## Prior art

[Keybase](https://keybase.io/funvill) was the golden child, Cryptographic proof that you owned or were in control of a social profile or website. They made [PGP signatures](https://en.wikipedia.org/wiki/Pretty_Good_Privacy) easy enough for a normal person to use and provided a way of secure offline communication.

They were one of the good ones, a company that was giving back to the community and making the world a better place… Then they issued their own [Cryptocurrency](https://coinmarketcap.com/currencies/stellar/), did an [initial coin offering](https://keybase.io/blog/keybase-and-zcash), sold to [Zoom](https://keybase.io/blog/keybase-joins-zoom), and pivoted to a [chat engine](https://keybase.io/docs/the_app/install_windows). 🔥Burned away any social capital and respect that they have earned. They had a good start of an idea, but didn’t follow through with their ideals, sold out and thus will be forgotten.
