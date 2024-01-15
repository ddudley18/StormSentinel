import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { useSelector } from 'react-redux';


const AIAssistantBox = () => {
    let [agentWorking, setAgentWorking] = useState(false);

    const activeMarker = useSelector((state: RootState) => state.activeMarker);
    const showingInfoWindow = useSelector((state: RootState) => state.showingInfoWindow);

    const startAIAgent = () => {
        setAgentWorking(true);
    }

    return (
        <div>
            {(activeMarker && showingInfoWindow) ? (
                <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 min-h-48 px-3 mt-4 bg-black bg-opacity-80 rounded-xl text-lg text-white border-2 border-white flex items-center">
                    <span className="flex items-center">
                        <h2 className="text-3xl mx-4">Ask AI</h2>
                    </span>
                    <button onClick={startAIAgent} className="hover:bg-blue-600 mt-4 px-6 pr-5 py-1 mr-4 bg-blue-500 text-white rounded-lg text-lg mb-4 border-white italic" >
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