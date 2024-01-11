import { Icon } from "@iconify/react"
import { PureComponent, useState } from "react";
import { Marker } from "google-maps-react"
import LocationInfoBox from "./LocationInfoBox";

interface WildfireProps {
    id: string,
    google: any,
    stats: Array<{ lat: number; lng: number; id: string, title: string}>;
    mouseEnterHandler: () => void;
    mouseLeaveHandler: () => void;
}

const WildfireMarker: React.FC<WildfireProps> = ({ id, google, stats, mouseEnterHandler, mouseLeaveHandler, ...props }) => {
  const [locationInfo, setLocationInfo] = useState<{id: string, title: string} | null>()
  let iw = 70,
    ih = 94;

  // Add a check for stats to avoid the "Cannot read properties of undefined" error
  if (!stats) {
    return null;
  }


  return stats.map((statObj) => {
      console.log('logging')

      const infoObject = {
        key: id,
        position: {lat: statObj.lat, lng: statObj.lng},
        onClick: () => {
          setLocationInfo({ id: statObj.id, title: statObj.title });
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

      return (
        <Marker {...infoObject} />
      );
  });

}

export default WildfireMarker