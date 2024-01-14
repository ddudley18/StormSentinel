import axios from 'axios';
import DisasterMap from '@/components/DisasterMap'
import { useState, useEffect } from 'react'
import Loader from '@/components/Loader';
import Header from '@/components/Header';
import { useSelector, useDispatch } from 'react-redux';

interface RootState {
  activeMarker: {id: string, title: string, disasterType: string, source: string} | null;
  showingInfoWindow: boolean;
  mapParams: { center: { lat: number, lng: number }, zoom: number };
}

export default function Home() {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const res = await axios.get('http://127.0.0.1:6060/disasters', {
        params: {
          type: 'All',
        },
      });

      const events = res.data;

      setEventData(events);
      setLoading(false);
    }

    fetchEvents();
  }, [])


  const mapParams = useSelector((state: RootState) => state.mapParams);
  
  return (
    <div>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between pt-24">
        { !loading ? <DisasterMap eventData={eventData} center={{lat: mapParams.center.lat, lng: mapParams.center.lng}} zoom={mapParams.zoom} /> : <Loader/>}
      </main>
    </div>
  )
}
