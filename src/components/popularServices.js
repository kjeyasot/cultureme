import React, { Component } from 'react';
import '../App.css';
import * as script from '../scripts';

// const images = script.importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

export class popServ extends Component {
   
  render() {
      return (
        <div>
  
        <p className="popularServ">Popular Services</p>

<div className="break">
<div className="container1">
<img className="imagePop" alt="Avatar" src={images['pic5.jpg']} />
  <div className="overlay">
    <div className="text1">Mehendi</div>
  </div>
</div>

<div className="container1">
<img className="imagePop" alt="Avatar" src={images['pic2.jpg']} />
  <div className="overlay">
    <div className="text1">Bridal Makeup</div>
  </div>
</div>

<div className="container1">
<img className="imagePop" alt="Avatar" src={images['pic4.jpg']} />
  <div className="overlay">
    <div className="text1">Saree Draping</div>
  </div>
</div>

<div className="container1">
<img className="imagePop" alt="Avatar" src={images['hair.jpg']} />
  <div className="overlay">
    <div className="text1">Hair</div>
  </div>
</div>
</div>




</div>






    );
  }
}

