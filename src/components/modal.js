import React, { Component } from 'react';
import '../App.css';


export class signInModal extends Component {
   
  render() {
      return (
        <div id = "signIn">
        <div className="fields1-group">
                <p> Sign In</p>
                <input className='field' id = 'userName'type = 'text' name='userName' placeholder = 'Username'/><br></br>
                <input className='field' id = 'password'type = 'text' name='password' placeholder = 'Password'/><br></br>
                <input className = 'submitBtn' type= 'submit' value= 'Sign In'/><br></br>         
        </div>  
        </div>        

    );
  }
}

export class signUpModal extends Component {
   
  render() {
      return (
        <div id = "signUp" >
          <p> Sign Up</p>
          <input className='field' id = 'first'type = 'text' name='first' placeholder = 'First Name'/><br></br>
          <input className='field' id = 'last'type = 'text' name='last' placeholder = 'Last Name'/><br></br>
          <input className='field' id = 'email'type = 'text' name='email' placeholder = 'E-mail'/><br></br>
          <input className='field' id = 'mobile'type = 'text' name='mobile' placeholder = 'Contact'/><br></br>
          <input className='field' id = 'userName'type = 'text' name='userName' placeholder = 'Username'/><br></br>
          <input className='field' id = 'password'type = 'text' name='password' placeholder = 'Password'/><br></br>
          <input className='field' id = 'confirmPassword'type = 'text' name='confirmPassword' placeholder = 'Confirm Password'/><br></br>
          <input className = 'submitBtn' type= 'submit' value= 'Sign Up' onclick="span()"/><br></br>
        </div>  
        
    );
  }
}

export class forgotPwModal extends Component {
   
  render() {
      return (
        <div id = "forgotPw" >
          <p> Forgot Password</p>
          <p1>Please enter your email address and we will send you an email about how to reset your password.</p1><br></br>
          <input className='field' id = 'email'type = 'text' name='email' placeholder = 'E-mail'/><br></br>
          <input className = 'submitBtn' type= 'submit' value= 'Reset Password' onclick="span()"/><br></br>
        </div>  
        
    );
  }
}