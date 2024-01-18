#  Storm Sentinel 🌪️🛡️


## TLDR; Here is the demo! 🚀
[![Storm Sentinel Demo](https://github.com/ddudley18/StormSentinel/assets/40705498/0a233003-13bf-4dfb-aa31-363c8ce70200)](https://youtu.be/Z-0Lqlw9o5E)
## 📖 A little intro...
Fresh off of watching [Only the Brave](https://www.youtube.com/watch?v=EE_GY6zccqc), a movie illustrating an incredible true story about firefighters fighting the wildfires🔥 out west, I wanted to build something wildfire-themed. 

I was looking for a way to gain access to live information about currently occuring wildfires, and stumbled across NASA's satellite🛰️ [data](https://api.nasa.gov/). As part of their EONET (Earth Observatory Natural Event Tracker) api, NASA provides data not only on wildfires, but on all natural disasters currently occuring.

So I thought, why not? Let's use this to build a live natural disaster tracker for any type of disaster currently occuring. And _voila_ - Storm Sentinel was born.

## The Map
As the base for everything else, it was important to get the map right. I came across several libraries, eventually settling on **google-map-react** for two reasons: it was being actively maintained and featured the best documentation. This worked great at first, but I ran into a brick wall after hitting the map with lots and lots of markers. When interacting with the map, I was getting laggy flickering markers - uh oh 🧐. 

After looking into it, I discovered the map was trying to rerender every single marker component on any map change (a user click, map dragged, etc). After investigating potential workarounds, I found **google-map-react** keeps most of the implementation details closed off, preventing developers from easily controlling when marker components are rerendered. So I made the migration to **google-maps-react** (as opposed to **google-<ins>map</ins>-react**).

Using the new library only solved half of the problem. The other major issue was how the marker components were getting inputted to the map. Originally, I was mapping coordinates to a list of markers then providing the list to the map. This caused the markers to all share one state, meaning the markers wouldn't lag on interaction such as the map being moved, but would all try to rerender when any individual marker was interacted with (such as a marker handling an onClick). To fix this, I had to move the markers up a level. So instead of inputting the mapped coordinates to marker components, I inputted each marker individually. 

## AI Assistant
## Search & Source Tools
## Filtering
Naturally at some point you think - how do I sort through all these markers that are swamping the map? While the color coding is useful at a smaller scale, it's not helpful for finding specific disasters.

If you're especially interested in active volcanoes for instance, with wildfires tending to dominate the board, it's easy for a stray volcano to get lost among them. A simple collapsible filter is a logical way to fix this problem.

## Awesome Tools That I Used
- [LangChain](https://github.com/langchain-ai/langchain)🦜🔗
- [Tavily](https://github.com/assafelovic/gpt-researcher) ✦
- [Google Maps React](https://github.com/fullstackreact/google-maps-react#readme)🗺️
- [Flowbite](https://flowbite.com/](https://github.com/themesberg/flowbite)https://github.com/themesberg/flowbite)🌊
- [Iconify](https://github.com/iconify/iconify)😀
- [React Loaders Kit](https://github.com/Seimodei/react-loaders-kit)⌛
  
### General Frameworks 
- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)  
- ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)  
- ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)  
- ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)  
- ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
