import React, { Component } from 'react';
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../App.css';

export class signInModal extends Component {
   
  render() {
      return (
        <div id = "signIn" class="modal">
        <div class="fields1-group">
                <p> Sign In</p>
                <input class='field' id = 'userName'type = 'text' name='userName' placeholder = 'Username'/><br></br>
                <input class='field' id = 'password'type = 'text' name='password' placeholder = 'Password'/><br></br>
                <input class = 'submitBtn' type= 'submit' value= 'Sign In'/><br></br>
                <u> Forgot Password?</u><br></br>
                <p1>Don't have an account?</p1>
                
                <u id="signUpTxt" onclick="signInsignUp()"> Sign Up </u> 
                
        </div>  
        </div>        

    );
  }
}

export class signUpModal extends Component {
   
  render() {
      return (
        <div id = "signUp" class="modal">
        
        <div class="fields1-group">
                        <p> Sign Up</p>
                        <input class='field' id = 'first'type = 'text' name='first' placeholder = 'First Name'/><br></br>
                        <input class='field' id = 'last'type = 'text' name='last' placeholder = 'Last Name'/><br></br>
                        <input class='field' id = 'email'type = 'text' name='email' placeholder = 'E-mail'/><br></br>
                        <input class='field' id = 'mobile'type = 'text' name='mobile' placeholder = 'Contact'/><br></br>
                        <input class='field' id = 'userName'type = 'text' name='userName' placeholder = 'Username'/><br></br>
                        <input class='field' id = 'password'type = 'text' name='password' placeholder = 'Password'/><br></br>
                        <input class='field' id = 'confirmPassword'type = 'text' name='confirmPassword' placeholder = 'Confirm Password'/><br></br>
                        <input class = 'submitBtn' type= 'submit' value= 'Sign Up' onclick="span()"/><br></br>

                        <u> Forgot Password?</u><br></br>
                        <p1>Already have an account?</p1>
                        
                        <u id="signInTxt" onclick="signInsignUp()"> Sign In</u> 
                        
        </div>  
        </div>     
    );
  }
}
