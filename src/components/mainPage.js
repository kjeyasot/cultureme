import React, { Component } from 'react';
import * as script from '../scripts';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
  } from 'react-router-dom';
import Modal from "react-responsive-modal";
import * as modalComp from './modal';
import * as popServ from './popularServices';
import * as footer from './footer';
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css"
// import "/users/ER/cultureme/node_modules/slick-carousel/slick/slick.css";
// import "/users/ER/cultureme/node_modules/slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import * as testimonials from './testimonials';

const images1 = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));
  
const images = script.importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));
let num = Object.keys(images).length-1;
var y = Math.floor(num * Math.random());

 
export class mainPage extends Component {

    render(){
        const properties = {
            infinite: true,
            speed: 0,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows:false,
            autoPlay:true,
            autoplaySpeed: 6000,
            initialSlide:y,
              
            };
    return (
      <div> 
      <Slider autoplay="true"  {...properties}>
        <img className="slide" alt="pic12" src={images['pic12.jpg']}/>
        <img className="slide" alt="pic13" src={images['pic13.jpg']}/>
        <img className="slide" alt="pic13" src={images['pic14.png']}/>
        <img className="slide" alt="wed1" src={images['wed1.png']}/>
        <img className="slide" alt="wed3" src={images['wed3.png']}/>
        <img className="slide" alt="wed4" src={images['wed4.png']}/>
        <img className="slide" alt="wed5" src={images['wed5.png']}/>


      </Slider>
      <img className="logoCM" alt="logo" src={images1['logoCM.png']} />
      
      <div>
      
      <div className="BackSearch"></div>
      <div className="SearchLabelCss"></div>
      <input type="text" className = "searchlabel" value="Search"  readonly="readonly"/>
      
      <input className = "search" type="text" placeholder="Henna, Bridal Makeup.." name="search"/>
      <input className = "nearMe" type="text" placeholder="City, Province" name="nearMe"/>
      <input type="text" className = "nearMelabel" value="Near"  readonly="readonly"/>
     
       <Link to="/searchresults">
       <button className = "searchButton"type="submit"><i className="fa fa-search"></i></button>
       </Link>
       </div>
       
        <Link to="/signin">
        <button className="signInBtn">Sign In</button>
        </Link>
        <Link to="/signup">
        <button className="signUpBtn">Sign Up</button>
        </Link>
        {/* Sana's stuff should come here */}
        <popServ.popServ/>
        <testimonials.testimonials/>
        <br>
        </br>
        <br>
        </br>
        <footer.footer/>
      </div>

      
     );
         }
       }