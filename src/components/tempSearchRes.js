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
import Autocomplete from  'react-autocomplete';
import firebase, { auth, provider, storage, database  } from '../firebase.js';

// import { Link } from 'react-router';
let testServices1 = [];
let testServices = [];

let uniqueServices = []
let newState=[]
export class searchRes extends Component {
  
  constructor(){
    super()
    this.state = {
      user: null,
      file: null,
      url: [],
      // isInEditMode:false
      servType: '',
      services: [],
      s:[],
      value: '',
    }
    this.showServiceDetails = this.showServiceDetails.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.userIntUpdate = this.userIntUpdate.bind(this);
    // this.Activate = this.Activate.bind(this);
  }
  componentDidMount() {
    const serviceProvidersRef = firebase.database().ref('serviceProviders');

    serviceProvidersRef.once('value', (snapshot) => {
      snapshot.forEach((eventSnapshot) => {
        eventSnapshot.child('Services').forEach((serviceInfo) => {
          serviceInfo.child('serviceDetails').forEach((servDetails) => {  
          let sInfo = servDetails.val();
          testServices1.push(sInfo.serviceType);
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

  showServiceDetails() {
    const serviceProvidersRef = firebase.database().ref('serviceProviders');
const value = this.state.value;
    serviceProvidersRef.once('value', (snapshot) => {
       snapshot.forEach((eventSnapshot) => {
        // console.log(eventSnapshot.child('Services').child(value).val())
        const service1 = eventSnapshot.child('Services').child(value).val()

         var service2 = eventSnapshot.child('Services').child(value).child('serviceDetails').val();
        // console.log(service2)
        eventSnapshot.child('Services').child(value).child('serviceDetails').forEach((servDetails) => {  
          
          let serviceDetails = servDetails.val();
          // console.log(serviceDetails)
        newState.push(serviceDetails)
        this.setState({
          // companyName: companyName,
          s:newState
        })
      })

        // if(service2!==null){
        //   // service1.forEach((whateevr) =>{
        //     // console.log(service2)

        
      
        // newState.push(service2)
       

        // }
      
     })
    //  console.log(newState);
    //  this.setState({
    //   // companyName: companyName,
    //   s:newState
    // })

    console.log(this.state.s);
    });

 
  }
    render() {

        return (
          
<div> 
  <navstuff.navstuff/>
  <br>
  </br>
  <div className="SearchLabelCssN"></div>
      {/* <input type="text" className = "searchlabelN" value="Search"  readonly="readonly"/> */}
      
      <input className = "searchN1" type="text" placeholder="Henna, Bridal Makeup.." onChange={this.handleChange} value={this.state.servType} name="servType"/>
      <input className = "nearMeN1" type="text" placeholder="City, Province" name="nearMe"/>
      {/* <input type="text" className = "nearMelabelN" value="Near"  readonly="readonly"/> */}
      {/* <h1> {uniqueServices.indexOf('henna')}</h1> */}


 


      <div>
     <script src="https://unpkg.com/react@15.6.1/dist/react.js"></script>
<script src="https://unpkg.com/react-dom@15.6.1/dist/react-dom.js"></script>
<script src="https://unpkg.com/react-autocomplete@1.5.10/dist/react-autocomplete.js"></script>
<Autocomplete
        // items={[
        //   { id: 'foo', label: 'foo' },
        //   { id: 'bar', label: 'bar' },
        //   { id: 'baz', label: 'baz' },
        // ]}
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
        onSelect={value => this.setState({ value })}
      />
      </div>


      <button className = "searchButtonN1"type="submit" onClick={this.showServiceDetails}><i className="fa fa-search"></i></button>
 {this.state.s.map((item) => {
          return (

           <div> 
              {/* <h2 >Location: jjjj &nbsp;&nbsp; {item.Description}</h2> */}
           
           <h2 >Location: jjjj &nbsp;&nbsp; {item.uuid}</h2>
           </div>
 
     
            )
           })} 

</div>


        )
    }
  }