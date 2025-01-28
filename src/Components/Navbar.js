import React, { useState } from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar">
      <div className="nav-container">
        <div className="nav-icon" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={`nav-menu ${isMenuOpen ? 'nav-menu-active' : ''}`}>
          <li>
            <NavLink to="/" onClick={toggleMenu} className={({ isActive }) => (isActive ? 'active' : '')}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={toggleMenu} className={({ isActive }) => (isActive ? 'active' : '')}>
              About Me
            </NavLink>
          </li>
          <li>
            <NavLink to="/projects" onClick={toggleMenu} className={({ isActive }) => (isActive ? 'active' : '')}>
              Projects
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
