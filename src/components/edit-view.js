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
      isInEditMode:false
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
        <Link to="/choose-service">
        <button className="btn btn-pink" onClick={() => window.location.reload(true)} >
                Done
             
          </button>
          </Link>
        <h3 className="HeadingVE" > {this.state.companyName}</h3>
     <h5  className="contentVE"  type="text" >{this.state.mobile}</h5>
     <h5  className="contentVE"  type="text" >{this.state.serviceType}</h5>
     {/* <h5 className="contentVE" name="serviceType" id="serviceType" pattern ="[A-Za-z\s]*" maxlength="30" type="text" value= /> */}


     <input className = "btnupload" id="input" type="file" onChange={this.handleChanges}/>
    
    <div class="upload-btn-wrapper">
         <button className = "btnupload" onClick={this.storePhoto}>Upload</button>
         </div>
  
   <div className="symbols">
   <i class="fa fa-star checked"></i>
   <i class="fa fa-star checked"></i>
   <i class="fa fa-star checked"></i>
   <i class="fa fa-star checked"></i>
   <i class="fa fa-star checked"></i>
   </div>

      <div class = "moveElements">
            
           
            <form>
         
            
 {!this.state.isInEditMode? 
 <div>
   <h5>Service Info: </h5>
      <span class="fas fa-pen" onClick={this.Activate} > <h5>Service Info:</h5></span>
      <h5 className="contentVES" type = 'text'> {this.state.Description}</h5> 
      <h5 className="contentVES" type = 'text'> {this.state.minPrice} - {this.state.maxPrice}</h5> 
      <h5 className="contentVES" type = 'text'> {this.state.address}</h5> 

      </div>
:
<div>
      <div className="edit">
    
     &nbsp;&nbsp;<button class="fas fa-check"  onClick={this.userUpdate} disabled={!this.state.Description||!this.state.serviceType||!this.state.minPrice||!this.state.maxPrice||!this.state.address|| Number(this.state.minPrice)>= Number(this.state.maxPrice)}> </button>  &nbsp;&nbsp;
    <i class="fa fa-times" onClick={this.userIntUpdate}></i>
    </div>
    
    <input  className="contentVE" name = "Description" id="Description" type="text" value={this.state.Description} onChange={this.handleChange}/><br></br>
    <input  className="contentVE" name="minPrice" id="minPrice" type="text" pattern="[0-9]*" maxlength="4"  onChange={this.handleChange} value={this.state.minPrice}/>
    <input  className="contentVE" name="maxPrice" id="maxPrice" type="text" pattern="[0-9]*" maxlength="4" value={this.state.maxPrice} onChange={this.handleChange}/><br></br>
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
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
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


</div>
  }
 
 
  
    {this.state.images.map((image) =>
           <div key={image.key}>
           <h1>{image.file}</h1>
           <div class="row">
               <div class="column">
             <img src={image.url} style={imgStyle}/>
             <button className = "removeButton" onClick={this.deletePhoto} 
                name={image.key}>X</button>

                            </div>
             </div>
           </div>
         )} 
         {/* <Link to="/choose-service">    */}
         
        
          {/* </Link> */}
               
              </form>

            
     
      </div>

    <div className="spfooter">
        <footer1.footer1/>
        </div>
        </div>
       




    
    
    <div>
         
      
            <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
            <navstuff.navstuff/>
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
                    {!this.state.isInEditMode? 
 <div >
   <h5>Service Info: <span class="fas fa-pen" onClick={this.Activate} ></span> </h5>
  
      <h5 style={{ fontSize: "2.5vh", color: "grey", textAlign:"left"}} className="contentVES" type = 'text'> Description: {this.state.Description}</h5> 
      <br></br>
      <h5 style={{ fontSize: "2.5vh", color: "grey", textAlign:"left"}} className="contentVES" type = 'text'> Min Price - Max Price: ${this.state.minPrice} - ${this.state.maxPrice}</h5> 
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
    <span><label>Description:</label>
    <textarea  style={{ fontSize: "2vh", color: "black", fontStyle: "normal", width: "35vw"}} className="contentVE" name = "Description" id="Description" type="text" value={this.state.Description} onChange={this.handleChange}/><br></br>
    </span>
    <div> <label>Min Price:</label> <input  style={{ fontSize: "2vh", color: "black", fontStyle: "normal"}} className="contentVE" name="minPrice" id="minPrice" type="text" pattern="[0-9]*" maxlength="4"  onChange={this.handleChange} value={this.state.minPrice}/></div>

    <div><label>Min Price:</label> <input  style={{ fontSize: "2vh", color: "black", fontStyle: "normal"}} className="contentVE" name="maxPrice" id="maxPrice" type="text" pattern="[0-9]*" maxlength="4" value={this.state.maxPrice} onChange={this.handleChange}/></div>
 
    {/* <input  className="contentVE" name="minPrice" id="minPrice" type="text" pattern="[0-9]*" maxlength="4"  onChange={this.handleChange} value={this.state.minPrice}/>
    <input  className="contentVE" name="maxPrice" id="maxPrice" type="text" pattern="[0-9]*" maxlength="4" value={this.state.maxPrice} onChange={this.handleChange}/><br></br> */}
    {( this.state.minPrice && this.state.maxPrice && Number(this.state.minPrice)>= Number(this.state.maxPrice))? <p id="letter" className="invalid">Invalid Price Range</p>:null}

    {/* <input  className="contentVE" id="city" type="text" value={this.state.city} onChange={this.handleChange}/> */}
    {/* <input  className="contentVE" id="state" type="text" value={this.state.state} onChange={this.handleChange}/> */}
  
  <div>
  <i 
  class="fas fa-location-arrow" >
  
  </i>
  <label>Address</label>

</div>

  <PlacesAutocomplete
  
        value={this.state.address}
        onChange={this.handleChangess}
        onSelect={this.handleSelect}
        searchOptions={{types: ['(cities)'],
        componentRestrictions: {country: "ca"}}}
      >
        {({getInputProps, suggestions, getSuggestionItemProps,loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
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
    <div class="upload-btn-wrapper">
         <button className = "btnupload" onClick={this.storePhoto}>Upload</button>
         </div>


{this.state.images.map((image) =>
  <div key={image.key}>
  <h1>{image.file}</h1>
  <div class="row">
      <div class="column">
          <img src={image.url} style={imgStyle}/>
          <button className = "removeButton" onClick={this.deletePhoto} 
            name={image.key}>X</button>
       </div>
       </div>
  </div>
)} 
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