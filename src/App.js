import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home'
import Connect from './Components/Connect'
import './index.css'
import Navbar from "./Components/Navbar";
import Contact from "./Components/Contact";
import About from "./Components/About";
import Projects from "./Components/Projects";
import Viewmore from "./Components/Viewmore";
import ProjectDetails from "./Components/ProjectDetails";
import Skill from './Components/Skill'
 




function App() {
  return (
    <Router>
      <div>
        <Navbar/>
      </div>
   <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/connect" element={<Connect/>}></Route>
    <Route path="/contact" element={<Contact/>}></Route>
    <Route path="/about" element={<About/>}></Route>
    <Route path="/projects" element={<Projects/>}></Route>
    <Route path="/viewmore" element={<Viewmore/>}></Route>
    <Route path="/projects/:id" element={<ProjectDetails />} />
    <Route path="/skills" element={<Skill/>}
></Route>   </Routes>
    </Router>
  );
}

export default App;
