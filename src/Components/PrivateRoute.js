import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("authFlag");

    if (!isAuthenticated) {
        // Alert the user and then redirect to login
        alert("Please login first");
        return <Navigate to="/portfolio/login" />;
    }

    return children;
};

export default PrivateRoute;
