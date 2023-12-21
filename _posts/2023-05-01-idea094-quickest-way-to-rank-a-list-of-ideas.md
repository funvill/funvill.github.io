---
title: Idea 094 - Quickest way to rank a list of ideas
date: 2023-05-01 01:34:00
categories: ideas YearOfIdeas
tags: 
- sorting
- algorithm
- projects
- ideas
excerpt: Use a sorting algorithm to efficiently sort a list of things in order
---

> This post is part of [the 100 project ideas](https://blog.abluestar.com/projects/2023-100-ideas/) project. [#The100DayProject](https://www.the100dayproject.org/). I am looking for feedback. <a href='#utterances-comments'>Comment</a> below or DM me via social media <a href="https://instagram.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-instagram" aria-hidden="true"></i><span class="label">Instagram</span></a>, <a href="https://twitter.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-twitter" aria-hidden="true"></i><span class="label">Twitter</span></a>.

## One Line Pitch

Use a sorting algorithm to efficiently sort a list of ideas/projects/people/things in order

## Description

> 👉 **Done!** project can be found here [Idea094-Quicksort](https://github.com/funvill/Idea094-Quicksort)

I need a way of sorting all of the ideas from the 100 day project to decide what ones I should work on.  There are so many ideas that it's hard to take it all at once and would be burdensome to ask friends to rank them. I also want to make the least amount of comparisons (is this idea better than this idea) between each idea as possible.

Lucky computer science has a lot of history efficiently sorting lists of items that can be compared to each other. See [Sorting algorithm](https://en.wikipedia.org/wiki/Sorting_algorithm)

When selecting a sorting algorithm I am looking for one that has the lowest “Computational complexity”. Aka the amount of questions that I get asked. I do not care about the “Memory usage” as my effective memory is infinite. I don’t care about Stability, and the input array of data is fixed (not “online”)

First use [bucket sort](https://en.wikipedia.org/wiki/Bucket_sort) across all of the elements. Sort them into 3 buckets. Good, Okay, Bad. I drop the bad bucket, as they don’t need to be sorted as I won’t actually do any of these ideas. Then sort the “good” category using [Merge sort](https://en.wikipedia.org/wiki/Merge_sort). Merge sort is slightly faster for worst-case performance then [QuickSort](https://en.wikipedia.org/wiki/Quicksort) at the cost of memory (We have infinite memory)

The interface can be a [hot or not](https://en.wikipedia.org/wiki/Hot_or_Not) interface. Where the two items are shown on the screen at the same time and I need to pick the better of the two.

## Prior Art

- [Sounds of Sorting algorithm](https://www.youtube.com/watch?v=kPRA0W1kECg&t=6s)