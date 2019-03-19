import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon,MDBInput } from 'mdbreact';
import * as footer1 from './footer-nav';
import * as navstuff from './nav-boots';
import firebase, { auth, provider, database } from '../firebase.js';
import { Link } from 'react-router-dom';

 

import * as script from '../scripts';

export class editView extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      serviceType: '',
      Description: '',
      maxPrice: '',
      minPrice:'',
      province: '',
      city:'',
      services: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createService = this.createService.bind(this);

  }  
  componentDidMount() {
    
  auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });
  }
  handleChange(e) {
    if(e.target.name==='serviceType'){
   
      const serviceType = (e.target.validity.valid) ? e.target.value : this.state.serviceType;
      this.setState({ serviceType});
    }
    if(e.target.name==='maxPrice'){
      
      const maxPrice = (e.target.validity.valid) ? e.target.value : this.state.maxPrice;
      this.setState({ maxPrice});

    }
    if(e.target.name==='minPrice'){
      const minPrice = (e.target.validity.valid) ? e.target.value : this.state.minPrice;
      this.setState({ minPrice});

    }
    if(e.target.name==='province'){
    this.setState({
     province: e.target.value
    });
  }
  if(e.target.name==='city'){
    this.setState({
     city: e.target.value
    });
  }

  if(e.target.name==='Description'){
    this.setState({
     Description: e.target.value
    });
  }
  }
  handleSubmit(e) {
    e.preventDefault();
    // this.props.history.push('/choose-service')
  }

  createService(){

    auth.onAuthStateChanged((user) => {
      if (user) {
      
        const services = {
          serviceType: this.state.serviceType,
          Description: this.state.Description,
          maxPrice: this.state.maxPrice,
          minPrice: this.state.minPrice,
          state: this.state.province,
          city: this.state.city
        }
        const sTYpe = this.state.serviceType;
        const serviceProvidersRef = firebase.database().ref('serviceProviders').child(user.uid).child('Services').child(sTYpe).child('serviceDetails');  
        serviceProvidersRef.push(services)
        // {{pathname :"/Upload", data: this.state.serviceType }}>
        this.props.history.push({pathname :"/Upload", data: this.state.serviceType})
            }

    })
    
  }

  render(){
    const images = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));
      
  return (
    <div>
            <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
    
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-9">
            {/* User profile */}
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">User profile</h4>
              </div>
              <div className="panel-body">
                <div className="profile__avatar">
                  <img src="https://bootdey.com/img/Content/avatar/avatar5.png" alt="..." />
                </div>
                <div className="profile__header">
                  <h4>Richard Roe <small>Administrator</small></h4>
                  <p className="text-muted">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non nostrum odio cum repellat veniam eligendi rem cumque magnam autem delectus qui.
                  </p>
                  <p>
                    <a href="#">bootdey.com</a>
                  </p>
                </div>
              </div>
            </div>
            {/* User info */}
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">User info</h4>
              </div>
              <div className="panel-body">
                <table className="table profile__table">
                  <tbody>
                    <tr>
                      <th><strong>Location</strong></th>
                      <td>United States</td>
                    </tr>
                    <tr>
                      <th><strong>Company name</strong></th>
                      <td>Simpleqode.com</td>
                    </tr>
                    <tr>
                      <th><strong>Position</strong></th>
                      <td>Front-end developer</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* Community */}
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">Community</h4>
              </div>
              <div className="panel-body">
                <table className="table profile__table">
                  <tbody>
                    <tr>
                      <th><strong>Comments</strong></th>
                      <td>58584</td>
                    </tr>
                    <tr>
                      <th><strong>Member since</strong></th>
                      <td>Jan 01, 2016</td>
                    </tr>
                    <tr>
                      <th><strong>Last login</strong></th>
                      <td>1 day ago</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* Latest posts */}
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">Latest posts</h4>
              </div>
              <div className="panel-body">
                <div className="profile__comments">
                  <div className="profile-comments__item">
                    <div className="profile-comments__controls">
                      <a href="#"><i className="fa fa-share-square-o" /></a>
                      <a href="#"><i className="fa fa-edit" /></a>
                      <a href="#"><i className="fa fa-trash-o" /></a>
                    </div>
                    <div className="profile-comments__avatar">
                      <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="..." />
                    </div>
                    <div className="profile-comments__body">
                      <h5 className="profile-comments__sender">
                        Richard Roe <small>2 hours ago</small>
                      </h5>
                      <div className="profile-comments__content">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, corporis. Voluptatibus odio perspiciatis non quisquam provident, quasi eaque officia.
                      </div>
                    </div>
                  </div>
                  <div className="profile-comments__item">
                    <div className="profile-comments__controls">
                      <a href="#"><i className="fa fa-share-square-o" /></a>
                      <a href="#"><i className="fa fa-edit" /></a>
                      <a href="#"><i className="fa fa-trash-o" /></a>
                    </div>
                    <div className="profile-comments__avatar">
                      <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="..." />
                    </div>
                    <div className="profile-comments__body">
                      <h5 className="profile-comments__sender">
                        Richard Roe <small>5 hours ago</small>
                      </h5>
                      <div className="profile-comments__content">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero itaque dolor laboriosam dolores magnam mollitia, voluptatibus inventore accusamus illo.
                      </div>
                    </div>
                  </div>
                  <div className="profile-comments__item">
                    <div className="profile-comments__controls">
                      <a href="#"><i className="fa fa-share-square-o" /></a>
                      <a href="#"><i className="fa fa-edit" /></a>
                      <a href="#"><i className="fa fa-trash-o" /></a>
                    </div>
                    <div className="profile-comments__avatar">
                      <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="..." />
                    </div>
                    <div className="profile-comments__body">
                      <h5 className="profile-comments__sender">
                        Richard Roe <small>1 day ago</small>
                      </h5>
                      <div className="profile-comments__content">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, esse, magni aliquam quisquam modi delectus veritatis est ut culpa minus repellendus.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-3">
            {/* Contact user */}
            <p>
              <a href="#" className="profile__contact-btn btn btn-lg btn-block btn-info" data-toggle="modal" data-target="#profile__contact-form">
                Contact user
              </a>
            </p>
            <hr className="profile__contact-hr" />
            {/* Contact info */}
            <div className="profile__contact-info">
              <div className="profile__contact-info-item">
                <div className="profile__contact-info-icon">
                  <i className="fa fa-phone" />
                </div>
                <div className="profile__contact-info-body">
                  <h5 className="profile__contact-info-heading">Work number</h5>
                  (000)987-65-43
                </div>
              </div>
              <div className="profile__contact-info-item">
                <div className="profile__contact-info-icon">
                  <i className="fa fa-phone" />
                </div>
                <div className="profile__contact-info-body">
                  <h5 className="profile__contact-info-heading">Mobile number</h5>
                  (000)987-65-43
                </div>
              </div>
              <div className="profile__contact-info-item">
                <div className="profile__contact-info-icon">
                  <i className="fa fa-envelope-square" />
                </div>
                <div className="profile__contact-info-body">
                  <h5 className="profile__contact-info-heading">E-mail address</h5>
                  <a href="mailto:admin@domain.com">admin@domain.com</a>
                </div>
              </div>
              <div className="profile__contact-info-item">
                <div className="profile__contact-info-icon">
                  <i className="fa fa-map-marker" />
                </div>
                <div className="profile__contact-info-body">
                  <h5 className="profile__contact-info-heading">Work address</h5>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
};
  }
