import React, { Component } from 'react';
import '../App.css';
import * as script from '../scripts';
import { Link } from 'react-router-dom';
import firebase from '../firebase.js';
import CryptoJS from "crypto-js";
// var CryptoJS = require("crypto-js");

const images = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));

export class signUpClient extends Component {
    constructor() {
        super();
        this.state = {
          firstName: '',
          lastName: '',
          email: '',
          mobile: '',
          userName: '',
          password: '',
          confirmPassword: '',
          clients: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
      }
      handleSubmit(e) {
        e.preventDefault();
        const clientsRef = firebase.database().ref('clients');
        const tempPw = CryptoJS.AES.encrypt(this.state.password, 'secret key 123');
        // const test = CryptoJS.AES.decrypt(tempPw.toString(), 'secret key 123');
        // const pw = test.toString(CryptoJS.enc.Utf8);
        const pw = tempPw.toString();

        const clients = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          mobile: this.state.mobile,
          userName: this.state.userName,
          password: pw,
        //   confirmPassword: this.state.confirmPassword,
        }
        clientsRef.push(clients);
        this.setState({
          firstName: '',
          lastName: '',
          email: '',
          mobile: '',
          userName: '',
          password: '',
          confirmPassword: ''
        });
      }
      componentDidMount() {
        const clientsRef = firebase.database().ref('clients');
        clientsRef.on('value', (snapshot) => {
          let clients = snapshot.val();
          let newState = [];
          for (let client in clients) {
            newState.push({
            id: client,
            firstName: clients[client].firstName,
            lastName: clients[client].lastName,
            email: clients[client].email,
            mobile: clients[client].mobile,
            userName: clients[client].userName,
            password: clients[client].password,
            confirmPassword: clients[client].confirmPassword,
            });
          }
          this.setState({
            clients: newState
          });
        });
        
      }
      removeClient(clientId) {
        const clientsRef = firebase.database().ref(`/clients/${clientId}`);
        clientsRef.remove();
      }
      
  render() {
      
      return (
        <div>
        <img className="backgroundImg" alt="img" src={images['wed2.png']} />
        <div id = "myModal" className="signUpMainModal">
            <div className='signUpPageBg'>
            <div className="signUpPageFields">

            <p2> Sign Up</p2><br></br>
            <form onSubmit={this.handleSubmit}>
            <input className='field' id = 'first'type = 'text' name='firstName' placeholder = 'First Name' onChange={this.handleChange} value={this.state.firstName}/><br></br>
            <input className='field' id = 'last'type = 'text' name='lastName' placeholder = 'Last Name' onChange={this.handleChange} value={this.state.lastName}/><br></br>
            <input className='field' id = 'email'type = 'text' name='email' placeholder = 'E-mail' onChange={this.handleChange} value={this.state.email}/><br></br>
            <input className='field' id = 'mobile'type = 'text' name='mobile' placeholder = 'Contact' onChange={this.handleChange} value={this.state.mobile}/><br></br>
            <input className='field' id = 'userName'type = 'text' name='userName' placeholder = 'Username' onChange={this.handleChange} value={this.state.userName}/><br></br>
            <input className='field' id = 'password'type = 'password' name='password' placeholder = 'Password' onChange={this.handleChange} value={this.state.password}/><br></br>
            <input className='field' id = 'confirmPassword'type = 'password' name='confirmPassword' placeholder = 'Confirm Password' onChange={this.handleChange} value={this.state.confirmPassword}/><br></br>
            <input className = 'submitBtn' type= 'submit' value= 'Sign Up'/><br></br>
            </form>
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
