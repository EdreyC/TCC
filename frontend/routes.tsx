import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "./src/hooks/useAuth";
import Home from "./src/pages/Home";
import Signin from "./src/pages/Signin";
import Signup from "./src/pages/Signup";
import Board from "./src/pages/Board";
import Navbar from "./src/components/NavBar";
import SideBar from "./src/components/SideBar";
import Swal from 'sweetalert2';

export default function MainRoutes() {
  const { user } = useAuth();

  // let timerInterval: any
  // Swal.fire({
  //   title: 'Auto close alert!',
  //   html: 'I will close in <b></b> milliseconds.',
  //   timer: 2000,
  //   timerProgressBar: true,
  //   didOpen: () => {
  //     Swal.showLoading()
  //     const b = Swal.getHtmlContainer().querySelector('b')
  //     timerInterval = setInterval(() => {
  //       b.textContent = Swal.getTimerLeft()
  //     }, 100)
  //   },
  //   willClose: () => {
  //     clearInterval(timerInterval)
  //   }
  // }).then((result) => {
  //   /* Read more about handling dismissals below */
  //   if (result.dismiss === Swal.DismissReason.timer) {
  //     console.log('I was closed by the timer')
  //   }
  // })

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
