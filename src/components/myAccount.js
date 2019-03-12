import React, { Component } from 'react';
import firebase, { auth, provider, storage, database  } from '../firebase.js';
import * as footer1 from './footer-nav';
import * as navstuff from './nav-boots';
import CryptoJS from "crypto-js";


import * as script from '../scripts';
const images = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));
let firstName;
let lastName;
let email;
let companyName;
let mobile;
let postalCode;
let password;


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
        postalCode: '',
        password: '',
      }
      this.userDetails = this.userDetails.bind(this);
    }

    componentDidMount() {
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
                postalCode = persInfo.postalCode;
                password = pw;

        

              });
              this.setState({
                firstName: firstName,
                lastName: lastName,
                companyName: companyName,
                email: email,
                mobile: mobile,
                postalCode: postalCode,
                password: password,
              })
          });

        } 
        
      });
    }

    
    userDetails() {

    }
    render() {
      return (
        
        <div>
        {this.state.user ?
        <div>
        <navstuff.navstuff/>
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
              <br></br>
              <div>
              <h5 style={{float:'middle', fontFamily:"Arial", color:"palevioletred"}}>Service Information</h5>
              <div className = 'editButtons'>
               <button  className = "fa fa-edit" onClick={this.storePhoto}></button>
               &nbsp;&nbsp;
               <button className = "fa fa-check" onClick={this.storePhoto}></button>
               </div>
               </div>
              <br></br>
              <h6>
                Company Name:
                &nbsp;&nbsp;
               <input type="text" name="companyName" defaultValue={this.state.companyName}/>
              
              </h6>
              <br></br>

               <h6>
                Contact:
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                &nbsp;&nbsp;
               <input type="text" name="contact" defaultValue={this.state.mobile} />
              </h6>
              <br></br>

                <h6>
                Location:
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                &nbsp;&nbsp;
               <input type="text" name="location"  defaultValue={this.state.postalCode}/>
              </h6>
              <br></br>

                <h6>
                Password:
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                &nbsp;&nbsp;
               <input type="password" name="password" defaultValue={this.state.password}/>
               &nbsp;&nbsp;
               {/* <i class="fa fa-edit" ></i> */}
               <br></br>
               <br></br>
               <div className = 'editButtons'>
               <button className = "fa fa-save" onClick={this.storePhoto}></button>
               </div>
               
              </h6>

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
