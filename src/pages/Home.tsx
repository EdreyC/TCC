import { signOut } from "firebase/auth";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { useAuth } from "../hooks/useAuth";
import { auth } from "../services/firebase";

export default function Home() {

  const navigate = useNavigate();
  const { user } = useAuth()

  console.log(user)

  useEffect(() => {
    if (!user) {
      navigate('/signin')
    }

  }, [])

  async function SignOut() {

    await signOut(auth).then(() => {
      navigate('/signin')

      console.log(auth.name)

    }).catch((error) => {
      console.log(error)
    });
    window.location.reload();

  }

  return (

    <div>

      <button onClick={SignOut} >Logout</button>
      <h1>{user?.name}</h1>
      <img src={user?.avatar} alt="" />

    </div>
  )
}


