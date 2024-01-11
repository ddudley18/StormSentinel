import { useState, useEffect, useRef, useMemo, Component } from 'react';
import WildfireMarker from './WildfireMarker';
import SevereStormMarker from './SevereStormMarker';
import VolcanoMarker from './VolcanoMarker';
import IcebergMarker from './IcebergMarker';
import LocationInfoBox from './LocationInfoBox';
import { Map, GoogleApiWrapper } from "google-maps-react";
import { stringify } from 'querystring';


const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

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

interface DisasterMapProps {
  google: any;
  eventData: EventData[];
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
}

const DisasterMap: React.FC<DisasterMapProps> = ({ google, eventData, center, zoom }) => {
  const [locationInfo, setLocationInfo] = useState<{id: string, title: string} | null>()
  
  const events = eventData.map((event) => {
    let coordinates = event['geometries'][0]['coordinates']
    const markerData = {
      'lat': coordinates[1],
      'lng': coordinates[0],
      'id': event['id'],
      'title': event['title']}
    
    return <WildfireMarker
            key={markerData.id}
            google={google}
            data={markerData}
            clickHandler={() => setLocationInfo({ id: event.id, title: event.title })}
            id='asfasd'
            mouseEnterHandler={() => {return null}}
            mouseLeaveHandler={() => {return null}} />
  });

  const mapObject = {
    google: google,
    initialCenter: center,
    zoom: zoom
  }

  return (
    <div className="w-screen h-screen relative">
      <Map {...mapObject}>
        {events}
      </Map>
      {locationInfo && <LocationInfoBox info={locationInfo} />}
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: googleMapsApiKey, // Replace with your actual API key
})(DisasterMap);