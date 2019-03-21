import React, { Component } from 'react';
import firebase, { auth, provider, storage, database  } from '../firebase.js';
import * as footer1 from './footer-nav';
import * as navstuff from './nav-boots';
import CryptoJS from "crypto-js";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon,MDBInput } from 'mdbreact';



// import * as script from '../scripts';
// const images = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));
let firstName;
let lastName;
let email;
let companyName;
let mobile;
let postalCode;
let password;
let testCompany = [];
let testPhone = [];

export class myAccount extends React.Component {
  constructor(){
    super()
    this.state = {
      user: null,
      file: null,
      url: [],
      images: [],
      firstName: '',
      lastName: '',
      companyName: '',
      email: '',
      mobile: '',
      // postalCode: '',
      password: '',
      isInEditMode:false
    }
    this.userUpdate = this.userUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.userIntUpdate = this.userIntUpdate.bind(this);
    this.Activate = this.Activate.bind(this);
  }
  Activate() {
  
    this.setState ({
      isInEditMode: !this.state.isInEditMode
 
    });
    // console.log(companyName)
       
    
    // console.log(  testCompany.indexOf(companyName))
    testCompany.splice(testCompany.indexOf(companyName),1);
    testPhone.splice(testPhone.indexOf(mobile),1);
  //  console.log(testCompany) 
   }
  handleSubmit = (event) => {
    event.preventDefault();
    }
    handleChange(e) {
      // console.log(e.target.name)
     
      if(e.target.name==='mobile'){
        const mobile = (e.target.validity.valid) ? e.target.value : this.state.mobile;
        this.setState({ mobile});

      }

      if(e.target.name==='companyName'){
        const companyName = (e.target.validity.valid) ? e.target.value : this.state.companyName;
        this.setState({ companyName});

      }
   
    }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        
        this.setState({ user });
        const serviceProviderssRef = firebase.database().ref('serviceProviders');
        serviceProviderssRef.once('value', (snapshot) => {
          snapshot.forEach((eventSnapshot) => {
            eventSnapshot.child('PersonalInformation').forEach((personalInfo) => {
              let persInfo = personalInfo.val();
             
              testCompany.push(persInfo.companyName);
            
              testPhone.push(persInfo.mobile); 
            });
          });
        });  
        const serviceProvidersRef = firebase.database().ref('serviceProviders').child(user.uid);
        serviceProvidersRef.once('value', (snapshot) => {
            snapshot.child('PersonalInformation').forEach((personalInfo) => {                
              let persInfo = personalInfo.val();
              const test = CryptoJS.AES.decrypt(persInfo.password.toString(), 'secret key 123');
              const pw = test.toString(CryptoJS.enc.Utf8);
              firstName = persInfo.firstName;
              lastName = persInfo.lastName;
              email = persInfo.email;
              companyName = persInfo.companyName;
              mobile = persInfo.mobile;
              // testCompany.push(persInfo.companyName);
              // testPhone.push(persInfo.mobile); 
              // postalCode = persInfo.postalCode;
              password = pw;

           

            });
            this.setState({
              firstName: firstName,
              lastName: lastName,
              companyName: companyName,
              email: email,
              mobile: mobile,
              // postalCode: postalCode,
              password: password,
            }
            )
         
        });   
     

      } 
      
    });
    
  }

  
  userUpdate() {
  
    auth.onAuthStateChanged((user) => {
      if (user) {
        const tempPw = CryptoJS.AES.encrypt(this.state.password, 'secret key 123');
        // const test = CryptoJS.AES.decrypt(tempPw.toString(), 'secret key 123');
        // const pw = test.toString(CryptoJS.enc.Utf8);
        const pw = tempPw.toString();
        const phone = this.state.mobile.split(" ").join("");

        const servPV = {
          companyName: this.state.companyName,
          mobile: phone,
          // postalCode: this.state.postalCode,
          password: pw,
        }
        // console.log(this.state.companyName1)
        const serviceProvidersRef = firebase.database().ref('serviceProviders').child(user.uid);

        serviceProvidersRef.once('value', (snapshot) => {
            snapshot.child('PersonalInformation').forEach((personalInfo) => {
              console.log(personalInfo)   
              personalInfo.ref.update(servPV)             
             window.location.reload(true);

            });
        })
        
            }
    })
    this.setState ({
      isInEditMode: false
 
    });
          }
    
    userIntUpdate() {
      auth.onAuthStateChanged((user) => {
        if (user) {
          this.setState({ user });
          const serviceProviderssRef = firebase.database().ref('serviceProviders');
          serviceProviderssRef.once('value', (snapshot) => {
            snapshot.forEach((eventSnapshot) => {
              eventSnapshot.child('PersonalInformation').forEach((personalInfo) => {
                let persInfo = personalInfo.val();
               
                testCompany.push(persInfo.companyName);
              
                testPhone.push(persInfo.mobile); 
              });
            });
          });  
          const serviceProvidersRef = firebase.database().ref('serviceProviders').child(user.uid);

          serviceProvidersRef.once('value', (snapshot) => {
              snapshot.child('PersonalInformation').forEach((personalInfo) => {                
                let persInfo = personalInfo.val();
                const test = CryptoJS.AES.decrypt(persInfo.password.toString(), 'secret key 123');
                const pw = test.toString(CryptoJS.enc.Utf8);
                // testemail.push(persInfo.firstName);
                firstName = persInfo.firstName;
                lastName = persInfo.lastName;
                email = persInfo.email;
                companyName = persInfo.companyName;
                mobile = persInfo.mobile;
                // postalCode = persInfo.postalCode;
                password = pw;

             

              });
              this.setState({
                firstName: firstName,
                lastName: lastName,
                companyName: companyName,
                email: email,
                mobile: mobile,
                // postalCode: postalCode,
                password: password,
                isInEditMode: false
              })
          });

        } 
        
        
      });
      
    }

    render() {
      return (
        
        <div>
        {this.state.user ?
        <div>
        <navstuff.navstuff/>
        <div class = "moveElements">
        <h2 style={{color: 'black', fontFamily: 'Arial'}}>Account Settings</h2>
            </div>
            <br></br>
        <MDBContainer>
       <MDBRow>
        <MDBCol md="6" text-center>
        
        <h5 style={{float:'middle', fontFamily:"Arial", color:"palevioletred"}}>Personal Information</h5>
  
        <MDBInput 
      label="First Name"
      outline icon="user" 
      style={{ paddingBottom: "3vh"}}
      className = "p-3 black-text "
      name="firstName"
      value={this.state.firstName}/>


      <MDBInput 
      label="Last Name"
      outline icon="user" 
      style={{ paddingBottom: "3vh"}}
      className = "p-3 black-text "
      name="lastName"
      value={this.state.lastName}/>

 <MDBInput 
      label="Email"
      outline icon="envelope" 
      style={{ paddingBottom: "3vh"}}
      className = "p-3 black-text "
      name="email"
      value= {this.state.user.email}/>

 <MDBInput 
      label="Password"
      outline icon="key" 
      style={{ paddingBottom: "3vh"}}
      className = "p-3 black-text "
      name="password"
      type="password"
      value= {this.state.password}/>

      

 <form onSubmit={this.handleSubmit}>
 
 <h5 style={{float:'middle', fontFamily:"Arial", color:"palevioletred"}}>Service Information</h5>
 {this.state.isInEditMode?
 <button className = "fa fa-times" style={{float:'right'}}
 onClick= {this.userIntUpdate} 
 type = 'submit'></button> : 
  <button  name = "yes"  style={{float:'right'}}
  className = "fa fa-edit"  
  onClick={this.Activate}>
  </button> }
  <br></br>
 
              {this.state.isInEditMode? 
              <MDBInput  
              label="Company Name"
              type="text" 
              name="companyName" 
              outline icon="building" 
              style={{ paddingBottom: "3vh"}}
              maxlength="60" 
              className = "p-3 black-text "
              onChange={this.handleChange} 
              value ={this.state.companyName}/> :
               <MDBInput 
               type="text" 
               label="Company Name"
               name="companyName"
               outline icon="building"
               className = "p-3 black-text " 
               value={this.state.companyName} 
               disabled="disabled"/>}


               {this.state.isInEditMode? 
              <MDBInput
              label="Phone Number"
              type="text" 
              name="mobile" 
              outline icon="phone" 
              
              style={{ paddingBottom:"3vh"}}
              pattern="[0-9]*" maxLength= "10"
              className = "p-3 black-text "
              onChange={this.handleChange} 
              value ={this.state.mobile}/> :
              <MDBInput 
               type="text" 
               label="Phone Number"
               name="mobile"
               className = "p-3 black-text "
               outline icon="phone" 
               value={this.state.mobile} 
               disabled="disabled"/>}
          


               {this.state.isInEditMode?  <button 
               style={{float:'right'}}
               className = "fa fa-save" 
               type= 'submit' 
               disabled={!this.state.companyName||
                !this.state.mobile||this.state.mobile.length<10||
                testCompany.indexOf(this.state.companyName)>-1||
                testPhone.indexOf(this.state.mobile)>-1}  
                onClick={this.userUpdate} ></button> : null}
              
 
 </form>


</MDBCol>
      </MDBRow>
    </MDBContainer>
    <div className="spfooter">
        <footer1.footer1/>
        </div>
        </div>
        : null}
    </div>
      );
    }
  }
