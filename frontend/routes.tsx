
import { Link, Route, Routes } from "react-router-dom"
import Home from "./src/pages/Home"
import Sigin from "./src/pages/Signin"
import Signup from "./src/pages/Signup"



export default function MainRoutes() {
    return (
        <Routes>
            <Route path="/signin" element={<Sigin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
        </Routes>

    )

}