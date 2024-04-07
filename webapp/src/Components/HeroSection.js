import React from 'react';
import '../App.css';
import './HeroSection.css';


function HeroSection() {
 return (
   <div className='hero-container'>
       <img src='../../images/background.jpg' alt="" className="hero-background" />
       <h1>Guess the dinosaur</h1>
       <p>Choose the characteristics of your dinosaur</p>
       <div className='hero-btns'>
       </div>
   </div>
 )
}


export default HeroSection