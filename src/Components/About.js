import React, { useEffect } from 'react';
import './About.css';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa'; // Added Gmail and Phone icons
import aboutImage from './images/my-removebg-modified.png'; // Path to your image
import { Link } from 'react-router-dom'; // Import Link for navigation

const About = () => {
  useEffect(() => {
    const introSpanElement = document.querySelector('.intro span');
    if (introSpanElement) {
      introSpanElement.classList.add('slide-in');
    }
  }, []);
  return (
    <div className="about-container">
      <div className="left-sections">
        <img src={aboutImage} alt="Aparna K S" className="profile-image" />
      </div>
      <div className="right-section">
        <p className="intro">
         <span>Hello! I'm Aparna K S</span> <br/> a passionate Frontend Developer with a deep interest in designing engaging, user-friendly, and dynamic websites. My journey began in the field of Electronics and Communication Engineering, where I cultivated a strong technical background and analytical thinking. Over time, my passion for technology and creativity led me to web development.
        </p>
        <p>
          After discovering my love for coding, I pursued a career shift to Frontend Development, where I’ve been able to combine my technical knowledge with my creative instincts. I’ve developed a comprehensive skill set in HTML, CSS, JavaScript, and front-end frameworks such as React.js and Vue.js. I strive to build beautiful websites and intuitive user interfaces that not only look great but also provide seamless and enjoyable experiences.
         <br></br> <Link to="/viewmore" className="highlighted-text">View More</Link>
        </p>
        <footer className="footer">
          <a href="https://www.instagram.com/aparna_anna__" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon instagram" />
          </a>
          <a href="https://www.linkedin.com/in/aparnakavitha" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="social-icon linkedin" />
          </a>
          <a href="https://github.com/Aparnakavitha" target="_blank" rel="noopener noreferrer">
            <FaGithub className="social-icon github" />
          </a>
        </footer>
      </div>
    </div>
  );
};

export default About;
