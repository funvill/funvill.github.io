---
layout: post
title: Programming Competition Prisoners Dilemma
date: 2012-10-25 00:01
author: funvill
comments: true
categories: [c, code, Competition, contests, Development, experiment, Games, github, News, programming, project, projects, thought, VHS]
---
I have been trying to think of a simpleÂ programming competitionÂ that we can run at the next SHHH (<a href="http://vancouver.hackspace.ca/wp/2012/10/23/super-happy-hacker-house-24-nov-11-2012-730-late/">Super Happy Hacker House</a>) at <a href="http://vancouver.hackspace.ca/wp/">the Vancouver Hackspace</a>.

<a href="http://en.wikipedia.org/wiki/ACM_International_Collegiate_Programming_Contest">ACM International Collegiate Programming Contest</a>Â seems like anÂ obviousÂ choice. I have run though these contest back in collage and they where very challenging.

TooÂ challengingÂ for a SHHH where would probablyÂ consumingÂ some beers and having fun. I was hoping for one with less of aÂ barrierÂ to entry where people with lessÂ programmingÂ experienceÂ couldÂ at-lestÂ join in.

A few months ago IÂ listenedÂ to aÂ <a href="http://www.radiolab.org">Radio Lab</a>Â podcastÂ onÂ <a href="http://www.radiolab.org/blogs/radiolab-blogland/2010/dec/14/prisoners-dilemma/">the prisoners-dilemma</a>Â where they describe the problem and created aÂ competition where people could submit robots that would play this game. They went on to describe the outcome of a few of these robots, how they worked, why they worked that way. It was aÂ interestingÂ podcast.

<img class="alignright size-medium wp-image-2930" style="line-height: 24px; font-size: 16px;" title="PrisonersDilemma" src="http://www.abluestar.com/blog/wp-content/uploads/2012/10/PrisonersDilemma-300x167.png" alt="" width="300" height="167" />

This sounded perfect for a simpleÂ programmingÂ contest. It only had a few rules,Â inputs, Â outputs and its very simple to teach someone.Â So I created a model of the system with a few example bots.
<ul>
	<li><strong>Jebus</strong> - AlwaysÂ cooperates.</li>
	<li><strong>Snitch</strong> - AlwaysÂ defects.</li>
	<li><strong>Random</strong> - Randomly makes choices.</li>
	<li><strong>Copy Cat</strong> - Starts byÂ cooperating but then copies his opponents last move.</li>
	<li><strong>Fool Me Once</strong> - Starts byÂ cooperating but if opponentsÂ everÂ defect it will defect every time after that.</li>
	<li><strong>Forgives</strong> - Starts byÂ cooperating, if theÂ opponentsÂ defect it will defect until theÂ opponentsÂ cooperates twice in a row.</li>
</ul>
As you can see from the results the Snitch wins most of the single rounds since he starts byÂ defecting first and gets a jump start on the rest of the group. But overall the Snitch does do well but not the best as he can neverÂ cooperate with anyone to reduce his sentence.Â The fool me once bot tends to do better as he can recover from the snitch theÂ easiest.

Source code can be found on githubÂ <a href="https://github.com/funvill/PrisonersDilemma">funvill/PrisonersDilemma</a>

This was an interesting exercise and it was fun to program but its too simple for a programming competition. The problem is that there is only one input, output and does not allow for a varietyÂ of choices.

<strong>Other researchÂ </strong>

On stack overflow I found aÂ programming competition for creating <a href="http://stackoverflow.com/questions/1631414/what-is-the-best-battleship-ai">the best battleship AI</a>.Â I also found this one produced by Google that looks amazingÂ <a href="http://aichallenge.org/">http://aichallenge.org/</a>Â too bad there servers are down

More research is needed.

&nbsp;

&nbsp;
