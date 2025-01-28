import React, { useEffect } from 'react';
import './Home.css';
import profile_img from '../Components/images/A1.png';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleConnect = () => {
    navigate('/connect');
  };

  // Use effect to add the slide-in class on mount
  useEffect(() => {
    const aparnaElement = document.querySelector('.aparna');
    if (aparnaElement) {
      aparnaElement.classList.add('slide-in');
    }
  }, []);

  return (
    <div className="back">
      <div className="name">
        <div className="hi">Hi there!</div>
        <div className="aparna">I am <span>Aparna K S</span></div>
        <div className="mern">Mern stack Developer</div>

        {/* Buttons */}
        <div className="buttons">
          <button className="btn connect" onClick={handleConnect}>
            Connect Me
          </button>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn resume"
          >
            Resume
          </a>
        </div>
      </div>

      {/* Right side image */}
      <div className="image-content">
        <img src={profile_img} alt="Profile" />
      </div>
    </div>
  );
};

export default Home;
