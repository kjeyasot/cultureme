import React, { Component } from 'react';
import '../App.css';
import * as script from '../scripts';
import { Link } from 'react-router-dom';
import firebase, { auth, provider } from '../firebase.js';
import CryptoJS from "crypto-js";

const images = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));

export class aboutUs extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      user: null,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });
  }

  render() {
      return (

        <section class="mb-4">

        <h2 class="h1-responsive font-weight-bold text-center my-4">Contact us</h2>
    <p class="text-center w-responsive mx-auto mb-5">Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within
        a matter of hours to help you.</p>
        
        
        </section>

    );
  }
}
