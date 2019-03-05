import React, { Component } from 'react';
import '../footer-nav.css';

export class footer1 extends Component {
   
  render() {
      return (
    <div>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css"/>
    {/* <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/> */}
    {/* <link rel="stylesheet" href="assets/css/Footer-with-button-logo.css"/> */}

<div class="content">
</div>
    <footer id="myFooter">
        <div class="container">
            <div class="row">
                {/* <div class="col-sm-3">
                    <h2 class="logo"><a href="#"> LOGO </a></h2>
                </div> */}
                <div class="col-sm-2">
                    <h5>Get started</h5>
                </div>
                <div class="col-sm-2">
                    <h5>About us</h5>
                </div>
                <div class="col-sm-2">
                    <h5>Support</h5>
                </div>
                <div class="col-sm-3">
                    <div class="social-networks">
                    <button type="button" class="btn btn-default">Contact us</button>
                        <a href="#" class="twitter"><i class="fa fa-twitter"></i></a>
                        <a href="#" class="facebook"><i class="fa fa-facebook"></i></a>
                        <a href="#" class="google"><i class="fa fa-google-plus"></i></a>
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="footer-copyright">
            <p>© 2016 Copyright Text </p>
        </div>
    </footer>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    </div>
    );
  }};