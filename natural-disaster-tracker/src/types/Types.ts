interface Option {
    id: number;
    label: string;
}

interface Marker {
    id: string | null,
    title: string | null,
    disasterType: string | null,
    source: string | null,
    coordinates: {lat: number, lng: number},
    zoom: number
}

interface DisasterMarkerProps {
    key: React.Key;
    markerData: { lat: number; lng: number; id: string, title: string, category: number, source: string};
    mouseEnterHandler: () => void;
    mouseLeaveHandler: () => void;
    google: any;
    mapRef: google.maps.Map | google.maps.StreetViewPanorama | undefined;
}

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

interface LocationInfoBoxProps {
    info: {
        id: string;
        title: string;
    }
}