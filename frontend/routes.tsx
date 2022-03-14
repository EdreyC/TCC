
import { useEffect } from "react"
import { Link, Route, Routes, useNavigate } from "react-router-dom"
import { useAuth } from "./src/hooks/useAuth"
import Home from "./src/pages/Home"
import Sigin from "./src/pages/Signin"
import Signup from "./src/pages/Signup"



export default function MainRoutes() {
  const { user, signInWithGoogle } = useAuth()
  const navigate = useNavigate();

     function isLogin() {
       if (!user) {
    
        navigate("/signin")
      }
      
  }

    useEffect(() => {
         isLogin()
       
      }, [])
    
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Sigin />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>

    )

}