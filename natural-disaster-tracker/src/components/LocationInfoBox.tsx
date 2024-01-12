import { useSelector, useDispatch } from 'react-redux';
import { setActiveMarker, setShowingInfoWindow } from "@/actions";

interface LocationInfoBoxProps {
  info: {
      id: string;
      title: string;
  }
}

interface RootState {
  activeMarker: {id: string, title: string} | null;
  showingInfoWindow: boolean;
}

const LocationInfoBox: React.FC<LocationInfoBoxProps> = () => {
  
  const activeMarker = useSelector((state: RootState) => state.activeMarker);
  console.log(activeMarker)

  const showingInfoWindow = useSelector((state: RootState) => state.showingInfoWindow);
  console.log(showingInfoWindow)

  return (
    activeMarker && showingInfoWindow &&
      <div className="absolute top-16 right-16 w-64 min-h-48 p-5 mt-12 bg-black bg-opacity-60 rounded-lg text-l text-white">
          <h2 className="text-2xl">{ activeMarker.id }</h2>
          <ul className="p-0">
              <li className="pt-5">ID: <strong>{ activeMarker.id }</strong></li>
              <li className="p-0">TITLE: <strong>{ activeMarker.title }</strong></li>
          </ul>
      </div>
  )
}

export default LocationInfoBox