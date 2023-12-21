---
title: "Idea 034 - 20 questions for people"
date: 2023-03-02 00:34:00
categories:
- ideas
- YearOfIdeas
tags:
- questions
- quiz
- ai
- projects
- ideas
excerpt: A website that asks you 20 questions and tries to uniquely identify you in the world What are the optimal questions to ask?
slug: idea034-20-questions-for-people

---

> This post is part of [the 100 project ideas](/projects/2023-100-ideas/) project. [#The100DayProject](https://www.the100dayproject.org/). I am looking for feedback. <a href='#utterances-comments'>Comment</a> below or DM me via social media <a href="https://instagram.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-instagram" aria-hidden="true"></i><span class="label">Instagram</span></a>, <a href="https://twitter.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-twitter" aria-hidden="true"></i><span class="label">Twitter</span></a>.

## One Line Pitch

A website that asks you 20 questions and tries to uniquely identify you in the world. What are the optimal questions to ask?

## Description

In the game [20 questions](https://en.wikipedia.org/wiki/Twenty_questions) a person thinks of something, and the other players must try to guess what he is thinking of by asking 20 questions.

This is a solved game. Meaning that using some information theory and a big enough database that anything can be guessed within 20 or less questions.

Mathematically, if each question is structured to eliminate half the objects, 20 questions allow the questioner to distinguish between 2^20 = 1,048,576 objects. Accordingly, the most effective strategy for twenty questions is to ask questions that will split the field of remaining possibilities roughly in half each time. The process is analogous to a binary search algorithm in computer science or successive-approximation ADC in analog-to-digital signal conversion.

The [20Q device](https://en.wikipedia.org/wiki/20Q) with its limited memory capacity is able to guess the thing you're thinking of on average after ~15 guesses. It shows how asking the right question that divides the remaining possibilities by 50% can quickly uniquely identify an object.

I would like to make a web page that tries to uniquely identify a PERSON in the world by asking them a series of questions. Similarly to the 20Q game the questions should try and divide the remaining population in half each time.

The current population of earth is [8,019,581,782](https://www.worldometers.info/world-population/) as of March 1, 2023. Or 65 bits of information. At most it should take 65 questions to uniquely identify every person in the world. That's a lot of people and questions.

[419,070,540](https://en.wikipedia.org/wiki/List_of_countries_by_English-speaking_population) is the amount of people in the world where English is their first language. This is 29 bits of information or 29 questions. A lot more reasonable.

We don’t actually need to know who the person is. We just want to know what the best questions to ask are. This means that this website can be anonymous. After answering a question it shows you how unique your answers are so far compared to the previous people.

The question database would start off small with only the questions that I can come up with. If a person answers 20s questions without the system being able to fingerprint them (100% unique answers to all 20 questions) then the user is given the option to add their own question to the database.

The questions that are given to the user are based on what the system thinks will divide the remaining propagation in half. The ranking of the questions will change every time someone answers a question.

The value of a system like this is demographics. Using the data from this system a website could ask a few questions when you are signing up. These questions can be used to put people into tribes or categories. These tribes can be used to recommend products or features to them that other similar people liked. Basically a recommendation engine based on tribes, where people are put into tribes quickly by answering a few questions.

Some good starter questions

- Were you born with a “Y” Chromosome?
- Did you graduate college or university?
- Are you married?
- Have you traveled to Europe?
- Do you play games more than 3 hours a week?
- Do you like blue cheese?
- Do you own pets?
- Do you own a vehicle?
- Outside of work time, do you use your phone more than your TV+Computer?
- Is this math statement correct? `-3^2 = 9`
- Did you get an email address before you graduated highschool?
- Is your birth-month an even number
- Do you prefer Windows over Mac OS?

Another idea is to not limit the answers to just yes or no questions. Allowing for multiple choice questions would significantly reduce the amount of questions that would need to be answered. For example, What country do you live in? What age group are you? Etc… Multiple choice questions are more realistic questions to ask if we are doing this as a service. I bet we could reduce the questions from 20 down to 12-15 to uniquely fingerprint someone.

## Prior art

- [Question-Fingerprint](https://github.com/funvill/Question-Fingerprint) - I tried to implement a system like this before but I ran out of steam on it. Technology has improved quite a bit since then to make building a system like this easier. This was my first attempt.
- [How to ask questions to find out anything from anyone](https://www.jotform.com/blog/how-to-ask-questions-to-find-out-anything-from-anyone/) - an okay article on how to ask good questions that give the most information about a person possible.

## Market

Websites that need to recommend things to people. People who like taking tests. Academics. Information theory nerds.
