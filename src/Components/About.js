import React, { useEffect, useState } from 'react';
import './About.css';
import axios from 'axios';

const About = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/about')
      .then(response => {
        if (response.data.length > 0) {
          setAboutData(response.data[0]);
        }
      })
      .catch(error => console.error('Error fetching about data:', error));
  }, []);

  useEffect(() => {
    const aparnaElement = document.querySelector('.aparna');
    if (aparnaElement) {
      aparnaElement.classList.add('slide-in');
    }
  }, []);

  return (
    <div className="about-container">
      {aboutData && (
        <>
          <div className="left-sections">
            <img src={`data:image/png;base64,${aboutData.image}`} alt={aboutData.name} className="profile-image" />
          </div>
          <div className="right-section">
            <h1 className="aparna">Hi I am Aparna K S</h1>
            <p>{aboutData.description}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default About;
