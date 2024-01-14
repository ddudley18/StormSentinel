import { useMemo, useState, useEffect } from "react";
import { Marker } from "google-maps-react";

import { useSelector, useDispatch } from 'react-redux';
import { setActiveMarker, setShowingInfoWindow, setInitMarkerClick } from "@/actions";

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

const IcebergMarker: React.FC<DisasterMarkerProps> = ({ key, markerData, mapRef, google, ...props }) => {
  const [passesFilter, setPassesFilter] = useState(true);
  const [isMouseOver, setIsMouseOver] = useState(false);

  const dispatch = useDispatch();
  let filter = useSelector((state: RootState) => state.disasterFilters.icebergs);

  let categoryMarker = idToMarkerMap.get(markerData['category']) ?? '/marker.png';
  let disasterType = idToDisasterTypeMap.get(markerData['category']) ?? 'Unknown';

  useEffect(() => {
     setPassesFilter(filter);
  }, [filter]);

  const infoObject = {
    key: key,
    position: {lat: markerData.lat, lng: markerData.lng},
    mapRef: mapRef,
    onClick: () => {
      dispatch(setActiveMarker({id: markerData.id, title: markerData.title, disasterType: disasterType, source: markerData['source'], coordinates: {lat: markerData.lat, lng: markerData.lng}, zoom: 2})),
      dispatch(setShowingInfoWindow(true));
      dispatch(setInitMarkerClick(true));
    },
    onMouseover: () => {
      setIsMouseOver(true);
    },
    onMouseout: () => {
      setIsMouseOver(false)
    },
    google: google,
    ...props,
    icon: {
      url: isMouseOver ? './yellowmarker.png': categoryMarker,
      anchor: new google.maps.Point(18, 36),
      size: new google.maps.Size(44, 44),
      scaledSize: new google.maps.Size(36, 44),
    },
  };

  const memoizedMarker = useMemo(() => <Marker {...infoObject} />, [infoObject]);

  return (
    <div>
      {passesFilter && memoizedMarker}
    </div>
  );
}

export default IcebergMarker;