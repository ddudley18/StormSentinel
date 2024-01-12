import { useMemo, useState } from "react";
import { Marker } from "google-maps-react";
import { useSelector, useDispatch } from 'react-redux';
import { setActiveMarker, setShowingInfoWindow } from "@/actions";

interface DisasterMarkerProps {
    key: React.Key;
    markerData: { lat: number; lng: number; id: string, title: string, category: number, source: string};
    mouseEnterHandler: () => void;
    mouseLeaveHandler: () => void;
    google: any;
    mapRef: google.maps.Map | google.maps.StreetViewPanorama | undefined;
}

const idToMarkerMap = new Map<number, string>([
  [8, '/lightorangemarker.png'],
  [10, '/darkbluemarker.png'],
  [12, '/darkredmarker.png'],
  [15, '/icebluemarker.png'],
]);

const idToDisasterTypeMap = new Map<number, string>([
  [8, 'Wildfire'],
  [10, 'Severe Storm'],
  [12, 'Volcano'],
  [15, 'Iceberg'],
]);

const DisasterMarker: React.FC<DisasterMarkerProps> = ({ key, markerData, mapRef, google, ...props }) => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  let iw = 70, ih = 94;
  const dispatch = useDispatch();
  let categoryMarker = idToMarkerMap.get(markerData['category']) ?? '/marker.png';
  let disasterType = idToDisasterTypeMap.get(markerData['category']) ?? 'Unknown';

  const infoObject = {
    key: key,
    position: {lat: markerData.lat, lng: markerData.lng},
    mapRef: mapRef,
    className: 'animate-bounce',
    onClick: () => {
      dispatch(setActiveMarker({id: markerData.id, title: markerData.title, disasterType: disasterType, source: markerData['source']})),
      dispatch(setShowingInfoWindow(true))
    },
    onMouseover: () => {
      // dispatch(setActiveMarker({id: markerData.id, title: markerData.title})),
      // dispatch(setShowingInfoWindow(true))
      setIsMouseOver(true);
      categoryMarker= './darkbluemarker.png'
    },
    onMouseout: () => {
      setIsMouseOver(false)
    },
    google: google,
    ...props,
    icon: {
      url: isMouseOver ? './yellowmarker.png' : categoryMarker,
      anchor: new google.maps.Point(18, 36),
      size: new google.maps.Size(44, 44),
      scaledSize: new google.maps.Size(36, 44),
    },
  };

  const memoizedMarker = useMemo(() => <Marker {...infoObject} />, [infoObject]);
  console.log(isMouseOver)

  return (
    <div>
      {memoizedMarker}
    </div>
  );

}

export default DisasterMarker;


