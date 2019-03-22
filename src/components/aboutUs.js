import React, { Component } from 'react';
import '../App.css';
import * as script from '../scripts';
import { Link } from 'react-router-dom';
import firebase, { auth, provider } from '../firebase.js';
import CryptoJS from "crypto-js";
import * as footer1 from './footer-nav';
import * as navstuff from './nav-boots';
import {  MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon } from "mdbreact";

const images1 = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));

export class aboutUs extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      user: null,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });
  }

  render() {
      return (
        <div>
        <navstuff.navstuff/>
<MDBCard className="text-center">
        <MDBCardBody>
          <h2 style={{color: 'palevioletred', fontFamily: 'Arial', fontWeight: 'bold', fontSize: '3vw'}}>About Us</h2>
          <p style={{fontSize: "2vw", fontStyle: 'Arial'}} className="grey-text w-responsive mx-auto mb-1">
           CultureMe connects service providers to individuals seeking cultural services.
The application allows service providers to showcase their portfolio and effectively outreach to potential
clients. Through an optimized search engine, the platform aims to help people find the most relevant service
with ease. 
          </p>
<br></br>
          <iframe width="50%" height="250vh" src="https://www.youtube.com/embed/isW9O5f1T3Q" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          
          <br></br>
          <br></br>
          <br></br>

          <MDBRow>
            <MDBCol lg="3" md="6" className="mb-lg-0 mb-5">
            <img src={images1['sana6.jpg']} className="img-circle z-depth-1"/>
              <h5 style={{colour: 'black', fontStyle: 'arial',fontSize: '2vw'}} className="font-weight-bold mt-4 mb-3">Sana Irfan</h5>
              <p style={{color: 'palevioletred', fontStyle: 'arial', fontSize: '1.5vw'}}>Product Manager</p>
              <ul className="list-unstyled mb-0">
                <a href="#!" className="p-2 fa-lg">
                  {/* <MDBIcon fab icon="linkedin" className="black-text" /> */}
                </a>
              </ul>
            </MDBCol>

                        <MDBCol lg="3" md="6" className="mb-lg-0 mb-5">
                        <img src={images1['karthi2.jpg']} className="img-circle z-depth-1"/>
              <h5 style={{colour: 'grey', fontStyle: 'arial',fontSize: '2vw'}} className="font-weight-bold mt-4 mb-3">Karthigha Jeyasotharan</h5>
              <p style={{color: 'palevioletred', fontStyle: 'arial', fontSize: '1.5vw'}}>Backend Devloper</p>
              <ul className="list-unstyled mb-0">
                <a href="#!" className="p-2 fa-lg">
                  {/* <MDBIcon fab icon="linkedin" className="black-text" /> */}
                </a>
              </ul>
            </MDBCol>


                        <MDBCol lg="3" md="6" className="mb-lg-0 mb-5">
                        <img src={images1['nehal3.jpg']}className="img-circle z-depth-1"/>
              <h5 style={{colour: 'black', fontStyle: 'arial',fontSize: '2vw'}} className="font-weight-bold mt-4 mb-3">Nehal Gupta</h5>
              <p style={{color: 'palevioletred', fontStyle: 'arial', fontSize: '1.5vw'}}>Backend Developer</p>
              <ul className="list-unstyled mb-0">
                <a href="#!" className="p-2 fa-lg">
                  {/* <MDBIcon fab icon="linkedin" className="black-text" /> */}
                </a>
              </ul>
            </MDBCol>

                        <MDBCol lg="3" md="6" className="mb-lg-0 mb-5">
                        <img src={images1['eman2.jpg']} className="img-circle z-depth-1"/>
              <h5 style={{colour: 'black', fontStyle: 'arial',fontSize: '2vw'}} className="font-weight-bold mt-4 mb-3">Eman Rashdi </h5>
              <p style={{color: 'palevioletred', fontStyle: 'arial', fontSize: '1.5vw'}}>Frontend Developer</p>
              <ul className="list-unstyled mb-0">
                <a href="#!" className="p-2 fa-lg">
                  {/* <MDBIcon fab icon="linkedin" className="black-text" /> */}
                </a>
              </ul>
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
        <br></br>
        <br></br>
      </MDBCard>
      <footer1.footer1/>
      </div>
    );
  }
}
