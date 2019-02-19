import React, { Component } from 'react';
import '../App.css';
import * as script from '../scripts';
import { Link } from 'react-router-dom';
import firebase, { auth, provider } from '../firebase.js';
import CryptoJS from "crypto-js";

const images = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));
const emailReg = /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$/i;
const postReg = /^[ABCEGHJ-NPRSTVXY][0-9][ABCEGHJ-NPRSTV-Z] [0-9][ABCEGHJ-NPRSTV-Z][0-9]$/i;
const phoneReg = /^[0-9]{3} [0-9]{3} [0-9]{4}$/i;
let testusername = [];
let testemail = [];
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
        this.readData = this.readData.bind(this);


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
        // this should be changed to service provider page
        this.props.history.push('/')
      }

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
      
      readData() {
         this.state.serviceProviders.map((sevProv) => {
                testusername.push(sevProv.userName); 
                testemail.push(sevProv.email);
        })
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
            
            <input className='field' id = 'email'type = 'email' name='email' placeholder = 'E-mail' onClick={this.readData} onChange={this.handleChange} value={this.state.email}/><br></br>
            {(this.state.email && !this.state.email.match(emailReg))? <p id="letter" className="invalid">Invalid <b>E-mail</b> Address (ex: abc@abc.com)</p>:null}
            {(this.state.email && testemail.indexOf(this.state.email)>-1)? <p id="letter" className="invalid">E-mail Address Already Exists</p> : null}

            <input className='field' id = 'mobile'type = 'text' name='mobile' placeholder = 'Contact' onChange={this.handleChange} value={this.state.mobile}/><br></br>
            {(this.state.mobile && !this.state.mobile.match(phoneReg))? <p id="letter" className="invalid">Invalid <b>Phone</b> Number (ex: 111 111 1111)</p>:null}

            <input className='field' id = 'postalCode' type = 'text' name='postalCode' placeholder = 'Postal Code' onChange={this.handleChange} value={this.state.postalCode}/><br></br>
            {(this.state.postalCode && !this.state.postalCode.match(postReg))? <p id="letter" className="invalid">Invalid <b>Postal Code</b> (ex: M1B 3B6)</p>:null}
           
            <input className='field' id = 'userName'type = 'text' name='userName' placeholder = 'Username' onClick={this.readData} onChange={this.handleChange} value={this.state.userName}/><br></br>
           {(this.state.userName && testusername.indexOf(this.state.userName)>-1)? <p id="letter" className="invalid">Username Already Exists</p> : null}
           
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
            
           {/* <input className='field' id = 'confirmPassword'type = 'password' name='confirmPassword' placeholder = 'Confirm Password' onChange={this.handleChange} value={this.state.confirmPassword}/><br></br> */}
            
            <input id='submitBtn' className = 'submitBtn' type= 'submit' value= 'Sign Up' 
            disabled={!this.state.firstName||!this.state.lastName||!this.state.companyName||!this.state.email.match(emailReg)||testemail.indexOf(this.state.email)>-1||!this.state.mobile.match(phoneReg)||!this.state.postalCode.match(postReg)||!this.state.userName||testusername.indexOf(this.state.userName)>-1||!this.state.password}
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

