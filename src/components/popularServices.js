import React, { Component } from 'react';
import '../App.css';
import * as script from '../scripts';

const images = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));

export class popServ extends Component {
   
  render() {
      return (
        <div>
   
  <div className="TestimonialBlock">
        <p className="popularServ">Popular Services</p>
        </div>
      
       
<div className="spacePop">
<div className="container1">
<figure>
<img className="imagePop" alt="Avatar" src={images['henna7.png']} />
{/* <figcaption>Mehendi</figcaption> */}
</figure>
  <div className="overlayPop">
    <div className="text1">Mehendi</div>
  </div>
</div>

<div className="container1">
<figure>
<img className="imagePop" alt="Avatar" src={images['makeup4.png']} />
{/* <figcaption>Mehendi</figcaption> */}

</figure>
  <div className="overlayPop">
    <div className="text1">Bridal Makeup</div>
  </div>
</div>

<div className="container1">
<figure>
<img className="imagePop" alt="Avatar" src={images['sareicon.png']} />
{/* <figcaption>Mehendi</figcaption> */}

</figure>
  <div className="overlayPop">
    <div className="text1">Saree Draping</div>
  </div>
</div>

<div className="container1">
<figure>
<img className="imagePop" alt="Avatar" src={images['hairstyle.png']} />
{/* <figcaption>Mehendi</figcaption> */}

</figure>

  <div className="overlayPop">
    <div className="text1">Hair</div>
  </div>
</div>
</div>
</div>



    );
  }
}

