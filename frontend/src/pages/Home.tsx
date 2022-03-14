import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";
import { useAuth } from "../hooks/useAuth";
import { auth } from "../services/firebase";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth()

  async function SignOut() {

    await signOut(auth).then(() => {
      console.log(auth.name)

    }).catch((error) => {
      console.log(error)
    });


  }
 

  return (

    <div>

        <button onClick={SignOut} >Logout</button>
      <h1>{user?.name}</h1>
      <img src={user?.avatar} alt="" />


    </div>
  )
}
