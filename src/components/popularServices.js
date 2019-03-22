import React, { Component } from 'react';
import '../App.css';
import * as script from '../scripts';
import { Link ,BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const images = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));

export class popServ extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      user: null,
      serviceType: '',
      companyName: '',
      mobile:'',
      Description: '',
      minPrice : '',
      maxPrice: '',
      address: '',
      file: null,
      url: [],
      // province: '',
      images: [],
      isInEditMode:false,
      rating: '',
      ratingAvg: '',
      ratingCount: ''

    }
      //  this.Activate = this.Activate.bind(this);
    
  }
showServ1(){
  localStorage.setItem('servicetypesss', 'henna');
  localStorage.removeItem('addresqs');

}
showServ2(){
  localStorage.setItem('servicetypesss', 'makeup');
  localStorage.removeItem('addresqs');

}

showServ3(){
  localStorage.setItem('servicetypesss', 'Saree Draping');
  localStorage.removeItem('addresqs');

}

showServ4(){
  localStorage.setItem('servicetypesss', 'Hair');
  localStorage.removeItem('addresqs');

}

  render() {
      return (
        <div>
   
  <div className="TestimonialBlock">
        <p className="popularServ">Popular Services</p>
        </div>
      
       
<div className="spacePop">
<Link to= '/searchresults'>
<div className="container1" onClick = {this.showServ1}>
<figure>
<img className="imagePop" alt="Avatar" src={images['henna7.png']} />
{/* <figcaption>Mehendi</figcaption> */}
</figure>
  <div className="overlayPop">
    <div className="text1">Henna</div>
  </div>
</div>
</Link>

<Link to= '/searchresults'>
<div className="container1" onClick = {this.showServ2}>
<figure>
<img className="imagePop" alt="Avatar" src={images['makeup4.png']} />
{/* <figcaption>Mehendi</figcaption> */}

</figure>
  <div className="overlayPop">
    <div className="text1">Bridal Makeup</div>
  </div>
</div>
</Link>


<Link to= '/searchresults'>
<div className="container1" onClick = {this.showServ3}>
<figure>
<img className="imagePop" alt="Avatar" src={images['sareicon.png']} />
{/* <figcaption>Mehendi</figcaption> */}

</figure>
  <div className="overlayPop">
    <div className="text1">Saree Draping</div>
  </div>
</div>
</Link>


<Link to= '/searchresults'>
<div className="container1" onClick = {this.showServ4}>
<figure>
<img className="imagePop" alt="Avatar" src={images['hairstyle.png']} />
{/* <figcaption>Mehendi</figcaption> */}

</figure>

  <div className="overlayPop">
    <div className="text1">Hair</div>
  </div>
</div>
</Link>
</div>
</div>



    );
  }
}

