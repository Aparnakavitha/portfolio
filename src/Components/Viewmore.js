import React, { useEffect } from "react";
import "./Viewmore.css";
import {
  SiCss3,
  SiReact,
  SiJavascript,
  SiExpress,
  SiMysql,
  SiMongodb,
  SiPython,
} from "react-icons/si";
import { FaHtml5, FaNode, FaSchool, FaBook, FaUniversity } from "react-icons/fa";

const Viewmore = () => {
  useEffect(() => {
    const leftElements = document.querySelectorAll(".left");
    const rightElements = document.querySelectorAll(".right");

    leftElements.forEach((element) => {
      element.classList.add("slide-in-left");
    });

    rightElements.forEach((element) => {
      element.classList.add("slide-in-right");
    });
  }, []);

  return (
    <div className="scrollable-container">
      {/* Skills Section */}
      <section className="section skills-section">
        <div className="left">
          <h2>Skills</h2>
          <p>Explore my technical expertise and skills.</p>
        </div>
        <div className="right">
          <div className="skill-icon" title="HTML">
            <FaHtml5 />
          </div>
          <div className="skill-icon" title="CSS">
            <SiCss3 />
          </div>
          <div className="skill-icon" title="React">
            <SiReact />
          </div>
          <div className="skill-icon" title="JavaScript">
            <SiJavascript />
          </div>
          <div className="skill-icon" title="Express.js">
            <SiExpress />
          </div>
          <div className="skill-icon" title="MySQL">
            <SiMysql />
          </div>
          <div className="skill-icon" title="MongoDB">
            <SiMongodb />
          </div>
          <div className="skill-icon" title="Node.js">
            <FaNode />
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="section education-section">
        <div className="left">
          <h2>Education</h2>
          <p>My academic qualifications and achievements.</p>
        </div>
        <div className="right">
          <div className="education-icon-container">
            <div className="education-icon" title="B.Tech in ECE: RIT Kottayam">
              <FaUniversity />
            </div>
            <div
              className="education-icon"
              title="Higher Secondary: GHSS for Girls, Kanniyakulangara"
            >
              <FaBook />
            </div>
            <div className="education-icon" title="High School: LVHS, Pothencode">
              <FaSchool />
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="section certifications-section">
        <div className="left">
          <h2>Certifications</h2>
          <p>Recognized achievements and certifications.</p>
        </div>
        <div className="right">
          <div className="certification-icon-container">
            <div
              className="certification-icon"
              title="MERN Stack Certification: One Team Solutions"
            >
              <SiReact />
            </div>
            <div
              className="certification-icon"
              title="Python for Everybody: Coursera"
            >
              <SiPython />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Viewmore;
