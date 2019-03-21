import React, { Component } from 'react';
 import '../nav.css';
import * as script from '../scripts';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import * as footer1 from './footer-nav';
import * as navstuff from './nav-boots';

// import { Link } from 'react-router';

const images1 = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));
  
const images = script.importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));
export class searchRes extends Component {
  
    render() {
     
     
        return (
          
<div> 
  <navstuff.navstuff/>




  <div className="spfooter">
        <footer1.footer1/>
        </div>
</div>
        );
    
    }}
    
