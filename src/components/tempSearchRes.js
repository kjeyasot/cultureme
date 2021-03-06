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
import * as navstuffclient from './nav-client';
import * as searchGoogleMaps from './searchGoogleMaps';
import * as servicesList from './Servicelist';
import Autocomplete from  'react-autocomplete';
import firebase, { auth, provider, storage, database  } from '../firebase.js';
import StarRatingComponent from 'react-star-rating-component';

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

// import { Link } from 'react-router';
let testServices1 = [];
let testServices = [];

let uniqueServices = []
let testUuid = []
let newState = []
let companyName,address;


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
      servicesList: [],
      companyName: '',
      value: '',
      address:''
    }
    this.showServiceDetails = this.showServiceDetails.bind(this);
    this.moveToView = this.moveToView.bind(this);

    // this.whatever = this.whatever.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.userIntUpdate = this.userIntUpdate.bind(this);
    // this.Activate = this.Activate.bind(this);
  }

  handleChange = address => {
    this.setState({ address });
  };
 
  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
      this.setState({ address });
  };
  componentDidMount() {
    this.showServiceDetails();
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

  moveToView(serviceProvider, service) {
    localStorage.setItem('clientSearchSP', serviceProvider);
    localStorage.setItem('clientSearchSType', service);

    window.location = "/viewService"
    // this.props.history.push("/editView")
    
  }
  showServiceDetails() {
    const serviceProvidersRef = firebase.database().ref('serviceProviders');
    const value = localStorage.getItem('servicetypesss');
    const address = localStorage.getItem('addresqs');
    if(value && address){
      serviceProvidersRef.once('value', (snapshot) => {
          snapshot.forEach((eventSnapshot) => {
             eventSnapshot.child('Services').forEach((d) => {
            d.child('serviceDetails').forEach((df) => {
                 const x=df.child('serviceType').val().toLowerCase()
             if(x===value.toLowerCase()){
              console.log(df.val().uuid)
              var uuid=df.val().uuid
              const serviceProvidersRefs = firebase.database().ref('serviceProviders').child(uuid);
  
              serviceProvidersRefs.once('value', (snapshot) => {
                snapshot.child('PersonalInformation').forEach((personalInfo) => {                
                  let persInfo = personalInfo.val();
                  companyName = persInfo.companyName;
                });
                snapshot.child('Services').child(df.child('serviceType').val()).child('serviceDetails').forEach((serviceInfo) => {  
                  let serviceDetails = serviceInfo.val();
                  serviceDetails.companyName = companyName
                  if(serviceDetails.address===address){
                  newState.push(serviceDetails)
                  this.setState({
                    servicesList:newState,
                  })  
        }   
            
               
              }); 
              
        
            });
  
  
  
             }
      
          
        
          })
        })
      });
       newState =[];
    
               })
  }

  if(!value && address){
    serviceProvidersRef.once('value', (snapshot) => {
        snapshot.forEach((eventSnapshot) => {
           eventSnapshot.child('Services').forEach((d) => {
          d.child('serviceDetails').forEach((df) => {
               const x=df.child('serviceType').val().toLowerCase()
            console.log(df.val().uuid)
            var uuid=df.val().uuid
            const serviceProvidersRefs = firebase.database().ref('serviceProviders').child(uuid);

            serviceProvidersRefs.once('value', (snapshot) => {
              snapshot.child('PersonalInformation').forEach((personalInfo) => {                
                let persInfo = personalInfo.val();
                companyName = persInfo.companyName;
              });
              snapshot.child('Services').child(df.child('serviceType').val()).child('serviceDetails').forEach((serviceInfo) => {  
                let serviceDetails = serviceInfo.val();
                serviceDetails.companyName = companyName
                if(serviceDetails.address===address){
                newState.push(serviceDetails)
                this.setState({
                  servicesList:newState,
                })  
      }   
          
             
            }); 
            
      
          });
      
        })
      })
    });
     newState =[];
  
             })
}
  if(value && !address){
    serviceProvidersRef.once('value', (snapshot) => {
        snapshot.forEach((eventSnapshot) => {
           eventSnapshot.child('Services').forEach((d) => {
          d.child('serviceDetails').forEach((df) => {
               const x=df.child('serviceType').val().toLowerCase()
           if(x===value.toLowerCase()){
            console.log(df.val().uuid)
            var uuid=df.val().uuid
            const serviceProvidersRefs = firebase.database().ref('serviceProviders').child(uuid);

            serviceProvidersRefs.once('value', (snapshot) => {
              snapshot.child('PersonalInformation').forEach((personalInfo) => {                
                let persInfo = personalInfo.val();
                companyName = persInfo.companyName;
              });
              snapshot.child('Services').child(df.child('serviceType').val()).child('serviceDetails').forEach((serviceInfo) => {  
                let serviceDetails = serviceInfo.val();
                serviceDetails.companyName = companyName
                newState.push(serviceDetails)
                this.setState({
                  servicesList:newState,
                })  
            }); 
          });
           }
        })
      })
    });
     newState =[];
  
             })
}


if(!value && !address){
  let value1 = 'Makeup'
    serviceProvidersRef.once('value', (snapshot) => {
      snapshot.forEach((eventSnapshot) => {
        eventSnapshot.child('Services').child(value1).child('serviceDetails').forEach((serviceInfo) => {
          const x = (serviceInfo.val())
          var uuid = x.uuid;
          testUuid.push(x.uuid)
          const serviceProvidersRefs = firebase.database().ref('serviceProviders').child(uuid);

      serviceProvidersRefs.once('value', (snapshot) => {
        snapshot.child('PersonalInformation').forEach((personalInfo) => {                
          let persInfo = personalInfo.val();
          companyName = persInfo.companyName;
        });
        snapshot.child('Services').child(value1).child('serviceDetails').forEach((serviceInfo) => {  
      
          let serviceDetails = serviceInfo.val();
          serviceDetails.companyName = companyName

        newState.push(serviceDetails)
       
        this.setState({
          servicesList:newState,
        })  
    
       
      }); 
      

    });
   
      });
      
      });  
      newState = [];
    });
  }
  }


    render() {

        return (
          
<div> 
<navstuffclient.navstuffclient/>

            
            {/* <input className = "nearMeN1" type="text" placeholder="City, Province" name="address"  onChange={e => this.setState({ address: e.target.value })} value={this.state.address} /> */}


{/* <button className = "searchButtonN1"type="submit" onClick={this.showServiceDetails}><i className="fa fa-search"></i></button> */}
      



<div className="searchElements">
<div class="col-lg-11 col-md-5">
<div className="card">
<h3 style={{ background: "white"}} className="card-header light-pink lighten-1 black-text font-weight-bold text-center py-5"> Search Results...

</h3>
  {this.state.servicesList.map((item) =>

/* <div className="searchElements">
<div class="col-lg-11 col-md-5">
<div className="card">
<h3 style={{ background: "white"}} className="card-header light-pink lighten-1 black-text font-weight-bold text-center py-5"> Search Results...

</h3> */
<div className="card-body">
<ul className="list-group">
  <li className="list-group-item d-flex justify-content-between align-items-center">
  <div>
  <b>{item.companyName}</b>
    <br></br> {item.serviceType}
    <br></br> ${item.minPrice} - ${item.maxPrice}
    <br></br> {item.address}
    </div>
  <span>
    {item.ratingAvg?
         <div>
         <StarRatingComponent 
 name="rate1" 
 className = "starEdit"
 // editing={false}
 starCount={5}

 // will come frfom db
 value={item.ratingAvg}
/></div>
:null}
         

</span>
    <button type="button" class="btn btn-primary" onClick={() => this.moveToView(item.uuid, item.serviceType)}>View</button>
  </li>

</ul>
</div>

         )} 

</div>
</div>
</div>

<div style={{ fontSize: "2vmax",fontFamily:"Arial", position:"absolute", top: '-5vh',
  left: '25vw' }}>
&nbsp;&nbsp;  <servicesList.servicesList/>
</div>
  <div style={{ fontSize: "2vmax",fontFamily:"Arial", position:"absolute", top: '-5vh',
  right: '30vw' }}>
  &nbsp; &nbsp;  <searchGoogleMaps.searchGoogleMaps/>  
</div>
<div style={{ fontSize: "2vmax",fontFamily:"Arial", position:"absolute", top: '1vh',
  right: '25vw' }}>
<button className = "searchButtonN1"type="submit" onClick={this.showServiceDetails}><i className="fa fa-search"></i></button>
</div>






<br></br><br></br><br></br><br></br><br></br><br></br><br></br>
<br></br>



<br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>

<br></br><br></br><br></br><br></br>



<div className="spfooter12"> 
    <footer1.footer1/>
     </div>
</div>


        )
    }
  }
    
