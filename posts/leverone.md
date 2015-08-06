#Leverone Lighting Interface

####Fall 2014

#####Project Overview

The Leverone Field House made an energy-conscious decision last summer to replace all 150 of their overhead lights with [Digital Lumens'](http://digitallumens.com/) Intelligent LED Lighting System — expected to save 10,000 kWh/week. Dartmouth's Facilities Operations & Management [(FO&M)](http://www.dartmouth.edu/~fom/) and Energy Program asked the [DALI Lab](http://dali.dartmouth.edu "DALI Home") to create an intuitive touch screen user interface for the new lighting system. Specifically, they were looking for a:
>"user touch screen depicting the floorplan layout of the field house and a series of password-protected "back screens" where designated users (coaches, special events managers, Athletics administrators) can go to to select pre-defined "scenes" or "profiles" to get a known lighting effect in the facility."

I formally came onto this project during Summer 2014 while the lights were still being installed. In the fall, when we could begin development work, Chuanqi Sun and Kelley Kong joined me. We created a webapp using the Digital Lumens LightRules API and Parse as our backend. Our main partner was Sam Zucker, the lighting designer from FO&M.

#####Design Challenges
Early on we faced communication challenges with our partners. Namely, several coaches and FO&M administrators were technology naive. I had to learn to not be frustrated by seemingly obvious questions and requests and instead try to design with that mindset. Through this project more than any other I've worked on, I was aware of how much I take for granted in my "tech bubble". Some takeaways:
* minimal interfaces are not intuitive for people who have not followed their evolution
* as clean and beautiful as an icon is, it is not a sufficient replacement for explicit words
* the state of the system needs to be immediately apparent on every page

Even though the lighting system made it possible for there to be an infinite amount of lighting possibilities, coaches weren't going to spend inordinate amounts of time designing the ideal lighting profile for their team. They needed to quickly login, quickly see what preset lighting profiles they had access to, and set their desired profile for the duration of their team's practice. Operations managers didn't need to see the lighting profile for "Softball Practice" and the Softball coach didn't need to see the lighting profile for "West End Maintenance." Here's an initial user experience storyboard I made for a hypothetical baseball coach:
![](/img/leverone_story.jpg)

For the user interface I tried to use larger, bolder, fonts and font sizes, flat buttons, and more explicit indicators of system state. I used fewer icons and more words. Here are some process shots and screenshots:

![thirdsies-1](/img/leverone_prof2.png  "work")
![thirdsies-2](/img/leverone_prof4.png  "work")
![thirdsies-3](/img/leverone_prof6.png  "work")
######Lighting Profile Examples

![halfsies-1](/img/leverone_main.jpg  "work")
![halfsies-2](/img/leverone_login.jpg  "work")
######Screenshots

This was my first webapp and my first user interface and experience project with real partners. I learned a lot and I think I succeeded in many ways with my design (the coaches have been using the system since January). However, there are certainly aspects of the design I would change now if given the opportunity.

#####Development Challenges
The largest hurdle for this project came at the end with Dartmouth's Security concerns.

#####User Manual
