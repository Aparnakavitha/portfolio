import React from "react";
import { BrowserRouter as Router, Route, Routes ,Navigate} from 'react-router-dom';
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
import Education from "./Components/Education";
import Login from "./Components/Login";
import Admin from "./Components/Admin";
import PrivateRoute from "./Components/PrivateRoute";

 




function App() {
  
  return (
    <Router>
     
   <Routes>
   
 

    <Route path="/" element={<Navigate to="/portfolio" />} />
    <Route path="/portfolio" element={<><Navbar /><Home /></>} />
    <Route path="/connect" element={<><Navbar /><Connect/></>}></Route>
    <Route path="/contact" element={<><Navbar /><Contact/></>}></Route>
    <Route path="/about" element={<><Navbar /><About/></>}></Route>
    <Route path="/projects" element={<><Navbar /><Projects/></>}></Route>
    <Route path="/viewmore" element={<><Navbar /><Viewmore/></>}></Route>
    <Route path="/project/:id" element={<><Navbar /><ProjectDetails /></>} />
    <Route path="/skills" element={<><Navbar /><Skill/></>}></Route> 
    <Route path="/education" element={<><Navbar /><Education/></>}/>
    <Route path="/portfolio/login" element={<Login />} />
    <Route path="/portfolio/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
    
   </Routes>
    </Router>

  );
}

export default App;


// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './Components/Home'
// import Connect from './Components/Connect'
// import './index.css'
// import Navbar from "./Components/Navbar";
// import Contact from "./Components/Contact";
// import About from "./Components/About";
// import Projects from "./Components/Projects";
// import Viewmore from "./Components/Viewmore";
// import ProjectDetails from "./Components/ProjectDetails";
// import Skill from './Components/Skill'
// import Education from './Components/Education'
 




// function App() {
//   return (
//     <Router>
//       <div>
//         <Navbar/>
//       </div>
//    <Routes>
//     <Route path="/" element={<Home/>}></Route>
//     <Route path="/connect" element={<Connect/>}></Route>
//     <Route path="/contact" element={<Contact/>}></Route>
//     <Route path="/about" element={<About/>}></Route>
//     <Route path="/projects" element={<Projects/>}></Route>
//     <Route path="/viewmore" element={<Viewmore/>}></Route>
//     {/* //<Route path="/projects/:id" element={<ProjectDetails />} /> */}
//     <Route path="/education" element={<Education/>}></Route>
//     <Route path="/skills" element={<Skill/>}
// ></Route>   </Routes>
//     </Router>
//   );
// }

// export default App;