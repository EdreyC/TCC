import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { BsFillPlusSquareFill } from "react-icons/bs"
import { FiSettings } from "react-icons/fi";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { auth } from "../services/firebase";

import Button from './../components/Button/index';
import FadeMenu from './../components/menu/index';
import LongMenu from "./../components/menu/index";

export default function Home() {

  // const navigate = useNavigate();
  const { user } = useAuth()

  // console.log(user)

  // async function SignOut() {

  //   await signOut(auth).then(() => {
  //     navigate('/signin')

  //     console.log(auth.name)

  //   }).catch((error) => {
  //     console.log(error)
  //   });
  //   window.location.reload();

  // }

  return (

    <div>

      {/* <button onClick={SignOut} >Logout</button> */}

      <div className="d-flex align-items-center justify-content-end p-3 gap-3">

        {/* <Dropdown>
          <Dropdown.Toggle className="d-none">
          <FiSettings type="button"  size={25}></FiSettings>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
        <LongMenu />
       
        {/* <img  style={{width:70, height:70}}className="rounded-circle" src={user?.avatar} alt="" /> */}
        <h1 className="fs-5  fw-medium">{user?.name}</h1>

      </div>

      <div className="d-flex justify-content-center">
        <div className="d-flex p-2 border border-2 border-secondary rounded ">
          <input type="text" className="border-0 " placeholder="Create a new project" />
          <BsFillPlusSquareFill color="#7862FF" style={{ cursor: "pointer" }} onClick={() => alert("dasdas")} size={25} />
        </div>

        <div>
          {/* .map... */}
        </div>
      </div>


    </div>
  )
}


