import { Icon } from "@iconify/react"
import { PureComponent, useState } from "react";
import { Marker } from "google-maps-react"
import LocationInfoBox from "./LocationInfoBox";

interface WildfireProps {
    id: string;
    data: { lat: number; lng: number; id: string, title: string};
    mouseEnterHandler: () => void;
    mouseLeaveHandler: () => void;
    clickHandler: () => void;
    google: any;
}

const WildfireMarker: React.FC<WildfireProps> = ({ id, data, clickHandler, mouseEnterHandler, mouseLeaveHandler, google, ...props }) => {
  let iw = 70, ih = 94;

  const infoObject = {
    key: id,
    position: {lat: data.lat, lng: data.lng},
    onClick: clickHandler,
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

  return (
    <Marker {...infoObject} />
  );

}

export default WildfireMarker