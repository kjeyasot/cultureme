import React, { Component} from 'react';
 import '../nav.css';
import * as script from '../scripts';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';
import * as footer1 from './footer-nav';
import * as navstuff from './nav-boots';
import * as searchGoogleMaps from './searchGoogleMaps';

import Autocomplete from  'react-autocomplete';
import firebase, { auth, provider, storage, database  } from '../firebase.js';
import StarRatingComponent from 'react-star-rating-component';

// import { Link } from 'react-router';
let testServices1 = [];
let testServices = [];

let uniqueServices = []
let testUuid = []
let newState = []
let companyName,address;


export class servicesList extends Component {
  
  constructor(){
    super()
    this.state = {
      user: null,
      file: null,
      url: [],
      // isInEditMode:false
      servType: '',
      services: [],
      servicesList: [],
      companyName: '',
      value: '',
      
    }
    // this.showServiceDetails = this.showServiceDetails.bind(this);
    // this.moveToView = this.moveToView.bind(this);

    // this.whatever = this.whatever.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.userIntUpdate = this.userIntUpdate.bind(this);
    // this.Activate = this.Activate.bind(this);
  }

  componentDidMount() {
    // this.showServiceDetails();
    const serviceProvidersRef = firebase.database().ref('serviceProviders');

    serviceProvidersRef.once('value', (snapshot) => {
      snapshot.forEach((eventSnapshot) => {
        eventSnapshot.child('Services').forEach((serviceInfo) => {
          serviceInfo.child('serviceDetails').forEach((servDetails) => {  
          let sInfo = servDetails.val();
          testServices1.push(sInfo.serviceType.toLowerCase());
        });
        
    
      });
      });    
      uniqueServices = Array.from(new Set(testServices1));
      uniqueServices.forEach((userv)=>
      {
        testServices.push({
            id: userv,
            label: userv
          })  
      })
    });
    
  }
  handleSelect = value => {
    this.setState({ value });
    localStorage.setItem('servicetypesss', value)
};
 


    render() {

        return (
          


 
   
      <div>
     <script src="https://unpkg.com/react@15.6.1/dist/react.js"></script>
<script src="https://unpkg.com/react-dom@15.6.1/dist/react-dom.js"></script>
<script src="https://unpkg.com/react-autocomplete@1.5.10/dist/react-autocomplete.js"></script>
&nbsp;&nbsp;<Autocomplete
    
        items = {testServices}
        shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
        getItemValue={item => item.label}
        renderItem={(item, highlighted) =>
          <div
            key={item.id}
            style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
          >
            {item.label}
          </div>
        }
        value={this.state.value}
        onChange={e => this.setState({ value: e.target.value })}
        onSelect={this.handleSelect}
      />
            &nbsp;&nbsp;   &nbsp;&nbsp;   &nbsp;&nbsp;   &nbsp;&nbsp;  
            
        
            
            
            {/* <input className = "nearMeN1" type="text" placeholder="City, Province" name="address"  onChange={e => this.setState({ address: e.target.value })} value={this.state.address} /> */}

</div>


        )
    }
  }
    
