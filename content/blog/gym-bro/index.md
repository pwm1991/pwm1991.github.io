---
title: 'Gym Bro'
date: 2025-06-16
tags: [llm, claude, gym]
---

[Get your Hevy Workout App data using Node](https://github.com/pwm1991/hevy).

The Hevy Workout ([App Store](https://apps.apple.com/us/app/hevy-workout-tracker-gym-log/id1458862350)) app has an API! Why not get my workout data and do something with it?

It's just a simple Node script to get the workout data and write to JSON. From there, I've been throwing it into a Claude project and using a set of instructions to be my gym bro and asking it questions about my workouts, performance and experiences.

This has taken the form of questions like:

- Create a workout based on the last 4 weeks of data, using the same or similar machines I've used in that time
- Evaluate my progress on $muscle_group and suggest progress tips
- Am I pushing myself too hard on pull days? Use my RPE, weight progress to give your opinion

It's been particularly handy as I ramp up going to the gym this year, from 1-2x per week in 2024 to 4-5x per week in 2025. Having something that can evaluate a week's worth of data has been invaluable for me.

#### Using Claude Code

Most of the script was written by hand, but when Claude Code came out I gave it $20 and had a go at vibe coding some improvements. I'd say about 20-30% of the script is from Claude, most of which has been improving the unit tests, switching to pino, and better handling of things like bodyweight workouts and edge cases.

#### Things I noticed while using Claude Code

Wizardry! Super cool. It _burned_ through cash doing trivial exploration and going down rabbit holes. I asked it to make a react app to chart my workout data and it was absolutely fugly, terrible accessibility, but with much more detailed instruction it would have been really strong. And in a few years time, the v0.1 from poor prompting will be much higher.

A few specific things I noticed:

1. It hallucinated Claude APIs. I asked it to take the JSON file of workout data and add it to my Claude project with my custom instructions. Claude Code hallucinated an API and had updated the project, `.env` and all this other stuff with a completely made up set of endpoints. It then spent a bunch of cash debugging why the endpoints weren't working.
2. It made good but ultimately pointless assumptions on the internationality of the repo. It saw that I was doing pounds-to-kilos conversion (for 1 piece of gym equipment, which now has `kg` labels) and had rewritten the repo to be weight-system agnostic, ultimately for no real benefit.
3. CLAUDE.md was really good, and it led me to adding some to the projects my team maintains at work

#### What's next?

First I emailed Hevy asking them to support webhooks - if they support them, I'll rework this so that I don't have to run it in batch and manually. They replied quickly and said yes, but nothing as of yet.

I also want to experiment with Claude creating workouts for me. The current process has too much friction: I have to run this script, copy the file to Claude, have a conversation, then manually adjust my plans using Hevy Web. I want to experiment with Claude creating workout plans directly in Hevy and see how they perform over a few weeks.

Finally, I'll have Claude actually work out for me...
