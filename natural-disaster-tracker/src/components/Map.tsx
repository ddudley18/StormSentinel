import { useState, useEffect, useRef, useMemo } from 'react';
import GoogleMapReact from 'google-map-react';
import WildfireMarker from './WildfireMarker';
import SevereStormMarker from './SevereStormMarker';
import VolcanoMarker from './VolcanoMarker';
import IcebergMarker from './IcebergMarker';
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
  const mapRef = useRef<google.maps.Map<Element> | null>(null);

  const markers = useMemo(() => {
    return eventData.map(ev => {
      const SevereWeatherComponent = getComponentByCategoryId(ev.categories[0].id);
      if (SevereWeatherComponent) {
        return (
          <SevereWeatherComponent
            key={ev.id}
            lat={ev.geometries[0].coordinates[1]}
            lng={ev.geometries[0].coordinates[0]}
            onClick={() => setLocationInfo({ id: ev.id, title: ev.title })}
          />
        );
      }
      return null;
    });
  }, [eventData]);
  
  
  function getComponentByCategoryId(categoryId: number) {
    switch (categoryId) {
      case 8:
        return WildfireMarker;
      case 10:
        return SevereStormMarker;
      case 12:
        return VolcanoMarker;
      case 15:
        return IcebergMarker;
      default:
        return null;
    }
  }

  return (
    <div id="mapBox" className="h-screen w-screen">
      <GoogleMapReact
        bootstrapURLKeys={{ 
          key: googleMapsApiKey }}
        defaultCenter={ center }
        defaultZoom={ zoom }
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          // Once the map is loaded, store its reference in the ref
          mapRef.current = map;
        }}
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