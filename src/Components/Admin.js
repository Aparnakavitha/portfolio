import React, { useEffect, useState } from "react";
import axios from "axios";
import './Admin.css'

const AdminDashboard = () => {
const [educations, setEducations] = useState([]);
const [skills, setSkills] = useState([]);
const [about, setAbout] = useState(null);
const [projects, setProjects] = useState([]);
 const [users, setUsers] = useState([]);
const [formData, setFormData] = useState({ type: "", id: null, name: "", description: "", image: null });
const [isEditing, setIsEditing] = useState(false);
const [activeSection, setActiveSection] = useState("users");
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

setAbout(response.data);

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


const handleDelete = async (type, id) => {
  try {
    let url = `http://localhost:8080/api/${type}/${id}`;
    
    // Fix the condition for users
    if (type === "users") {
      url = `http://localhost:8080/api/auth/delete/${id}`;
    }
    
    await axios.delete(url);
    
    // Refetch data after deletion
    if (type === "education") fetchEducations();
    else if (type === "skills") fetchSkills();
    else if (type === "project") fetchProjects();
    else if (type === "users") fetchUsers();  
    else fetchAbout();
  } catch (error) {
    console.error("Error deleting:", error);
  }
};




const handleEdit = (type, item) => {
  setIsEditing(true);
  setFormData({
      type,
      id: item.id,
      name: item.name || "",
      description: item.description || "",
      image: null, // Reset new image input
      existingImage: item.image || "", // Store existing image path
      username: item.username || "",
      password: "", // Don't pre-fill password for security
  });
};



const handleAddNew = (type) => {
setFormData({ type, id: null, name: "", description: "", image: null,username:"",password:"" });
setIsEditing(false);
};

const handleImageChange = (e) => {
const file = e.target.files[0];
setFormData({ ...formData, image: file });
};


// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//       let response;
//       if (formData.type === "users") {
//           // Send JSON for users
//           const userPayload = { 
//               username: formData.username, 
//               password: formData.password 
//           };

//           response = await axios.post("http://localhost:8080/api/auth/register", userPayload, {
//               headers: { "Content-Type": "application/json" },
//           });
//       } else {
//           // Send multipart form data for other types
//           const formDataToSend = new FormData();
//           formDataToSend.append("name", formData.name);
//           if (formData.description) {
//               formDataToSend.append("description", formData.description);
//           }
//           if (formData.image) {
//               formDataToSend.append("image", formData.image);
//           }

//           response = await axios.post(`http://localhost:8080/api/${formData.type}`, formDataToSend, {
//               headers: { "Content-Type": "multipart/form-data" },
//           });
//       }

//       console.log("Response:", response.data);

//       setFormData({ type: "", id: null, name: "", description: "", image: null, username: "", password: "" });
//       setIsEditing(false);
//       fetchEducations();
//       fetchSkills();
//       fetchAbout();
//       fetchProjects();
//       fetchUsers();
//   } catch (error) {
//       console.error("Error saving:", error);
//   }
// };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    let response;
    const formDataToSend = new FormData();
    
    if (formData.name) formDataToSend.append("name", formData.name);
    if (formData.description) formDataToSend.append("description", formData.description);
    if (formData.image) formDataToSend.append("image", formData.image);

    if (formData.type === "users") {
      // Handle user registration separately
      const userPayload = { 
        username: formData.username, 
        password: formData.password 
      };
      
      response = await axios.post("http://localhost:8080/api/auth/register", userPayload, {
        headers: { "Content-Type": "application/json" },
      });
    } else {
      if (formData.id) {
        // Update existing data with PUT request
        response = await axios.put(
          `http://localhost:8080/api/${formData.type}/${formData.id}`, 
          formDataToSend, 
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        // Add new data with POST request
        response = await axios.post(
          `http://localhost:8080/api/${formData.type}`, 
          formDataToSend, 
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }
    }

    console.log("Response:", response.data);

    // Reset the form
    setFormData({ type: "", id: null, name: "", description: "", image: null, username: "", password: "" });
    setIsEditing(false);

    // Refetch data to see changes
    fetchEducations();
    fetchSkills();
    fetchAbout();
    fetchProjects();
    fetchUsers();
  } catch (error) {
    console.error("Error saving:", error);
  }
};


const toggleMenu = () => {
setMenuOpen(!menuOpen);
};

const handleMenuClick = (section) => {
setActiveSection(section);
setMenuOpen(false);
};



return (
<div className="admin-dashboard">
{/* Sidebar */}
<div className="sidebar">
  <button
className={activeSection === "users" ? "active" : ""}
onClick={() => handleMenuClick("users")}
>
users
</button>
<button
className={activeSection === "about" ? "active" : ""}
onClick={() => handleMenuClick("about")}
>
About
</button>
<button
className={activeSection === "education" ? "active" : ""}
onClick={() => handleMenuClick("education")}
>
Education
</button>
<button
className={activeSection === "skills" ? "active" : ""}
onClick={() => handleMenuClick("skills")}
>
Skills
</button>
<button
className={activeSection === "projects" ? "active" : ""}
onClick={() => handleMenuClick("projects")}
>
Projects
</button>
<button className="logout-btn" onClick={() => {
localStorage.removeItem("authFlag");
window.location.href = "/portfolio/login";
}}>
Logout
</button>
</div>

{/* Main Content */}
<div className="main-content">
<div className="header">
<div className="header-left">
<div className="hamburger-menu" onClick={toggleMenu}>
<div></div>
<div></div>
<div></div>
</div>
</div>
<div className="header-center">
<h2>Admin Dashboard</h2>
</div>
<div className="header-right">
{/* <button onClick={() => {
localStorage.removeItem("authFlag");
window.location.href = "/portfolio/login";
}}>
Logout
</button> */}
</div>
</div>

{/* Section Content */}

{activeSection === "about" && (
 <>
<h3>ABOUT</h3>
<button className="add" onClick={() => handleAddNew("about")}>Add  About</button>
<table border="1">
<thead>
<tr>
<th>Name</th>
<th className="desc">description</th>
<th>Image</th>
<th>Actions</th>
</tr>
</thead>
<tbody>
  {about.map((ab) => (

<tr key={ab.id}>
<td>{ab.name}</td>
<td className="desc">{ab.description}</td>
<td className="img"><img src={`data:image/jpeg;base64,${ab.image}`} alt={ab.name} width="50" /></td>
<td>
<button className="delete" onClick={() => handleEdit("about", ab)}>Edit</button>
<button  className="delete"onClick={() => handleDelete("about", ab.id)}>Delete</button>
</td>
</tr>
))}

</tbody>
</table>

{/* <h3>About</h3>
<button className="add" onClick={() => handleAddNew("about")}>Add About </button>
{about && (
<div>
<p><strong>Name:</strong> {about.name}</p>
<p><strong>Description:</strong> {about.description}</p>
<img src={`data:image/jpeg;base64,${about.image}`} alt={about.name} width="100" />
<button className="delete" onClick={() => handleEdit("about", about)}>Edit</button>
<button  className="delete" onClick={() => handleDelete("about", about.id)}>Delete</button>
</div>
)} */}
</> 


)}

{activeSection === "education" && (
<>
<h3>Education</h3>
<button className="add" onClick={() => handleAddNew("education")}>Add  Education</button>
<table border="1">
<thead>
<tr>
<th>Name</th>
<th>Image</th>
<th>Actions</th>
</tr>
</thead>
<tbody>
{educations.map((edu) => (
<tr key={edu.id}>
<td>{edu.name}</td>
<td><img src={`data:image/jpeg;base64,${edu.image}`} alt={edu.name} width="50" /></td>
<td>
<button className="delete" onClick={() => handleEdit("education", edu)}>Edit</button>
<button  className="delete"onClick={() => handleDelete("education", edu.id)}>Delete</button>
</td>
</tr>
))}
</tbody>
</table>
</>
)}

{activeSection === "skills" && (
<>
<h3>Skills</h3>
<button className="add" onClick={() => handleAddNew("skills")}>Add New Skill</button>
<table border="1">
<thead>
<tr>
<th>Name</th>
<th className="image">Image</th>
<th>Actions</th>
</tr>
</thead>
<tbody>
{skills.map((skill) => (
<tr key={skill.id}>
<td>{skill.name}</td>
<td><img src={`data:image/jpeg;base64,${skill.image}`} alt={skill.name} width="50" /></td>
<td>
<button className="delete" onClick={() => handleEdit("skills", skill)}>Edit</button>
<button className="delete" onClick={() => handleDelete("skills", skill.id)}>Delete</button>
</td>
</tr>
))}
</tbody>
</table>
</>
)}

{activeSection === "users" && (
<>
<h3>Users</h3>
<button className="add" onClick={() => handleAddNew("users")}>Add New user</button>
<table border="1">
<thead>
<tr>
<th>Username</th>

<th>Actions</th>
</tr>
</thead>
<tbody>
{users.map((user) => (
<tr key={user.id}>
<td>{user.username}</td>

<td>

<button className="delete" onClick={() => handleDelete("users", user.id)}>Delete</button>
</td>
</tr>
))}
</tbody>
</table>
</>
)}

{activeSection === "projects" && (
<>
<h3>Projects</h3>
<button className="add" onClick={() => handleAddNew("project")}>Add New Project</button>
<table border="1">
<thead>
<tr>
<th>Name</th>
<th className="image">Image</th>
<th className="desc">Description</th>
<th>Actions</th>
</tr>
</thead>
<tbody>
{projects.map((project) => (
<tr key={project.id}>
<td>{project.name}</td>
<td id="proimg"><img src={`data:image/jpeg;base64,${project.image}`} alt={project.name} width="50" /></td>
<td>{project.description}</td>
<td>
<button className="delete" onClick={() => handleEdit("project", project)}>Edit</button>
<button className="delete" onClick={() => handleDelete("project", project.id)}>Delete</button>
</td>
</tr>
))}
</tbody>
</table>
</>
)}

{/* Add / Edit Form */}


{formData.type && (
<form className="form" onSubmit={handleSubmit} style={{ marginTop: "1rem", background: "#444", padding: "1rem" }}>
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
   
    {/* Show existing image if editing */}
    {isEditing && formData.existingImage && (
        <img
            src={`http://localhost:8080/uploads/${formData.existingImage}`}
            alt="Existing"
            style={{ width: "100px", height: "100px", marginBottom: "10px" }}
        />
    )}
<input type="file" onChange={handleImageChange} required={!isEditing} />

</>
)}




{["skills", "education"].includes(formData.type) && (
<>
    <label>Name:</label>
    <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

    <label>Image:</label>
    
    {/* Show existing image if editing */}
    {isEditing && formData.existingImage && (
        <img
            src={`http://localhost:8080/uploads/${formData.existingImage}`}
            alt="Existing"
            style={{ width: "100px", height: "100px", marginBottom: "10px" }}
        />
    )}

    {/* Allow new image upload, but it's optional when editing */}
    <input type="file" onChange={handleImageChange} required={!isEditing} />
</>
)}


{formData.type === "project" && (
<>
<label>Name:</label>
<input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
<label>Description:</label>
<textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required></textarea>
<label>Image:</label>

   
    {/* Show existing image if editing */}
    {isEditing && formData.existingImage && (
        <img
            src={`http://localhost:8080/uploads/${formData.existingImage}`}
            alt="Existing"
            style={{ width: "100px", height: "100px", marginBottom: "10px" }}
        />
    )}
<input type="file" onChange={handleImageChange} required={!isEditing} />

</>
)}

<button type="submit">{isEditing ? "Update" : "Add"} {formData.type.charAt(0).toUpperCase() + formData.type.slice(1)}</button>
</form>
)}
</div>
</div>
);
};

export default AdminDashboard;