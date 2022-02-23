import { useState } from 'react'
import './styles/signin.scss'
import Button from './components/Button/Button'
import {BiLock} from 'react-icons/bi'
import {MdOutlineMail} from 'react-icons/md'
import {FiEye} from 'react-icons/fi'
import {FiEyeOff} from 'react-icons/fi'
function App() {
  const [pass,setPass] = useState(false);

  return (
    <div className="page-signin">
      <div className='title-signin'>
        <h1>Lorem ipsum</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only.</p>
      </div>

      <div className='box-signin'>
        <h1>Welcome Back</h1>
        <span>Login in to your account existent of TCC</span>
        <div className='form-signin'>

        <div className='input-email'>
          <MdOutlineMail 
          size={22}
          color='#363636' />
          <input type='text' placeholder='Digite seu email' />
        </div>

          <div className='input-password'>
            <BiLock 
          size={22}
          color='#363636' />
          <input type={pass? "text": 'password'}  placeholder='Digite sua senha' />
          <button onClick={()=>setPass(pass? false: true)}>
            {pass? (<FiEye size={22}
          color='#363636'/>):(<FiEyeOff size={22}
            color='#363636'/>)}
          
          </button>
   
          </div>
         

          <Button>Sign In</Button>

          <div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>

        <a href="#">Don't have an account? Sign Up</a>
      </div>

    </div>
  )
}

export default App
