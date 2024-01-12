import { Icon } from "@iconify/react"
import { PureComponent, useState, useRef, useMemo } from "react";
import { Marker } from "google-maps-react"
import { useSelector, useDispatch } from 'react-redux';
import { setActiveMarker, setShowingInfoWindow } from "@/actions";

interface WildfireProps {
    key: React.Key;
    markerData: { lat: number; lng: number; id: string, title: string};
    mouseEnterHandler: () => void;
    mouseLeaveHandler: () => void;
    google: any;
    mapRef: google.maps.Map | google.maps.StreetViewPanorama | undefined;
}

const WildfireMarker: React.FC<WildfireProps> = ({ key, markerData, mapRef, mouseEnterHandler, mouseLeaveHandler, google, ...props }) => {
  let iw = 70, ih = 94;
  const dispatch = useDispatch();

  const infoObject = {
    key: key,
    position: {lat: markerData.lat, lng: markerData.lng},
    onClick: () => {
      dispatch(setActiveMarker({id: markerData.id, title: markerData.title})),
      dispatch(setShowingInfoWindow(true))
    },
    onMouseover: mouseEnterHandler,
    onMouseout: mouseLeaveHandler,
    google: google,
    ...props,
    icon: {
      url: `https://waqi.info/mapicon/1.30.png`,
      anchor: new google.maps.Point(iw / 4, ih / 2 - 5),
      size: new google.maps.Size(iw / 2, ih / 2),
      scaledSize: new google.maps.Size(iw / 2, ih / 2),
    },
  };

  const memoizedMarker = useMemo(() => <Marker {...infoObject} />, [infoObject]);

  return (
    <>
      {memoizedMarker}
    </>
  );

}

export default WildfireMarker