export const setActiveMarker = (marker: {id: string | null, title: string | null}) => ({
    type: 'SET_ACTIVE_MARKER',
    payload: marker,
});
  
export const setShowingInfoWindow = (showing: boolean) => ({
    type: 'SET_SHOWING_INFO_WINDOW',
    payload: showing,
});