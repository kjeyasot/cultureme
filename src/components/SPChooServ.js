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
import { MDBContainer, MDBRow, MDBInput, MDBIcon} from 'mdbreact';
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
      services:[]

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

      <center><h6 className="Heading">{this.state.companyName}</h6></center> 
      <div onClick={this.refresh}>
     
      <MDBBtn className="btn btn" className="ml-1 float-right"size="lg" color="pink">     
       
       Add Service
              <MDBIcon className="ml-2 fas fa-plus-circle" far icon="plus-circle"  />
      
            </MDBBtn>
            </div>
            <br></br>
            <h6 className="Heading">.</h6>
  <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"/>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css"/>



<div class="container-fluid">
	<div class="row">
    {/* <div class="col-md-3 col-sm-4" >
      <div class="wrimagecard wrimagecard-topimage" onClick={this.refresh}>
          <a href="#">
          <div class="wrimagecard-topimage_header"  style={{ backgroundColor: "rgba(51, 105, 232, 0.1)"}}>
    
            <center><i class = "fa fa-plus" ></i></center>
          </div>
          <br></br>
           
          <div class="wrimagecard-topimage_title" style={{ Color: "black"}}>
            <center><span><h4>Add Services
       
         
            <div class="pull-right badge" id="WrControls"></div></h4></span></center>
      
          </div>
        </a>
      </div>
    
</div>  */}


 {this.state.services.map((item) => {
          return (



<div class="col-md-3 col-sm-2">

      <div class="wrimagecard wrimagecard-topimage">
   
      <i class="fas fa-times-circle fa-2x"  onClick={() => this.removeService(item.serviceType)}></i>

      <div class="wrimagecard-topimage_title" style={{ Color:"black"}}>
      
     
            <center><span><h4>{item.serviceType}</h4></span></center>
          </div>
          <a href="#">
          <div class="wrimagecard-topimage_header" style={{ backgroundColor: "grey"}}>
          
            {/* <center><i class = "fa fa-cubes"  style={{color: "#16A085"}}></i></center> */}
           <h6 className="para">Location:  &nbsp;&nbsp; {item.city}, {item.state}</h6>
           <h6 className="para">Price:  &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${item.minPrice} - ${item.maxPrice}</h6>
           <MDBBtn className="btn btn-" size="sm">
       
       Edit/View
       <MDBIcon far icon="edit" className="ml-2 edit"/>

     </MDBBtn>
            </div>
    </a>
    
    </div>
    
    </div>
 
     
     )
    })} 
    </div>
    </div>
  
 <div className="spfooter">
        <footer1.footer1/>
        </div>
        
        
        
        </div>
      
      
     );
        }
       }