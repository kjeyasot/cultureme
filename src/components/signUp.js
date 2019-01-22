import React, { Component } from 'react';
import '../App.css';
import * as script from '../scripts';

const images = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));

export class signUpPage extends Component {
   
  render() {
      return (
          <div>
        <img className="backgroundImg" alt="img" src={images['wed2.png']} />
        <div id = "myModal" className="signUpMainModal">
            <div className='signUpPageBg'>
                <div className="signUpPageFields">
                <img className="logoXXX" alt="logo" src={images['logoBlack.png']} />
                <p2> Join CultureMe</p2><br></br>
                <input className = 'submitBtn' type= 'submit' value= 'Providing a Service?' onclick="span()"/>
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
