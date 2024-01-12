import { Icon } from "@iconify/react"

const Header = () => {
  return (
    <header className="p-1 bg-nasa-blue text-white fixed top-0 right-0 left-0 z-50 border-b-2 border-solid border-white overflow-hidden whitespace-nowrap">
        <h1 className="text-4xl pt-0 mt-0 text-center">
            Severe Weather Tracker (Powered By <Icon className="inline pb-1 animate-pulse" icon="simple-icons:nasa" width="100" height="100"/> <img src="../satelliteOne.gif"  className="w-14 h-14 inline" alt="GIF"></img>)
        </h1>
    </header>
  )
}

export default Header;