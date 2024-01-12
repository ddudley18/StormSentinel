import axios from 'axios';
import DisasterMap from '@/components/DisasterMap'
import { useState, useEffect } from 'react'
import Loader from '@/components/Loader';
import Header from '@/components/Header';

export default function Home() {
  const [eventData, setEventData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      const res = await axios.get('http://127.0.0.1:6060/disasters', {
        params: {
          type: 'Severe Storms',
        },
      });

      const events = res.data

      setEventData(events)
      setLoading(false)
    }

    fetchEvents()
  }, [])
  
  return (
    <div>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between pt-24">
        { !loading ? <DisasterMap eventData={eventData} center={{lat: 18.22, lng: -66.59}} zoom={4} /> : <Loader/>}
      </main>
    </div>
  )
}
