import { Icon } from "@iconify/react"

interface IcebergProps {
    lat: number,
    lng: number,
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

const IcebergMarker: React.FC<Partial<IcebergProps>> = ({ lat, lng, onClick}) => {
  return (
    <div className="hover:cursor-pointer" onClick={onClick}>
        <Icon icon="openmoji:iceberg" className="text-2xl text-red-500" />
    </div>
  )
}

export default IcebergMarker