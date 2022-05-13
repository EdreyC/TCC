import { Container } from "react-bootstrap";
import { useAuth } from "../../hooks/useAuth";
import LongMenu from "../Menu";

const NavBar = () => {
  const { user } = useAuth()

  return (
    <nav className="navbar align-items-center justify-content-end px-4">
      <h1 className="fs-6 fw-medium">{user?.name}</h1>
      <LongMenu />
    </nav>
  )
}

export default NavBar;
