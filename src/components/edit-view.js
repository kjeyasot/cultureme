import React, { Component } from 'react';
import '../App.css';
import * as script from '../scripts';
import { Link } from 'react-router-dom';
import firebase, { auth, provider, storage, database  } from '../firebase.js';

import * as footer1 from './footer-nav';
import * as navstuff from './nav-boots';


const images = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));

let companyName;
let mobile, Description,minPrice, maxPrice, city , province, serviceType ;
let newState = []
export class editView extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      user: null,
      serviceType: '',
      companyName: '',
      mobile:'',
      Description: '',
      minPrice : '',
      maxPrice: '',
      city: '',
      province: '',
      images: [],
      isInEditMode:false
    }
    this.handleChange = this.handleChange.bind(this);
    // this.handleChanges = this.handleChanges.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.Activate = this.Activate.bind(this); 
    this.Updated = this.Updated.bind(this); 
    this.userIntUpdate = this.userIntUpdate.bind(this); 
    this.deletePhoto = this.deletePhoto.bind(this)


    
  }
  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  componentDidMount() {
    this.hydrateStateWithLocalStorage();
    const data = localStorage.getItem('myData')
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        const serviceProvidersRef = firebase.database().ref('serviceProviders').child(user.uid);

        serviceProvidersRef.once('value', (snapshot) => {
            snapshot.child('PersonalInformation').forEach((personalInfo) => {                
              let persInfo = personalInfo.val();
              companyName = persInfo.companyName;
              mobile = persInfo.mobile;
            });
            this.setState({
              companyName: companyName,
              mobile: mobile,
              serviceType: data
            })
        });

        const serviceDetails = firebase.database().ref('serviceProviders').child(user.uid).child('Services').child(data);

        serviceDetails.once('value', (snapshot) => {
          snapshot.child('serviceDetails').forEach((servDetails) => {   
            let servInfo = servDetails.val();
            Description = servInfo.Description;
            minPrice = servInfo.minPrice;
            maxPrice= servInfo.maxPrice;
            city= servInfo.city;
            province= servInfo.state;

          });
          snapshot.child('photos').forEach((servPhotos) => {   
            newState.push({
              key: servPhotos.key,
              url: servPhotos.val().url
            })  
            });
          

          this.setState({
            companyName: companyName,
            Description: Description,
            minPrice: minPrice,
            maxPrice: maxPrice,
            city: city,
            province: province,
            images: newState
          })
     
      
      
    });
  }
  });
  
    
  }

  userIntUpdate() {
    this.hydrateStateWithLocalStorage();
    const data = localStorage.getItem('myData')
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        const serviceProvidersRef = firebase.database().ref('serviceProviders').child(user.uid);

        serviceProvidersRef.once('value', (snapshot) => {
            snapshot.child('PersonalInformation').forEach((personalInfo) => {                
              let persInfo = personalInfo.val();
              companyName = persInfo.companyName;
              mobile = persInfo.mobile;
            });
            this.setState({
              companyName: companyName,
              mobile: mobile,
              serviceType: data,
              isInEditMode: false

            })
        });

        const serviceDetails = firebase.database().ref('serviceProviders').child(user.uid).child('Services').child(data);

        serviceDetails.once('value', (snapshot) => {
          snapshot.child('serviceDetails').forEach((servDetails) => {   
            let servInfo = servDetails.val();
            Description = servInfo.Description;
            minPrice = servInfo.minPrice;
            maxPrice= servInfo.maxPrice;
            city= servInfo.city;
            province= servInfo.state;

          });
          snapshot.child('photos').forEach((servPhotos) => {   
            newState.push({
              key: servPhotos.key,
              url: servPhotos.val().url
            })  
            });
          

          this.setState({
            companyName: companyName,
            Description: Description,
            minPrice: minPrice,
            maxPrice: maxPrice,
            city: city,
            province: province,
            images: newState
          })
     
      
      
    });
  }
  });


  }
  
 
 Activate(e) {
   this.setState ({
     isInEditMode: true

   });
  localStorage.setItem("isInEditMode", true)
   window.location.reload()
  localStorage.getItem("isInEditMode")
  
  }
   Updated(e) {

    auth.onAuthStateChanged((user) => {
      if (user) {
    
        const servPV = {
          // companyName: this.state.companyName,
          // companyName: this.state.companyName,
       
        }
        // console.log(this.state.servicetype)
        const serviceProvidersRef = firebase.database().ref('serviceProviders').child(user.uid);

        serviceProvidersRef.once('value', (snapshot) => {
            snapshot.child('PersonalInformation').forEach((personalInfo) => {
              // console.log(personalInfo)   
              // personalInfo.ref.update(servPV)             
            //  window.location.reload(true);

            });
        })
            }
    })
  
this.setState({
isInEditMode: false
//store to database


}) ; 

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

  deletePhoto(event) {
    this.hydrateStateWithLocalStorage();
    const data = localStorage.getItem('myData');
    let uid = this.state.user.uid;
    let img = event.target.name;
    storage.ref().child('Images').child(uid).child(img).delete();
    firebase.database().ref('serviceProviders').child(uid).child('Services').child(data).child('photos').child(img).remove();
  }

  render() {
    const imgStyle = {
      maxHeight: "150px",
      maxWidth: "150px",
      float:'middle',
      paddingRight: "15px",
      paddingBottom:"20px",
    }
      return (
       
        <div>
        
        <div>
        <navstuff.navstuff/>
        <h3 className="HeadingVE" > {this.state.companyName}</h3>
     <h5  className="contentVE"  type="text" >{this.state.mobile}</h5>




  
   <div className="symbols">
   <i class="fa fa-star checked"></i>
   <i class="fa fa-star checked"></i>
   <i class="fa fa-star checked"></i>
   <i class="fa fa-star checked"></i>
   <i class="fa fa-star checked"></i>
   </div>

      <div class = "moveElements">
            
           
            <form>


 {!this.state.isInEditMode? 
 <div>
      <h5  className="contentVE"  type="text" >{this.state.serviceType} <span class="fas fa-pen" onClick={this.Activate} ></span></h5>
      <h5 className="contentVES" type = 'text'> {this.state.Description}</h5> 
      <h5 className="contentVES" type = 'text'> {this.state.minPrice} - {this.state.maxPrice}</h5> 
      <h5 className="contentVES" type = 'text'> {this.state.city}, {this.state.province}</h5> 












      </div>
:
<div>
      <div className="edit">
     <input  className="contentVE" name="serviceType" id="serviceType" pattern ="[A-Za-z\s]*" maxlength="30" type="text" value={this.state.serviceType} onChange={this.handleChange}/>
     &nbsp;&nbsp;<i class="fas fa-check" onClick={this.Updated}></i>  &nbsp;&nbsp;
    <i class="fa fa-times" onClick={this.userIntUpdate}></i>
    </div>
    <input  className="contentVE" name = "Description" id="Description" type="text" value={this.state.Description} onChange={this.handleChange}/><br></br>
    <input  className="contentVE" name="minPrice" id="minPrice" type="text" pattern="[0-9]*" maxlength="4"  onChange={this.handleChange} value={this.state.minPrice}/>
    <input  className="contentVE" name="maxPrice" id="maxPrice" type="text" pattern="[0-9]*" maxlength="4" value={this.state.maxPrice} onChange={this.handleChange}/><br></br>
    {( this.state.minPrice && this.state.maxPrice && Number(this.state.minPrice)>= Number(this.state.maxPrice))? <p id="letter" className="invalid">Invalid Price Range</p>:null}

    {/* <input  className="contentVE" id="city" type="text" value={this.state.city} onChange={this.handleChange}/> */}
    {/* <input  className="contentVE" id="state" type="text" value={this.state.state} onChange={this.handleChange}/> */}

    <div class="row">
           
           <div class="col">
     
   <input type="hidden" name="country" id="countryId" value="CA"
   />
<select name="province" class="states order-alpha browser-default custom-select custom-select- mb-3"   id="stateId"
onChange={this.handleChange}
value={this.state.province}>
   <option value="">Select Province</option>
</select>
</div>

&nbsp;&nbsp;
&nbsp;&nbsp;
<div class="col">
<select Async name="city" class="cities order-alpha browser-default custom-select custom-select-md mb-3" id="cityId"
onChange={this.handleChange} 
value={this.state.city}>
   <option value="">Select City</option>
</select>
</div>
</div>

</div>
  }
 
 
 {this.state.images.map((image) =>
            <div key={image.key}>
            <h1>{image.file}</h1>
            <div class="row">
                <div class="column">
              <img src={image.url} style={imgStyle}/>
              <button className = "removeButton" onClick={this.deletePhoto} 
                 name={image.key}>X</button>

                             </div>
              </div>
            </div>
          )}

               &nbsp;&nbsp;
               <div className = 'editButtons' >
               {/* {this.state.isInEditMode?  <button className = "fa fa-save" type= 'submit' disabled={!this.state.companyName||!this.state.mobile||this.state.mobile.length<10||testCompany.indexOf(this.state.companyName)>-1||testPhone.indexOf(this.state.mobile)>-1}   onClick={this.userUpdate} ></button> : null} */}
              
              
               </div>
               
              </form>

            
     
      </div>

    <div className="spfooter">
        <footer1.footer1/>
        </div>
        </div>
       
    </div>


    );
  }
}