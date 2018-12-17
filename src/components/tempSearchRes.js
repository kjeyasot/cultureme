import React, { Component } from 'react';
import '../App.css';
import * as script from '../scripts';
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
        return (
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
      <NavItem eventKey={2}  >
      <button className="signUpBtn" onClick={()=>this.setState({ showModal1:false, showModal2:true, showModal3:false})}>Sign Up</button>
        <Modal open={this.state.showModal2} onClose={() => this.setState({ showModal2:false})} center>
        <div className="testModal">
        <div className="content">
          <modalComp.signUpModal/>
          <p1>Already have an account?</p1>
          <u id="signInTxt" onClick={()=>this.setState({ showModal1:true, showModal2:false})}> Sign In</u>
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
        );
    
    }}