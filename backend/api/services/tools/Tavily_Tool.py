import os
from dotenv import load_dotenv
from tavily import TavilyClient
from langchain.tools import BaseTool, StructuredTool, Tool, tool

# Load environment variables from .env file
load_dotenv()

tavily_api_key = os.getenv("TAVILY_API_KEY")

@tool
def tavily_search(search: str) -> str:
    "General tool to search the web and gather relevant website urls and their respective data based on the search query."
    tavily = TavilyClient(tavily_api_key)

    response = tavily.search(query=search, search_depth="advanced")

    # Get the search results as context to pass an LLM:
    context = [{"url": obj["url"], "content": obj["content"]} for obj in response['results']]
    
    return str(context)