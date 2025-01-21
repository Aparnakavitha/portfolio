import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home'
import Connect from './Components/Connect'
import './index.css'



function App() {
  return (
    <Router>
   <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/connect" element={<Connect/>}></Route>
   </Routes>
    </Router>
  );
}

export default App;
