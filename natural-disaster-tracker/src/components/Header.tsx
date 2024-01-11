import { Icon } from "@iconify/react"
import locationIcon from '@iconify/icons-mdi/fire-alert'

const Header = () => {
  return (
    <header className="p-2 bg-blue-800 text-white fixed top-0 right-0 left-0 z-50 border-b-4 border-solid border-white">
        <h1 className="text-3xl pt-0 mt-0 text-center">
            Severe Weather Tracker (Powered By <Icon className="inline pb-1" icon="simple-icons:nasa" width="84" height="84"/>)
        </h1>
    </header>
  )
}

export default Header