import { Route, Routes } from "react-router-dom";
import { useAuth } from "./src/hooks/useAuth";
import Home from "./src/pages/Home";
import Signin from "./src/pages/Signin";
import Signup from "./src/pages/Signup";
import Board from "./src/pages/Board";
import Navbar from "./src/components/NavBar";
import SideBar from "./src/components/SideBar";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function MainRoutes() {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Routes>
      <Route path="/" element={
        user ?
          <div className="d-flex">
            <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
            <div className="w-100 justify-content-center flex-column align-items-center">
              <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
              <Home />
            </div>
          </div>
          :
          <Link to="/signin"><h1 className="text-center">Voltar para o login</h1></Link>
      } />
      <Route path="/board/:id" element={
        user ?
          <div className="d-flex">
            <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
            <div className="w-100 justify-content-center flex-column align-items-center">
              <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
              <Board />
            </div>
          </div>
          :
          <Link to="/signin"><h1 className="text-center">Back to login</h1></Link>
      } />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<div className="text-center mt-5">
        <h1>Route don't found 404</h1>
        <Link to='/'>Back to Home</Link>
      </div>} />
    </Routes>
  )
}
