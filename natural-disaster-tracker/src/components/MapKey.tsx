const MapKey = () => {
  return (
    <div className="absolute bottom-40 left-16 w-58 min-h-48 p-5 mt-12 bg-black bg-opacity-70 rounded-lg text-l text-white border-2 border-white hover:bg-opacity-90">
        <h2 className="text-3xl text-center">Key</h2>
        <ul className="p-0 text-xl pt-4">
            <span><img src='./lightorangemarker.png' className='inline pb-2 w-7 h-11'></img> &nbsp;&nbsp; Wildfires </span>
            <br />
            <span><img src='./darkbluemarker.png' className='inline pb-2 w-7 h-11'></img> &nbsp;&nbsp; Severe Storms </span>
            <br />
            <span><img src='./icebluemarker.png' className='inline pb-2 w-7 h-11'></img> &nbsp;&nbsp; Icebergs </span>
            <br />
            <span><img src='./darkredmarker.png' className='inline pb-2 w-7 h-11'></img> &nbsp;&nbsp; Volcanoes </span>
            <br />
        </ul>
    </div>
  )
}

export default MapKey