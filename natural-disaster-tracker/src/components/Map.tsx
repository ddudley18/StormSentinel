import { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import LocationMarker from './LocationMarker';
import LocationInfoBox from './LocationInfoBox';

interface EventData {
  id: string;
  title: string;
  categories: {
    id: number;
  }[]; 
  geometries: {
    date: string;
    type: string;
    coordinates: [number, number]
  }[]
}

interface MapProps {
  eventData: EventData[];
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
}

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

const Map: React.FC<MapProps> = ({ eventData, center, zoom }) => {
  const [locationInfo, setLocationInfo] = useState<null | { id: string; title: string }>(null);

  const markers = eventData.map(ev => {
    if(ev.categories[0].id == 8) {
      return (
        <LocationMarker 
          lat={ev.geometries[0].coordinates[1]} 
          lng={ev.geometries[0].coordinates[0]}
          onClick={() => setLocationInfo({ id: ev.id, title: ev.title})}
        />
      )
    }
    return null
  })

  return (
    <div id="mapBox" className="h-screen w-screen">
      <GoogleMapReact
        bootstrapURLKeys={{ 
          key: googleMapsApiKey }}
        defaultCenter={ center }
        defaultZoom={ zoom }
      >
        {markers}
      </GoogleMapReact>
      {locationInfo && <LocationInfoBox info={locationInfo} />}
    </div>
  )
}

Map.defaultProps = {
  center: {
    lat: 42.3265,
    lng: -122.8756
  },
  zoom: 6
}

export default Map