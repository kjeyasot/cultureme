import React, { Component } from 'react';
import '../App.css';
import * as script from '../scripts';
import { Link } from 'react-router-dom';

const images = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));

export class signUpClient extends Component {
   
  render() {
      return (
          <div>
        <img className="backgroundImg" alt="img" src={images['wed2.png']} />
        <div id = "myModal" className="signUpMainModal">
            <div className='signUpPageBg'>
            <div className="signUpPageFields">

            <p2> Sign Up</p2><br></br>
          <input className='field' id = 'first'type = 'text' name='first' placeholder = 'First Name'/><br></br>
          <input className='field' id = 'last'type = 'text' name='last' placeholder = 'Last Name'/><br></br>
          <input className='field' id = 'email'type = 'text' name='email' placeholder = 'E-mail'/><br></br>
          <input className='field' id = 'mobile'type = 'text' name='mobile' placeholder = 'Contact'/><br></br>
          <input className='field' id = 'userName'type = 'text' name='userName' placeholder = 'Username'/><br></br>
          <input className='field' id = 'password'type = 'text' name='password' placeholder = 'Password'/><br></br>
          <input className='field' id = 'confirmPassword'type = 'text' name='confirmPassword' placeholder = 'Confirm Password'/><br></br>
          <input className = 'submitBtn' type= 'submit' value= 'Sign Up'/><br></br>
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
