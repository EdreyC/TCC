import { Container } from "react-bootstrap";
import { useAuth } from "../../hooks/useAuth";
import LongMenu from "../Menu";

const NavBar = () => {
  const { user } = useAuth()

  return (
    <nav className="navbar align-items-center justify-content-end px-4">
      <LongMenu />
      <h1 className="fs-5 fw-medium">{user?.name}</h1>
    </nav>
  )
}

export default NavBar;
