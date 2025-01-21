 import './Navbar.css'
import React from 'react';
import { Link } from 'react-router-dom';  // Using Link for SPA routing

const Navbar = () => {
  return (
    <div className="navbar">
      <ul className="nav-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Me</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </div>
  );
};

export default Navbar;
