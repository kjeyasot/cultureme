import React, { Component } from 'react';
import * as script from '../scripts';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
  } from 'react-router-dom';
import Modal from "react-responsive-modal";
import * as modalComp from './modal';
import * as popServ from './popularServices';
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css"
// import "/users/ER/cultureme/node_modules/slick-carousel/slick/slick.css";
// import "/users/ER/cultureme/node_modules/slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import * as testimonials from './testimonials';
import firebase, { auth, provider } from '../firebase.js';
import * as footer1 from './footer-nav';
import * as searchGoogleMaps from './searchGoogleMaps';
import * as servicesList from './Servicelist';
// import '../App.css';

const images1 = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));
  
const images = script.importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));
let num = Object.keys(images).length-1;
var y = Math.floor(num * Math.random());
let dbdata;
let dbkey;
 
export class mainPage extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    }
    this.login = this.login.bind(this); 
    this.logout = this.logout.bind(this); 
    this.readdbData = this.readdbData.bind(this); 
    this.goToSearchResPage = this.goToSearchResPage.bind(this); 

  }

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

 readdbData(email) {
  var user = firebase.auth().currentUser;
  firebase.database().ref().child('serviceProviders').orderByChild('email').equalTo(email).on("value", function(snapshot) {
     dbdata = snapshot.val();
    snapshot.forEach(function(data) {
        dbkey = data.key;
    });
    if(dbkey){
    var fname = dbdata[dbkey].firstName;
    var lname = dbdata[dbkey].lastName;
    
    user.updateProfile({
      displayName: fname + " " + lname,
    })
  }
    
});
}

goToSearchResPage() {
  window.location = "/searchresults";
}

    render(){
        const properties = {
            infinite: true,
            speed: 0,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows:false,
            autoPlay:true,
            autoplaySpeed: 6000,
            initialSlide:y,
              
            };
    return (
      <div> 
      <Slider autoplay="true"  {...properties}>
        <img className="slide" alt="pic12" src={images['pic12.jpg']}/>
        <img className="slide" alt="pic13" src={images['pic13.jpg']}/>
        <img className="slide" alt="pic13" src={images['pic14.png']}/>
        <img className="slide" alt="wed1" src={images['wed1.png']}/>
        <img className="slide" alt="wed3" src={images['wed3.png']}/>
        <img className="slide" alt="wed4" src={images['wed4.png']}/> 
        <img className="slide" alt="wed5" src={images['wed5.png']}/>

        {/* newly added  imags */}
        <img className="slide" alt="h25" src={images['h25.jpg']}/>
        <img className="slide" alt="m31" src={images['m31.jpg']}/>
        <img className="slide" alt="h1" src={images['h1.jpg']}/>
        {/* <img className="slide" alt="s4" src={images['s4.jpg']}/> */}
        <img className="slide" alt="saree3" src={images['saree3.png']}/>
        <img className="slide" alt="holi" src={images['holi.jpg']}/>
      
      </Slider>
      <img className="logoCM" alt="logo" src={images1['logoCM.png']} />
      
      <div>

      <div className="BackSearch"></div>
      <div className="SearchLabelCss"></div>
      <input type="text" className = "searchlabel" value="Search"  readonly="readonly"/>
      
      {/* <input className = "search" type="text" placeholder="Henna, Bridal Makeup.." name="search"/> */}
      {/* <input className = "nearMe" type="text" placeholder="City, Province" name="nearMe"/> */}
      <input type="text" className = "nearMelabel" value="Near"  readonly="readonly"/>
       {/* <Link to="/searchresults"> */}
       <button className = "searchButton"type="submit"  onClick = {this.goToSearchResPage}><i className="fa fa-search"></i></button>
       {/* </Link> */}
       </div>
       {this.state.user ?
       <div className='user-profile'>
       
       {this.readdbData(this.state.user.email)}
        {/* <img src={this.state.user.photoURL} /> */}
        {/* {this.state.user.email} <br></br> */}
        {/* { this.state.user.displayName } */}
        <button className="signInBtn" onClick={this.logout}>Logout</button>
      </div>:
      <div>
        <Link to="/signin">
        <button className="signInBtn">Sign In</button>
        </Link>
        <Link to="/signup-client">
        <button className="signUpBtn">Sign Up</button>
        </Link>

         <Link to="/signInSP">
        <button className="PSBtn">Provide a Service</button>
        </Link>

        </div>
        }
              <div style={{ fontSize: "1.5vmax",fontFamily:"Arial", position:"absolute", top: '37vh',
  left: '30vw', width:'40vw' }}>
&nbsp;&nbsp;  <servicesList.servicesList/>
</div>
  <div style={{ fontSize: "1.5vmax",fontFamily:"Arial", position:"absolute", top: '37vh',
  left: '53vw' }}>
  &nbsp; &nbsp;  <searchGoogleMaps.searchGoogleMaps/>  
</div>
{/* <div style={{ fontSize: "1.5vmax",fontFamily:"Arial", position:"absolute", top: '7.5vh',
  right: '25vw' }}>
<button className = "searchButtonN1"type="submit" onClick={this.showServiceDetails}><i className="fa fa-search"></i></button>

</div> */}
      
        <popServ.popServ/>
        <testimonials.testimonials/>
    <div className="mainpagefooter">
        <footer1.footer1/>
        </div>
      </div>

      
     );
         }
       }