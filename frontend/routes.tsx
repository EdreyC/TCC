import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./src/hooks/useAuth";
import Home from "./src/pages/Home";
import Signin from "./src/pages/Signin";
import Signup from "./src/pages/Signup";
import Board from "./src/pages/Board";
import Navbar from "./src/components/NavBar";
import SideBar from "./src/components/SideBar";
import swal from "sweetalert";
import { useEffect, useState } from "react";

export default function MainRoutes() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // swal("Carregando...", {
    //   buttons: false,
    //   timer: 5000,
    // }).then(() => {
    //   if (!user)
    //     navigate("/signin")
    // });
  }, [])

  return (
    <Routes>
      <Route path="/" element={
        user &&
        <div className="d-flex">
          <SideBar />
          <div className="w-100 justify-content-center flex-column align-items-center">
            <Navbar />
            <Home />
          </div>
        </div>
      } />
      <Route path="/board/:id" element={
        user &&
        <div className="d-flex">
          <SideBar />
          <div className="w-100 justify-content-center flex-column align-items-center">
            <Navbar />
            <Board />
          </div>
        </div>
      } />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<span>Route dont found 404</span>} />
    </Routes>
  )
}
