import React, { Component } from 'react';
import '../App.css';
import * as script from '../scripts';

// const images = script.importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

export class popServ extends Component {
   
  render() {
      return (
        <div>
        {/* <img className="slide" alt="bridal" src={images['bridal.jpg']}/>
        <img className="slide" alt="henna" src={images['henna.jpg']} />
        <img className="slide" alt="hair" src={images['hair.jpg']} />
        <img className="slide" alt="pic1" src={images['pic1.jpg']}/>
        <img className="slide" alt="pic2" src={images['pic2.jpg']}/>
        <img className="slide" alt="pic3" src={images['pic3.jpg']}/>
        <img className="slide" alt="pic4" src={images['pic4.jpg']}/>
        <img className="slide" alt="pic5" src={images['pic5.jpg']}/>
        <img className="logoCM" alt="logo" src={images['logoCM.png']} /> */}
        <p className="popularServ">Popular Services</p>
        </div>
    );
  }
}

