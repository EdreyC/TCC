import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { auth } from '../../services/firebase';
import { FiLogOut, FiSettings } from 'react-icons/fi';
const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
];

const ITEM_HEIGHT = 48;

export default function LongMenu() {
  const [anchorEl, setAnchorEl] = useState<EventTarget & HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
    const navigate = useNavigate();
    const { user } = useAuth()

    async function SignOut() {

    await signOut(auth).then(() => {
      navigate('/signin')

      console.log(auth.name)

    }).catch((error) => {
      console.log(error)
    });
    window.location.reload();

  }
 
  const handleClose = () => {
    setAnchorEl(null);
  };
  const LogOut=()=>{
    SignOut();
  }

  return (
    <div>
      <IconButton
        onClick={(e)=>setAnchorEl(e.currentTarget)}
      >
        {/* <MoreVertIcon /> */}
        <img  style={{width:70, height:70}}className="rounded-circle" src={user?.avatar} alt="" />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {/* {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
            {option}
          </MenuItem>
        ))} */}
           <MenuItem disabled onClick={handleClose}>Alterar foto</MenuItem>
           <MenuItem onClick={LogOut}><FiLogOut style={{marginRight:10}}/>Logout</MenuItem>

      </Menu>
    </div>
  );
}



// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import Fade from '@mui/material/Fade';
// import { useState } from 'react';
// import { FiSettings } from 'react-icons/fi';
// import { signOut } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../hooks/useAuth';
// import { auth } from '../../services/firebase';

// // import { auth } from "../services/firebase";

// export default function FadeMenu() {
//   const [anchorEl, setAnchorEl] = useState<EventTarget & HTMLButtonElement | null>(null);
//   const open = Boolean(anchorEl);
  
//   const navigate = useNavigate();
//   const { user } = useAuth()

//   console.log(user)

//   async function SignOut() {

//     await signOut(auth).then(() => {
//       navigate('/signin')

//       console.log(auth.name)

//     }).catch((error) => {
//       console.log(error)
//     });
//     window.location.reload();

//   }
 
  

//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   const Logout = ()=>{
//     SignOut();
//     handleClose();
//   }

//   return (
//     <div>
//       <Button
//         id="fade-button"
//         aria-controls={open ? 'fade-menu' : undefined}
//         aria-haspopup="true"
//         aria-expanded={open ? 'true' : undefined}
//         onClick={(e)=>setAnchorEl(e.currentTarget)}
//       >
//         <FiSettings color='black' size={25}/>
//       </Button>
//       <Menu
//         id="fade-menu"
//         MenuListProps={{
//           'aria-labelledby': 'fade-button',
//         }}
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         TransitionComponent={Fade}
//       >
//         <MenuItem disabled onClick={handleClose}>Alterar foto</MenuItem>
//         <MenuItem onClick={Logout}>Logout</MenuItem>
//       </Menu>
//     </div>
//   );
// }
