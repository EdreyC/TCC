import { useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Signup = () => {
  const [pass, setPass] = useState(false);


  return (
    <>
    <button onClick={() => setPass(pass ? false : true)}>
              {pass ? (<FiEye size={22}
              />) : (<FiEyeOff size={22}
              />)}

            </button>
    <h1>Sign up</h1>
    </>
  );
};

export default Signup;
