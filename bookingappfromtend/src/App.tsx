import { BrowserRouter as Router,Route, Routes, Navigate } from "react-router-dom"
import Layout from "./layouts/Layout"
import Register from "./pages/Register"
import SignIn from "./pages/SignIn"
import AddHotel from "./pages/AddHotel"
import { useAppContext } from "./contexts/AppContext"
import MyHotel from "./pages/MyHotel"
import EditHotel from "./pages/EditHotel"
import Search from "./pages/Search"
import HotelDetail from "./pages/HotelDetail"
import Booking from "./pages/Booking"
import MyBooking from "./pages/MyBooking"



function App() {
  
  const {isLoggedIn}=useAppContext()


  return (
   <Router>
    <Routes>
      <Route path="/" element={<Layout><>Home page</></Layout>}/>
      <Route path="/search" element={<Layout><Search/></Layout>}/>
      <Route path="/detail/:hotelId" element={<Layout><HotelDetail/></Layout>}/>
      <Route path="/register" element={<Layout><Register/></Layout>}/>
      <Route path="/signin" element={<Layout><SignIn/></Layout>}/>
      
      {isLoggedIn && <>
        <Route path="/add-hotel" element={<Layout><AddHotel/></Layout>}/>
        <Route path="/my-hotels" element={<Layout><MyHotel/></Layout>}/>
        <Route path="/edit-hotel/:hotelId" element={<Layout><EditHotel/></Layout>}/>
        <Route path="/hotel/:hotelId/booking" element={<Layout><Booking/></Layout>}/>
        <Route path="/my-bookings" element={<Layout><MyBooking/></Layout>}/>
      </>}
      <Route path="*" element={<Navigate to="/"/>}/>
    </Routes>
   </Router>
  )
}

export default App
