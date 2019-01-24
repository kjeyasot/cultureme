import React, { Component } from 'react';
import '../App.css';
import * as script from '../scripts';
import { Link } from 'react-router-dom';

const images = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));

export class signIn extends Component {
   
  render() {
      return (
        <div>
        <img className="backgroundImg" alt="img" src={images['wed2.png']} />
        <div id = "myModal" className="signUpMainModal">
            <div className='signUpPageBg'>
            <div className="signUpPageFields">
            <p2> Sign In</p2> <br></br>
            <input className='field' id = 'userName'type = 'text' name='userName' placeholder = 'Username'/><br></br>
            <input className='field' id = 'password'type = 'text' name='password' placeholder = 'Password'/><br></br>
            <input className = 'submitBtn' type= 'submit' value= 'Sign In'/><br></br>   
            <Link to="/forgotpassword">
            <u> Forgot Password?</u><br></br>
            </Link>
            <p1>Don't have an account?</p1>
            <Link to="/signup">
            <u id="signUpTxt"> Sign Up </u> 
            </Link>  

            </div>
            </div>
        </div>

        </div>
    );
  }
}
