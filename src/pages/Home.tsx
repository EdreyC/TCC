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

  const [name, setName] = useState("");
  const navigate = useNavigate();
  return (

    <div>
      <Navbar/>
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


