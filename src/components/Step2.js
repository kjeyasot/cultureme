import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon,MDBInput } from 'mdbreact';
import * as footer1 from './footer-nav';
import * as navstuff from './nav-boots';
import firebase, { auth, provider, database } from '../firebase.js';
import { Link } from 'react-router-dom';


import * as script from '../scripts';

export class step2 extends Component {
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
            <label
              htmlFor="defaultFormCardNameEx"
              className="black-text font-weight-light"
            >
              Service Type
            </label>
            <input
              type="text"
              id="defaultFormCardNameEx"
              className="form-control"
              name='serviceType' pattern ="[A-Za-z\s]*" maxlength="30"
              onChange={this.handleChange} 
              value={this.state.serviceType}
            />
           
            <br />
            <label
              htmlFor="defaultFormCardEmailEx"
              className="black-text font-weight-dark"
            >
              Descritption
            </label>
            <textarea
              type="email"
              id="defaultFormCardEmailEx"
              className="form-control"
              name='Description' 
              onChange={this.handleChange} 
              value={this.state.Description}
            />
<br></br>

<label
              htmlFor="defaultFormCardEmailEx"
              className="black-text font-weight-dark"
            >
           Price
            </label>
          




            <div class="row">

    <div class="col">
    <div className="input-group">
      <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon">
          <i className="fa fa-dollar"></i>
        </span>
      </div>
      <input class="form-control form-control-md " md="20" type="text"  placeholder="Min Price" aria-describedby="basic-addon" 
      name='minPrice'  pattern="[0-9]*" maxlength="4"
      onChange={this.handleChange} 
      value={this.state.minPrice}/>
     
    </div>
    </div>
    <h3>-</h3>
       <div class="col">
    <div className="input-group">
      <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon">
          <i className="fa fa-dollar"></i>
        </span>
      </div>
      <input type="text" className="form-control  form-control-md" placeholder="Max Price" aria-label="Username" aria-describedby="basic-addon" 
      name='maxPrice'  pattern="[0-9]*"  maxlength="4"
      onChange={this.handleChange} 
      value={this.state.maxPrice}/>
      
        </div>
        </div>
  </div>
  <br></br>   
            {( this.state.minPrice && this.state.maxPrice && Number(this.state.minPrice)>= Number(this.state.maxPrice))? <p id="letter" className="invalid">Invalid Price Range</p>:null}
      
<br></br>
<label
              htmlFor="defaultFormCardNameEx"
              className="black-text font-weight-light"
            >
              Location
            </label>
            <br />
           
            <div class="row">
           
            <div class="col">
      
    <input type="hidden" name="country" id="countryId" value="CA"
    />
<select name="province" class="states order-alpha browser-default custom-select custom-select- mb-3"   id="stateId"
onChange={this.handleChange} 
value={this.state.province}>
    <option value="">Select Province</option>
</select>
</div>

&nbsp;&nbsp;
&nbsp;&nbsp;
<div class="col">
<select Async name="city" class="cities order-alpha browser-default custom-select custom-select-md mb-3" id="cityId"
onChange={this.handleChange} 
value={this.state.city}>
    <option value="">Select City</option>
</select>
</div>
</div>


            <div className="text-right py-4 mt-3">
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
