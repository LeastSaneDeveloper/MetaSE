# Risk Detection (Scam & Malware Signals)
The search results are analyzed, and it flags potential risks using things like domain age, reputation, SSL quality, WHOIS anomalies, suspicious patterns, etc.
Levels:
* Low risk (Green)
* Some concerns (Yellow)
* Concerning (Orange)
* High risk (Red)
Users can also see why it's flagged, and they can see information about the domains.

# Ad, Tracker, and Privacy Detection
This detects trackers, ad scripts, and fingerprinting behavior, and it assigns a privacy score. It'll show how many, what specific ads/trackers/scripts, etc.

# Archive Viewer
Using the Wayback Machine's public API, you can look at snapshots of a page, and easily snapshot it yourself.

# Page Intent Detection
It'll determine what a page is trying to do:
* Commercial (selling products/services)
* Informational (articles, guides)
* Login/account pages
* Other categories
And it'll determine if it's most likely good quality or low quality (i.e. AI generated slop).

You can search for specific categories due to this feature (i.e. programming sites, academic sites, etc).

# Safe Alternatives
When a result is flagged as risky, it suggests better sites.

# Discussion Mode
This boosts forums and community-driven platforms like Reddit and Stack Overflow.

# Self-hostable, with a Twist
Labsearch allows you to self host your own instance. However, you can also customize it a lot (i.e. what search indexes to use for images, general search results, videos, etc, and what ranking strategy to use, and what search engines to use for, say, news, etc, and you can change the weights of the different search engines, etc), and you can let the server store it via a link you can set as your default search engine. You can customize even the UI via an easy interface. Note that all of the features jere can be changed/disabled in settings. You don't need your own server.

# Preview Websites
Without even going to the website, you can look at a stripped-down version of it. It looks like reader mode!

# Boost Result
You can boost specific websites by simply pressing upvote, and vice versa via the downvote button. You can always undo or change your vote in settings. You can also block websites.

# No AI!
Self explanatory. Specifically LLMs. They are stripped out of the search results, and there's no option to add it. We want a healthy and slop-free internet, and we want a healthy planet.

# No Tracking and Ads!
At all. We even go so far as to remove sponsored results from the search results.

# Open Source Project using Open Source Tools
Nothing we use is proprietary, and nothing we use is closed source. NodeJS is the backend, so front end developers won't have a hard time getting used to working with it. We use open source libraries for complex things (i.e. cheerio for DOM parsing), but the main stuff is developed in-house.

# Simple Onboarding Process
It's very simple. You can skip the onboarding process if you want. There are preconfigured template options if you're lazy. You can configure basic settings with easy to understand labels. You can configure advanced settings anytime.