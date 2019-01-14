import React, { Component } from 'react';
import '../footer.css';
import * as script from '../scripts';

export class footer extends Component {
   
  render() {
      return (
      <div>
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        {/*---- Include the above in your HEAD tag --------*/}
        {/* Footer */}
        <section id="footer">
          <div className="container">
            <div className="row text-center text-xs-center text-sm-left text-md-left">
              <div className="col-xs-12 col-sm-4 col-md-4">
                <h5>Quick links</h5>
                <ul className="list-unstyled quick-links">
                  <li><a href="javascript:void();"><i className="fa fa-angle-double-right" />Home</a></li>
                  <li><a href="javascript:void();"><i className="fa fa-angle-double-right" />About</a></li>
                  <li><a href="javascript:void();"><i className="fa fa-angle-double-right" />FAQ</a></li>
                </ul>
              </div>
              <div className="col-xs-12 col-sm-4 col-md-4">
                <h5>Quick links</h5>
                <ul className="list-unstyled quick-links">
                  <li><a href="javascript:void();"><i className="fa fa-angle-double-right" />Home</a></li>
                  <li><a href="javascript:void();"><i className="fa fa-angle-double-right" />About</a></li>
                  <li><a href="https://wwwe.sunlimetech.com" title="Design and developed by"><i className="fa fa-angle-double-right" />Imprint</a></li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-5">
                <ul className="list-unstyled list-inline social text-center">
                  <li className="list-inline-item"><a href="javascript:void();"><i className="fa fa-facebook" /></a></li>
                  <li className="list-inline-item"><a href="javascript:void();"><i className="fa fa-twitter" /></a></li>
                  <li className="list-inline-item"><a href="javascript:void();"><i className="fa fa-instagram" /></a></li>
                  <li className="list-inline-item"><a href="javascript:void();"><i className="fa fa-google-plus" /></a></li>
                  <li className="list-inline-item"><a href="javascript:void();" target="_blank"><i className="fa fa-envelope" /></a></li>
                </ul>
              </div>
            </div>	
          </div>
        </section>
        {/* ./Footer */}
      </div>
    );
  }};