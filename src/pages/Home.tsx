import { signOut } from "firebase/auth";

import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { useAuth } from "../hooks/useAuth";
import { auth } from "../services/firebase";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth()
  console.log(user)
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
      <Navbar img={user?.avatar}/>

      <button onClick={SignOut} >Logout</button>
      <h1>{user?.name}</h1>
      <img src={user?.avatar} alt="" />




    </div>
  )
}


