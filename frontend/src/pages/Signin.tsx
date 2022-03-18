import { useState } from 'react'
import '../styles/signin.scss'
import Button from '../components/Button'
import { BiLock } from 'react-icons/bi'
import { MdOutlineMail } from 'react-icons/md'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { BsGoogle } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'

export default function Sigin() {

  const [pass, setPass] = useState(false);

  return (
    <Container className="pt-signin">
      <Row className="align-items-center justify-content-around">
        <Col lg="6" className='title-signin p-5'>
          <h1>Lorem ipsum</h1>
          <p className="text-muted">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only.</p>
        </Col>
        <Col lg="4" className="container-signin bg-light p-4 rounded">
          <h1 className="mb-2">Welcome Back</h1>
          <span className="text-muted">Login in to your account existent of AGILIZE.IT</span>
          <div className="form-signin my-3">
            <div className='input-email my-2 d-flex hstack gap-2'>
              <MdOutlineMail size={22} color='#363636' />
              <input type='text' placeholder='Type your email' />
            </div>
            <div className='input-password my-2 d-flex hstack gap-3'>
              <BiLock size={22} color='#363636' />
              <input type={pass ? "text" : 'password'} placeholder='Type your password' />
              <button className='ms-auto' onClick={() => setPass(pass ? false : true)} >
                {pass ? (<FiEye size={22}
                />) : (<FiEyeOff size={22}
                />)}
              </button>
            </div>
            <div className='wrapper-signinbuttons d-flex'>
              <Button>Sign In</Button>
              <Button style={{ background: "#db3236", display: 'flex', gap: "10px" }}><BsGoogle />Sign in with google </Button>
            </div>

            <span>Don't have an account? <Link to="/signup">Sign Up</Link> </span>
          </div>
        </Col>
      </Row>
    </Container>

    // <div className="page-signin">
    //   <div className='title-signin'>
    //     <h1>Lorem ipsum</h1>
    //     <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only.</p>
    //   </div>

    //   <div className='container-signin'>

    //     <h1>Welcome Back</h1>
    //     <span>Login in to your account existent of AGILIZE.IT</span>

    //     <div className='form-signin'>

    //       <div className='input-email'>
    //         <MdOutlineMail
    //           size={22}
    //           color='#363636' />
    //         <input type='text' placeholder='Type your email' />
    //       </div>

    //       <div className='input-password'>
    //         <BiLock
    //           size={22}
    //           color='#363636' />
    //         <input type={pass ? "text" : 'password'} placeholder='Type your password' />
    //         <button onClick={() => setPass(pass ? false : true)}>
    //           {pass ? (<FiEye size={22}
    //           />) : (<FiEyeOff size={22}
    //           />)}

    //         </button>

    //       </div>

    //       <div className='wrapper-signinbuttons'>
    //         <Button>Sign In</Button>
    //         <Button style={{ background: "#db3236", display: 'flex', gap: "10px" }}><BsGoogle />Sign in with google </Button>
    //       </div>
    //     </div>

    //     <span>Don't have an account? <Link to="/signup">Sign Up</Link> </span>
    //   </div>
    // </div>

  )
}