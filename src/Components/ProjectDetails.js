import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProjectDetail.css";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/project/${id}`);
        if (!response.ok) {
          console.error(`Error: ${response.status} ${response.statusText}`);
          throw new Error("Failed to fetch project details");
        }
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          setProject(data);
        } else {
          throw new Error("Invalid JSON response");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchProject();
  }, [id]);

  if (!project) {
    return <p>Loading...</p>;
  }

  return (
    <div className="project-detail-container">
      <img src={project.image} alt={project.name} className="project-image" />
      <h1 className="project-title">{project.name}</h1>
      <p className="project-description">{project.description}</p>
    </div>
  );
};

export default ProjectDetail;
