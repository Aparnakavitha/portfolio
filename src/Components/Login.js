import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Redirect to admin if already logged in
    useEffect(() => {
        if (localStorage.getItem("authFlag") === "true") {
            navigate("/portfolio/admin");
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors
        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", {
                username,
                password,
            });

            if (response.data.status === "success") {
                localStorage.setItem("authFlag", "true");
                navigate("/portfolio/admin");
            } else {
                setError("Invalid username or password");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="login-container">
            <div className="login">
                <h1>Login</h1>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleLogin}>
                    <input className="input"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
