import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Home(){

  const {user} = useAuth()

    return(
        <div>
        <Link to="signin">Signin</Link>
        <h1>{user?.name}</h1>
        <img src={user?.avatar} alt="" />
        </div>
    )
}
