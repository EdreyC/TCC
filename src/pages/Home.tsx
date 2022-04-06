import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { BsPlus } from "react-icons/bs"
import { FiSettings } from "react-icons/fi";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { auth } from "../services/firebase";

import Button from './../components/Button/index';
import FadeMenu from './../components/menu/index';
import LongMenu from "./../components/menu/index";
import Task from "../components/task";

export default function Home() {

  const { user } = useAuth()
  const [name, setName] = useState("");


    const task=[{name:name}]


  return (

    <div>


      <div className="d-flex align-items-center justify-content-end py-4 px-5 gap-3">

        <LongMenu />

        <h1 className="fs-5  fw-medium">{user?.name}</h1>

      </div>

      <div className="d-flex justify-content-center flex-column align-items-center gap-5">
        <div className="d-flex p-2 border border-2  border-secondary rounded ">
          <input value={name} onChange={e => setName(e.target.value)} type="text" className="border-0 " placeholder="Create a new project" />
          <Button radius="0.5rem" padding="3px"><BsPlus color="white" size={25} /></Button>

        </div>

        <div className="d-flex justify-content-center align-items-center border border-2 border-secondary rounded p-3">

          <Task NameProjectAndTask="Nomedoprojeto/nomedatask" time="Expira em algumas horas" />

        </div>
      </div>


    </div>
  )
}


