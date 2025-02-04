
import React, { useState, useEffect } from "react";

 import "./Project.css";
 import { Link } from "react-router-dom";

// Sample fallback data in case fetch fails
// const sampleProjects = [
//   {
//          id: 1,
//         name: "CalcNest",
//         image: "/assets/calimg.png",
//         link: "/project/1",
//       },
//       {
//         id: 2,
//         name: "MarvelChar",
//         image: "/assets/p1.jpg",
//         // image: "/assets/p1.jpeg",
//         link: "/project/2",
//       },
//       {
//         id: 3,
//         name: "ToDo",
//         image: "/assets/DO.png",
//         link: "/project/3",
//       },
// ];

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Fetch the projects from the backend
        const response = await fetch("http://localhost:8080/api/project"); // Adjusted to match the backend endpoint
        if (response.ok) {
          const data = await response.json();
          // Map the backend data to include image URL for each project
          const updatedProjects = data.map((project) => ({
            ...project,
            image: `http://localhost:8080/api/project/${project.id}/image`, // Dynamically generate the image URL
          }));
          setProjects(updatedProjects);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error(error);
        //setProjects(sampleProjects); 
        // Use sample data if fetch fails
      }
    };

    fetchProjects();
  }, []);


  
  const fallbackImage = "error.jpeg";

  return (
    <div className="projects-container">
      <div className="header">
        
        <h1 className="projects-heading">MY PROJECTS</h1>
      </div>
      <div className="cards-container">
        {projects.map((project) => (
          <Link to={`/project/${project.id}`} key={project.id} className="card">
            <div className="image-container">
        
              <img
                src={project.image}
                alt={project.name}
                onError={(e) => (e.target.src = fallbackImage)} // Fallback image logic
              />
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

