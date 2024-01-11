interface LocationInfoBoxProps {
    info: {
        id: string;
        title: string;
    }
}

const LocationInfoBox: React.FC<LocationInfoBoxProps> = ({ info }) => {
  return (
    <div className="absolute top-16 right-16 w-64 min-h-48 p-5 mt-12 bg-black bg-opacity-60 rounded-lg text-l text-white">
        <h2 className="text-2xl">Event Location Info</h2>
        <ul className="p-0">
            <li className="pt-5">ID: <strong>{ info.id }</strong></li>
            <li className="p-0">TITLE: <strong>{ info.title }</strong></li>
        </ul>
    </div>
  )
}

export default LocationInfoBox