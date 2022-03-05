import { ChakraProvider } from "@chakra-ui/react"
import { Link, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Sigin from "./pages/Signin"
import Signup from "./pages/Signup"


function App() {
  return(
    <Routes>
      <Route path="/signin" element={<Sigin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default App
