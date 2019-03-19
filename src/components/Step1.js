import React, { Component,Fragment } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon,MDBInput } from 'mdbreact';
import * as footer1 from './footer-nav';
import * as navstuff from './nav-boots';
import firebase, { auth, provider, database } from '../firebase.js';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react'

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
      province: '',
      city:'',
      services: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createService = this.createService.bind(this);

  }  
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
    if(e.target.name==='province'){
    this.setState({
     province: e.target.value
    });
  }
  if(e.target.name==='city'){
    this.setState({
     city: e.target.value
    });
  }

  if(e.target.name==='Description'){
    this.setState({
     Description: e.target.value
    });
  }
  }
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
          state: this.state.province,
          city: this.state.city
        }
        const sTYpe = this.state.serviceType;
        const serviceProvidersRef = firebase.database().ref('serviceProviders').child(user.uid).child('Services').child(sTYpe).child('serviceDetails');  
        serviceProvidersRef.push(services)
        // {{pathname :"/Upload", data: this.state.serviceType }}>
        this.props.history.push({pathname :"/Upload", data: this.state.serviceType})
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

<input type="hidden" name="country" id="countryId" value="CA"/>

<MDBRow>

  <MDBCol>
  <i class="fas fa-location-arrow"></i>
  <label>State/Province</label>
  </MDBCol>
  <MDBCol>
  <select name="province" class="states order-alpha browser-default custom-select md-6 mb-4"   id="stateId"
  onChange={this.handleChange} 
  value={this.state.province}
  >
  <option value="">Select Province</option>
  </select>
 </MDBCol>
 </MDBRow>

<MDBRow>
<MDBCol>
  <i class="fas fa-location-arrow" ></i>
  <label>City</label>
  </MDBCol>
  <MDBCol>
  <select Async name="city" class="cities order-alpha browser-default custom-select md-6 mb-4" id="cityId"
  onChange={this.handleChange} 
  value={this.state.city}>
  <option value="">Select City</option>
  </select>
  </MDBCol>

</MDBRow>
 
 <div className="text-right py-4">
            {/* <Link to= {{pathname :"/Upload", data: this.state.serviceType }}> */}
              <MDBBtn className="btn btn-pink"  disabled={!this.state.serviceType||Number(this.state.minPrice)>= Number(this.state.maxPrice)||!this.state.city||!this.state.maxPrice||!this.state.minPrice||!this.state.province} onClick={this.createService} >     
       
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
