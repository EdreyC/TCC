import { Container, Nav } from "react-bootstrap"

type Props = {
    img:string | undefined;
} 

 const NavBar = (props:Props)=>{
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
        {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button> */}
          <a className="navbar-brand" href="#">Agilize.it</a>
       
         <h1 className="">Nome</h1>
         <img src={props?.img} alt="" />
        </div>
      </nav>
    )
}
export default NavBar;