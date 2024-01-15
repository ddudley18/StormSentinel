import os
from dotenv import load_dotenv

from langchain.agents.openai_assistant import OpenAIAssistantRunnable
from langchain.agents import AgentExecutor

from .tools.Tavily_Tool import tavily_search

# Load environment variables from .env file
load_dotenv()

# set up API key
os.environ["TAVILY_API_KEY"] = os.getenv("TAVILY_API_KEY")
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")

# Function to research_internet
def research_tool(input, thread_id):

    # Initialize the Toolkit
    tools = []
    tools.append(tavily_search) # Add Tavily Search to the Toolkit
    
    agent = OpenAIAssistantRunnable.create_assistant(
        name="Research Assistant",
        instructions="You are a personal research assistant on natural disasters currently occuring.",
        tools=tools,
        model="gpt-4-1106-preview",
        as_agent=True,
    )
    
    agent_executor = AgentExecutor(agent=agent, tools=tools)
    
    if thread_id:
        prompt = f"Research the following natural disaster that is currently occuring. Provide a concise summary of your findings. The title of the natural disaster is {input}"
        result = agent_executor.invoke({"content": prompt, "thread_id": thread_id})
    else:
        result = agent_executor.invoke({"content": input})

    output = result['output']
    thread_id = result['thread_id']
    
    return output, thread_id