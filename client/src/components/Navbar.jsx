import React from 'react'
import logo from "../images/logo.png"
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context/authContext'

const Navbar = () => {
  const { currentUser, logout } = useGlobalContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <Link to='/'>
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link className='link' to='/?cat=art'>
            <h6>ART</h6>
          </Link>
          <Link className='link' to='/?cat=science'>
            <h6>SCIENCE</h6>
          </Link>
          <Link className='link' to='/?cat=cinema'>
            <h6>CINEMA</h6>
          </Link>
          <Link className='link' to='/?cat=design'>
            <h6>DESIGN</h6>
          </Link>
          <Link className='link' to='/?cat=food'>
            <h6>FOOD</h6>
          </Link>
        </div>
        <div className='right-content'>
          <span className='username'>{currentUser?.username.split(' ')[0]}</span>
          {currentUser ? 
            <span onClick={handleLogout}>Logout</span> 
            : 
            <Link to='/login' className='link'>Login</Link>}
          <span className='write'>
            <Link to='/write' className='link'>Write</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar