import React, { useEffect, useRef } from "react"
import { Link, Route, Routes, useNavigate } from "react-router-dom"
import { useAuth } from "./src/hooks/useAuth"
import Home from "./src/pages/Home"
import Signin from "./src/pages/Signin"
import Signup from "./src/pages/Signup"
import PrivateRoute from "./src/components/PrivateRoute"
import Board from "./src/pages/Board"
import LongMenu from './src/components/menu/index';
import Navbar from "./src/components/navbar"
import SideBar from "./src/components/SideBar"

export default function MainRoutes() {
  const { user, signInWithGoogle } = useAuth()
  const navigate = useNavigate();

  return (
    <Routes>
      {/* <Route element={<PrivateRoute />}> */}
      <Route path="/" element={
        <>
          <Navbar />
          <div className="d-flex" style={{ position: "relative", height: "100%" }}>
            <SideBar />
            <Home />
          </div >
        </>
      } />
      <Route path="/board" element={<Board />} />
      {/* </Route> */}
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<span>Route dont found 404</span>} />
    </Routes>
  )
}
