import React, { Component } from 'react';
import '../App.css';
import * as script from '../scripts';
import { Link } from 'react-router-dom';
import firebase from '../firebase.js';
import CryptoJS from "crypto-js";

const images = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));

export class signUpSP extends Component {
    constructor() {
        super();
        this.state = {
          firstName: '',
          lastName: '',
          companyName: '',
          email: '',
          mobile: '',
          postalCode: '',
          userName: '',
          password: '',
          confirmPassword: '',
          serviceProviders: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
      }
      handleSubmit(e) {
        e.preventDefault();
        const serviceProvidersRef = firebase.database().ref('serviceProviders');
        const tempPw = CryptoJS.AES.encrypt(this.state.password, 'secret key 123');
        // const test = CryptoJS.AES.decrypt(tempPw.toString(), 'secret key 123');
        // const pw = test.toString(CryptoJS.enc.Utf8);
        const pw = tempPw.toString();


        const serviceProviders = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          companyName: this.state.companyName,
          email: this.state.email,
          mobile: this.state.mobile,
          postalCode: this.state.postalCode,
          userName: this.state.userName,
          password: pw,
        //   confirmPassword: this.state.confirmPassword,
        }
        serviceProvidersRef.push(serviceProviders);
        this.setState({
          firstName: '',
          lastName: '',
          companyName: '',
          email: '',
          mobile: '',
          postalCode: '',
          userName: '',
          password: '',
          confirmPassword: ''
        });
      }
      componentDidMount() {
        const serviceProvidersRef = firebase.database().ref('serviceProviders');
        serviceProvidersRef.on('value', (snapshot) => {
          let serviceProviders = snapshot.val();
          let newState = [];
          for (let sevProv in serviceProviders) {
            newState.push({
            id: sevProv,
            firstName: serviceProviders[sevProv].firstName,
            lastName: serviceProviders[sevProv].lastName,
            companyName: serviceProviders[sevProv].companyName,
            email: serviceProviders[sevProv].email,
            mobile: serviceProviders[sevProv].mobile,
            postalCode: serviceProviders[sevProv].postalCode,
            userName: serviceProviders[sevProv].userName,
            password: serviceProviders[sevProv].password,
            confirmPassword: serviceProviders[sevProv].confirmPassword,
            });
          }
          this.setState({
            serviceProviders: newState
          });
        });
        
      }
      removesevProv(sevProvId) {
        const serviceProvidersRef = firebase.database().ref(`/serviceProviders/${sevProvId}`);
        serviceProvidersRef.remove();
      }
      
  render() {
      return (
          <div>
        <img className="backgroundImg" alt="img" src={images['wed2.png']} />
        <div id = "myModal" className="signUpMainModal">
        <div className='signUpPageBg'>
        <div className="signUpPageFields">

        <p2> Sign Up</p2><br></br>
        <form onSubmit={this.handleSubmit}> 
            <input className='field' id = 'first'type = 'text' name='firstName' placeholder = 'First Name' onChange={this.handleChange} value={this.state.firstName}/><br></br>
            <input className='field' id = 'last'type = 'text' name='lastName' placeholder = 'Last Name' onChange={this.handleChange} value={this.state.lastName}/><br></br>
            <input className='field' id = 'companyName'type = 'text' name='companyName' placeholder = 'Company Name' onChange={this.handleChange} value={this.state.companyName}/><br></br>
            <input className='field' id = 'email'type = 'text' name='email' placeholder = 'E-mail' onChange={this.handleChange} value={this.state.email}/><br></br>
            <input className='field' id = 'mobile'type = 'text' name='mobile' placeholder = 'Contact' onChange={this.handleChange} value={this.state.mobile}/><br></br>
            <input className='field' id = 'postalCode' type = 'text' name='postalCode' placeholder = 'Postal Code' onChange={this.handleChange} value={this.state.postalCode}/><br></br>
            <input className='field' id = 'userName'type = 'text' name='userName' placeholder = 'Username' onChange={this.handleChange} value={this.state.userName}/><br></br>
            <input className='field' id = 'password'type = 'password' name='password' placeholder = 'Password' onChange={this.handleChange} value={this.state.password} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" /><br></br>
            { this.state.password ? <h3>Password must contain the following:</h3> : ()=>{ document.getElementById('submitBtn').disable=true;}}
           <input className='field' id = 'confirmPassword'type = 'password' name='confirmPassword' placeholder = 'Confirm Password' onChange={this.handleChange} value={this.state.confirmPassword}/><br></br>
            <input id='submitBtn' className = 'submitBtn' type= 'submit' value= 'Sign Up' 
            disabled={!this.state.firstName||!this.state.lastName||!this.state.companyName||!this.state.email||!this.state.mobile||!this.state.postalCode||!this.state.userName||!this.state.password|| this.state.password!==this.state.confirmPassword}/><br></br>
            </form>
        <p1>Already have an account?</p1>
        <Link to="/signin">   
            <u id="signInTxt"> Sign In</u>
        </Link>
        {/* <div id="message" className='message'>
  <h3>Password must contain the following:</h3>
  <p id="letter" class="invalid">A <b>lowercase</b> letter</p>
  <p id="capital" class="invalid">A <b>capital (uppercase)</b> letter</p>
  <p id="number" class="invalid">A <b>number</b></p>
  <p id="length" class="invalid">Minimum <b>8 characters</b></p>
</div> */}
            </div>
            </div>
            </div>

        </div>
        
    );
  }
  
}

