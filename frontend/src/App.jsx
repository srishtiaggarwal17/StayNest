import React from "react";
import Navbar from "./shared/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Hotels from "./pages/Hotels";
import HotelDescription from "./pages/HotelDescription";
import MyBookings from "./pages/MyBookings";
import Layout from "./ownerpages/Layout";
import OwnerDashboard from "./ownerpages/OwnerDashboard";
import AddRoom from "./ownerpages/AddRoom";
import ListRoom from "./ownerpages/ListRoom";
import { Toaster } from "sonner";
import Payment from "./pages/PaymentPage";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Footer from "./shared/Footer";
import Profile from "./pages/Profile";

const App=()=>{
  const isOwnerPath=useLocation().pathname.includes("owner")
  return (
    <div>
      <Toaster/>
      {!isOwnerPath&&<Navbar/>}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/hotels' element={<Hotels/>} />
          <Route path='/experience' element={<Experience/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/description/:id' element={<HotelDescription/>} />
          <Route path='/bookings' element={<MyBookings/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/owner' element={<Layout/>} >
              <Route index element={<OwnerDashboard/>}/>
              <Route path='/owner/add-room' element={<AddRoom/>}/>
              <Route path='/owner/list-room' element={<ListRoom/>}/>
          </Route>
          <Route path='/payment/bookingId' element={<Payment/>}/>
        </Routes>
      </div>
      {!isOwnerPath&&<Footer/>}
    </div>
  )
}

export default App
