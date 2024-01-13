interface RootState {
    activeMarker: {id: string, title: string, disasterType: string, source: string, coordinates: {lat: number, lng: number}, zoom: number} | null;
    showingInfoWindow: boolean;
    mapParams: { center: { lat: number, lng: number }, zoom: number };
    disasterFilters: { wildfires: boolean, severeStorms: boolean, volcanoes: boolean, icebergs: boolean };
    initMarkerClick: boolean;
}

interface AppState {
    activeMarker: {
        id: string,
        title: string,
        disasterType: string,
        source: string,
        coordinates: {lat: number, lng: number},
        zoom: number
    } | null;
    showingInfoWindow: boolean;
    mapParams: { center: { lat: number, lng: number }, zoom: number };
    disasterFilters: {wildfires: boolean, severeStorms: boolean, volcanoes: boolean, icebergs: boolean};
    initMarkerClick: boolean;
}