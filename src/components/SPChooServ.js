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


    render(){
    return (
      
      <div> 
      <navstuff.navstuff/>
      
    <h2 className="Heading">Your Services</h2>
  <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"/>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css"/>

<Link to="/Step1">
<div class="container-fluid">
	<div class="row">
    <div class="col-md-3 col-sm-4">
      <div class="wrimagecard wrimagecard-topimage">
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
</div>
</Link>
        
 <div className="spfooter">
        <footer1.footer1/>
        </div>
        
       
        
        
        </div>
        
  

      
     );
         }
       }