import React from 'react'
import '../../styles/navbar.css'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
      <div className='main-navbar-container'>
        <div className='navbar-logo-container'>
          <img className='navbar-logo' src={require('../../images/phame_logo.png')} alt='phame-logo'/>
        </div>        
        <div className='navbar-links-container'>
          <Link to='/' style={{ textDecoration: 'none' }}><p><i className="fas fa-home"></i> Home</p></Link>
          <Link to='/input'><p><i className="fas fa-pen-square"></i> Input</p></Link>
          <Link to='/projects'><p><i className="fas fa-list-ul"></i> Projects</p></Link>
          <Link to='/login'><p><i className="fas fa-sign-in-alt"></i> Login/Register</p></Link>
          <Link to='/logout'><p><i className="fas fa-sign-out-alt"></i> Logout</p></Link>
        </div>        
      </div>
    )
  }