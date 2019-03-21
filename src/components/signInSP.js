import React, { Component } from 'react';
import '../App.css';
import * as script from '../scripts';
import { Link } from 'react-router-dom';
import firebase, { auth, provider } from '../firebase.js';
import CryptoJS from "crypto-js";

import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter,MDBView } from 'mdbreact';

const images = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));

export class signInSP extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      user: null,
      error: null,
    }
    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.readData = this.readData.bind(this);
    this.loginWEmail = this.loginWEmail.bind(this);
    this.login = this.login.bind(this); 
    this.logout = this.logout.bind(this); 
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });  }

  logout() {
    auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
  }

  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }

  loginWEmail(e) {
    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
    .then((result) => {
           const user = result.user;
      this.setState({
        user
      }) 
     
    
    }).catch((error) => {
      var errorMessage = error.message;
      // alert(errorMessage);
      this.setState({ error: error});
      
    });
   
  } 
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        window.location = '/choose-service';
      } 
    
        
      
    });
  }
  readData() {
    this.state.serviceProviders.map((sevProv) => {
          //  testusername.push(sevProv.userName); 
          //  testemail.push(sevProv.email);
   })
 }

  render() {
      return (
    
        <MDBView className="SignInSPView">
        <MDBContainer>
        <MDBRow>
          <MDBCol md="5">
            <MDBCard style={{ marginTop: "10vh"}}>
              <MDBCardBody className="mx-3">
                <div className="text-center">
                {/* <Link to="/"> */}
               <img className="logosignup" alt="img" src={images['blackLogo.png']} /> 
                  <h3 className="dark-grey-text mb-5">
                    <strong>Sign In</strong>
                  </h3>
                </div>
                <MDBInput
                  label="Email"
                  
                  name='email'
                  group
                  type="email"
                  validate
                  error="wrong"
                  success="right"
                  style={{ paddingBottom: "3vh"}}
                  onChange={this.handleChange} 
                  value={this.state.email}
                  
                />
                <MDBInput
                  label="Your password"
                  id = 'password'
                  name='password'
                  group
                  type="password"
                  validate
                  containerClass="mb-0"
                  style={{ paddingBottom: "3vh"}}
                  onChange={this.handleChange} 
                  value={this.state.password}
                />
                
                <div className="text-center mb-3">
                <MDBBtn onClick={this.loginWEmail}
                  type="submit"
                  gradient="ripe-malinka"
                  rounded
                  className="btn-block z-depth-1a"
                  id='submitBtn' 
                >
                  Sign In
                </MDBBtn>
                {this.state.error ?  <p id="letter" className="invalid">{this.state.error.message}</p>:null}
                {/* {this.state.user ?  (window.location = '/choose-service') */}
                  
                  {/* // this.props.history.push('/choose-service') */}
                  {/* :null} */}
              </div>
         
              </MDBCardBody>
              <MDBModalFooter className="mx-5 pt-3 mb-1">
                
                <p className="font-small grey-text d-flex justify-content-end">
                  Not a member?
                  <Link to="/signup-serviceprovider">
                  <a href="#!" className="blue-text ml-1">
  
                    Sign Up
                  </a>
                  </Link>
                </p>
              </MDBModalFooter>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      </MDBView>
    );
  }
}
