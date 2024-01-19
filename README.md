#  Storm Sentinel 🌪️🛡️


## TLDR; Here is the demo! 🚀
[![Storm Sentinel Demo](https://github.com/ddudley18/StormSentinel/assets/40705498/0a233003-13bf-4dfb-aa31-363c8ce70200)](https://youtu.be/Z-0Lqlw9o5E)
## 📖 A little intro...
Fresh off of watching [Only the Brave](https://www.youtube.com/watch?v=EE_GY6zccqc), a movie illustrating the incredible true story about firefighters fighting the wildfires🔥 out west, I wanted to build something wildfire-themed. 

I was looking for a way to gain access to live information about currently occuring wildfires, and stumbled across NASA's satellite🛰️ [data](https://api.nasa.gov/). As part of their EONET (Earth Observatory Natural Event Tracker) api, NASA provides data not only on wildfires, but on all natural disasters currently occuring.

So I thought, why not? Let's use this to build a live natural disaster tracker for any type of disaster currently occuring. And _voila_ - Storm Sentinel was born.

## The Map
As the base for everything else, it was important to get the map right. I came across several libraries, eventually settling on **google-map-react** for two reasons: it was being actively maintained and featured the best documentation. This worked great at first, but I ran into a brick wall after hitting the map with lots and lots of markers. When interacting with the map, I was getting laggy flickering markers - uh oh 🧐. 

After looking into it, I discovered the map was trying to rerender every single marker component on any map change (a user click, map dragged, etc). After investigating potential workarounds, I found **google-map-react** keeps most of the implementation details closed off, preventing developers from easily controlling when marker components are rerendered. So I made the migration to **google-maps-react** (as opposed to **google-<ins>map</ins>-react**).

Using the new library only solved half of the problem. The other major issue was how the marker components were getting inputted to the map. Originally, I was mapping coordinates to a list of markers then providing the list to the map. This caused the markers to all share one state, meaning the markers wouldn't lag on interaction such as the map being moved, but would all try to rerender when any individual marker was interacted with (such as a marker handling an onClick). To fix this, I had to move the markers up a level. So instead of inputting the mapped coordinates to marker components, I inputted each marker individually. I also added Redux to ensure each marker could access a global state.

## AI Assistant
<img  src="https://github.com/ddudley18/StormSentinel/assets/40705498/436dd628-6413-4287-bae3-a17d891ec03e"  alt="Delete Feature"  title="Swipe to delete" img align="right" height="80" margin="20"/>  

While knowing the location of disasters is great, it does not tell the whole story.

With the recent rise of LLMs, it seemed only natural to include a handy dandy AI assistant that could help provide more information on each disaster as needed. The goal was to have an AI that could leverage live data from the internet and news feeds to provide an up-to-date summary of the key knowledge of the disaster event. Some questions users might face include: When did it start? Is it spreading? Has the local government issued any warnings?

But how to implement this? A custom trained model using AI libraries such as TensorFlow and PyTorch could work, but would require a lot more upfront time investment. For our purposes, I ended up using [LangChain](https://www.langchain.com/)🦜🔗 combined with [Tavily's](https://tavily.com/)✦ pretrained research agent.

The result? A simple, quick to launch AI assistant that is surprisingly accurate. 

## Info Display Panel & Assorted Tools
<img  src="https://github.com/ddudley18/StormSentinel/assets/40705498/7e565d7c-f154-4796-8a53-71cc7cea4bb3"  alt="Delete Feature"  title="Swipe to delete" img align="left" height="500"/>

When selected, each disaster generates an information panel with basic information such as name, type, and id (as given by NASA). 

Three other tools are also provided here:  
&nbsp;  
&nbsp;1. **Go To Current** - Slides the map back to the marker the user has currently selected.  
&nbsp;2. **Source** - Navigates to the web page where NASA is listing the source of information on the disaster.  
&nbsp;3. **Search The News** - Searches Google News using the disaster name for relevant information

While the AI assitant provides more detail, the **Source** and **Search the News** tools are there to provide the user with a faster way to quickly conduct their own research.  
<img  src="https://github.com/ddudley18/StormSentinel/assets/40705498/c44b77fd-0b95-4c6d-8fae-2529bbc7b4ff"  alt="Delete Feature"  title="Swipe to delete" height="210"/>  

## Filtering  
<img  src="https://github.com/ddudley18/StormSentinel/assets/40705498/b5bf0e66-b98e-4db6-aa6e-aa5c08086aea"  alt="Delete Feature"  title="Swipe to delete" img align="right" height="230"/>  

Naturally at some point you think - how do I sort through all these markers that are swamping the map? While the color coding is useful at a smaller scale, it's not helpful for finding specific disasters. 

For instance, if you're especially interested in active volcanoes, wildfires tend to dominate the map and it's easy for a stray volcano to get lost among them. Especially at a global view, a clumping of wildfires can easily cover another type of disaster hidden underneath.

A simple collapsible filter is a logical way to fix this problem. I implemented a filter based on unique category ids for each type of disaster.
&nbsp;  

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
