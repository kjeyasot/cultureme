import React, { Component } from 'react';
import '../App.css';
import * as script from '../scripts';
import { Link ,BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import firebase, { auth, provider, storage, database  } from '../firebase.js';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon,MDBInput } from 'mdbreact';

import * as footer1 from './footer-nav';
import * as navstuff from './nav-boots';

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
// const images = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));

let companyName;
let mobile, Description,minPrice, maxPrice, address, serviceType, email ;
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
      isInEditMode:false
    }
    // this.handleChange = this.handleChange.bind(this);
    // this.handleChanges = this.handleChanges.bind(this);
    // this.storePhoto = this.storePhoto.bind(this)
    // this.refresh = this.refresh.bind(this);
    // this.Activate = this.Activate.bind(this); 
    // this.userUpdate = this.userUpdate.bind(this); 
    // this.userIntUpdate = this.userIntUpdate.bind(this); 
    // this.deletePhoto = this.deletePhoto.bind(this)
    // this.handleChangess = this.handleChangess.bind(this);

    
  }
  // handleChangess = address => {
  //   this.setState({ address });
  // };
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

  // handleChanges(e) {
  //   this.setState({
  //     file: e.target.files[0],
  //     url: URL.createObjectURL(e.target.files[0])
  //   })
  // }

//   storePhoto() {
//     const data = localStorage.getItem('myData')
//       auth.onAuthStateChanged((user) => {
//           if (user) {
//             this.setState({ user });
//             var uid = user.uid;
//     const key = database.ref('serviceProviders').child(uid).child('Services').child(data).child('photos').push().key
//     const img = storage.ref().child('Images').child(uid).child(key)
  

//   img.put(this.state.file).then((snap) => {
//       storage.ref().child('Images').child(uid).child(img.name).getDownloadURL().then(url => {
//         database.ref('serviceProviders').child(uid).child('Services').child(data).child('photos').child(key).set({
//         "url" : url
//       })
//     })
//     })

//     this.setState({
//       file: null,
//       url: null,
//     })
//   }
 
// })
// }

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
          
            images: newState
          })
     
      
      
    });
    // const ref = database.ref('serviceProviders').child(user.uid).child('Services').child(data).child('photos')

    // ref.on('child_added', (child) => {
    //   let images = this.state.images.slice()
    //   images.push({
    //     key: child.key,
    //     url: child.val().url
    //   })
    //   this.setState({images})
    // })
    // ref.on('child_removed', (child) => {
    //   let images = this.state.images.filter((image) => {
    //     return image.url != child.val().url
    //   })
    //   this.setState({images})
    // })
  
  
  
    
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
        <navstuff.navstuff/>
        
      
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
   <i class="fa fa-star checked"></i>
   <i class="fa fa-star checked"></i>
   <i class="fa fa-star checked"></i>
   <i class="fa fa-star checked"></i>
   <i class="fa fa-star checked"></i>
   </div>
                  <br></br>
                 
                  <p style={{ fontSize: "2.5vh", color: "black", textAlign:"left", fontStyle: "normal"}}>
                    {/* {this.state.Description} <br></br>
                    Min Price: {this.state.minPrice}
                    Max Price: {this.state.maxPrice} */}


{/* add */}

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

  
              <div className="profile__contact-info-item">
                <div className="profile__contact-info-icon">
                  <i className="fa fa-phone" />
                </div>
                <div className="profile__contact-info-body">
                  <h5 className="profile__contact-info-heading">Phone Number</h5>
                  {this.state.user?
                  this.state.mobile
                  :null}
                </div>
              </div>
              <br></br>



              <div className="profile__contact-info-item">
                <div className="profile__contact-info-icon">
                
                <br></br>
                  <div className="profile__contact-info-body">
                  <div className="profile__contact-info-icon">
                  {/* <i className="fa fa-map-marker" /> */}
                  <i className="fa fa-envelope" />
                  <h5 className="profile__contact-info-heading">Email</h5>
                  {this.state.user?
                 this.state.email
                  :null}
                  
                </div>
              </div>


                  
                </div>
              </div>
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