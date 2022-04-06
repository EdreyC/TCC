import { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import '../styles/signin.scss'
import Button from '../components/Button'
import { BiLock, BiUser } from 'react-icons/bi'
import { MdOutlineMail } from 'react-icons/md'
import { Col, Container, Row } from 'react-bootstrap'

const Signup = () => {
  const [pass, setPass] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const auth = getAuth();

  async function EmailPasswordSignup() {
    if (!auth.currentUser) {
      if (email == "" || password == "") {
        document.getElementById("email")?.focus()
        alert("preencha as credenciais")
      }
      else if (password != confirmPassword) {
        //avisar
      }
      else {
        await createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            console.log(userCredential.user)
            const user = userCredential.user;
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
      }
    }else{
  
    }


  }

  return (
    <Container className="pt-signin">
      <Row className="align-items-center justify-content-around">
        <Col lg="6" className='order-2 order-lg-1 title-signin p-5'>
          <h1>Lorem ipsum</h1>
          <p className="text-muted">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only.</p>
        </Col>
        <Col lg="4" className="order-1 order-lg-2 container-signin bg-light p-4 rounded">
          <h1 className="mb-2">Welcome</h1>
          <span className="text-muted">Create account in AGILIZE.IT</span>
          <div className="form-signin my-3">
            <div className='input-email my-2 d-flex hstack gap-2'>
              <BiUser size={22} color='#363636' />
              <input type='text' placeholder='Type your name' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='input-email my-2 d-flex hstack gap-2'>
              <MdOutlineMail size={22} color='#363636' />
              <input id="email" type='text' placeholder='Type your email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='input-password my-2 d-flex hstack gap-3'>
              <BiLock size={22} color='#363636' />
              <input type={pass ? "text" : 'password'} placeholder='Type your password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='input-password my-2 d-flex hstack gap-3'>
              <BiLock size={22} color='#363636' />
              <input type={pass ? "text" : 'password'} placeholder='Confirm your password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>

            <div className='wrapper-signinbuttons d-flex'>
              <Button onClick={EmailPasswordSignup}>Sign Up</Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Signup;
