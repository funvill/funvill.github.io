---
title: "Idea 011 - Birdhouse Crypto Puzzle"
date: 2023-02-07 00:11:00
slug: idea011-birdhouse-crypto-puzzle
categories:
  - Year of Ideas
tags:
  - birds
  - art
  - ideas
  - painting
  - security
  - flowers
excerpt: "Homes for birds, and puzzles for humans"
---
> This post is part of [the 100 project ideas](/projects/2023-100-ideas/) project. [#The100DayProject](https://www.the100dayproject.org/). I am looking for feedback. <a href='#utterances-comments'>Comment</a> below or DM me via social media <a href="https://instagram.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-instagram" aria-hidden="true"></i><span class="label">Instagram</span></a>, <a href="https://twitter.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-twitter" aria-hidden="true"></i><span class="label">Twitter</span></a>.

## One Line Pitch

Homes for birds, and puzzles for humans

## Description

The city needs more birdhouses, which provide safe habitat for birds to escape city cats and other predators. The birds don’t care what color is painted on the outside of the bird house, purely for human aesthetics.

I propose creating several birdhouses and painting the side with a cryptography puzzle where you need to collect images from as many different birdhouses in the set to complete the puzzle.

We are looking for a puzzle that has the following features

- Rules for the puzzle are simple enough that you do not need instructions to figure it out
- Possible for someone to figure out the answer with just the information on the bird houses. No external key required
- An encoding that some people have used before
- Simple enough to be seen from 20+ feet away as we don’t want people disturbing the birds
- Not a QR code
- Does not impact or prevent the birdhouse from being used by birds
- You only need to collect a few different patterns to figure it out. In case a few of them get taken down we want the puzzle to still be possible to solve. Solvable with incomplete data

A puzzle that is a simple word, where each bird house has a letter and index of where the letter is in the word. If you collect a bunch of photos from the bird houses you can use them to decode the passphrase.

Encoding of the letter and index can be done in binary. The binary code can be encoded by turning on or off a segment, or Including or not including a segment, or coloring or not coloring different segments.

- 2^5 bits is 32 possibilities with 5 segments
- 5 segments will be used for the letter. The full alphabet is 26 letters and can fit within the 32 possibilities of 5 segments. Zero is space and the remaining 5 segments can be used for special characters
- 5 segments will be used for the index of where the letter is in the word. This would allow a word or phrase to be up to 32 characters

The image can be engraved into the side of the bird house to withstand weathering over time

### Phrase

We need a good secret phrase to encode. The more letters it has the more birdhouses we have to make. So shorter is better. Technically we could use up to 32 characters.

- **BUSHTIT (7)** - is good because of that repeating “T” that should give some clue that the 2nd set of data is the location information
- **Birds are Awesome (18)** - Lots of bird houses

### Symbol / Icon / Segments

I was thinking of a fern or a flower. Since there are 10 segments we can split it up into two parts. One for the letter, and the other for the symbols. Left side, right side, top and bottom or inner or outer, etc

I think we should use color to represent the on and offs instead of inclusion. This should make it easier to see it from farther away.

### Key

```txt
_ =  0 | ⬜⬜⬜⬜⬜
A =  1 | 🟩⬜⬜⬜⬜
B =  2 | ⬜🟩⬜⬜⬜
C =  3 | 🟩🟩⬜⬜⬜
D =  4 | ⬜⬜🟩⬜⬜
E =  5 | 🟩⬜🟩⬜⬜
F =  6 | ⬜🟩🟩⬜⬜
G =  7 | 🟩🟩🟩⬜⬜
H =  8 | ⬜⬜⬜🟩⬜
I =  9 | 🟩⬜⬜🟩⬜
J = 10 | ⬜🟩⬜🟩⬜
K = 11 | 🟩🟩⬜🟩⬜
L = 12 | ⬜⬜🟩🟩⬜
M = 13 | 🟩⬜🟩🟩⬜
N = 14 | ⬜🟩🟩🟩⬜
O = 15 | 🟩🟩🟩🟩⬜
P = 16 | ⬜⬜⬜⬜🟩
Q = 17 | 🟩⬜⬜⬜🟩
R = 18 | ⬜🟩⬜⬜🟩
S = 19 | 🟩🟩⬜⬜🟩
T = 20 | ⬜⬜🟩⬜🟩
U = 21 | 🟩⬜🟩⬜🟩
V = 22 | ⬜🟩🟩⬜🟩
W = 23 | 🟩🟩🟩⬜🟩
X = 24 | ⬜⬜⬜🟩🟩
Y = 25 | 🟩⬜⬜🟩🟩
Z = 26 | ⬜🟩⬜🟩🟩
  = 27 | 🟩🟩⬜🟩🟩
  = 28 | ⬜⬜🟩🟩🟩
  = 29 | 🟩⬜🟩🟩🟩
  = 30 | ⬜🟩🟩🟩🟩
  = 31 | 🟩🟩🟩🟩🟩
```

### Example 1 - Bushtit

Each one of these columns would be a different bird house. On each bird house there would be a letter on the left and a index on the right

<img src="/public/uploads/2023/example-bushtit.png" alt="example bushtit" style="margin: 10px; border: 1px solid black; padding: 5px"/>

<img src="/public/uploads/2023/example-bushtit2.png" alt="example bushtit 2" style="margin: 10px; border: 1px solid black; padding: 5px"/>

<img src="/public/uploads/2023/birdhouse-crypto-puzzle.png" alt="birdhouse-crypto-puzzle" style="margin: 10px; border: 1px solid black; padding: 5px"/>

## Prior art

- [Cypher](https://store.steampowered.com/app/746710/Cypher/) - A game by [Matthew Brown](https://twitter.com/Ma77hew_Brown).
- [Cryptogram Puzzle Book](https://www.amazon.ca/Cryptogram-Puzzle-Book-Cryptograms-Cryptoquotes/dp/107388547X): 300 Cryptograms, Quotes and Humorous Jokes About Flowers - Anyone who likes this book would also enjoy this puzzle.
- [Code-Breaking, Cipher and Logic Puzzles](https://www.boxentriq.com/)

## Market

People who love birds, People who love puzzles, Cryptography Nerds, information security dorks, People who like escape rooms
