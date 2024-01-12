interface AppState {
  activeMarker: { id: string, title: string, disasterType: string, source: string} | null;
  showingInfoWindow: boolean;
}

const initialState: AppState = {
  activeMarker: null,
  showingInfoWindow: false,
};
  
export const rootReducer = (state: AppState = initialState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case 'SET_ACTIVE_MARKER':
      return { ...state, activeMarker: action.payload };
    case 'SET_SHOWING_INFO_WINDOW':
      return { ...state, showingInfoWindow: action.payload };
    default:
      return state;
  }
};