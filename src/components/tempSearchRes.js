import React, { Component } from 'react';
 import '../nav.css';
import * as script from '../scripts';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
// import { Link } from 'react-router';

const images1 = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));
  
const images = script.importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));
export class searchRes extends Component {
  myFunction() {
    var x = document.getElementById("Demo");
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
    } else { 
      x.className = x.className.replace(" w3-show", "");
    }
  }
  
    render() {
     
     
        return (
          
          <div class="nav">
          <div class="nav-header">
            <div class="nav-title">
            {/* <Link to = "/"> */}
            
              <a class="N" href="./" ><img class="lnav" alt="logo" src={images1['logoCM.png']}  /></a>
           
              <div className="BackSearchN"></div>
      <div className="SearchLabelCssN"></div>
      <input type="text" className = "searchlabelN" value="Search"  readonly="readonly"/>
      
      <input className = "searchN" type="text" placeholder="Henna, Bridal Makeup.." name="search"/>
      <input className = "nearMeN" type="text" placeholder="City, Province" name="nearMe"/>
      <input type="text" className = "nearMelabelN" value="Near"  readonly="readonly"/>
     
      
       <button className = "searchButtonN"type="submit"><i className="fa fa-search"></i></button>
     

            </div> 
          </div>
        
          <div class="nav-btn">
            <label for="nav-check">
              <span></span>
              <span></span>
              <span></span>
            </label>
          </div>
          <input type="checkbox" id="nav-check" />
          <div class="nav-links">
           

          {/*  */}
 
    <input id="check01" type="checkbox" name="menu"/>
    <label for="check01">
  <a href="#" className="nav-item" onclick={this.myFunction} ><i class="fa fa-user"></i>        Profile      <i class="fa fa-caret-down"></i></a>
  </label> 
    <ul class="submenu">
      <li><a href="#">Sotto menu 1</a></li>
      <li><a href="#">Sotto menu 2</a></li>
    </ul>
 

 
            {/* <a href="/signin" >Sign In</a>
            <a href="/signup" >Sign Up</a> */}
          </div>
             </div>
        );
    
    }}
    
