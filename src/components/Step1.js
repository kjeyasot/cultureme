import React, { Component,Fragment } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon,MDBInput } from 'mdbreact';
import * as footer1 from './footer-nav';
import * as navstuff from './nav-boots';
import * as searchGoogleMaps from './searchGoogleMaps';
import firebase, { auth, provider, database } from '../firebase.js';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
 


import * as script from '../scripts';

export class stepone extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      serviceType: '',
      Description: '',
      maxPrice: '',
      minPrice:'',
      
      address:'',
      services: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChanges = this.handleChanges.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createService = this.createService.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    
  }  

  handleChanges = address => {
    this.setState({ address });
  };
  componentDidMount() {
    
  auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });
  }
  handleChange(e) {
    if(e.target.name==='serviceType'){
   
      const serviceType = (e.target.validity.valid) ? e.target.value : this.state.serviceType;
      this.setState({ serviceType});
    }
    if(e.target.name==='maxPrice'){
      
      const maxPrice = (e.target.validity.valid) ? e.target.value : this.state.maxPrice;
      this.setState({ maxPrice});

    }
    if(e.target.name==='minPrice'){
      const minPrice = (e.target.validity.valid) ? e.target.value : this.state.minPrice;
      this.setState({ minPrice});

    }
   
  // if(e.target.name==='address'){
  //   this.setState({
  //    address: e.target.value
  //   });
  // }

  if(e.target.name==='Description'){
    this.setState({
     Description: e.target.value
    });
  }
  }

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
      this.setState({ address });
  };
  handleSubmit(e) {
    e.preventDefault();
    // this.props.history.push('/choose-service')
  }

  createService(){

    auth.onAuthStateChanged((user) => {
      if (user) {
      
        const services = {
          serviceType: this.state.serviceType,
          Description: this.state.Description,
          maxPrice: this.state.maxPrice,
          minPrice: this.state.minPrice,
          // state: this.state.province,
        address: this.state.address
        }
        const sTYpe = this.state.serviceType;
        const serviceProvidersRef = firebase.database().ref('serviceProviders').child(user.uid).child('Services').child(sTYpe).child('serviceDetails');  
        serviceProvidersRef.push(services)
        // {{pathname :"/Upload", data: this.state.serviceType }}>
        localStorage.setItem('sTYpe', this.state.serviceType);
        window.location = "/Upload";
        // this.props.history.push("/Upload")
            }

    })
    
  }

  render(){
    const images = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));
 
      
  return (
    <div>
      
      <navstuff.navstuff/>
      <div class = "moveElements1">
      <h3 style={{ fontSize: "2.5vmax",fontFamily:"Arial"}}>Let's get started with creating a service</h3>
           <br></br>
            <h5 style={{ fontSize: "2vmax",fontFamily:"Arial"}}>Step 1: What type of service do you want to provide</h5>
    </div>
  <br></br>

  <div>
         <img className = "CoolGyalstep1" alt="sideImage" src={images['cool.png']}/>
      </div>
      
       <MDBContainer>
       <MDBRow>
        <MDBCol md="10" text-center>
        
        <form onSubmit={this.handleSubmit}>


      <MDBInput 
      label="Service Type" 
      outline icon="hand-holding-usd" 
      style={{ paddingBottom: "3vh"}}
      className = "p-3 black-text "
      name='serviceType' 
      pattern ="[A-Za-z\s]*" maxlength="30"
              onChange={this.handleChange} 
              value={this.state.serviceType}
      />
      
       <MDBInput 
      label="Description" 
      outline icon="pen-nib" 
      style={{ paddingBottom: "3vh"}}
      className = "p-3 black-text "
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

{( this.state.minPrice && this.state.maxPrice && Number(this.state.minPrice)>= Number(this.state.maxPrice))? <p id="letter" className="invalid">Invalid Price Range</p>:null}


<br></br>

<MDBCol>
  <i class="fas fa-location-arrow" ></i>
  <label>Address</label>
  </MDBCol>



  <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChanges}
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





{/* 

<div name='address' 
  value={this.state.address}>
<searchGoogleMaps.searchGoogleMaps  />
  </div> */}
  {/* onChange={this.handleChange} 
  value={this.state.address}
   */}


 
 <div className="text-right py-4">
            {/* <Link to= {{pathname :"/Upload", data: this.state.serviceType }}> */}
              <MDBBtn className="btn btn-pink"  disabled={!this.state.serviceType||Number(this.state.minPrice)>= Number(this.state.maxPrice)||!this.state.address||!this.state.maxPrice||!this.state.minPrice} onClick={this.createService}>     
       
                Continue
                <MDBIcon far icon="angle-double-right" className="ml-2 fas fa-angle-right" />
        
              </MDBBtn>
              {/* </Link> */}
            </div>
      </form>


</MDBCol>
      </MDBRow>
    </MDBContainer>

    <div className="spfooter1"> 
    <footer1.footer1/>
     </div>
    </div>
  );
};

}
