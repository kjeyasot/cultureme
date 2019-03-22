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
let testUuid = []
let newState = []
let companyName;

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

  moveToView(serviceProvider, service) {
    localStorage.setItem('clientSearchSP', serviceProvider);
    localStorage.setItem('clientSearchSType', service);

    window.location = "/viewService"
    // this.props.history.push("/editView")
    
  }
  showServiceDetails() {
    const serviceProvidersRef = firebase.database().ref('serviceProviders');
    const value = this.state.value;
    const address = this.state.address;
    if(value){
    serviceProvidersRef.once('value', (snapshot) => {
      snapshot.forEach((eventSnapshot) => {
        eventSnapshot.child('Services').child(value).child('serviceDetails').forEach((serviceInfo) => {
          const x = (serviceInfo.val())
          var uuid = x.uuid;
          testUuid.push(x.uuid)
          const serviceProvidersRefs = firebase.database().ref('serviceProviders').child(uuid);

      serviceProvidersRefs.once('value', (snapshot) => {
        snapshot.child('PersonalInformation').forEach((personalInfo) => {                
          let persInfo = personalInfo.val();
          companyName = persInfo.companyName;
        });
        snapshot.child('Services').child(value).child('serviceDetails').forEach((serviceInfo) => {  
      // let address = "Toronto, ON, Canada";
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
   
      });
      
      });  
      newState = [];
    });
  }

    else{
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
            <input className = "nearMeN1" type="text" placeholder="City, Province" name="address"  onChange={e => this.setState({ address: e.target.value })} value={this.state.address} />

      </div>


      <button className = "searchButtonN1"type="submit" onClick={this.showServiceDetails}><i className="fa fa-search"></i></button>
<br>
</br>



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
  {item.companyName}
    {/* <br></br> {item.Description} */}
    <br></br> ${item.minPrice} - ${item.maxPrice}
    <br></br> {item.address}

  <span>

<i class="fa fa-star checked"></i>
<i class="fa fa-star checked"></i>
<i class="fa fa-star checked"></i>
<i class="fa fa-star checked"></i>
<i class="fa fa-star checked"></i>

</span>
    <button type="button" class="btn btn-primary" onClick={() => this.moveToView(item.uuid, item.serviceType)}>View</button>
  </li>

</ul>
{/* <h3 style={{ fontSize: "1vw", textAlign: "center"}} className="text-small text-muted mb-0 pt-3">New services added weekly!</h3> */}
</div>














  
//           <div>
//             <h1>{item.companyName}</h1>

// <h1>{item.Description}</h1>
// <h1>{item.uuid}</h1>
// <p>****************************************************************</p>
// </div>
         )} 

</div>
</div>
</div>
</div>


        )
    }
  }
    
