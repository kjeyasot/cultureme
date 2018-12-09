import React, { Component } from 'react';
import '../App.css';
import * as script from '../scripts';
import Modal from "react-responsive-modal";
import * as modalComp from './modal';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import * as popServ from './popularServices';


const images = script.importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

export class imagesList extends Component {
  state = {
    open: false
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
      return (
        <div>
        <img className="slide" alt="bridal" src={images['bridal.jpg']}/>
        <img className="slide" alt="henna" src={images['henna.jpg']} />
        <img className="slide" alt="hair" src={images['hair.jpg']} />
        <img className="slide" alt="pic1" src={images['pic1.jpg']}/>
        <img className="slide" alt="pic2" src={images['pic2.jpg']}/>
        <img className="slide" alt="pic3" src={images['pic3.jpg']}/>
        <img className="slide" alt="pic4" src={images['pic4.jpg']}/>
        <img className="slide" alt="pic5" src={images['pic5.jpg']}/>
        <img className="logoCM" alt="logo" src={images['logoCM.png']} />
        <input className = "search" type="text" placeholder="Search.." name="search"/>
        <button className = "searchButton"type="submit"><Link to="/popularsev"><i className="fa fa-search"></i></Link></button>
        <Switch>
              {/* below is tp define the main page */}
            {/* <Route exact={true} path="/" component={img.imagesList} /> */}
            <Route path="/popularsev" component={popServ.popServ} />
            {/* <Route path="/test" component={slides.Slideshow} /> */}
            
          </Switch>
          <button className="signInBtn" onClick={()=>this.setState({ showModal1:true, showModal2:false, showModal3:false})}>Sign In</button>
        <Modal open={this.state.showModal1} onClose={() => this.setState({ showModal1:false, showModal2:false, showModal3:false})} center className="modal">
        <div className="modal">
        <div className="content">
          <modalComp.signInModal/>
          <u onClick={()=>this.setState({ showModal1:false, showModal2:false, showModal3:true})}> Forgot Password?</u><br></br>
                <p1>Don't have an account?</p1>
                <u id="signUpTxt" onClick={()=>this.setState({ showModal1:false, showModal2:true, showModal3:false})}> Sign Up </u> 
          </div>
          </div>
        </Modal>

        <button className="signUpBtn" onClick={()=>this.setState({ showModal1:false, showModal2:true, showModal3:false})}>Sign Up</button>
        <Modal open={this.state.showModal2} onClose={() => this.setState({ showModal2:false})} center>
        <div className="modal">
        <div className="content">
          <modalComp.signUpModal/>
          <p1>Already have an account?</p1>
          <u id="signInTxt" onClick={()=>this.setState({ showModal1:true, showModal2:false})}> Sign In</u>
          </div>
          </div>
        </Modal>

        <Modal open={this.state.showModal3} onClose={() => this.setState({ showModal3:false})} center>
        <div className="modal">
        <div className="content">
          <modalComp.forgotPwModal/>
        </div>
        </div>
        </Modal>
        </div>
    );
  }
}


