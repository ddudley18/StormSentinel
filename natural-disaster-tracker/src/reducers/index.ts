const initialState: AppState = {
  activeMarker: null,
  showingInfoWindow: false,
  mapParams: { center: { lat: 18.22, lng: -66.59 }, zoom: 4 },
  disasterFilters: {wildfires: true, severeStorms: true, volcanoes: true, icebergs: true},
  initMarkerClick: false
};
  
export const rootReducer = (state: AppState = initialState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case 'SET_ACTIVE_MARKER':
      return { ...state, activeMarker: action.payload };
    case 'SET_SHOWING_INFO_WINDOW':
      return { ...state, showingInfoWindow: action.payload };
    case 'SET_MAP_PARAMS':
      return { ...state, mapParams: action.payload };
    case 'SET_DISASTER_FILTERS':
      return { ...state, disasterFilters: action.payload };
    default:
      return state;
  }
};