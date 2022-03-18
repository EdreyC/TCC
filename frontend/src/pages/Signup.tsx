import { useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";



const Signup = () => {
  const [pass, setPass] = useState(false);
  const [password,setPassword]=useState("");
  const [email,setEmail] = useState("");
  const auth = getAuth();
  async function EmailPasswordSignup(){
    if(email == "" || password ==""){
      document.getElementById("email")?.focus()
    }
    else{
      await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          // Signed in
          
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    }
    
  }
  
  return (
    <>
    
    <h1>Sign up</h1>
    <input type="email" id="email" onChange={e => setEmail(e.target.value)} placeholder="digite seu email" />
    <input type="password"  onChange={e => setPassword(e.target.value)} placeholder="digite sua senha" />
    <button  onClick={EmailPasswordSignup} ></button>
    </>
  );
};

export default Signup;
