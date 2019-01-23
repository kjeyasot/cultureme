import React, { Component } from 'react';
import '../App.css';
import * as script from '../scripts';
import { Link } from 'react-router-dom';


const images = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));

export class signUpPage extends Component {
   
  render() {
      return (
          <div>
        <img className="backgroundImg" alt="img" src={images['wed2.png']} />
        <div id = "myModal" className="signUpMainModal">
            <div className='signUpPageBg'>
                <div className="signUpPageFields">
                <img className="popupLogo" alt="logo" src={images['blackLogo.png']} /> <br></br>
                <p2> Join CultureMe</p2><br></br>
                <Link to="/signup-serviceprovider">
                <input className = 'submitBtn' type= 'submit' value= 'Providing a Service?'/>
                </Link>                
                <input className = 'submitBtn' type= 'submit' value= 'Looking for a Service?' onclick="span()"/><br></br>
                <p1>Already have an account?</p1>
                <u id="signInTxt"> Sign In</u>
            </div>
            </div>

        </div>
        </div>
    );
  }
}
