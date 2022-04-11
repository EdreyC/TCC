
import { useEffect } from "react"
import { Link, Route, Routes, useNavigate } from "react-router-dom"
import { useAuth } from "./src/hooks/useAuth"
import Home from "./src/pages/Home"
import Signin from "./src/pages/Signin"
import Signup from "./src/pages/Signup"
import PrivateRoute from "./src/components/PrivateRoute"
import { isAuthenticated } from "./src/util/auth"
import Board from "./src/pages/Board"
import LongMenu from './src/components/menu/index';
import Navbar from "./src/components/navbar"



export default function MainRoutes() {
    
  const { user, signInWithGoogle } = useAuth()
  const navigate = useNavigate();

  useEffect(() => {

   user? navigate("/"):navigate("/signin")

  }, [])

  // if(isAuthenticated() == true){
  //   navigate("/");

  // }
  // else{
  //   navigate("/signin")
  // }
  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/board" element={<Board />} />
      </Route>
      <Route path="*" element={<span>Route dont found 404</span>} />
    </Routes>

  )

}