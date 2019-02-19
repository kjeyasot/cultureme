import React, { Component } from 'react';
import '../App.css';
import * as script from '../scripts';
import { Link } from 'react-router-dom';
import firebase, { auth, provider } from '../firebase.js';
import CryptoJS from "crypto-js";


const images = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));

export class signIn extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    }
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.readData = this.readData.bind(this);
    this.login = this.login.bind(this); 
    this.logout = this.logout.bind(this); 
  }

  // handleSubmit(e) {
  //   e.preventDefault();
  //   this.props.history.push('/')
  // }

  logout() {
    auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
  }

  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });
  }
  readData() {
    this.state.serviceProviders.map((sevProv) => {
          //  testusername.push(sevProv.userName); 
          //  testemail.push(sevProv.email);
   })
 }

  render() {
      return (
        <div>
        <img className="backgroundImg" alt="img" src={images['wed2.png']} />
        <div id = "myModal" className="signUpMainModal">
            <div className='signUpPageBg'>
            <div className="signUpPageFields">
            <p2> Sign In</p2> <br></br>
            <button onClick={this.login}>
             <img width="20px" alt="Google &quot;G&quot; Logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"/>
             &nbsp;&nbsp;Login with Google
            </button><br></br>
            <input className='field' id = 'userName'type = 'text' name='userName' placeholder = 'Username'/><br></br>
            <input className='field' id = 'password'type = 'text' name='password' placeholder = 'Password'/><br></br>
            <input onClick={this.logout} className = 'submitBtn' type= 'submit' value= 'Sign In'/><br></br>  
          {this.state.user ?this.props.history.push('/'):null}
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
