export const setActiveMarker = (marker: Marker) => ({
    type: 'SET_ACTIVE_MARKER',
    payload: marker,
});
  
export const setShowingInfoWindow = (showing: boolean) => ({
    type: 'SET_SHOWING_INFO_WINDOW',
    payload: showing,
});

export const setMapParams = (map : { center: { lat: number, lng: number }, zoom: number }) => ({
    type: 'SET_MAP_PARAMS',
    payload: map,
});

export const setDisasterFilters = (filters : {wildfires: boolean, severeStorms: boolean, volcanoes: boolean, icebergs: boolean}) => ({
    type: 'SET_DISASTER_FILTERS',
    payload: filters,
});

export const setInitMarkerClick = (click: boolean) => ({
    type: 'SET_INIT_MARKER_CLICK',
    payload: click,
});