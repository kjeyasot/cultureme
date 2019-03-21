import React, { Component } from 'react';
 import '../nav.css';
import * as script from '../scripts';
import * as footer1 from './footer-nav';
import * as navstuff from './nav-boots';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
// import { Link } from 'react-router';

const images1 = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));
  
const images = script.importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));
export class resultsPage extends Component {
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

          <div>

            <navstuff.navstuff/>
        <div className="searchElements">
            <div class="col-lg-11 col-md-5">
        <div className="card">
          <h3 style={{ background: "white"}} className="card-header light-pink lighten-1 black-text font-weight-bold text-center py-5"> Search Results...
          
          </h3>
          <div className="card-body">
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Compnay Name 1
                <br></br> Insert Description
              <span>

<i class="fa fa-star checked"></i>
<i class="fa fa-star checked"></i>
<i class="fa fa-star checked"></i>
<i class="fa fa-star checked"></i>
<i class="fa fa-star checked"></i>

      </span>
                <button type="button" class="btn btn-primary">View</button>
              </li>
       
            </ul>
            <h3 style={{ fontSize: "1vw", textAlign: "center"}} className="text-small text-muted mb-0 pt-3">New services added weekly!</h3>
          </div>
          </div>
          </div>
          </div>
          </div>
 
        );
    
    }}
    
