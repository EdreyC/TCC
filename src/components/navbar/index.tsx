import { Container, Nav } from "react-bootstrap"
import { useAuth } from "../../hooks/useAuth";
import LongMenu from "../menu";


const NavBar = () => {
  const { user } = useAuth()

  return (
    <div className="d-flex align-items-center justify-content-end py-4 px-5 gap-3">
      <LongMenu />
      <h1 className="fs-5  fw-medium">{user?.name}</h1>
    </div>
  )
}
export default NavBar;