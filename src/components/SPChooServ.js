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
let companyName;
// const images1 = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));
  
// const images = script.importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));
// let num = Object.keys(images).length-1;
// var y = Math.floor(num * Math.random());
// let dbdata;
// let dbkey;
 let newState = []
export class SPChooseService extends Component {
  constructor() {
    super();
    
    this.state = {
      user: null,
      companyName:'',
      services:[], 
      

    }
    this.login = this.login.bind(this); 
    this.logout = this.logout.bind(this); 
    this.refresh = this.refresh.bind(this); 
    this.moveToEditView = this.moveToEditView.bind(this);

  }

  moveToEditView(service) {
    localStorage.setItem('myData', service);
    this.props.history.push("/editView")
    
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
        const serviceProvidersRef = firebase.database().ref('serviceProviders').child(user.uid);

        serviceProvidersRef.once('value', (snapshot) => {
            snapshot.child('PersonalInformation').forEach((personalInfo) => {                
              let persInfo = personalInfo.val();
              companyName = persInfo.companyName;
            });
            snapshot.child('Services').forEach((serviceInfo) => {  
              serviceInfo.child('serviceDetails').forEach((servDetails) => {  
          
              let serviceDetails = servDetails.val();
              
            newState.push(serviceDetails)
            this.setState({
              companyName: companyName,
              services:newState
            })
            
            });
          }); 
        });
        
      } 
    });
    // localStorage.setItem('myData', null)
    // localStorage.removeItem('serviceType')
  }

  removeService(service) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        const itemRef = firebase.database().ref('serviceProviders').child(user.uid).child('Services').child(service)
        itemRef.remove();
        window.location.reload();
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

<MDBCol>
  <div onClick={this.refresh}>
  <MDBCard class = "vw-50" style={{width: "30vw", height: "25%"}}> 
  <div class = "hoverable">
        <MDBCardBody class = "min-vw-50" style={{ textAlign: "center"}}>
          <i style={{fontSize: "10vw"}}class="fas fa-plus fa-5x"></i> 
          <br></br>
            <label style={{fontSize: "1.5vw", background: "none"}}for="form1">Add Service</label>
          <br></br>
      </MDBCardBody>
  </div>
  </MDBCard>
  </div>
</MDBCol>

<br></br>
<br></br>

  {this.state.services.map((item) => {
          return (

<MDBCol>

     
<MDBCard style={{ width: "30vw"}}>
<div style={{ paddingLeft: "27vw" ,fontSize: "1.5vw"}}>
<i class="fas fa-times-circle fa-2x" onClick={() => this.removeService(item.serviceType)}></i>
</div>
  <MDBCardBody>
  
    <MDBCardTitle style={{ textAlign: "center", fontSize: "2vw"}} >{this.state.companyName}</MDBCardTitle>
    <label style={{fontSize: "1.5vw", background: "none"}} for="form1">Service:</label>
    &nbsp;&nbsp; &nbsp;&nbsp;
    <label style={{fontSize: "1.5vw", background: "none"}} for="form1">{item.serviceType}</label>
    {/* When connecting with DB replace text with: 
    <label> { this.props.label } </label> */}
    <br></br>
    <label style={{fontSize: "1.5vw", background: "none"}} for="form1">Location:</label>
    &nbsp;&nbsp;
    <label style={{fontSize: "1.5vw", background: "none"}} for="form1">{item.city}, {item.state}</label>
    <br></br>
    <label  style={{fontSize: "1.5vw", background: "none"}} for="form1">Price:</label>
    &nbsp;&nbsp;
    &nbsp;&nbsp; &nbsp;&nbsp;  &nbsp;
    <label style={{fontSize: "1.5vw", background: "none"}}for="form1">${item.minPrice} - ${item.maxPrice}</label>
    <br></br>
  </MDBCardBody>
  <MDBBtn  onClick={() => this.moveToEditView(item.serviceType)}>View</MDBBtn>

</MDBCard>
</MDBCol>
          )
        })} 
<br></br>

 <div className="spfooter">
        <footer1.footer1/>
        </div>
        
       
        
        
        </div>
        
  

      
     );
         }
       }