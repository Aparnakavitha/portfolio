import React from 'react'
import './Home.css'
import {Link} from 'react-router-dom'
import profile_img from '../Components/images/profile_img.jpeg'
const Home = () => {
  return (
    <div className='back'>
   <div className='navbar'>
    <ul className='nav-menu'>
      <li>Home</li>
      <li>About Me</li>
      <li>Portfolio</li>
      <li>Contact</li>
    
    </ul>
    
   </div>
   <div className='name'>
    <img src={profile_img} alt=''/>
    <h1><span>Hi, I'm Aparna K S,</span>frontend developer.</h1>
    <p>"From Electronics and Communication Engineering to Frontend Development,
       I bring technical expertise and creativity to every project. I’m based in Thiruvananthapuram."</p>
   </div>
   
    </div>
    
  )
}

export default Home
