---
layout: page
title: Why do we need this project?
parent: Explanations
permalink: /explanations/why-this-project
---

Last updated: 19-02-2022

# Why are we building this project
Naabu wants to become the tool teachers, curriculum designers, and researchers use to improve learning outcomes. I envision an open system like Wikipedia where different disciplines can contribute to something greater than one EdTech project or research study. We base our platform on learning goals, activities, and course modules and attempt to optimize user experience by applying machine learning algorithms and gamification elements.

My [Niels van der Molen](https://github.com/nielsvandermolen) software engineering mindset focuses on up-to-date educational scientific understanding and experiments (e.g., KLI framework and learning curves). All the curriculum and code will be open to being used and modified by anyone, which should significantly reduce the costs for researchers to build their experiments from scratch. The technology stack is an easy-to-learn javascript framework called Svelte and scalable technology with Firebase on the Google Cloud connecting with Tensorflow algorithms written in Python. Furthermore, I would be delighted to work with researchers to design experiments on the platform and would be willing to donate time and effort to set up experiment

# Project Team
[MSc Niels van der Molen](https://www.linkedin.com/in/niels-van-der-molen-0ab1a53a/). Father of two kids. Degrees in computer science and human media interaction. I am the son of a geography teacher, and my significant other and mother of my children is an active math teacher and has a private tutor business. I got professional experience working on [community software](https://www.drupal.org/project/social) for Greenpeace and the [UN](https://www.drupal.org/case-study/sdg-philanthropy), building large systems where people interact and connect. Furthermore, I have deep knowledge about APIs and helped to make an [online course with SymfonyCasts](https://symfonycasts.com/screencast/api-platform). My strength is doing software architecture for complex systems and executing software engineering. My education allows me not to lose perspective on the social side of technology.

The team consists of one, but I feel not alone. In the last seven months of building this project, I gathered a community of people interested in the development of Naabu on Twitch. I am building the tool live on stream every workday, and in the last 30 days. I made friends with a machine learning specialist from Greece, an expert in custom video players from Brazil, and a freshman computer science student from Germany who is learning Svelte and is eager to contribute to the project.

# A detailed description of the tool and the execution plan

The tool allows creating a library of learning goals using a Wikipedia-like consensus approach. Teachers can create interactive learning activities and attach them to the learning goals. With this library of learning goals and activities, teachers can create new course modules where they just have to specify the learning goals they are teaching in class. Currently, I see the course module as temporary units expected to be online from a couple of weeks till a few months. Course modules should be easy to make, and as they run temporarily, they could serve as valuable units for experimentation (e.g., assign groups to different course modules).

The course module turns into a gamified and fun experience for the students. The student will select activities from various activities given by deep learning algorithms trained on the data gathered from user interactions. In 2021, I made the first version of a working deep learning algorithm using engagement data given by the user. The algorithm is ready to be deployed after collecting enough training data. The plan is also to create a similar algorithm focused on the learning outcomes by applying moment-by-moment learning curves.  The teacher would still control the content served in the course module on a high level and can override the algorithms by assigning activities manually. 

The tool should visualize the learning outcomes dashboards displaying moment-to-moment learning curves for students, teachers, curriculum designers, and researchers. The tool will have a dashboard on the course modules, activities, learning goals, individual students, and teachers.

This tool should make the work of a teacher much easier and more valuable. First, most teachers only need to specify what they want the class to learn and not select individual activities. Second, because everybody contributes to one extensive educational library, the workload is shared and can be way more extensive than other curriculum resources. Third, any teacher that has a great lesson or activity in mind can share it, and the lesson can be distributed quickly to all teachers and their students. The use of the tool could lead to a burst of distribution of new learning activities that we would otherwise never have had a large audience.

There is an opportunity to bring together learning engineering ideas in an open-source project. For example, this tool competition will have over 800 project ideas that most likely do turn into final working projects. With an easy-to-use open-source project, people can play with ideas themselves without needing a significant initial investment to get things going. Reducing the costs of new initiatives will increase the impact of each funding dollar. 

## Research base and potential for impact

Only a few differences in instructional content can lead to a fast number of learning experience journeys. [Koedinger et al.](https://www.researchgate.net/publication/258830111_Instructional_Complexity_and_the_Science_to_Constrain_It) estimated that there are quickly hundreds of trillion ways to design instructions. Every new instruction technique increases the number of options exponentially. Furthermore, the evidence shows that there are no easy solutions like learning styles for teaching that generally apply. Consequently, not all the learning experiences on the platform will be good. Still, we hope by using data and tools to visualize learning, students, teachers, curriculum designers, and researchers have the resources available to make it better.

All stakeholders in education want a good education. With all the technological advantages globally, there is a feeling that education can benefit from applying better technology. Unfortunately, most working technologies are closed source, and once they establish a place in the education market, they stop innovating. An open, collaborative community that produces quality content and proven learning results could put counterbalance pressure on other for-profit companies to be more innovative and open. For example, [Microsoft](https://en.wikipedia.org/wiki/Microsoft_and_open_source) is now a significant contributor to the Linux ecosystem.

The first iterations of Naabu focus on complex high school math where there is a small amount of free online content available for students. The initial curriculum built with the tool can potentially impact around 250.000 high school students in the Netherlands (see Table 2), where a high proportion relies on private tutoring (see Table 1). The learning topics are complicated enough that it is a big challenge to create a curriculum that works, especially for the group that needs private tutoring. 

Once we can demonstrate a learning tool that works for one math topic, there are many opportunities for many different companies and institutions to receive support to tackle other math topics and for different target groups. For example, the Gates foundation has [issued grants](https://usprogram.gatesfoundation.org/what-we-do/funding-opportunities/grand-challenge-for-algebra-1) for specific solutions for students to learn algebra 1 in the US. It would be great if other companies and institutions could use this tool to improve learning outcomes for the more marginalized student groups across the globe.  

Research in Content standards, [Bloom's taxonomy](https://en.wikipedia.org/wiki/Bloom%27s_taxonomy), and the work on the [KLI framework](http://pact.cs.cmu.edu/pubs/Koedinger,%20Corbett,%20Perfetti%202012-KLI.pdf) and Understanding by design strengthen the case that it is probably best to start thinking first about what the students should learn before planning learning activities. When you can specifically categorize what you want the students to learn, the assessments and learning activities are often easy to create.


However, constructing reasonable learning goals is complex and a lot of work, and in reality, many teachers fall back on teaching the default curriculum provided by the educational content providers. Teachers can become better at what they do when exposed to the learning goals behind the curriculum and the learning outcomes they generate. This tool makes it easy for curriculum designers to create learning goals while not losing complexity.

[Moment-by-moment learning curves](https://www.upenn.edu/learninganalytics/ryanbaker/GraphReplayBakerEtAlJLS08132013.pdf) are a way to measure the effect size of individual learning activities on learning goals, and they are used in state-of-the-art educational research to determine the effect on interventions. I see them as a successor of Hattie's effect size calculations because we can use them to calculate the effect of individual activities and have more statistical validity. A significant requirement for these learning curves to be calculated is that they have a relation to a learning goal or skill. Luckily, our whole system is built around learning goals, so it should not be too challenging to use moment-by-moment learning curves.

The big problem to solve in education is offering students activities that are both engaging (they will be motivated to learn) and maximizing the learning outcomes (e.g., they learn the subjects robustly). The comparison between Intelligent tutoring systems and [ASSISTments](https://link.springer.com/article/10.1007/s40593-014-0024-x) shows the problems of having a complete artificial intelligence approach versus an approach without any machine learning. A hybrid solution is needed because of the large size of the problem. Machine learning tools are good at interpreting large quantities of data, and human teachers are good at spotting complex patterns for individual students.

# Attention to equity
There is a growing divide of opportunities for learning in the Netherlands where the group that can afford it is spending money on private tutoring. Table 1 shows how much money is spent on education support by families every year. I suspect a large proportion goes to support math education. A free tool that regular teachers could use as extra support with homework could reduce the growing inequality of learning opportunities. It is better for a society that all people can grow academically when they have the potential. The resources of your parents should not be a (significant) factor.

|||||||||||||
|----|----|-----|----|----|----|-----|----|----|----|-----|----|
| **Year** | 2005 | 2010 | 2011 | 2012 | 2013 | 2014 | 2015 | 2016 | 2017 | 2018 | 2019 |
| **Money spent in millions** | 46 | 93 | 99 | 113 | 116 | 136 | 157 | 171 | 210 | 254 | 290 |

Table 1. Estimated money spent by families to education support for secondary education ([Source](https://www.cbs.nl/nl-nl/maatwerk/2021/10/uitgaven-van-huishoudens-aan-onderwijsondersteuning): an official statistics institution of the government in the Netherlands)


# Learning Engineering

We will collect the student activity on the tool (e.g., data related to answers they give on quiz questions), the students' self-reported engagement (too easy, just right, and too difficult), and regular web and video statistics like watch time. We also store the algorithm’s output of selecting the activities and the calculated moment-by-moment learning curves. Combining this data could be a good source for a [Kaggle dataset](https://www.kaggle.com/) for machine learning researchers to gather insights. I will use [Datashop](https://pslcdatashop.web.cmu.edu/) as a reference to structure the data to be helpful to scientists in the field.

A big part of the data collection will be creating a model of the students connected to the learning goals. What does the student know? What mistakes did they make? How much time does he spend on the platform? Are there patterns we can recognize that lead to new features? An example is the implementation of [Duolingo](https://youtu.be/5eG_wxdBw7s?t=385) using a model that can help predict behavior and learning outcomes. Instead of optimizing for engaging as they do in Duolingo, we would allow the teacher or student to determine what percentage they want to optimize for learning outcomes or engagement.

I wish we could make the data available as [Wikimedia](https://dumps.wikimedia.org/backup-index.html) does with regular automated data dumps for everyone to download. The caveat is that the EU GDPR law is respected. No personally identifiable data is in the database unless a student explicitly agrees on specific features to be shared (like gender or age). A potential future feature could be to ask students or teachers to share detailed information for particular experiments only available to specific researchers.

Besides just having the data, the code is also [open-source](https://github.com/naabu/naabu/), so a researcher could use it to host the tool on a new website in a matter of days for custom experiments. Furthermore, the visualization with the moment-to-moment learning curves can be a tool for scientists to investigate differences between learning trajectories.

# Plan for growth
The tool should work on a large scale (e.g., Wikipedia) and a small scale (e.g., one module for one class). Our focus is on creating content for mathematical subjects tested at final examinations in the Netherlands. Where the student age is between 16 and 18.


| Type of education | Total | Year 4 (age 16) | Year 5 (age 17) | Year 6 (age 18) |
|---|---|---|---|---|
| Vwo | 130.051 | 43.420 | 45.513 | 41.118 |
| Havo | 118.186 | 61.788 | 56.408 | 
| Total | 248.237 | | | |

Table 2. The number of students in the target audience for initial modules. ([Source](https://opendata.cbs.nl/statline/#/CBS/nl/dataset/80040ned/table?fromstatweb): an official statistics institution of the government in the Netherlands)

From one of my [previous project](https://www.wisvids.nl/hoofdstukken), we can reuse 1000+ interactive math videos linked to a curriculum book for the target audience of upper high school math students. These videos contain theory lessons and guided practice examples similar to the students’ textbooks.

The plan is to start small, on one math topic at a time. As a test, I started adding learning goals for students to learn how to create exponential formulas. Most of my partner's tutoring service students have had great difficulties learning this topic. When adding the 80 related interactive videos to learning goals, I identified significant gaps in content for specific learning goals. Most of the content in the videos is for teaching students to do the calculations without any more profound understanding. Focusing on different categories of learning goals like classification could lead to more robust learning. So one of the first steps is to add to the content to fill in the gaps. 

One example is that there is little practice content asking students to classify if a relationship is linear or exponential. Or they get the insight into why an exponential connection decreases when a growth factor is below 1. We plan to create new interactive activities to serve these kinds of learning goals, like a dragging widget where students need to group items in buckets. Furthermore, there is potential to create specific custom interactive activities tailed to exponential growth. The technology we use has excellent support to make great tools for learning with [complicated interactions](https://svelte-cubed.vercel.app/examples/trisolaris) without [much effort](https://youtu.be/qD6Pmp45sO4?t=461).


Once a version of the exponential growth module is complete, we will advertise it on search engines, and students who struggle with a topic will engage with the course. The keywords for topics related to exponential growth do not cost much compared to private tutoring. When we gathered data that students are learning the course, the plan is to roll it out to teachers in the Netherlands. Then the hope is that the adoption will grow somewhat organically and that we can convince teachers also to contribute content themselves and run their course modules with the tool.