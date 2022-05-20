import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "./src/hooks/useAuth";
import Home from "./src/pages/Home";
import Signin from "./src/pages/Signin";
import Signup from "./src/pages/Signup";
import Board from "./src/pages/Board";
import Navbar from "./src/components/NavBar";
import SideBar from "./src/components/SideBar";
import Swal from 'sweetalert2';
import { useEffect } from "react";

export default function MainRoutes() {
  const { user } = useAuth();

  // const logando = () => {
  //   let timerInterval: any
  //   Swal.fire({
  //     title: 'Logando...',
  //     html: '<b></b> milliseconds.',
  //     timer: 5000,
  //     timerProgressBar: true,
  //     didOpen: () => {
  //       Swal.showLoading()
  //       const b = Swal.getHtmlContainer().querySelector('b')
  //       timerInterval = setInterval(() => {
  //         b.textContent = Swal.getTimerLeft()
  //       }, 100)
  //     },
  //     willClose: () => {
  //       clearInterval(timerInterval)
  //     }
  //   }).then((result) => {
  //     if (result.dismiss === Swal.DismissReason.timer) {
  //     }
  //   })
  // }

  useEffect(() => {
    Swal.fire(
      'Good job!',
      'You clicked the button!',
      'success'
    )
    // let btn = document.createElement("button");
    // btn.innerHTML = "";
    // btn.id = "btn";
    // btn.onclick = logando;
    // document.body.appendChild(btn);

    // document.getElementById("btn")?.click();
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
