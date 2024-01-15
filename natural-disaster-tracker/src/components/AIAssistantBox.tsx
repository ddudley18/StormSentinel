import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { useSelector } from 'react-redux';
import axios from "axios";


const AIAssistantBox = () => {
    let [agentWorking, setAgentWorking] = useState(false);
    let [agentFinished, setAgentFinished] = useState(false);
    let [researchedMarker, setResearchedMarker] = useState("")

    const activeMarker = useSelector((state: RootState) => state.activeMarker);
    const showingInfoWindow = useSelector((state: RootState) => state.showingInfoWindow);

    const startAIAgent = async () => {
        if (activeMarker) setResearchedMarker(activeMarker.id);
        setAgentWorking(true);
        const res = await axios.get('http://127.0.0.1:6060/research', {
          params: {

            disaster_title: activeMarker?.title,
          },
        });

        setResearchedMarker(res.data.body);
        setAgentFinished(true);
    }


    return (
        <div>
                {(agentWorking && agentFinished) ? (
                    <>
                    <div className="max-h-[40rem] overflow-y-auto absolute bottom-32 left-1/2 transform -translate-x-1/2 min-h-48  mt-4 bg-black bg-opacity-80 rounded-xl text-lg text-white border-2 border-white flex flex-col">
                        <span className="flex items-center bg-gradient-to-r from-gray-700 via-black to-gray-700 sticky top-0 border border-gray-700">
                            <span className="text-xl my-4 italic inline ml-6 mr-56 hover:underline hover:font-bold hover:cursor-pointer" onClick={() => {setAgentWorking(false); setAgentFinished(false);}}>Clear</span>
                            <h2 className="text-3xl mx-auto my-4 italic inline">Ask AI &nbsp; <Icon icon="fluent-emoji:robot" className="text-3xl mr-2 inline"/></h2>
                            <span className="mx-auto my-4"></span>
                        </span>
                        <div className={`mt-4 px-6 pr-5 py-1 mr-4 rounded-lg text-lg mb-4 italic bg-gray-800 text-white border-white ${agentWorking ? '' : 'hover:bg-blue-600 '}`}>
                            Here's what I found: <br></br>
                            <div className="inline not-italic whitespace-pre-line text-left">{researchedMarker}</div>
                        </div>

                    </div>
                    </> 
                ) : (activeMarker && showingInfoWindow) ? (
                    <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 min-h-48 px-3 mt-4 bg-black bg-opacity-80 rounded-xl text-lg text-white border-2 border-white flex items-center">
                        <span className="flex items-center">
                            <h2 className="text-3xl mx-4">Ask AI</h2>
                        </span>
                        <button onClick={startAIAgent} disabled={agentWorking} className={`mt-4 px-6 pr-5 py-1 mr-4 rounded-lg text-lg mb-4 italic bg-blue-500 text-white border-white ${agentWorking ? '' : 'hover:bg-blue-600 '}`} >
                            {agentWorking ? (
                                <>
                                    <Icon icon="line-md:loading-twotone-loop" className="text-3xl mr-2 inline"/>
                                    <div className="inline">Working on it...</div>
                                </>
                            ) : (
                                <>
                                    <Icon icon="fluent-emoji:robot" className="text-3xl mr-2 inline"/>
                                    Tell me more about this {activeMarker.disasterType.toLowerCase()}...
                                </>
                            )}
                        </button>
                    </div>
                ) : (
                    <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 min-h-48 px-3 mt-4 bg-black bg-opacity-80 rounded-xl text-lg text-white border-2 border-white flex items-center">
                        <span className="flex items-center">
                            <h2 className="text-3xl mx-4">Ask AI</h2>
                        </span>
                        <button disabled={true} className=" mt-4 px-6 pr-5 py-1 mr-4 bg-blue-800 bg-opacity-90 text-white rounded-lg text-lg mb-4 border-white italic" >
                        <Icon icon="fluent-emoji:robot" className="text-3xl mr-2 inline"/>
                            No event selected currently
                        </button>
                    </div>
                )}
        </div>

    )
}

export default AIAssistantBox