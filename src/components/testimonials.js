import React, { Component } from 'react';
import '../App.css';
import * as script from '../scripts';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import * as modalComp from './modal';
import Modal from "react-responsive-modal";
import ReactBootstrapCarousel  from "react-bootstrap-carousel";

const images1 = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));

export class testimonials extends Component {
    
    render() {
     
        return (
            <div className="TestimonialBlock">
               <br></br>
  <br></br>
            <p className="popularServ">Testimonials</p>
           <br></br>
            <section class="team-section text-center my-5">
        
            
             
              <div class="row text-center">
            
              
                <div class="col-md-4 mb-md-0 mb-5">
            
                  <div class="testimonial">
                  
                    <div class="avatar mx-auto">
                      <img src={images1['sana.png']} className="img-circle"/>
                    </div>
                    
                    <h4 className="TestimonialName">Sana Irfan</h4>
                    <h6 className="TestimonialOccupation">Henna Artist</h6>
                    <h6 className="TestimonialCmt">
                      <i class="fa fa-quote-left"></i>CultureMe is great! It allows me to show my skills as a henna artist. I’ve gotten so many more client since using the app.<i class="fa fa-quote-right"></i></h6>
                    
                    {/* <div class="orange-text">
                      <i class="fas fa-star"> </i>
                      <i class="fas fa-star"> </i>
                      <i class="fas fa-star"> </i>
                      <i class="fas fa-star"> </i>
                      <i class="fas fa-star-half-alt"> </i>
                    </div> */}
                  </div>
            
                </div>
                
                <div class="col-md-4 mb-md-0 mb-5">
            
                  <div class="testimonial">
                  
                    <div class="avatar mx-auto">
                      <img src={images1['sana3.jpg']} class="img-circle z-depth-1 img-fluid"/>
                    </div>
                    
                    <h4 class="TestimonialName">Sana Irfan</h4>
                    <h6 class="TestimonialOccupation">Student</h6>
                    <p class="TestimonialCmt">
                      <i class="fa fa-quote-left"></i>I’ve saved so much time using this platform. I can easily find what I want when I want. <i class="fa fa-quote-right"></i></p>
                  
                    {/* <div class="orange-text">
                      <i class="fas fa-star"> </i>
                      <i class="fas fa-star"> </i>
                      <i class="fas fa-star"> </i>
                      <i class="fas fa-star"> </i>
                      <i class="fas fa-star"> </i>
                    </div> */}
                  </div>
            
                </div>
               
                <div class="col-md-4">
            
                  <div class="testimonial">
                   
                    <div class="avatar mx-auto">
                      <img src={images1['sana1.png']} class="img-circle z-depth-3"/>
                    
                    </div>
                   
                    <h4 class="TestimonialName">Sana Irfan</h4>
                    <h6 class="TestimonialOccupation">Student</h6>
                    <p class="TestimonialCmt">
                      <i class="fa fa-quote-left"></i>It helped me find my perfect bridal look! I was able to trust the artist doing my makeup. I will definitely recommend CultureMe to my friends and family. <i class="fa fa-quote-right"></i></p>
               
                  </div>
            
                </div>
       
            
              </div>
            
            
            </section>
            
            </div>
            

        );
    
    }}