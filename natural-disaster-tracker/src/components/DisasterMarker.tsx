import { useMemo, useState } from "react";
import { Marker } from "google-maps-react";
import { useSelector, useDispatch } from 'react-redux';
import { setActiveMarker, setShowingInfoWindow } from "@/actions";

interface DisasterMarkerProps {
    key: React.Key;
    category: number;
    markerData: { lat: number; lng: number; id: string, title: string};
    mouseEnterHandler: () => void;
    mouseLeaveHandler: () => void;
    google: any;
    mapRef: google.maps.Map | google.maps.StreetViewPanorama | undefined;
}

const idToCategoryMap = new Map<number, string>([
  [8, '/lightorangemarker.png'],
  [10, '/darkbluemarker.png'],
  [12, '/darkredmarker.png'],
  [15, '/icebluemarker.png'],
]);

const DisasterMarker: React.FC<DisasterMarkerProps> = ({ key, category, markerData, mapRef, google, ...props }) => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  let iw = 70, ih = 94;
  const dispatch = useDispatch();
  const categoryMarker = idToCategoryMap.get(category) ?? '/marker.png';

  const infoObject = {
    key: key,
    position: {lat: markerData.lat, lng: markerData.lng},
    mapRef: mapRef,
    className: 'animate-bounce',
    onClick: () => {
      dispatch(setActiveMarker({id: markerData.id, title: markerData.title})),
      dispatch(setShowingInfoWindow(true))
    },
    // onMouseover: () => {
    //   dispatch(setActiveMarker({id: markerData.id, title: markerData.title})),
    //   dispatch(setShowingInfoWindow(true))
    //   setIsMouseOver(true);
    // },
    // onMouseout: () => {
    //   setIsMouseOver(false)
    // },
    google: google,
    ...props,
    icon: {
      url: categoryMarker,
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


