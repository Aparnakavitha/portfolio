import React, { useEffect, useState } from "react";

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f4f4f9",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
    backgroundColor: "black",
    marginTop:"10rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "3rem",
    width: "100%",
    maxWidth: "1200px",
    justifyContent: "center",
  },
  card: {
    position: "relative",
    width: "100%",
    height: "300px",
    overflow: "hidden",
    borderRadius: "12px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    backgroundColor: "white",
    transition: "transform 0.3s",
    border: "0.8px solid white",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
    transition: "opacity 0.3s",
  },
  overlayText: {
    color: "white",
    fontSize: "1.25rem",
    fontWeight: "bold",
    textAlign: "center",
  },
  loadingText: {
    fontSize: "1.2rem",
    color: "#555",
    marginTop: "2rem",
  },
  errorText: {
    fontSize: "1.2rem",
    color: "red",
    marginTop: "2rem",
  },
};

const Education = () => {
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEducations = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/education");
        if (!response.ok) {
          throw new Error("Failed to fetch education records");
        }
        const data = await response.json();
        setEducations(data);
      } catch (err) {
        console.error("Fetch Error: ", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEducations();
  }, []);

  if (loading) {
    return <p style={styles.loadingText}>Loading...</p>;
  }

  if (error) {
    return <p style={styles.errorText}>Error: {error}</p>;
  }

  return (
    <div style={styles.container}>
      
      <div style={styles.grid}>
        {educations.map((education) => (
          <div
            key={education.id}
            style={styles.card}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-8px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            <img
              src={`data:image/jpeg;base64,${education.image}`}
              alt={education.name}
              style={styles.cardImage}
              loading="lazy"
            />
            <div
              style={styles.overlay}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
            >
              <h3 style={styles.overlayText}>{education.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
