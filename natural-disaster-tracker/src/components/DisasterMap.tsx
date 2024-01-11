import { useState, useEffect, useRef, useMemo, Component } from 'react';
import WildfireMarker from './WildfireMarker';
import SevereStormMarker from './SevereStormMarker';
import VolcanoMarker from './VolcanoMarker';
import IcebergMarker from './IcebergMarker';
import LocationInfoBox from './LocationInfoBox';
import { Map, GoogleApiWrapper } from "google-maps-react";
import { stringify } from 'querystring';


const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

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
  }[]
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

interface DataObject {
  lat: number;
  long: number;
  uid: number;
  aqi: number;
}

const generateRandomData = (): DataObject[] => {
  const getRandomNumber = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
  };

  const dataArray: DataObject[] = [];

  for (let i = 0; i < 1000; i++) {
    const randomLat = getRandomNumber(-90, 90).toFixed(6);
    const randomLong = getRandomNumber(-180, 180).toFixed(6);
    const randomUid = Math.floor(getRandomNumber(1, 100000));
    const randomAqi = Math.floor(getRandomNumber(1, 10));

    const dataObject: DataObject = {
      lat: parseFloat(randomLat),
      long: parseFloat(randomLong),
      uid: randomUid,
      aqi: randomAqi,
    };

    dataArray.push(dataObject);
  }

  return dataArray;
};

const DisasterMap: React.FC<DisasterMapProps> = ({ google, eventData, center, zoom }) => {
  console.log(eventData)
  const events = eventData.map((event) => {
    let coordinates = event['geometries'][0]['coordinates']
    return {
      'lat': coordinates[1],
      'lng': coordinates[0],
      'id': event['id'],
      'title': event['title']}
  });
  const [stats, setStats] = useState<DataObject[]>([]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = (): void => {
      const randomDataArray = generateRandomData();
      if (isMounted) {
        setStats(randomDataArray);
      }
    };

    fetchData();

    return (): void => {
      isMounted = false;
    };
  }, []);

  const mapObject = {
    google: google,
    initialCenter: center,
    zoom: zoom
  }

  return (
    <div className="w-screen h-screen relative">
      <Map {...mapObject}>
        <WildfireMarker google={google} stats={events} id='asfasd' mouseEnterHandler={() => {return null}} mouseLeaveHandler={() => {return null}}  />
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: googleMapsApiKey, // Replace with your actual API key
})(DisasterMap);

















































// class DisasterMap extends Component {
//   ({ eventData, center, zoom })
//   const [locationInfo, setLocationInfo] = useState<null | { id: string; title: string }>(null);

//   const markers = useMemo(() => {
//     return eventData.map(ev => {
//       const SevereWeatherComponent = getComponentByCategoryId(ev.categories[0].id);
//       const severeWeatherObject = {
//         id: ev.id,
//         lat: ev.geometries[0].coordinates[1],
//         lng: ev.geometries[0].coordinates[0],
//         onClick: () => setLocationInfo({ id: ev.id, title: ev.title })
//       }
//       if (SevereWeatherComponent) {
//         return (
//           <SevereWeatherComponent {...severeWeatherObject} />
//         );
//       }
//       return null;
//     });
//   }, [eventData, setLocationInfo]);
  
  
//   function getComponentByCategoryId(categoryId: number) {
//     switch (categoryId) {
//       case 8:
//         return WildfireMarker;
//       case 10:
//         return SevereStormMarker;
//       case 12:
//         return VolcanoMarker;
//       case 15:
//         return IcebergMarker;
//       default:
//         return null;
//     }
//   }

//   _isMounted = false;

//   constructor(props) {
//     super(props);
//     this.state = {
//       stats: [], // Initialize stats as an empty array
//     };
//   }

//   componentDidMount() {
//     this._isMounted = true;
//     if (this._isMounted) {
//       // Call the function to generate the random data array
//       const randomDataArray = generateRandomData();

//       // Set the generated array in the state
//       this.setState({
//         stats: randomDataArray,
//       });
//     }
//   }

//   componentWillUnmount() {
//     this._isMounted = false;
//   }

//   render() {
//     return (
//       <div>
//           <Map
//             google={this.props.google}
//             initialCenter={{
//               lat: 40.854885,
//               lng: -88.081807,
//             }}
//             zoom={15}
//           >
//             {markers}
//           </Map>
//         </div>
//       );
//   }


// export default GoogleApiWrapper({
//   apiKey:  'AIzaSyDwlwB6zuWUCKTPPS3aqtTgCkcxvfR3yiA',
// })(DisasterMap);




//     <div id="mapBox" className="h-screen w-screen">
//       <GoogleMapReact
//         bootstrapURLKeys={{ 
//           key:'AIzaSyDwlwB6zuWUCKTPPS3aqtTgCkcxvfR3yiA' }}
//         defaultCenter={ center }
//         defaultZoom={ zoom }
//         yesIWantToUseGoogleMapApiInternals
//         onGoogleApiLoaded={({ map }) => {
//           // Once the map is loaded, store its reference in the ref
//           mapRef.current = map;
//         }}
//       >
//         {markers}
//       </GoogleMapReact>
//       {locationInfo && <LocationInfoBox info={locationInfo} />}
//     </div>
//   )
// }

// Map.defaultProps = {
//   center: {
//     lat: 42.3265,
//     lng: -122.8756
//   },
//   zoom: 6
// }

// export default Map