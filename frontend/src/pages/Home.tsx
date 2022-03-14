import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";
import { useAuth } from "../hooks/useAuth";
import { auth } from "../services/firebase";

export default function Home(){
  const navigate = useNavigate();
  const {user} = useAuth()
  
  async function SignOut() {
    
    await signOut(auth).then(() => {
      console.log(auth.name)

    }).catch((error) => {
      console.log(error)
    });


}
  useEffect(()=>{

    if(!user){

      navigate("/signin")
    }
 
  },[])
  

    return(

        <div>

          {
            user ? (<Button onClick={SignOut}>Log out</Button>) : (<Link to="signin">Signin</Link>)
          }
          <h1>{user?.name}</h1>
          <img src={user?.avatar} alt="" />
      
          
       </div>
    )
}
