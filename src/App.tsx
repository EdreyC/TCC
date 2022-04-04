import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthContextProvider } from "./context/AuthContext"
import MainRoutes from "../routes"


import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthContextProvider>
      <MainRoutes />
    </AuthContextProvider>
  )
}

export default App
