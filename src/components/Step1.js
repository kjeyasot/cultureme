import React, { Component } from 'react';
import firebase, { auth, provider, storage, database  } from '../firebase.js';
import * as footer1 from './footer-nav';
import * as navstuff from './nav-boots';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';


import * as script from '../scripts';
const images = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));


export class stepone extends Component {
    constructor(){
      super()
      this.state = {
        user: null,
        file: null,
        url: [],
        images: []
      }

      this.handleChange = this.handleChange.bind(this)
      this.storePhoto = this.storePhoto.bind(this)
      this.deletePhoto = this.deletePhoto.bind(this)
    }

    
    handleChange(e) {
      this.setState({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      })
    }
    storePhoto() {
        auth.onAuthStateChanged((user) => {
            if (user) {
              this.setState({ user });
      const key = database.ref().child('Photos').child(this.state.user.uid).push().key
      const img = storage.ref().child('Images').child(this.state.user.uid).child(key)
    
    // WORKING FOR DB
    img.put(this.state.file).then((snap) => {
        // console.log('test'+ snap.metadata.downloadURLs)
        storage.ref().child('Images').child(this.state.user.uid).child(img.name).getDownloadURL().then(url => {
        database.ref().child('Photos').child(this.state.user.uid).child(key).set({
          "url" : url
        })
      })
      })
      
      this.setState({
        file: null,
        url: null,
      })
    }
})
}


    deletePhoto(event) {
      let uid = this.state.user.uid
      let img = event.target.name
      storage.ref().child('Images').child(uid).child(img).delete()
      database.ref().child('Photos').child(this.state.user.uid).child(img).remove()

    }
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
              this.setState({ user });
      
      const ref = database.ref().child('Photos').child(this.state.user.uid)
      ref.on('child_added', (child) => {
        let images = this.state.images.slice()
        images.push({
          key: child.key,
          url: child.val().url
        })
        this.setState({images})
      })
      ref.on('child_removed', (child) => {
        let images = this.state.images.filter((image) => {
          return image.url != child.val().url
        })
        this.setState({images})
      })
    } 
});
    }
    render() {
      const previewStyle = {
        maxHeight: "100px",
        maxWidth: "100px",
        float:'right'
      }
      const imgStyle = {
        maxHeight: "150px",
        maxWidth: "150px",
        float:'middle',
        paddingRight: "15px",
        paddingBottom:"20px",
      }

      return (
        <div>

          <navstuff.navstuff/>
      
      <div class = "moveElements">
        <div>
            <div>
            <h3 style={{float:'middle', fontFamily:"Arial"}}>Let's get started with creating a service</h3>
           <br></br>
            <h5 style={{float:'middle', fontFamily:"Arial"}}>Step 1: What type of service do you want to provide</h5>
            {/* {this.state.user ?
            <div>
            {this.state.user.uid}</div>: null
        } */}
        </div>
        <div>
         <img className = "CoolGyalstep1" alt="sideImage" src={images['cool.png']}/>
      </div>
 
    
    <div className="threetings">
    <label for="ServiceType">Service Type</label>
    <input className='steponebutton' id = 'ServiceType'type = 'text' name='ServiceType' placeholder = 'Ex. Mehendi, Bridal Makeup' onChange={this.handleChange} value={this.state.email}/><br></br>
    <label for="Description">Description                .</label>
    <input className='steponebutton' id = 'Description'type = 'text' name='Description' placeholder = 'Ex. I have 4 years of experience creating' onChange={this.handleChange} value={this.state.password}/><br></br>
    <label for="PrinceRange">Price Range</label>
    <input className='steponebutton' id = 'PrinceRange'type = 'text' name='PrinceRange' placeholder = 'Ex. $25-$30' onChange={this.handleChange} value={this.state.password}/><br></br>
    <label for="countryId">Location</label>
    <input type="hidden" name="country" id="countryId" value="CA"/>
<select name="state" class="states order-alpha" id="stateId">
    <option value="">Select Province</option>
</select>
&nbsp;&nbsp;
&nbsp;&nbsp;
<select name="city" class="cities order-alpha" id="cityId">
    <option value="">Select City</option>
</select>

    <br></br>

 <Link to="/Upload">
    <input className = 'step1cnt' type= 'submit' value= 'Continue'/> </Link><br></br>  
  </div>
        </div>

    </div>
    <div className="spfooter1"> 
        <footer1.footer1/>
         </div>
    </div>
      );
    }
  }
