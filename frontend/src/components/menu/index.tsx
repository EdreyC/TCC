import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { auth } from '../../services/firebase';
import { FiLogOut, FiSettings } from 'react-icons/fi';

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

  const LogOut = () => {
    SignOut();
  }

  return (
    <div>
      <IconButton
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        {/* <MoreVertIcon /> */}
        <img style={{ width: 70, height: 70 }} className="rounded-circle" src={user?.avatar} alt="" />
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
        {/* <MenuItem disabled onClick={handleClose}>Alterar foto</MenuItem> */}
        <MenuItem onClick={LogOut}><FiLogOut style={{ marginRight: 10 }} /><span className='fw-bolder'>Logout</span></MenuItem>
      </Menu>
    </div>
  );
}
