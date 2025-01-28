import React, { useState, useEffect } from "react";
import "./Project.css";
import { Link } from "react-router-dom";

const sampleProjects = [
  {
    id: 1,
    name: "CalcNest",
    image: "/assets/calimg.png",
    link: "/project/1", // Route to project details page
  },
  {
    id: 2,
    name: "MarvelChar",
    image: "/assets/p1.jpg",
    link: "/project/2",
  },
  {
    id: 3,
    name: "ToDo",
    image: "/assets/DO.png",
    link: "/project/3",
  },

];

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/project");
        console.log(response)
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error(error);
        setProjects(sampleProjects); // Use sample data if fetch fails
        
      }
    };

    fetchProjects();
  }, []);



  return (
    <div className="projects-container">
      <div className="header">
        
        <h1 className="projects-heading">Works</h1>
      </div>
      <div className="cards-container">
        {projects.map((project) => (
          <Link to={`/projects/${project.id}`} key={project.id} className="card">

          <div className="image-container">
            <img src={project.image} alt={project.name} />
            <div className="overlay">
              <p>View More</p>
            </div>
          </div>
          <h2>{project.name}</h2>
          </Link>
        
        ))}
    </div>
     
    </div>
  );
};

export default Projects;