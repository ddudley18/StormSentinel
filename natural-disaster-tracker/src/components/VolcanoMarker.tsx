import { Icon } from "@iconify/react"

interface VolcanoProps {
    lat: number,
    lng: number,
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

const VolcanoMarker: React.FC<Partial<VolcanoProps>> = ({ lat, lng, onClick}) => {
  return (
    <div className="hover:cursor-pointer" onClick={onClick}>
        <Icon icon="noto:volcano" className="text-2xl text-red-500" />
    </div>
  )
}

export default VolcanoMarker