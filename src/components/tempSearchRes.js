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
           
            <a href="/signin" >Log In</a>
            <a href="/signup" >Sign Up</a>
          </div>
             </div>
        );
    
    }}
    
