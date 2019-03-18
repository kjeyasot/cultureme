import React, { Component } from 'react';
import firebase, { auth, provider, storage, database  } from '../firebase.js';
import * as footer1 from './footer-nav';
import * as navstuff from './nav-boots';
import CryptoJS from "crypto-js";


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
       
        
        }
      <div class = "moveElements">
            <h4 style={{float:'middle', fontFamily:"Arial"}}>Account Settings</h4>
            <br></br>
            
            <form>
            <h5 style={{float:'middle', fontFamily:"Arial", color:"palevioletred"}}>Personal Information</h5>
            <br></br>
              <h6>
                First Name:
                &nbsp;&nbsp;
               <input className = 'noEdit' type="text" value = {this.state.firstName} name="firstName" disabled="disabled"/>
              </h6>
              <br></br>
              <h6>
                Last Name:
                &nbsp;&nbsp;
               <input  className = 'noEdit' type="text" value = {this.state.lastName} name="lastName" disabled="disabled"/>
              </h6>
              <h6>
              <br></br>
                Email:
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                &nbsp;&nbsp;
               <input  className = 'noEdit' type="text" name="email" value = {this.state.user.email} disabled="disabled"/>
              </h6>
              <h6>
              <br></br>
                Password:
                &nbsp;&nbsp;
                &nbsp;&nbsp;

                <input className = "noEdit" type="password" name="password" value={this.state.password} disabled="disabled"/>
                  

               &nbsp;&nbsp;
             
               
              </h6>
              <br></br>
              <form onSubmit={this.handleSubmit}>
              <div>
              <h5 style={{float:'middle', fontFamily:"Arial", color:"palevioletred"}}>Service Information</h5>
              
              <div className = 'editButtons'>
              
               &nbsp;&nbsp;
                {this.state.isInEditMode?<button className = "fa fa-times" onClick= {this.userIntUpdate} type = 'submit'></button> : 
                <button  name = "yes" className = "fa fa-edit"  onClick={this.Activate}></button> }
               </div>
               </div>
              <br></br>
             
              <h6>
                Company Name:
                &nbsp;&nbsp;


              {this.state.isInEditMode? <input className = "editAccount" type="text" name="companyName" maxlength="60" onChange={this.handleChange} value ={this.state.companyName}/> :
               <input type="text" name="companyName" value={this.state.companyName} disabled="disabled"/>}
              
              </h6>
              <br></br>

               <h6>
               Phone Number:
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                &nbsp;&nbsp;
               
               {this.state.isInEditMode ? <input className = "editAccount" type="text" name="mobile" pattern="[0-9]*" maxLength= "10"  onChange={this.handleChange} value={this.state.mobile}/> :
                <input type="text" name="mobile" value={this.state.mobile} disabled="disabled"/>}

              </h6>
              <br></br>

         
              <br></br>

                <h6>
                

               &nbsp;&nbsp;
               {/* <br></br> */}
               {/* <br></br> */}
             <div className = 'editButtons' >
               {this.state.isInEditMode?  <button className = "fa fa-save" type= 'submit' disabled={!this.state.companyName||!this.state.mobile||this.state.mobile.length<10||testCompany.indexOf(this.state.companyName)>-1||testPhone.indexOf(this.state.mobile)>-1}   onClick={this.userUpdate} ></button> : null}
              
              
               </div>
               
              </h6> 
              </form>

            </form>
            
     
      </div>

    <div className="spfooter">
        <footer1.footer1/>
        </div>
        </div>
        : null}
    </div>
      );
    }
  }
