import React, { Component } from 'react';
import '../App.css';
import * as script from '../scripts';
import { Link } from 'react-router-dom';
import firebase, { auth, provider } from '../firebase.js';

import * as footer1 from './footer-nav';
import * as navstuff from './nav-boots';


const images = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));

let servicetype;
export class editView extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      user: null,
      servicetype: '',
      phoneNumber:'9819191919',
      description:"blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah",

      isInEditMode:false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChanges = this.handleChanges.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.readData = this.readData.bind(this);
    this.loginWEmail = this.loginWEmail.bind(this);
    this.login = this.login.bind(this); 
    this.logout = this.logout.bind(this); 
    this.Activate = this.Activate.bind(this); 
    this.Updated = this.Updated.bind(this); 
    this.renderEditview = this.renderEditview.bind(this); 
    this.renderDefaultview = this.renderDefaultview.bind(this); 
    this.r = this.r.bind(this); 
    
    this.firstMethod = this.firstMethod.bind(this); 
    this.secondMethod = this.secondMethod.bind(this);
    this.thirdMethod = this.thirdMethod.bind(this);
    
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      
      

    });  }
  
  logout() {
    auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
  }

  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }

  loginWEmail(e) {
    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
    .then((result) => {
      const user = result.user;
      this.setState({
        user
      });
    });
      
  } 
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        const serviceProvidersRef = firebase.database().ref('serviceProviders').child(user.uid);

        serviceProvidersRef.once('value', (snapshot) => {
            snapshot.child('PersonalInformation').forEach((personalInfo) => {                
              let persInfo = personalInfo.val();
              // const test = CryptoJS.AES.decrypt(persInfo.password.toString(), 'secret key 123');
              // const pw = test.toString(CryptoJS.enc.Utf8);
              // testemail.push(persInfo.firstName);
              servicetype = persInfo.firstName;
              // lastName = persInfo.lastName;
              // email = persInfo.email;
              // companyName = persInfo.companyName;
              // mobile = persInfo.mobile;
              // postalCode = persInfo.postalCode;
              // password = pw;

      

            });
            this.setState({
              servicetype: servicetype,
              // lastName: lastName,
              // companyName: companyName,
              // email: email,
              // mobile: mobile,
              // postalCode: postalCode,
              // password: password,
            })
        });

      } 
      
    });
  }
  readData() {
    this.state.serviceProviders.map((sevProv) => {
          //  testusername.push(sevProv.userName); 
          //  testemail.push(sevProv.email);
   })
 }
 Activate() {
   this.setState ({
     isInEditMode: !this.state.isInEditMode

   });
  }
   Updated(e) {

    auth.onAuthStateChanged((user) => {
      if (user) {
    
        const servPV = {
          firstName: this.state.servicetype,
       
        }
        // console.log(this.state.servicetype)
        const serviceProvidersRef = firebase.database().ref('serviceProviders').child(user.uid);

        serviceProvidersRef.once('value', (snapshot) => {
            snapshot.child('PersonalInformation').forEach((personalInfo) => {
              console.log(personalInfo)   
              personalInfo.ref.update(servPV)             
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
   handleChanges(e) {
    this.setState({
      servicetype: e.target.value
      // phoneNumber:e.target.value
      

    }); 
  
   
  
  }

    r(e){
      auth.onAuthStateChanged((user) => {
        if (user) {
          this.setState({ user });
          const serviceProvidersRef = firebase.database().ref('serviceProviders').child(user.uid);
  
          serviceProvidersRef.once('value', (snapshot) => {
              snapshot.child('PersonalInformation').forEach((personalInfo) => {                
                let persInfo = personalInfo.val();
                
                servicetype = persInfo.firstName;
             
              });
              this.setState({
                servicetype: servicetype,
                isInEditMode: false
               
              })
          });
  
        } 
        
      });
    }
    // onKeyPress(event) {
    //   return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122);
    // }
    firstMethod(e) {
      const re = /[a-zA-Z]+/g;
      if (!re.test(e.key)) {
        e.preventDefault();
      }
    }

    secondMethod(evt) {
      const phoneNumber = (evt.target.validity.valid) ? evt.target.value : this.state.phoneNumber;
    
      this.setState({ phoneNumber });
    }

    thirdMethod(e) {
      this.setState({
        description: e.target.value
      
      });
    }
   renderEditview() {
      return  <div className = "content" >
        <form>
    
     <div className="edit">
     <input  className="contentVE" id="servicetype" type="text" value={this.state.servicetype}  onKeyPress={(e) => this.firstMethod(e)} onChange={this.handleChanges.bind(this) }/>
     &nbsp;&nbsp;<i class="fas fa-check" onClick={this.Updated}></i>  &nbsp;&nbsp;
    <i class="fa fa-times" onClick={this.r}></i></div>
     <input  className="contentVE" type="text" pattern="[0-9]*" maxLength= "10" value={this.state.phoneNumber} onChange={ this.secondMethod.bind(this)} />
     <textarea className='contentVES' type = 'text' value={this.state.description} onChange={ this.thirdMethod.bind(this)}   />
     
     
    </form>
     
 </div>
   }
   renderDefaultview() {
   return <div>

    <h5  className="contentVE"  type="text" >{this.state.servicetype}     <span class="fas fa-pen"    onClick={this.Activate} ></span></h5>
    <h5  className="contentVE"  type="text" >{this.state.phoneNumber}</h5>
       <h5 className="contentVES" type = 'text'> {this.state.description}</h5> 
     
   </div>
   }
  render() {
      return (
        <div>
     <navstuff.navstuff/>
     <h3 className="HeadingVE">Company Name</h3>
   
   {/* for (let i = 0; i < this.state.phoe; i++) {
    <i class="fa fa-star checked"></i>
     
   } */}
   <div className="symbols">
   <i class="fa fa-star checked"></i>
   <i class="fa fa-star checked"></i>
   <i class="fa fa-star checked"></i>
   <i class="fa fa-star checked"></i>
   <i class="fa fa-star checked"></i>
   </div>
  
 {this.state.isInEditMode ?
 this.renderEditview()  :
 this.renderDefaultview()
}
    <div className="spfooter1"> 
        <footer1.footer1/>
         </div>
    </div>
        
    );
  }
}
