import { useState, useEffect, useRef, useMemo, Component, MutableRefObject } from 'react';
import DisasterMarker from './DisasterMarker';
import LocationInfoBox from './LocationInfoBox';
import { Map, GoogleApiWrapper, mapEventHandler } from "google-maps-react";
import { stringify } from 'querystring';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveMarker, setShowingInfoWindow } from "@/actions";


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
  }[];
  sources: {
    id: string;
    url: string;
  }[];
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
  const [map, setMap] = useState<google.maps.Map | google.maps.StreetViewPanorama | undefined>();
  
  const events = useMemo(() => {
    return eventData.map((event) => {
      let coordinates = event['geometries'][0]['coordinates']

      const category = event['categories'][0]['id'];
      const source = event['sources'][0]['url'];

      const markerData = {
        'lat': coordinates[1],
        'lng': coordinates[0],
        'id': event['id'],
        'title': event['title'],
        'category': category,
        'source': source}
      
      return (
              <DisasterMarker 
              key={event.id}
              google={google}
              mapRef={map}
              markerData={markerData}
              // onClick={() => setLocationInfo({ id: event.id, title: event.title })}
              mouseEnterHandler={() => {return null}}
              mouseLeaveHandler={() => {return null}} 
              
              />
      )
    });
  }, [eventData]);

  const dispatch = useDispatch();
  const onMapClicked = () => {
    dispatch(setShowingInfoWindow(false));
  };

  const onMapReady: mapEventHandler = (mapProps: any, map: google.maps.Map<Element> | undefined) => {
    setMap(map);
  };

  const mapObject = {
    google: google,
    initialCenter: center,
    zoom: zoom,
    onClick: onMapClicked,
    onReady: onMapReady,
    fullscreenControl: false
  }

  return (
    <div className="w-screen h-screen relative">
      <Map {...mapObject}>
        {events}
      </Map>
      {<LocationInfoBox info={{id:'None', title:'None'}}/>}
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: googleMapsApiKey, // Replace with your actual API key
})(DisasterMap);