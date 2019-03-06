import React, { Component } from 'react';
import '../App.css';
import firebase, { auth, provider } from '../firebase.js';
import * as footer1 from './footer-nav';
import * as navstuff from './nav-boots';
import * as script from '../scripts';

const images1 = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));

// const images1 = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));
  
// const images = script.importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));
// let num = Object.keys(images).length-1;
// var y = Math.floor(num * Math.random());
// let dbdata;
// let dbkey;
 
export class SPChooseService extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    }
    this.login = this.login.bind(this); 
    this.logout = this.logout.bind(this); 
  

  }

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
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });
  }


    render(){
    return (
      
      <div> 
      <navstuff.navstuff/>
<a class="CoolGyal" href="" ><img class="CoolGyalImg" alt="logo" src={images1['cool.png']}  /></a>
<div class="threeicons">
<button class="btn12" type="submit">Add A Service</button>
<button class="btn12" type="submit"> View My Services</button>
<div class="icon-plus">
<a href="#" class="fafaplus-icon"><i class="fa fa-plus fa-5x"></i></a>
</div>


{/* <i class="fa fa-car" style="font-size:48px;"></i> */}
<i class="fa fa-eye"></i> 
</div>


<div className="spfooter">
        <footer1.footer1/>
        </div>
      </div>

      
     );
         }
       }