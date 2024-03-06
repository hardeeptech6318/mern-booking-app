
import { Link } from 'react-router-dom'
import { useAppContext } from '../contexts/AppContext'
import SignOutButton from './SignOutButton'
import { FaHotel } from 'react-icons/fa'
import { MdHotel } from 'react-icons/md'


function Header() {
  const {isLoggedIn}=useAppContext()
  return (
    <div className=' bg-blue-800 py-6'>
        <div className=' container mx-auto flex justify-between'>
            <span className=' text-3xl text-white font-bold tracking-tight'>
                <Link to="/">Holiday</Link>
            </span>
            <span className=' flex space-x-2'>
              {isLoggedIn ? <>
              <Link className='flex items-center text-white px-3 font-bold hover:bg-blue-600 hover:rounded ' to="/my-bookings"><span className='hidden md:block'>My Bookings</span><span className=' md:hidden'><FaHotel /></span></Link>
              <Link className='flex items-center text-white px-3 font-bold hover:bg-blue-600  hover:rounded' to="/my-hotels"><span className='hidden md:block'>My Hotels</span><span className=' md:hidden'><MdHotel /></span></Link>
              <SignOutButton/>
              </>:null}
              {!isLoggedIn && <Link className=' flex items-center text-blue-600 px-3 font-bold hover:bg-gray-100 rounded bg-white' to="/signin">Sign In</Link> }
                
            </span>
        </div>
    </div>
  )
}

export default Header