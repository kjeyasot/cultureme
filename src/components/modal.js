import React, { Component } from 'react';
import '../App.css';


export class signInModal extends Component {
   
  render() {
      return (
        <div id = "signIn">
        <div class="fields1-group">
                <p> Sign In</p>
                <input class='field' id = 'userName'type = 'text' name='userName' placeholder = 'Username'/><br></br>
                <input class='field' id = 'password'type = 'text' name='password' placeholder = 'Password'/><br></br>
                <input class = 'submitBtn' type= 'submit' value= 'Sign In'/><br></br>         
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
          <input class='field' id = 'first'type = 'text' name='first' placeholder = 'First Name'/><br></br>
          <input class='field' id = 'last'type = 'text' name='last' placeholder = 'Last Name'/><br></br>
          <input class='field' id = 'email'type = 'text' name='email' placeholder = 'E-mail'/><br></br>
          <input class='field' id = 'mobile'type = 'text' name='mobile' placeholder = 'Contact'/><br></br>
          <input class='field' id = 'userName'type = 'text' name='userName' placeholder = 'Username'/><br></br>
          <input class='field' id = 'password'type = 'text' name='password' placeholder = 'Password'/><br></br>
          <input class='field' id = 'confirmPassword'type = 'text' name='confirmPassword' placeholder = 'Confirm Password'/><br></br>
          <input class = 'submitBtn' type= 'submit' value= 'Sign Up' onclick="span()"/><br></br>
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
          <input class='field' id = 'email'type = 'text' name='email' placeholder = 'E-mail'/><br></br>
          <input class = 'submitBtn' type= 'submit' value= 'Reset Password' onclick="span()"/><br></br>
        </div>  
        
    );
  }
}