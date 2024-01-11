import { Icon } from "@iconify/react"
import locationIcon from '@iconify/icons-mdi/fire-circle'

interface LocationProps {
    lat: number,
    lng: number,
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

const LocationMarker: React.FC<Partial<LocationProps>> = ({ lat, lng, onClick}) => {
  return (
    <div className="location-marker hover:cursor-pointer" onClick={onClick}>
        <Icon icon={locationIcon} className="location-icon text-2xl text-red-500" />
    </div>
  )
}

export default LocationMarker