import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

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
