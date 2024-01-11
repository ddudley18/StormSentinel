import { Icon } from "@iconify/react"

interface WildfireProps {
    lat: number,
    lng: number,
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

const WildfireMarker: React.FC<Partial<WildfireProps>> = ({ lat, lng, onClick}) => {
  return (
    <div className="hover:cursor-pointer" onClick={onClick}>
        <Icon icon="emojione:fire" className="text-4xl text-red-500" />
    </div>
  )
}

export default WildfireMarker