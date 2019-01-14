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

export class testimonials extends Component {
    
    render() {
     
        return (
            <div>
               <br></br>
  <br></br>
            <p className="popularServ">Testimonials</p>
           <br></br>
            <section class="team-section text-center my-5">
        
            
             
              <div class="row text-center">
            
              
                <div class="col-md-4 mb-md-0 mb-5">
            
                  <div class="testimonial">
                  
                    <div class="avatar mx-auto">
                      <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(1).jpg" className="img-circle"/>
                    </div>
                    
                    <h4 className="TestimonialName">Anna Deynah</h4>
                    <h6 className="TestimonialOccupation">Web Designer</h6>
                    <h6 className="TestimonialCmt">
                      <i class="fa fa-quote-left"></i>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod
                      eos id officiis hic tenetur quae quaerat ad velit ab hic tenetur.</h6>
                    
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
                      <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(8).jpg" class="img-circle z-depth-1 img-fluid"/>
                    </div>
                    
                    <h4 class="font-weight-bold dark-grey-text mt-4">John Doe</h4>
                    <h6 class="font-weight-bold blue-text my-3">Web Developer</h6>
                    <p class="font-weight-normal dark-grey-text">
                      <i class="fa fa-quote-left"></i>Ut enim ad minima veniam, quis nostrum exercitationem ullam
                      corporis suscipit laboriosam, nisi ut aliquid commodi.</p>
                  
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
                      <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(10).jpg" class="img-circle z-depth-3"/>
                    
                    </div>
                   
                    <h4 class="font-weight-bold dark-grey-text mt-4">Maria Kate</h4>
                    <h6 class="font-weight-bold blue-text my-3">Photographer</h6>
                    <p class="font-weight-normal dark-grey-text">
                      <i class="fa fa-quote-left"></i>At vero eos et accusamus et iusto odio dignissimos ducimus qui
                      blanditiis praesentium voluptatum deleniti atque corrupti.</p>
               
                  </div>
            
                </div>
       
            
              </div>
            
            
            </section>
            
            </div>
            

        );
    
    }}