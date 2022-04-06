
import { useEffect } from "react"
import { Link, Route, Routes, useNavigate } from "react-router-dom"
import { useAuth } from "./src/hooks/useAuth"
import Home from "./src/pages/Home"
import Signin from "./src/pages/Signin"
import Signup from "./src/pages/Signup"
import PrivateRoute from "./src/components/PrivateRoute"
import { isAuthenticated } from "./src/util/auth"



export default function MainRoutes() {
    
  const { user, signInWithGoogle } = useAuth()
  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated()
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
      </Route>
      <Route path="*" element={<span>Rota errada 404</span>} />
    </Routes>

  )

}