import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon,MDBInput } from 'mdbreact';
import * as footer1 from './footer-nav';
import * as navstuff from './nav-boots';
import firebase, { auth, provider } from '../firebase.js';


import * as script from '../scripts';

export class stepone extends Component {
  constructor() {
    super();
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    this.state = {
      user: null
    }
    this.login = this.login.bind(this); 
    this.logout = this.logout.bind(this); 
  

  }

  forceUpdateHandler(){
    this.forceUpdate();
  };

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
  componentWillMount() {
    

  }
  async componentDidMount() {
    
    await auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });
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
          <form>
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
              onClick= {this.forceUpdateHandler}
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
      <input class="form-control form-control-md " md="20" type="text"  placeholder="Min Price" aria-describedby="basic-addon" />
    </div>
    </div>
    <p>-</p>
    <div class="col">
    <div className="input-group">
      <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon">
          <i className="fa fa-dollar"></i>
        </span>
      </div>
      <input type="text" className="form-control  form-control-md" placeholder="Max Price" aria-label="Username" aria-describedby="basic-addon" />
    </div>
    </div>
  </div>
            
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
      
    <input type="hidden" name="country" id="countryId" value="CA"/>
<select name="state" class="states order-alpha browser-default custom-select custom-select- mb-3"   id="stateId">
    <option value="">Select Province</option>
</select>
</div>

&nbsp;&nbsp;
&nbsp;&nbsp;
<div class="col">
<select Async name="city" class="cities order-alpha browser-default custom-select custom-select-md mb-3" id="cityId">
    <option value="">Select City</option>
</select>
</div>
</div>


            <div className="text-right py-4 mt-3">
              <MDBBtn className="btn btn-pink" type="submit">
                Continue
                <MDBIcon far icon="angle-double-right" className="ml-2 fas fa-angle-right" />
        
              </MDBBtn>
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
