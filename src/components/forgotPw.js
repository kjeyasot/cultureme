import React, { Component } from 'react';
import '../App.css';
import * as script from '../scripts';
import { Link } from 'react-router-dom';

const images = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));

export class forgotpassword extends Component {
   
  render() {
      return (
        <div>
        <img className="backgroundImg" alt="img" src={images['wed2.png']} />
        <div id = "myModal" className="signUpMainModal">
            <div className='signUpPageBg'>
            <div className="signUpPageFields">
            <p2> Forgot Password</p2><br></br>
            <p1>Please enter your email address and we will send you an email about how to reset your password.</p1><br></br>
            <input className='field' id = 'email'type = 'text' name='email' placeholder = 'E-mail'/><br></br>
            <input className = 'submitBtn' type= 'submit' value= 'Reset Password' onclick="span()"/><br></br>
           

            </div>
            </div>
        </div>

        </div>
    );
  }
}
