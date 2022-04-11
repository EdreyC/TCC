import { AuthContextProvider } from "./context/AuthContext"
import MainRoutes from "../routes"


import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/navbar";

function App() {
  return (
    <AuthContextProvider>
      
      <MainRoutes />
    </AuthContextProvider>
  )
}

export default App
