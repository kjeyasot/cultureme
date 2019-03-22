import React, { Component } from 'react';
import '../footer-nav.css';
import { Link } from 'react-router-dom';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
export class footer1 extends Component {

   
  render() {
      return (
    <div className='footerSetting'>
   <MDBFooter color="elegant-color" className="font-small pt-0">
      <MDBContainer>
        <MDBRow className="pt-3 mb-3 text-center d-flex justify-content-center">
          <MDBCol md="2" className="b-3">
            <h6 className="title font-weight-bold">
            <Link to= "/aboutUs"> 
              <a href="#!">About Us</a>
              </Link>
            </h6>
          </MDBCol>
        
          <MDBCol md="2" className="b-3">
            <h6 className="title font-weight-bold">
              <a href="#!">Help</a>
            </h6>
          </MDBCol>
          <MDBCol md="2" className="b-3">
            <h6 className="title font-weight-bold">
              <a href="mailto:cultureme2019@gmail.com" data-rel="external">Contact</a>
              
            </h6>
          </MDBCol>
        </MDBRow>
      
        <MDBRow>
        <MDBCol md="12" className="py-2">
          <div className="mb-2 flex-center">
            <a className="fb-ic">
              <i className="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x">
              </i>
            </a>
            <a className="tw-ic">
              <i className="fab fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x">
              </i>
            </a>
           
            <a className="li-ic">
              <i className="fab fa-youtube fa-lg white-text mr-md-5 mr-3 fa-2x">
              </i>
            </a>
            <a className="ins-ic">
              <i className="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x">
              </i>
            </a>
           
          </div>
        </MDBCol>
      </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright:
          <a href="./"> cultureme.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>
    </div>
    );
  }};