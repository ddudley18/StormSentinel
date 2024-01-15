import { useSelector, useDispatch } from 'react-redux';
import { setMapParams } from "@/actions";

const LocationInfoBox: React.FC<LocationInfoBoxProps> = () => {

  const activeMarker = useSelector((state: RootState) => state.activeMarker);
  const showingInfoWindow = useSelector((state: RootState) => state.showingInfoWindow);
  const dispatch = useDispatch();

  const handleGoogleSearch = () => {
    if (activeMarker) {
      const searchQuery = encodeURIComponent(activeMarker.title);
      const googleSearchUrl = `https://www.google.com/search?q=${searchQuery}&tbm=nws`;
      window.open(googleSearchUrl, '_blank');
    }
  };

  const handleGoToCurrent = () => {
    if (activeMarker) {
      dispatch(setMapParams({center: {lat: activeMarker.coordinates.lat, lng: activeMarker.coordinates.lng}, zoom: 5}))
    }
  }

  const typeToDisasterIconMap = new Map<string, {[key: string]: string}>([
    ['Wildfire', { icon: 'local_fire_department', styles: 'text-orange-400' }],
    ['Severe Storm', { icon: 'cyclone', styles: 'text-blue-500' }],
    ['Volcano', { icon: 'volcano', styles: 'text-red-400' }],
    ['Iceberg', { icon: 'details', styles: 'text-blue-200' }],
  ]);


  const disasterIconInfo = activeMarker ? typeToDisasterIconMap.get(activeMarker.disasterType) : null;
  const iconStyle = disasterIconInfo ? disasterIconInfo.styles : null
  const icon = disasterIconInfo ? disasterIconInfo.icon : null

  return (
    activeMarker && showingInfoWindow &&
      <div className="absolute top-8 right-16 w-64 min-h-48 mt-12 text-lg text-white border-2 border-white bg-black bg-opacity-80 rounded-lg p-5">
          <h2 className="text-3xl">{ activeMarker.id }</h2>
          <ul className="p-0 text-xl">
              <li className="pt-5"><span className='text-gray-400'>TITLE:&nbsp;&nbsp;</span> { activeMarker.title }</li>
              <div className='flex items-center'>
                <li className="p-0 pb-4"><span className='text-gray-400'>TYPE:&nbsp;&nbsp;</span>  { activeMarker.disasterType } </li>
                <span className={`${iconStyle} inline text-3xl material-symbols-outlined mb-4`}>{icon}</span>
              </div>
              <li className="p-0 text-xl">ID:&nbsp;&nbsp; { activeMarker.id }</li>
          </ul>
          <button className="hover:scale-105 mt-4 px-5 py-1 bg-white text-black rounded-lg text-lg mb-4 border border-black" onClick={handleGoToCurrent}>
            Go to Current
          </button>
          <button className="hover:scale-105 mt-5 px-12 py-2 bg-nasa-blue text-white rounded-lg text-lg border border-white" onClick={() => window.open(activeMarker.source, '_blank')}>
          &nbsp;Source&nbsp;
          </button>
          <button className="hover:scale-105 mt-3 px-4 py-2 bg-nasa-blue text-white rounded-lg text-lg border border-white" onClick={handleGoogleSearch}>
            Search the News
          </button>
      </div>
  )
}

export default LocationInfoBox;