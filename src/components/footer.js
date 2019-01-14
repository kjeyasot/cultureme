import React, { Component } from 'react';
import '../footer.css';
import * as script from '../scripts';

export class footer extends Component {
   
  render() {
      return (
        
        <div>
        <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        {/*---- Include the above in your HEAD tag --------*/}
        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
        {/*
    instagram: www.instagram.com/programmingtutorial
    site: programlamadersleri.net
*/}
        <footer>
          <br></br>
          <div className="container">
            <div className="row">
              
              <div className="col-lg-2 col-md-2 col-sm-6 col-xs-12">
                <ul className="footer-list">

                </ul>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-6 col-xs-12">
                <ul className="footer-list">
                  <span>About</span>    
                  
                </ul>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-6 col-xs-12">
                <ul className="footer-list">
                  <span>Contact</span>     
                </ul>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-6 col-xs-12">
                <ul className="footer-list">
                  <span>FAQ</span>     
                </ul>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-6 col-xs-12">
                <ul className="social">   
                  <li>
                    <a href="#"><i className="fa fa-facebook fa-2x" /></a>
                  </li>

                  <li>
                    <a href="#"><i className="fa fa-instagram fa-2x" /></a>
                  </li>
                  <li>
                    <a href="#"><i className="fa fa-youtube fa-2x" /></a>
                  </li>
                </ul>
              </div>
            </div> 
          </div>
          <br></br>
          <p>Copyright © 2019 CultureMe. All rights reserved.</p>
        </footer>
      </div>
    );
  }};