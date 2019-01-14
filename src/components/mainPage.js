
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
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css"
// import "/users/ER/cultureme/node_modules/slick-carousel/slick/slick.css";
// import "/users/ER/cultureme/node_modules/slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import * as testimonials from './testimonials';
  
const images = script.importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));
let num = Object.keys(images).length-3;
var y = Math.floor(num * Math.random());

 
export class mainPage extends Component {
    state = {
        open: false
      };
    
      onOpenModal = () => {
        this.setState({ open: true });
      };
    
      onCloseModal = () => {
        this.setState({ open: false });
      };

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
            const { open } = this.state;
    return (
      <div> 
      <Slider autoplay="true"  {...properties}>
        <img className="slide" alt="bridal" src={images['bridal.jpg']}/>
        <img className="slide" alt="henna" src={images['henna.jpg']} />
        <img className="slide" alt="hair" src={images['hair.jpg']} />
        <img className="slide" alt="pic1" src={images['pic1.jpg']}/>
        <img className="slide" alt="pic2" src={images['pic2.jpg']}/>
        <img className="slide" alt="pic3" src={images['pic3.jpg']}/>
        <img className="slide" alt="pic4" src={images['pic4.jpg']}/>
        <img className="slide" alt="pic5" src={images['pic5.jpg']}/>
      </Slider>
      <img className="logoCM" alt="logo" src={images['logoCM.png']} />
      
      <div>
      <input className = "search" type="text" placeholder="Search.." name="search"/>
       {/* Below link should be redirected to NEHAL's page */} 
       <Link to="/searchresults">
       <button className = "searchButton"type="submit"><i className="fa fa-search"></i></button>
       </Link>
       </div>
       
        <Link to="/signin">
        <button className="signInBtn" onClick={()=>this.setState({ showSignIn:true, showSignUp:false, showForgotPw:false})}>Sign In</button>
        <Modal open={this.state.showSignIn} onClose={() => this.setState({ showSignIn:false, showSignUp:false, showForgotPw:false})} 
        center className="testModal">
        <div className="testModal">
        <div className="content">
        <modalComp.signInModal/>
        <Link to="/forgotpassword">
          <u onClick={()=>this.setState({ showSignIn:false, showSignUp:false, showForgotPw:true})}> Forgot Password?</u><br></br>
          </Link>
          <p1>Don't have an account?</p1>
          <Link to="/signup">
          <u id="signUpTxt" onClick={()=>this.setState({ showSignIn:false, showSignUp:true, showForgotPw:false})}> Sign Up </u> 
          </Link>
          </div>
          </div>
        </Modal>
        </Link>
        <Link to="/signup">
        <button className="signUpBtn" onClick={()=>this.setState({ showSignIn:false, showSignUp:true, showForgotPw:false})}>Sign Up</button>
        <Modal open={this.state.showSignUp} onClose={() => this.setState({ showSignUp:false, showSignIn:false, showForgotPw:false })} center>
        <div className="testModal">
        <div className="content">
          <modalComp.signUpModal/>
          <p1>Already have an account?</p1>
          <Link to="/signin">
          <u id="signInTxt" onClick={()=>this.setState({ showSignIn:true, showSignUp:false, showForgotPw:false})}> Sign In</u>
          </Link>
          </div>
          </div>
        </Modal>
        </Link>
        <Link to="/forgotpassword">
        <Modal open={this.state.showForgotPw} onClose={() => this.setState({ showForgotPw:false, showSignIn:false, showSignUp:false})} center>
        <div className="testModal">
        <div className="content">
          <modalComp.forgotPwModal/>
        </div>
        </div>
        </Modal>
        </Link>
        {/* Sana's stuff should come here */}
        <popServ.popServ/>
        <testimonials.testimonials/>
      </div>

      
     );
         }
       }