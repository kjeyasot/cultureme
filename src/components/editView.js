import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon,MDBInput } from 'mdbreact';
import * as footer1 from './footer-nav';
import * as navstuff from './nav-boots';
import firebase, { auth, provider, database } from '../firebase.js';
import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';


 

import * as script from '../scripts';

export class editView2 extends Component {
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
        // this.props.history.push({pathname :"/Upload", data: this.state.serviceType})
            }

    })
    
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }


  render(){
    const images = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));
    const { rating } = this.state;
  return (

    
    
    <div>
         
      
            <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
            <navstuff.navstuff/>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-9">
            {/* User profile */}
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">InsertCompanyName</h4>
              </div>
              <div className="panel-body">
                {/* <div className="profile__avatar">
                  <img src="https://bootdey.com/img/Content/avatar/avatar5.png" alt="..." />
                </div> */}
                <div className="profile__header">
                  <h4>ServiceName</h4>
                  <p style={{ fontSize: "2.5vh", color: "grey", textAlign:"left"}}>
                    Blah blah blahhhhh description of the service.
                  </p>
                  <p>
                  </p>
                </div>
              </div>
            </div>
            {/* Latest posts */}
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">Comments</h4>
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
                      {/* <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="..." /> */}
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
                      {/* <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="..." /> */}
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
                      {/* <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="..." /> */}
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


<div>
<h5>Overall Client Rating: {rating}</h5>
  <StarRatingComponent 
    name="rate1" 
    className = "starEdit"
    // editing={false}
    starCount={5}

    // will come frfom db
    value={1}
  />
</div>


            {/* Contact user */}
            <p>
            </p>
            <hr className="profile__contact-hr" />
            {/* Contact info */}
            <div className="profile__contact-info">
              <div className="profile__contact-info-item">
                <div className="profile__contact-info-icon">
                </div>
            
              </div>

  
              <div className="profile__contact-info-item">
                <div className="profile__contact-info-icon">
                  <i className="fa fa-phone" />
                </div>
                <div className="profile__contact-info-body">
                  <h5 className="profile__contact-info-heading">Phone Number</h5>
                  (000)987-65-43
                </div>
              </div>
              <br></br>
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
                
                <br></br>
                  <div className="profile__contact-info-body">
                  <div className="profile__contact-info-icon">
                  <i className="fa fa-map-marker" />
                  <h5 className="profile__contact-info-heading">Location</h5>
                  Toronto, Ontario
                </div>
              </div>


                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="spfooter">
        <footer1.footer1/>
        </div>
      </div>
  );
};
  }
