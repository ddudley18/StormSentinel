import { Icon } from "@iconify/react"

interface SevereStormProps {
    lat: number,
    lng: number,
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

const SevereStormMarker: React.FC<Partial<SevereStormProps>> = ({ lat, lng, onClick}) => {
  return (
    <div className="hover:cursor-pointer" onClick={onClick}>
        <Icon icon="solar:cloud-storm-bold" className="text-2xl text-blue-700" />
    </div>
  )
}

export default SevereStormMarker