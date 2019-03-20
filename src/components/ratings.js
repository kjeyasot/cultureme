import React, { Component } from 'react';
import firebase, { auth, provider, storage, database  } from '../firebase.js';
import * as footer1 from './footer-nav';
import * as navstuff from './nav-boots';
import CryptoJS from "crypto-js";
import StarRatingComponent from 'react-star-rating-component';


import * as script from '../scripts';
const images = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));
let firstName;
let lastName;
let email;
let companyName;
let mobile;
let postalCode;
let password;
let disabled;


export class ratings extends React.Component {
    constructor(){
      super()
      this.state = {
        user: null,
        file: null,
        url: [],
        images: [],
        firstName: '',
        lastName: '',
        companyName: '',
        email: '',
        mobile: '',
        postalCode: '',
        password: '',
        answer: '', 
        disabled: "",
        rating: 1
      }
    }


    onStarClick(nextValue, prevValue, name) {
      this.setState({rating: nextValue});
    }

    render() {

      const { rating } = this.state;
      return (
        
      <div className = "moveElements" style={{backgroundColor: "white"}}>

      <div>
      <h5>Rating from state: {rating}</h5>
        <StarRatingComponent 
          name="rate1" 
          className = "starEdit"
          // editing={false}
          starCount={5}

          // will come frfom db
          value={1}
        />
      </div>

        <div>
        <h5>Rating from state: {rating}</h5>
        <StarRatingComponent 
          name="rate1" 
          starCount={5}
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
        />
      </div>
  
       </div> 
      );
    }
  }

