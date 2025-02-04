import React, { useEffect, useState } from "react";
import axios from "axios";
import './Admin.css'

const AdminDashboard = () => {
const [educations, setEducations] = useState([]);
const [skills, setSkills] = useState([]);
const [about, setAbout] = useState(null);
const [projects, setProjects] = useState([]);
const [users, setUsers] = useState([]);
const [formData, setFormData] = useState({ type: "", id: null, name: "", description: "", image: null, username: "", password: "" });
const [isEditing, setIsEditing] = useState(false);
const [activeSection, setActiveSection] = useState("");
const [menuOpen, setMenuOpen] = useState(false);

useEffect(() => {
fetchEducations();
fetchSkills();
fetchAbout();
fetchProjects();
fetchUsers();
}, []);

const fetchEducations = async () => {
try {
const response = await axios.get("http://localhost:8080/api/education");
setEducations(response.data);
} catch (error) {
console.error("Error fetching educations:", error);
}
};

const fetchSkills = async () => {
try {
const response = await axios.get("http://localhost:8080/api/skills");
setSkills(response.data);
} catch (error) {
console.error("Error fetching skills:", error);
}
};

const fetchAbout = async () => {
try {
const response = await axios.get("http://localhost:8080/api/about");
if (response.data.length > 0) {
setAbout(response.data[0]);
}
} catch (error) {
console.error("Error fetching about section:", error);
}
};

const fetchProjects = async () => {
try {
const response = await axios.get("http://localhost:8080/api/project");
setProjects(response.data);
} catch (error) {
console.error("Error fetching projects:", error);
}
};
const fetchUsers = async () => {
try {
const response = await axios.get("http://localhost:8080/api/auth/users");
console.log(response)
setUsers(response.data);
} catch (error) { console.error("Error fetching users:", error); }
};

const handleAddNew = (type) => {
setFormData({ type, id: null, name: "", description: "", image: null, username: "", password: "" });
setIsEditing(false);
};

const handleImageChange = (e) => {
const file = e.target.files[0];
setFormData({ ...formData, image: file });
};

// const handleSubmit = async (e) => {
// e.preventDefault();

// try {
// const formDataToSend = new FormData();
// if (formData.type === "users") {
// formDataToSend.append("username", formData.username);
// formDataToSend.append("password", formData.password);
// } else {
// formDataToSend.append("name", formData.name);
// if (formData.description) {
// formDataToSend.append("description", formData.description);
// }
// if (formData.image) {
// formDataToSend.append("image", formData.image);
// }
// }

// await axios.post(`http://localhost:8080/api/${formData.type}`, formDataToSend, {
// headers: { "Content-Type": "multipart/form-data" },
// });

// setFormData({ type: "", id: null, name: "", description: "", image: null, username: "", password: "" });
// setIsEditing(false);
// fetchEducations();
// fetchSkills();
// fetchAbout();
// fetchProjects();
// fetchUsers();
// } catch (error) {
// console.error("Error saving:", error);
// }
// };

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        let response;
        if (formData.type === "users") {
            // Send JSON for users
            const userPayload = { 
                username: formData.username, 
                password: formData.password 
            };

            response = await axios.post("http://localhost:8080/api/auth/register", userPayload, {
                headers: { "Content-Type": "application/json" },
            });
            console.log(response)
        } else {
            // Send multipart form data for other types
            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            if (formData.description) {
                formDataToSend.append("description", formData.description);
            }
            if (formData.image) {
                formDataToSend.append("image", formData.image);
            }

            response = await axios.post(`http://localhost:8080/api/${formData.type}`, formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        }

        

        setFormData({ type: "", id: null, name: "", description: "", image: null, username: "", password: "" });
        setIsEditing(false);
        fetchEducations();
        fetchSkills();
        fetchAbout();
        fetchProjects();
        fetchUsers();
    } catch (error) {
        console.error("Error saving:", error);
    }
};


return (
<div className="admin-dashboard">
{/* Add / Edit Form */}
{formData.type && (
<form onSubmit={handleSubmit} style={{ marginTop: "1rem", background: "#444", padding: "1rem" }}>
<h3>{isEditing ? "Edit" : "Add"} {formData.type.charAt(0).toUpperCase() + formData.type.slice(1)}</h3>

{formData.type === "users" && (
<>
<label>Username:</label>
<input type="text" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} required />
<label>Password:</label>
<input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
</>
)}

{formData.type === "about" && (
<>
<label>Name:</label>
<input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
<label>Description:</label>
<textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required></textarea>
<label>Image:</label>
<input type="file" onChange={handleImageChange} required />
</>
)}

{["skills", "education"].includes(formData.type) && (
<>
<label>Name:</label>
<input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
<label>Image:</label>
<input type="file" onChange={handleImageChange} required />
</>
)}

{formData.type === "project" && (
<>
<label>Name:</label>
<input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
<label>Description:</label>
<textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required></textarea>
<label>Image:</label>
<input type="file" onChange={handleImageChange} required />
</>
)}

<button type="submit">{isEditing ? "Update" : "Add"} {formData.type.charAt(0).toUpperCase() + formData.type.slice(1)}</button>
</form>
)}
</div>
);
};

export default AdminDashboard;
