import { useState, useEffect, useMemo } from 'react';
import { Map as GoogleMap, GoogleApiWrapper, mapEventHandler } from "google-maps-react";
import { useSelector, useDispatch } from 'react-redux';

import MapKey from './MapKey';
import LocationInfoBox from './LocationInfoBox';
import DisasterFilter from './DisasterFilter';
import WildfireMarker from './WildfireMarker';
import SevereStormMarker from './SevereStormMarker';
import VolcanoMarker from './VolcanoMarker';
import IcebergMarker from './IcebergMarker';
import InstructionsBox from './InstructionsBox';

import { setShowingInfoWindow } from "@/actions";


const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

const idToMarkerMap = new Map<number, React.ComponentType<any>>([
  [8, WildfireMarker],
  [10, SevereStormMarker],
  [12, VolcanoMarker],
  [15, IcebergMarker],
]);

const DisasterMap: React.FC<DisasterMapProps> = ({ google, eventData, center, zoom }) => {
  const [map, setMap] = useState<google.maps.Map | google.maps.StreetViewPanorama | undefined>();

  const initMarkerClick = useSelector((state: RootState) => state.initMarkerClick);
  const dispatch = useDispatch();
  
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

      const markerType = idToMarkerMap.get(category);
      const MarkerComponent = markerType || WildfireMarker;
      
      return (
              <MarkerComponent
              key={event.id}
              google={google}
              mapRef={map}
              markerData={markerData}
              mouseEnterHandler={() => {return null}}
              mouseLeaveHandler={() => {return null}} 
              
              />
      )
    });
  }, [eventData]);

  const onMapClicked = () => {
    dispatch(setShowingInfoWindow(false));
  };

  const onMapReady: mapEventHandler = (mapProps: any, map: google.maps.Map<Element> | undefined) => {
    setMap(map);
  };

  let mapObject = {
    google: google,
    initialCenter: center,
    center: center,
    zoom: zoom,
    onClick: onMapClicked,
    onReady: onMapReady,
    fullscreenControl: false,
    scrollwheel: true
  }

  useEffect(() => {
    mapObject = {
      google: google,
      initialCenter: center,
      center: center,
      zoom: zoom,
      onClick: onMapClicked,
      onReady: onMapReady,
      fullscreenControl: false,
      scrollwheel: true
    }
  }, [zoom])

  return (
    <div className="w-screen h-screen relative">
      <GoogleMap {...mapObject}>
        {events}
      </GoogleMap>
      ({!initMarkerClick && <InstructionsBox/>})
      {<LocationInfoBox info={{id:'None', title:'None'}}/>}
      <MapKey/>
      <DisasterFilter/>
    </div>
    );
};

export default GoogleApiWrapper({
  apiKey: googleMapsApiKey,
})(DisasterMap);