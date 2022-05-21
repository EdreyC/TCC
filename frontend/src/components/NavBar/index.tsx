import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useAuth } from "../../hooks/useAuth";
import { auth } from "../../services/firebase";
import LongMenu from "../Menu";


const NavBar = () => {
  const { user } = useAuth()
  const [email,setEmail] = useState<String | null >("")
  const [onlyName,setOnlyName] = useState<String | undefined >("")

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email)
        console.log(user)
        // ...
      } else {
        // User is signed out
        // ...
      }
      let arrayEmail = email?.split("")
      let onlyName = arrayEmail?.map((item,i)=>{
        if(item=="@"){
          let nameJoin = arrayEmail?.join("")
           setOnlyName(nameJoin?.substring(0,i))
        }
      })
    });
  },[])
  return (
    <nav className="navbar align-items-center justify-content-end px-4">
      <h1 className="fs-6 fw-medium">{onlyName}</h1>
      <LongMenu />
    </nav>
  )
}

export default NavBar;
