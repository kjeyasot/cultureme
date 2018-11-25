import React, { Component } from 'react';
import '../App.css';
import * as script from '../scripts';

const images = script.importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

export class imagesList extends Component {
   
  render() {
      return (
        <div>
        <img className="slide" alt="bridal" src={images['bridal.jpg']}/>
        <img className="slide" alt="henna" src={images['henna.jpg']} />
        <img className="slide" alt="hair" src={images['hair.jpg']} />
        <img className="logoCM" alt="logo" src={images['logoCM.png']} />
        </div>
    );
  }
}


