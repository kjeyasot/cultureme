import React, { Component } from 'react';
import '../App.css';
import * as script from '../scripts';
import { Link } from 'react-router-dom';
import firebase, { auth, provider } from '../firebase.js';
import CryptoJS from "crypto-js";
// var CryptoJS = require("crypto-js");

const images = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));
const emailReg = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
const letters = /^[A-Za-z]+$/;
let testemail = [];
let testCompany = [];
let testPhone = [];
export class signUpClient extends Component {
    constructor() {
        super();
        this.state = {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          clients: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.signup = this.signup.bind(this);

      }
      handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
      }
      handleSubmit(e) {
        e.preventDefault();
        this.signup();
        this.props.history.push('/')
        }

      signup() {
        const clientsRef = firebase.database().ref('clients');
        const tempPw = CryptoJS.AES.encrypt(this.state.password, 'secret key 123');
        // const test = CryptoJS.AES.decrypt(tempPw.toString(), 'secret key 123');
        // const pw = test.toString(CryptoJS.enc.Utf8);
        const pw = tempPw.toString();
        const clients = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: pw,
        }
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
          if(u.user){
            let userUID = u.user.uid
            let servpro = clientsRef.child(userUID).child('PersonalInformation');
            servpro.push(clients)  
            u.user.updateProfile({
            displayName: this.state.firstName + this.state.lastName
          })
          }
     
      })  
      }

      componentDidMount() {
    
        const serviceProvidersRef = firebase.database().ref('serviceProviders');
        const clientRef = firebase.database().ref('clients');

        serviceProvidersRef.once('value', (snapshot) => {
          snapshot.forEach((eventSnapshot) => {
            eventSnapshot.child('PersonalInformation').forEach((personalInfo) => {
              let persInfo = personalInfo.val();
              testemail.push(persInfo.email);
              testCompany.push(persInfo.companyName);
              testPhone.push(persInfo.mobile); 
            });
          });
        });

        clientRef.once('value', (snapshot) => {
          snapshot.forEach((eventSnapshot) => {
            eventSnapshot.child('PersonalInformation').forEach((personalInfo) => {
              let persInfo = personalInfo.val();
              testemail.push(persInfo.email);
            });
          });
        });
        
      }
      removeClient(clientId) {
        const clientsRef = firebase.database().ref(`/clients/${clientId}`);
        clientsRef.remove();
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
            {(this.state.firstName && !this.state.firstName.match(letters))? <p id="letter" className="invalid">Invalid First Name</p>:null}
            
            <input className='field' id = 'last'type = 'text' name='lastName' placeholder = 'Last Name' onChange={this.handleChange} value={this.state.lastName}/><br></br>
            {(this.state.lastName && !this.state.lastName.match(letters))? <p id="letter" className="invalid">Invalid Last Name</p>:null}
            
            <input className='field' id = 'email'type = 'text' name='email' placeholder = 'E-mail' onChange={this.handleChange} value={this.state.email}/><br></br>
            {(this.state.email && !this.state.email.match(emailReg))? <p id="letter" className="invalid">Invalid <b>E-mail</b> Address (ex: abc@abc.com)</p>:null}
            {(this.state.email && testemail.indexOf(this.state.email)>-1)? <p id="letter" className="invalid">E-mail Address Already Exists</p> : null}
            
            <input className='field' id = 'password'type = 'password' name='password' placeholder = 'Password' onChange={this.handleChange} value={this.state.password}/><br></br>
            { this.state.password ? <p className="pwWarning">Password must contain the following:</p> : null}
        
            {(this.state.password && this.state.password.match(/[a-z]/g))?<p id="letter" className="valid">A <b>lowercase</b> letter</p>:null}
            {(this.state.password && !this.state.password.match(/[a-z]/g))?<p id="letter" className="invalid">A <b>lowercase</b> letter</p>:null}

            {(this.state.password && this.state.password.match(/[A-Z]/g))?<p id="capital" class="valid">A <b>capital (uppercase)</b> letter</p>:null}
            {(this.state.password && !this.state.password.match(/[A-Z]/g))?<p id="capital" class="invalid">A <b>capital (uppercase)</b> letter</p>:null}

            {(this.state.password && this.state.password.match(/[0-9]/g))? <p id="number" class="valid">A <b>number</b></p>:null}
            {(this.state.password && !this.state.password.match(/[0-9]/g))?<p id="number" class="invalid">A <b>number</b></p>:null}

            {(this.state.password && this.state.password.length>=8)? <p id="length" class="valid">Minimum <b>8 characters</b></p>:null}
            {(this.state.password && this.state.password.length<8)?<p id="length" class="invalid">Minimum <b>8 characters</b></p>:null}

            
            <input className = 'submitBtn' type= 'submit' value= 'Sign Up'
            disabled={!this.state.firstName||!this.state.firstName.match(letters)||!this.state.lastName||!this.state.lastName.match(letters)||!this.state.email.match(emailReg)||
              testemail.indexOf(this.state.email)>-1||!this.state.password||!this.state.password.match(/[a-z]/g)||!this.state.password.match(/[A-Z]/g)||
              !this.state.password.match(/[0-9]/g)|| this.state.password.length<8}
              
            /><br></br>
            </form>
          <p1>Already have an account?</p1>
          <Link to="/signin">   
                <u id="signInTxt"> Sign In</u>
            </Link>
            </div>
            </div>
            </div>

        </div>
    );
  }
}
