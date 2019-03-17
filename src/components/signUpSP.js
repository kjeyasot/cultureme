import React, { Component } from 'react';
import '../App.css';
import * as script from '../scripts';
import { Link } from 'react-router-dom';
import firebase, { auth, provider } from '../firebase.js';
import CryptoJS from "crypto-js";
import { error } from 'util';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter,MDBView } from 'mdbreact';

const images = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));
const emailReg = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
const postReg = /^[ABCEGHJ-NPRSTVXY][0-9][ABCEGHJ-NPRSTV-Z] [0-9][ABCEGHJ-NPRSTV-Z][0-9]$/i;
const phoneReg = /^[0-9]{3}\s?[0-9]{3}\s?[0-9]{4}$/i;
const letters = /^[A-Za-z]+$/;
let testemail = [];
let testCompany = [];
let testPhone = [];

const images1 = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));

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
          password: '',
          serviceProviders: [],
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
        // this.signup();
        // this.props.history.push('/choose-service')
      }
    
      signup(){
        const serviceProvidersRef = firebase.database().ref('serviceProviders');
        const tempPw = CryptoJS.AES.encrypt(this.state.password, 'secret key 123');
        // const test = CryptoJS.AES.decrypt(tempPw.toString(), 'secret key 123');
        // const pw = test.toString(CryptoJS.enc.Utf8);
        const pw = tempPw.toString();
        const phone = this.state.mobile.split(" ").join("");
        const serviceProviders = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          companyName: this.state.companyName,
          email: this.state.email,
          mobile: phone,
          postalCode: this.state.postalCode,
          password: pw,
        }
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
          if(u.user){
            let userUID = u.user.uid
            let servpro = serviceProvidersRef.child(userUID).child('PersonalInformation');
            servpro.push(serviceProviders)  
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
        firebase.auth().onAuthStateChanged(user => {
          if(user) {
            window.location = '/choose-service'; //After successful login, user will be redirected to home.html
          }
        });
        
      }
      removesevProv(sevProvId) {
        const serviceProvidersRef = firebase.database().ref(`/serviceProviders/${sevProvId}`);
        serviceProvidersRef.remove();
      }

  render() {
      
      return (
        


        <MDBView>
        <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <MDBCard style={{ marginTop: "0.01vh"}}>
            <MDBCardBody className="mx-1" >
              <div className="text-center">
              <img className="logosignup" alt="img" src={images['blackLogo.png']} />
                <h3 className="dark-grey-text mb-8">
                  <strong>Sign Up</strong>
                </h3>
              </div>
              <MDBInput
                label="First Name"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                style={{ paddingBottom: "3vh"}}
                name='firstName'
                onChange={this.handleChange} value={this.state.firstName}
              />

               {(this.state.firstName && 
                !this.state.firstName.match(letters))? 
                <p id="letter" className="invalid">Invalid First Name</p>:null}
              
              <MDBInput
                label="Last Name"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                name='lastName'
                id = 'last'
                onChange={this.handleChange} value={this.state.lastName}
                style={{ paddingBottom: "3vh"}}
              />
               {(this.state.lastName && !this.state.lastName.match(letters))? <p id="letter" className="invalid">Invalid Last Name</p>:null}

              <MDBInput
                label="Company Name"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                name='companyName'
                id = 'companyName'
                onChange={this.handleChange} value={this.state.companyName}
                style={{ paddingBottom: "3vh"}}
                maxlength=""
              />

                {(this.state.companyName && testCompany.indexOf(this.state.companyName)>-1)? <p id="letter" className="invalid">Company Name Already Exists</p> : null}


              <MDBInput
                label="Email"
                group
                type="email"
                validate
                error="wrong"
                success="right"
                name='email'
                id = 'email'
                onChange={this.handleChange} value={this.state.email}
                style={{ paddingBottom: "3vh"}}
              />
              {(this.state.email && !this.state.email.match(emailReg))? <p id="letter" className="invalid">Invalid <b>E-mail</b> Address (ex: abc@abc.com)</p>:null}
              {(this.state.email && testemail.indexOf(this.state.email)>-1)? <p id="letter" className="invalid">E-mail Address Already Exists</p> : null}

              <MDBInput
                label="Phone Number"
                group
                type="text"
                validate
                containerClass="mb-0"
                name='firstName'
                style={{ paddingBottom: "3vh"}}
                id = 'mobile'
                name='mobile'
                onChange={this.handleChange} value={this.state.mobile}
              />
              {(this.state.mobile && !this.state.mobile.match(phoneReg))? <p id="letter" className="invalid">Invalid <b>Phone</b> Number (ex: 111 111 1111)</p>:null}
              {(this.state.mobile && ((testPhone.indexOf(this.state.mobile)>-1)||(testPhone.indexOf(this.state.mobile.split(" ").join(""))>-1)))? <p id="letter" className="invalid">Phone Number Already Exists</p> : null}  
              
              <MDBInput
                label="Your password"
                group
                type="password"
                validate
                containerClass="mb-0"
                name='firstName'
                id = 'password'
                name='password'
                onChange={this.handleChange} value={this.state.password}
                style={{ paddingBottom: "3vh"}}
              />
              {/* { this.state.password ? <p className="pwWarning">Password must contain the following:</p> : null} */}
        
        {/* {(this.state.password && this.state.password.match(/[a-z]/g))?<p id="letter" className="valid">A <b>lowercase</b> letter</p>:null} */}
        {(this.state.password && !this.state.password.match(/[a-z]/g))?<p id="letter" className="invalid">A <b>lowercase</b> letter</p>:null}

        {/* {(this.state.password && this.state.password.match(/[A-Z]/g))?<p id="capital" class="valid">A <b>capital (uppercase)</b> letter</p>:null} */}
        {(this.state.password && !this.state.password.match(/[A-Z]/g))?<p id="capital" class="invalid">A <b>capital (uppercase)</b> letter</p>:null}

        {/* {(this.state.password && this.state.password.match(/[0-9]/g))? <p id="number" class="valid">A <b>number</b></p>:null} */}
        {(this.state.password && !this.state.password.match(/[0-9]/g))?<p id="number" class="invalid">A <b>number</b></p>:null}

        {/* {(this.state.password && this.state.password.length>=8)? <p id="length" class="valid">Minimum <b>8 characters</b></p>:null} */}
        {(this.state.password && this.state.password.length<8)?<p id="length" class="invalid">Minimum <b>8 characters</b></p>:null}
                <br></br>    
             
              <div className="text-center mb-3">
                <MDBBtn onClick={this.signup}
                  type="submit"
                  gradient="ripe-malinka"
                  rounded
                  className="btn-block z-depth-1a"
                  id='submitBtn' 
                  disabled={!this.state.firstName||!this.state.firstName.match(letters)||!this.state.lastName||!this.state.lastName.match(letters)||!this.state.companyName||testCompany.indexOf(this.state.companyName)>-1||!this.state.email.match(emailReg)||
                    testemail.indexOf(this.state.email)>-1||!this.state.mobile.match(phoneReg)||testPhone.indexOf(this.state.mobile)>-1||testPhone.indexOf(this.state.mobile.split(" ").join(""))>-1||!this.state.password
                  ||!this.state.password.match(/[a-z]/g)||!this.state.password.match(/[A-Z]/g)||!this.state.password.match(/[0-9]/g)|| this.state.password.length<8}
                >
                  Sign Up
                </MDBBtn>
              </div>

               <p className="font-small grey-text d-flex justify-content-end pb-4">
             <span>Already a member?</span> 
             <Link to="/signInSP">   
                <a href="#!" className="blue-text ml-1">
                  Sign In
                </a>
                </Link>
              </p>
    
            </MDBCardBody>
          
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </MDBView>
    );
  }
  
}

