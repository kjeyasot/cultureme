import React, { Component } from 'react';
import '../App.css';
import firebase, { auth, provider } from '../firebase.js';
import * as footer1 from './footer-nav';
import * as navstuff from './nav-boots';
import * as script from '../scripts';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCardHeader, MDBCol } from 'mdbreact';
import { MDBContainer, MDBRow, MDBInput} from 'mdbreact';
const images1 = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));

// const images1 = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));
  
// const images = script.importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));
// let num = Object.keys(images).length-1;
// var y = Math.floor(num * Math.random());
// let dbdata;
// let dbkey;
 
export class SPChooseService extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    }
    this.login = this.login.bind(this); 
    this.logout = this.logout.bind(this); 
    this.refresh = this.refresh.bind(this); 


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

refresh() {
  window.location='/Step1'
}
    render(){
   
    return (
      
      
      <div> 
      <navstuff.navstuff/>
      
    <h2 className="Heading">Your Services</h2>
  <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"/>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css"/>


{/* <div class="container-fluid">
	<div class="row">
    <div class="col-md-3 col-sm-4">
      <div class="wrimagecard wrimagecard-topimage" onClick={this.refresh}>
          <a href="#">
          <div class="wrimagecard-topimage_header" styles="background-color: rgba(22, 160, 133, 0.1)">
        
            <center><i class = "fa fa-plus" styles="color:#16A085"></i></center>
          </div>
          <div class="wrimagecard-topimage_title">
            <center><span><h4>Add Service
            <div class="pull-right badge" id="WrControls"></div></h4></span></center>
          </div>
        </a>
      </div>
    
</div>
</div>
</div> */}

<br></br>

{/* <MDBCol>
<div onClick={this.refresh}>
      <MDBCard class = "vw-50" style={{ width: "22rem"}}> 
      <div class = "hoverable">
        <MDBCardBody class = "min-vw-50" style={{ textAlign: "center"}}>
        <i class="fas fa-plus fa-5x"></i> 
       <br></br>
        <br></br> 
        <label for="form1">Add Service</label>
          <br></br>
        </MDBCardBody>
        </div>
      </MDBCard>
      </div>
</MDBCol> */}

<br></br>
<br></br>
<MDBCol>

     
      <MDBCard style={{ width: "30vw"}}>
      <div style={{ paddingLeft: "27vw" ,fontSize: "1.5vw"}}>
      <i class="fas fa-times-circle fa-2x" ></i>
      </div>
        <MDBCardBody>
        
          <MDBCardTitle style={{ textAlign: "center", fontSize: "2vw"}}>Company Name</MDBCardTitle>
          <label style={{fontSize: "1.5vw"}} for="form1">Service:</label>
          &nbsp;&nbsp; &nbsp;&nbsp;
          <label style={{fontSize: "1.5vw"}} for="form1">exampleService</label>
          {/* When connecting with DB replace text with: 
          <label> { this.props.label } </label> */}
          <br></br>
          <label style={{fontSize: "1.5vw"}} for="form1">Location:</label>
          &nbsp;&nbsp;
          <label style={{fontSize: "1.5vw"}} for="form1">exampleLocation</label>
          <br></br>
          <label  style={{fontSize: "1.5vw"}} for="form1">Price:</label>
          &nbsp;&nbsp;
          &nbsp;&nbsp; &nbsp;&nbsp;  &nbsp;
          <label style={{fontSize: "1.5vw"}}for="form1">examplePrice</label>
          <br></br>
        </MDBCardBody>

        <MDBBtn href="#">View</MDBBtn>
      </MDBCard>
</MDBCol>

<br></br>

 <div className="spfooter">
        <footer1.footer1/>
        </div>
        
       
        
        
        </div>
        
  

      
     );
         }
       }