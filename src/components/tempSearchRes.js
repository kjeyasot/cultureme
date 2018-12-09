import React, { Component } from 'react';
import '../App.css';
import * as script from '../scripts';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import * as modalComp from './modal';
import Modal from "react-responsive-modal";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button ,FormGroup, FormControl} from 'react-bootstrap';
const images = script.importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));
export class searchRes extends Component {
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
      const { open } = this.state;
        return (
          <div>
<Navbar inverse collapseOnSelect>
  <Navbar.Header>
    <Navbar.Brand>
      <img className="logo" src={images['logoCM.png']}  />
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  
 <div>
 <input className = "searchbarNAV" type="text" placeholder="Search.." name="searchbarNAV"/>
        <button className = "searchButtonNAV"type="submit">{()=>this.setState({ showModal1:true, showModal2:false, showModal3:false})}<i className="fa fa-search"></i></button>
        
 </div>





  <Navbar.Collapse>
    <Nav pullRight>
      <NavItem eventKey={1} onClick={()=>this.setState({ showModal1:true, showModal2:false, showModal3:false})} >
    
        <Modal open={this.state.showModal1} onClose={() => this.setState({ showModal1:false, showModal2:false, showModal3:false})} center className="modal">
        <div className="testModal">
        <div className="content">
          <modalComp.signInModal/>
          <u onClick={()=>this.setState({ showModal1:false, showModal2:false, showModal3:true})}> Forgot Password?</u><br></br>
                <p1>Don't have an account?</p1>
                <u id="signUpTxt" onClick={()=>this.setState({ showModal1:false, showModal2:true, showModal3:false})}> Sign Up </u> 
          </div>
          </div>
        </Modal>

  Sign In  


      </NavItem>
      <NavItem eventKey={2} onClick={()=>this.setState({ showSignIn:true, showSignUp:false, showForgotPw:false})}>

     
      {/* <button className="signInBtn" onClick={()=>this.setState({ showSignIn:true, showSignUp:false, showForgotPw:false})}>Sign In</button> */}
        
       <Modal open={this.state.showSignUp} onClose={() => this.setState({ showSignUp:false, showSignIn:false, showForgotPw:false })} center>
        <div className="testModal">
        <div className="content">
          <modalComp.signUpModal/>
          <p1>Already have an account?</p1>
          <Link to="/signin">
          <u id="signInTxt" onClick={()=>this.setState({ showSignIn:true, showSignUp:false, showForgotPw:false})}> Sign In</u>
          </Link>
          </div>
          </div>
        </Modal>
        

        <Modal open={this.state.showModal3} onClose={() => this.setState({ showModal3:false})} center>
        <div className="testModal">
        <div className="content">
          <modalComp.forgotPwModal/>
        </div>
        </div>
        </Modal>
       Sign Up 
       
      </NavItem>  

      </Nav>
  </Navbar.Collapse> 
</Navbar>
<Link to="/serviceprovider">
       <button className = "searchButton"type="submit"><i className="fa fa-search"></i></button>
       </Link>
       </div>
        );
    
    }}