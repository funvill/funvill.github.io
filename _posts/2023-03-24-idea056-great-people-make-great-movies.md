---
layout: single
title: Idea 056 - Great people make great movies
date: 2023-03-24 00:56:00
categories: ideas YearOfIdeas
tags: movies saas projects ideas
excerpt: A movie recommendation site based on the people who work on movies
---

> This post is part of [the 100 project ideas](/projects/2023-100-ideas/) project. [#The100DayProject](https://www.the100dayproject.org/). I am looking for feedback. <a href='#utterances-comments'>Comment</a> below or DM me via social media <a href="https://instagram.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-instagram" aria-hidden="true"></i><span class="label">Instagram</span></a>, <a href="https://twitter.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-twitter" aria-hidden="true"></i><span class="label">Twitter</span></a>.

## One Line Pitch

A movie recommendation site based on the people who work on movies

## Description

A website where you select a bunch of movies that you like. The website then computes a list of all the actors, crew, production companies, locations. Find all the duplicates and add them up giving each element score.

Then the website will make a list of other moves based on the element's score.

This idea depends on the notion that great people make great movies. Great people put their soul/essence into the things that they work on. Same goes with locations, some locations are magical.

The element score could be based on a log scale to prevent runaway elements scores. We would have to carefully figure out the sale of each element in a movie. For example I would assume the leading actor has more to do with a movie then the grips.

There are lots of publicly available APIs for movie facts that we can draw the data from. Example: [TheMovieDB](https://www.themoviedb.org/documentation/api)

Almost any movie recommendation site uses elements from the movies to help with its recommendation engine. But they tend to heavily depend on the actors or the genre of the movie to give its recommendation. In this system we depend on any of the elements from a movie that are shared between two movies.

The interface is a tinder style swipe right (like) or left (don’t like), Swipe up (don’t know), Swipe down (add to watch list). The more you swipe the better the algorithm becomes at recommending movies. We can also add in some gamification where they get badges or other rewards for interacting with the website more.

## Prior art

- [LetterBoxD](https://letterboxd.com/) - Recommends movies based on your choices and other peoples similar tastes.
- [Taste](https://www.taste.io/) - Recommends movies based on your choices and other peoples similar tastes.
- [Picka Movie For Me](https://pickamovieforme.com/) - Uses a Quiz-based recommendation system. It primarily recommends box office hits.
- [Movie Decider](https://moviedecider.com/) - Similar to “Picka Movie For Me” but tends to recommend movies that are more obscure.

## Market

People who love movies, People who don’t know what to watch next

The market for this site could be movie enthusiasts who are looking for personalized and diverse movie recommendations. This could include people who have exhausted their usual sources of movie recommendations or are looking for lesser-known films outside of mainstream genres. Additionally, this site could appeal to people who are interested in the creative process behind movies and want to explore the contributions of actors, crew, and production companies. The site could also cater to travelers who are inspired by movie locations and want to discover new places to visit. Overall, the market could include a wide range of age groups, genders, and cultural backgrounds who share a common interest in movies.
