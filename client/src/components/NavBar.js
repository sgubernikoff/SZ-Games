import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar({isLoggedIn}) {
  return (
    <div className="navbar">
      <header>SZ Games</header>
      <nav>
      <NavLink exact to="/" className="nav-element"> <p>Home</p> </NavLink>
      <NavLink exact to="/about" className="nav-element"> <p>About</p> </NavLink>
      <NavLink exact to="/experiences" className="nav-element"> <p>Experiences</p> </NavLink>
      <NavLink exact to={isLoggedIn ? '/account' : '/login'} className="nav-element"> <p>Account</p> </NavLink>
      </nav>
    </div>
  )
}

export default NavBar