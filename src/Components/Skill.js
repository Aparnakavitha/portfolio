import React, { useEffect, useState } from "react";

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f4f4f9",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
  },
  title: {
    fontSize: "2rem",
    color: "#333",
    marginBottom: "2rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "1.5rem",
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
  },
  cardHover: {
    transform: "translateY(-8px)",
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
  overlayHover: {
    opacity: 1,
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
// assuming the portfolio object has a 'imageUrl' attribute pointing to the image's URL in your backend
const Skill = () => {
    const [portfolios, setPortfolios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchPortfolios = async () => {
        try {
          const response = await fetch("http://localhost:8080/api/portfolios");
          if (!response.ok) {
            throw new Error("Failed to fetch portfolios");
          }
          const data = await response.json();
          console.log("Fetched Data: ", data);
          setPortfolios(data);  // store portfolio data in state
        } catch (err) {
          console.error("Fetch Error: ", err.message);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPortfolios();
    }, []);
  
    if (loading) {
      return <p style={styles.loadingText}>Loading...</p>;
    }
  
    if (error) {
      return <p style={styles.errorText}>Error: {error}</p>;
    }
  
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Skill Showcase</h1>
        <div style={styles.grid}>
          {portfolios.map((portfolio) => (
            <div
              key={portfolio.id}
              style={styles.card}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-8px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              {/* Render the image URL dynamically */}
              <img
                src={`http://localhost:8080${portfolio.imageUrl}`} // Using the image URL provided by the backend
                alt={portfolio.name}
                style={styles.cardImage}
                loading="lazy"
              />
              <div
                style={styles.overlay}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
              >
                <h3 style={styles.overlayText}>{portfolio.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
export default Skill;  