import { signOut } from "firebase/auth";

import {  useNavigate } from "react-router-dom";
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

    navigate('/signin')

  }

  return (

    <div>

      <button onClick={SignOut} >Logout</button>
      <h1>{user?.name}</h1>
      <img src={user?.avatar} alt="" />


    </div>
  )
}


