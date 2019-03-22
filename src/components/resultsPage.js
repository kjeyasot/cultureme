import React, { Component } from 'react';
import '../App.css';
import * as script from '../scripts';
import { Link ,BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import firebase, { auth, provider, storage, database  } from '../firebase.js';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon,MDBInput } from 'mdbreact';

import * as footer1 from './footer-nav';
import * as navstuffclient from './nav-client';
import StarRatingComponent from 'react-star-rating-component';

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
// const images = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));

let companyName;
let mobile, Description,minPrice, maxPrice, address, serviceType, email, ratingAvg ;
let newState = []
export class resultsPage extends Component {
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
       this.Activate = this.Activate.bind(this);
    
  }
  Activate(e) {
    this.setState ({
      isInEditMode: true
 
    });
  }

  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

 
  componentDidMount() {
    this.hydrateStateWithLocalStorage();
    const clientSearchSP = localStorage.getItem('clientSearchSP');
    const clientSearchSType = localStorage.getItem('clientSearchSType')

    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
        const serviceProvidersRef = firebase.database().ref('serviceProviders').child(clientSearchSP);

        serviceProvidersRef.once('value', (snapshot) => {
            snapshot.child('PersonalInformation').forEach((personalInfo) => {                
              let persInfo = personalInfo.val();
              companyName = persInfo.companyName;
              mobile = persInfo.mobile;
              email = persInfo.email;
            });
            this.setState({
              companyName: companyName,
              mobile: mobile,
              serviceType: clientSearchSType, 
              email: email
            })
        });

        const serviceDetails = firebase.database().ref('serviceProviders').child(clientSearchSP).child('Services').child(clientSearchSType);

        serviceDetails.once('value', (snapshot) => {
          snapshot.child('serviceDetails').forEach((servDetails) => {   
            let servInfo = servDetails.val();
            Description = servInfo.Description;
            minPrice = servInfo.minPrice;
            maxPrice= servInfo.maxPrice;
            address= servInfo.address;
            ratingAvg = servInfo.ratingAvg;
          
          });
          snapshot.child('photos').forEach((servPhotos) => {   
            newState.push({
              key: servPhotos.key,
              url: servPhotos.val().url
            })  
            });
          

          this.setState({
            companyName: companyName,
            Description: Description,
            minPrice: minPrice,
            maxPrice: maxPrice,
            address: address,
            ratingAvg:ratingAvg,
            images: newState
          }) 
    }); 
  }

  updateRating(nextValue) {
    this.hydrateStateWithLocalStorage();
    const clientSearchSP = localStorage.getItem('clientSearchSP');
    const clientSearchSType = localStorage.getItem('clientSearchSType')

    const servPV = {
      rating: nextValue
    }
    const serviceDetails = firebase.database().ref('serviceProviders').child(clientSearchSP).child('Services').child(clientSearchSType);
    serviceDetails.once('value', (snapshot) => {
      snapshot.child('serviceDetails').forEach((servDetails) => {
        const rCount = servDetails.val().ratingCount;
        const rating = servDetails.val().rating;
        if(!rCount){
          servDetails.ref.update({rating : servPV.rating});
          servDetails.ref.update({ratingCount : 1});
          servDetails.ref.update({ratingAvg : servPV.rating});
        }
        if(rCount){
          servDetails.ref.update({ratingCount : rCount+ 1});
          servDetails.ref.update({rating : rating+ servPV.rating});
          var count = rCount +1;
          var ratingg = rating+ servPV.rating;
          servDetails.ref.update({ratingAvg : (ratingg/count).toFixed(0)});
        }
      });      
});
  }


  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
    this.updateRating(nextValue);
    this.setState ({
      isInEditMode: false
 
    });
  }


  render() {
    
    const imgStyle = {
      maxHeight: "150px",
      maxWidth: "150px",
      float:'middle',
      paddingRight: "15px",
      paddingBottom:"20px",
    }
      return (
        <div>
        
        <div>
        <navstuffclient.navstuffclient/>
        
      
            <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
            
            <br></br>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-9">
            {/* User profile */}
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">{this.state.companyName}</h3>
              </div>
              <div className="panel-body">
                {/* <div className="profile__avatar">
                  <img src="https://bootdey.com/img/Content/avatar/avatar5.png" alt="..." />
                </div> */}
                <div className="profile__header">
                  <h4>Service: {this.state.serviceType}</h4>
                  <br></br>

                  <div className>
                  <h5>Client Rating:</h5>
                  {this.state.ratingAvg?
                   <div>
                   <StarRatingComponent 
           name="rate1" 
           className = "starEdit"
           // editing={false}
           starCount={5}
 
           // will come frfom db
           value={this.state.ratingAvg}
         /></div>:null}
                 
   </div>
                 
                  <p style={{ fontSize: "2.5vh", color: "black", textAlign:"left", fontStyle: "normal"}}>

<span>
               
 <div >
   <h5>Service Info: </h5>
  
      <h5 style={{ fontSize: "2.5vh", color: "grey", textAlign:"left"}} className="contentVES" type = 'text'> Description: {this.state.Description}</h5> 
      <br></br>
      <h5 style={{ fontSize: "2.5vh", color: "grey", textAlign:"left"}} className="contentVES" type = 'text'> Price Range: ${this.state.minPrice} - ${this.state.maxPrice}</h5> 
      <br></br>
      <h5 style={{ fontSize: "2.5vh", color: "grey", textAlign:"left"}} className="contentVES" type = 'text'> Location: {this.state.address}</h5> 

      </div>

  </span>


  {/* add */}
                  </p>
                  <p>
                  </p>
                </div>
              </div>
            </div>
            {/* Latest posts */}
            <div className="panel panel-default">
              
              
              <br></br>
                  
                <h5>Portfolio:</h5>
                
                
      {/* <input className = "btnupload" id="input" type="file" onChange={this.handleChanges}/>
      <br></br>
      <br></br>
    <div class="upload-btn-wrapper">
         <button className = "btnupload" onClick={this.storePhoto}>Upload</button>
         </div> */}


{this.state.images.map((image) =>
  <div key={image.key}>
  <h1>{image.file}</h1>
  <div class="row">
      <div class="column">
          <img src={image.url} style={imgStyle}/>
          
       </div>
       </div>
  </div>
)} 
</div>

<br></br>
{/* <Link to="/choose-service">
        <button className="btn btn-pink" onClick={() => window.location.reload(true)} >
                Done
             
          </button>
          </Link> */}
            
          </div>

        
          
          <div className="col-xs-12 col-sm-3">


<div>
<h5>Contact Info </h5>
</div>


            {/* Contact user */}
            <p>
            </p>
            <hr className="profile__contact-hr" />
            {/* Contact info */}
            <div className="profile__contact-info">
              <div className="profile__contact-info-item">
                <div className="profile__contact-info-icon">
                </div>
            
              </div>

   {this.state.user?
      <div className="profile__contact-info-item">
      <div className="profile__contact-info-icon">
        <i className="fa fa-phone" />
      </div>
      <div className="profile__contact-info-body">
        <h5 className="profile__contact-info-heading">Phone Number</h5>
       {this.state.mobile}
      </div>
    </div>
                  
                  :
                  <div>
                    <Link to='/signup-client'>
                  <div className="profile__contact-info-icon">
                  <i className="fa fa-phone" />
                </div>
                </Link>
                <div className="profile__contact-info-body">
                  <h5 className="profile__contact-info-heading">Phone Number</h5>
                </div>
              </div>  
                  
                  
                  }
           
              <br></br>



              <div className="profile__contact-info-item">
                <div className="profile__contact-info-icon">
                
                <br></br>
                  <div className="profile__contact-info-body">
                  <div className="profile__contact-info-icon">
                  {/* <i className="fa fa-map-marker" /> */}
                  
                  {this.state.user?
                  <div>
                  <i className="fa fa-envelope" />
                  <h5 className="profile__contact-info-heading">Email</h5>
                {this.state.email}
                </div>
                  :
                  <div>
                    <Link to='/signup-client'>
                  <i className="fa fa-envelope" />
                  </Link>
                  <h5 className="profile__contact-info-heading">Email</h5>
                {/* {this.state.email} */}
                </div>
                  
                  }
                  
                </div>
              </div>


                  
                </div>
              </div>
              <br></br>
               <div className="profile__contact-info-item">
                <div className="profile__contact-info-icon">
                  {/* <i className="fa fa-phone" /> */}
                </div>
                <div className="profile__contact-info-body">
                  <h5 className="profile__contact-info-heading">Rate Service</h5>
                 
                  {this.state.user && this.state.isInEditMode ?
                   <div>
                   {/* <h5>Rating from state: {rating}</h5> */}
                   <StarRatingComponent 
                     name="rate1" 
                     starCount={5}
                     value={this.state.rating}
                     onStarClick={this.onStarClick.bind(this)}
                   />
                   {/* <button OnClick={this.notActivate}>Submit rating</button> */}
                 </div>
                  :
                  <div>
                  <button onClick={this.Activate}>Rate </button>
                  <StarRatingComponent 
          name="rate1" 
          className = "starEdit"
          // editing={false}
          starCount={5}

          // will come frfom db
          value={this.state.rating}
        /></div>
                  }
                </div>
              </div>
              <br></br>
            </div>
          </div>
        </div>
      </div>
      <div className="spfooter">
        <footer1.footer1/>
        </div>
      </div>
     
    </div>

    );
  };
}