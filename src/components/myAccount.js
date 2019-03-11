import React, { Component } from 'react';
import firebase, { auth, provider, storage, database  } from '../firebase.js';
import * as footer1 from './footer-nav';
import * as navstuff from './nav-boots';


import * as script from '../scripts';
const images = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));


export class myAccount extends React.Component {
    constructor(){
      super()
      this.state = {
        user: null,
        file: null,
        url: [],
        images: []
      }
    }

    render() {
      return (
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
               <input className = 'noEdit' type="text" name="firstName" disabled="disabled"/>
              </h6>
              <br></br>
              <h6>
                Last Name:
                &nbsp;&nbsp;
               <input  className = 'noEdit' type="text" name="lastName" disabled="disabled"/>
              </h6>
              <h6>
              <br></br>
                Email:
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                &nbsp;&nbsp;
               <input  className = 'noEdit' type="text" name="email" disabled="disabled"/>
              </h6>
              <br></br>
              <div>
              <h5 style={{float:'middle', fontFamily:"Arial", color:"palevioletred"}}>Service Information</h5>
               <button style={{float:'right'}} className = "fa fa-edit" onClick={this.storePhoto}></button>
               <button style={{float:'right'}} className = "fa fa-check" onClick={this.storePhoto}></button>
               </div>
              <br></br>
              <h6>
                Company Name:
                &nbsp;&nbsp;
               <input type="text" name="companyName" />
              
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
               <input type="text" name="contact" />
              </h6>
              <br></br>

                <h6>
                Location:
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                &nbsp;&nbsp;
               <input type="text" name="location" />
              </h6>
              <br></br>

                <h6>
                Password:
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                &nbsp;&nbsp;
               <input type="text" name="password" />
               &nbsp;&nbsp;
               {/* <i class="fa fa-edit" ></i> */}
               <br></br>
               <br></br>
               <button style={{float:'right'}} className = "fa fa-save" onClick={this.storePhoto}></button>
               
              </h6>

            </form>
     
      </div>

    <div className="spfooter">
        <footer1.footer1/>
        </div>
    </div>
      );
    }
  }
