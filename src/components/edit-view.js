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
import StarRatingComponent from 'react-star-rating-component';

let companyName;
let mobile, Description,minPrice, maxPrice, address, serviceType, email, ratingAvg ;
let newState = []
export class editView extends Component {
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
      ratingAvg: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChanges = this.handleChanges.bind(this);
    this.storePhoto = this.storePhoto.bind(this)
    // this.refresh = this.refresh.bind(this);
    this.Activate = this.Activate.bind(this); 
    this.userUpdate = this.userUpdate.bind(this); 
    this.userIntUpdate = this.userIntUpdate.bind(this); 
    this.deletePhoto = this.deletePhoto.bind(this)
    this.handleChangess = this.handleChangess.bind(this);
    this.goToChooseServPage = this.goToChooseServPage.bind(this);

    
  }
  handleChangess = address => {
    this.setState({ address });
  };
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

  handleChanges(e) {
    this.setState({
      file: e.target.files[0],
      url: URL.createObjectURL(e.target.files[0])
    })
  }

  storePhoto() {
    const data = localStorage.getItem('myData')
      auth.onAuthStateChanged((user) => {
          if (user) {
            this.setState({ user });
            var uid = user.uid;
    const key = database.ref('serviceProviders').child(uid).child('Services').child(data).child('photos').push().key
    const img = storage.ref().child('Images').child(uid).child(key)
  

  img.put(this.state.file).then((snap) => {
      storage.ref().child('Images').child(uid).child(img.name).getDownloadURL().then(url => {
        database.ref('serviceProviders').child(uid).child('Services').child(data).child('photos').child(key).set({
        "url" : url
      })
    })
    })

    this.setState({
      file: null,
      url: null,
    })
  }
 
})
}

  componentDidMount() {
    this.hydrateStateWithLocalStorage();
    const data = localStorage.getItem('myData')
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        const serviceProvidersRef = firebase.database().ref('serviceProviders').child(user.uid);

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
              serviceType: data, 
              email: email
            })
        });

        const serviceDetails = firebase.database().ref('serviceProviders').child(user.uid).child('Services').child(data);

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
    const ref = database.ref('serviceProviders').child(user.uid).child('Services').child(data).child('photos')

    ref.on('child_added', (child) => {
      let images = this.state.images.slice()
      images.push({
        key: child.key,
        url: child.val().url
      })
      this.setState({images})
    })
    ref.on('child_removed', (child) => {
      let images = this.state.images.filter((image) => {
        return image.url != child.val().url
      })
      this.setState({images})
    })
  }
  });
  
    
  }


  userIntUpdate() {
    this.hydrateStateWithLocalStorage();
    const data = localStorage.getItem('myData')
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        const serviceProvidersRef = firebase.database().ref('serviceProviders').child(user.uid);

        serviceProvidersRef.once('value', (snapshot) => {
            snapshot.child('PersonalInformation').forEach((personalInfo) => {                
              let persInfo = personalInfo.val();
              companyName = persInfo.companyName;
              mobile = persInfo.mobile;
            });
            this.setState({
              companyName: companyName,
              mobile: mobile,
              isInEditMode: false

            })
        });

        const serviceDetails = firebase.database().ref('serviceProviders').child(user.uid).child('Services').child(data);

        serviceDetails.once('value', (snapshot) => {
          snapshot.child('serviceDetails').forEach((servDetails) => {   
            let servInfo = servDetails.val();
            Description = servInfo.Description;
            minPrice = servInfo.minPrice;
            maxPrice= servInfo.maxPrice;
            address= servInfo.address;
            

          });
          

          this.setState({
            companyName: companyName,
            Description: Description,
            minPrice: minPrice,
            maxPrice: maxPrice,
            address: address,
          
          })
     
      
      
    });
  }
  });


  }
  
 
 Activate(e) {
   this.setState ({
     isInEditMode: true

   });

  
  }
  userUpdate() {
    this.hydrateStateWithLocalStorage();

    const data = localStorage.getItem('myData')

    auth.onAuthStateChanged((user) => {
      if (user) {
        const servPV = {
          Description: this.state.Description,
          minPrice: this.state.minPrice,
          maxPrice: this.state.maxPrice,
          address: this.state.address,
        
        }
        const serviceDetails = firebase.database().ref('serviceProviders').child(user.uid).child('Services').child(data);

        serviceDetails.once('value', (snapshot) => {
          snapshot.child('serviceDetails').forEach((servDetails) => { 
            servDetails.ref.update(servPV);
          });      
    });
    this.setState ({
      isInEditMode: false
 
    });
        
            }
    })
   
          }

   handleChange(e) {
 
    if(e.target.name==='maxPrice'){
      
      const maxPrice = (e.target.validity.valid) ? e.target.value : this.state.maxPrice;
      this.setState({ maxPrice});

    }
    if(e.target.name==='minPrice'){
      const minPrice = (e.target.validity.valid) ? e.target.value : this.state.minPrice;
      this.setState({ minPrice});

    }
  

  if(e.target.name==='Description'){
    this.setState({
     Description: e.target.value
    });
  }
  }

  deletePhoto(event) {
    this.hydrateStateWithLocalStorage();
    const data = localStorage.getItem('myData');
    let uid = this.state.user.uid;
    let img = event.target.name;
    storage.ref().child('Images').child(uid).child(img).delete();
    firebase.database().ref('serviceProviders').child(uid).child('Services').child(data).child('photos').child(img).remove();

  }

  goToChooseServPage() {
    window.location = "/choose-service";
  }

  render() {

    
    const imgStyle = {
      maxHeight: "150px",
      maxWidth: "150px",
      float:'middle',
      paddingRight: "15px",
      paddingBottom:"20px",
      marginTop:"-20px"
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
                  <br></br>
                 
                  <p style={{ fontSize: "2.5vh", color: "black", textAlign:"left", fontStyle: "normal"}}>
                    {/* {this.state.Description} <br></br>
                    Min Price: {this.state.minPrice}
                    Max Price: {this.state.maxPrice} */}


{/* add */}

<span>
                    {!this.state.isInEditMode? 
 <div >
   <h5>Service Info: <span class="fas fa-pen" onClick={this.Activate} ></span> </h5>
  
      <h5 style={{ fontSize: "2.5vh", color: "grey", textAlign:"left"}} className="contentVES" type = 'text'> Description: {this.state.Description}</h5> 
      <br></br>
      <h5 style={{ fontSize: "2.5vh", color: "grey", textAlign:"left"}} className="contentVES" type = 'text'> Price Range: ${this.state.minPrice} - ${this.state.maxPrice}</h5> 
      <br></br>
      <h5 style={{ fontSize: "2.5vh", color: "grey", textAlign:"left"}} className="contentVES" type = 'text'> Location: {this.state.address}</h5> 

      </div>
:
<div>
      <div className="edit">
      <h5> Service Info: &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; 
    <button class="fas fa-check"  onClick={this.userUpdate} disabled={!this.state.Description||!this.state.serviceType||!this.state.minPrice||!this.state.maxPrice||!this.state.address|| Number(this.state.minPrice)>= Number(this.state.maxPrice)}> </button>  &nbsp;&nbsp;
    <i class="fa fa-times" onClick={this.userIntUpdate}></i> </h5>
    </div>
    <br></br>

 <MDBContainer>
       <MDBRow>
        <MDBCol md="" text-center>

    <MDBInput 
      label="Description" 
      outline icon="pen-nib" 
      style={{ paddingBottom: "3vh"}}
      className = "p-3 black-text"
      name='Description' 
      type="textarea"
      onChange={this.handleChange} 
      value={this.state.Description}
      />
    
    <MDBRow>
         <MDBCol md="6">
      <MDBInput 
      name='minPrice'  
      label="Min Price" 
      outline icon="comment-dollar" 
      style={{ paddingBottom: "3vh"}}
      className = "p-3 black-text "
      pattern="[0-9]*" 
      maxlength="4"
      onChange={this.handleChange} 
      value={this.state.minPrice}
      />
     
      </MDBCol>
      
      <MDBCol md="6">
   
      <MDBInput 
      name='maxPrice'  
      label="Max Price" 
      outline icon="comment-dollar" 
      style={{ paddingBottom: "3vh"}}
      className = "p-3 black-text "
      pattern="[0-9]*" 
      maxlength="4"
      onChange={this.handleChange} 
      value={this.state.maxPrice}
      />
      </MDBCol>


</MDBRow>
 
    {/* <input  className="contentVE" name="minPrice" id="minPrice" type="text" pattern="[0-9]*" maxlength="4"  onChange={this.handleChange} value={this.state.minPrice}/>
    <input  className="contentVE" name="maxPrice" id="maxPrice" type="text" pattern="[0-9]*" maxlength="4" value={this.state.maxPrice} onChange={this.handleChange}/><br></br> */}
    {( this.state.minPrice && this.state.maxPrice && Number(this.state.minPrice)>= Number(this.state.maxPrice))? <p id="letter" className="invalid">Invalid Price Range</p>:null}

    {/* <input  className="contentVE" id="city" type="text" value={this.state.city} onChange={this.handleChange}/> */}
    {/* <input  className="contentVE" id="state" type="text" value={this.state.state} onChange={this.handleChange}/> */}

  <PlacesAutocomplete
  
        value={this.state.address}
        onChange={this.handleChangess}
        onSelect={this.handleSelect}
        searchOptions={{types: ['(cities)'],
        componentRestrictions: {country: "ca"}}}
      >
        {({getInputProps, suggestions, getSuggestionItemProps,loading }) => (
          <div>
            <MDBInput
            label="Location" 
            style={{ paddingBottom: "3vh"}}
            outline icon="location-arrow"
              {...getInputProps({
                placeholder: 'Location',
                className: 'location-search-input p-3 black-text',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>

</MDBCol>
      </MDBRow>
    </MDBContainer>
</div>
  }
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
                
                
      <input className = "btnupload" id="input" type="file" onChange={this.handleChanges}/>
      <br></br>
      <br></br>
    <div class="upload-btn-wrapper">
         <button className = "btnupload" onClick={this.storePhoto}>Upload</button>
         </div>

<MDBContainer className="mt-5">
        <MDBRow>
{this.state.images.map((image) =>
  
  
  <div key={image.key}>
  <h1>{image.file}</h1>
  
      <MDBCol lg="4" md="12" className="mb-4">
      <MDBBtn className = "removeButton btn btn-red btn-rounded" onClick={this.deletePhoto} 
            name={image.key}> X
            </MDBBtn>
          <img src={image.url} style={imgStyle}/>
       

        </MDBCol>
    
  </div>
  
)} 
 </MDBRow>
      </MDBContainer>


</div>

<br></br>
<div className="text-left py-4">
{/* <Link to="/choose-service"> */}
        <MDBBtn className="btn btn-pink" onClick={this.goToChooseServPage} >
                Done
                <MDBIcon far icon="angle-double-right" className="ml-2 fas fa-check"/>
          </MDBBtn>
          {/* </Link> */}
         </div>   
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
                  {this.state.mobile}
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
                  {this.state.email}
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