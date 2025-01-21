import React from 'react'
import './Home.css'
import {Link} from 'react-router-dom'
import profile_img from '../Components/images/profile_img.jpeg'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const navigate=useNavigate()
  const handleconnect=()=>{
    navigate('/connect')
  }
  return (
    <div className='back'>
   
   <div className='name'>
    <img src={profile_img} alt=''/>
    <h1><span>Hi, I'm Aparna K S,</span></h1><br/>
    <h3><span>frontend Developer</span></h3>
    <p> "From Electronics and Communication Engineering to Frontend Development,
       I bring technical expertise and creativity to every project. I’m based in Thiruvananthapuram."</p>
   </div>
   <br/>
   <div className='nav-connect' onClick={handleconnect}>Connect with me</div>
   <div className='nav-connect-two'><a href="/resume.pdf" target="_blank" >
        My Resume
      </a></div>
    </div>
    
  )
}

export default Home
