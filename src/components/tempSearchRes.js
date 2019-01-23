import React, { Component } from 'react';
// import '../App.css';
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
const images = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));
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
{/* <Navbar inverse >
  <Navbar.Header>
    <Navbar.Brand>
      <Link to = "/">
      <img className="logo" src={images['logoCM.png']}  />
      </Link>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  
 <div>
 

       <input className = "searchNAV" type="text" placeholder="Search.." name="search"/>
      
       <button className = "searchButtonNAV"type="submit"><i className="fa fa-search"></i></button>
      
    
 </div>
 <Navbar.Collapse>
 <Nav pullRight>
 <Link to="/signin1">
          <h4 className= "SigninNAV" onClick={()=>this.setState({ showSignIn:true, showSignUp:false, showForgotPw:false})}> Sign In</h4><br></br>
          </Link>
 
        <Modal open={this.state.showSignIn} onClose={() => this.setState({ showSignIn:false, showSignUp:false, showForgotPw:false})} 
        center className="testModal">
        <div className="testModal">
        <div className="content">
        <modalComp.signInModal/>
        <Link to="/forgotpassword1">
          <u onClick={()=>this.setState({ showSignIn:false, showSignUp:false, showForgotPw:true})}> Forgot Password?</u><br></br>
          </Link>
          <p1>Don't have an account?</p1>
          <Link to="/signup1">
          <u id="signUpTxt" onClick={()=>this.setState({ showSignIn:false, showSignUp:true, showForgotPw:false})}> Sign Up </u> 
          </Link>
          </div>
          </div>
        </Modal>
       
        <Link to="/signup1">
        <h4 className= "SignupNAV" onClick={()=>this.setState({showSignIn:false, showSignUp:true, showForgotPw:false})}>Sign Up</h4><br></br>
        <Modal open={this.state.showSignUp} onClose={() => this.setState({ showSignUp:false, showSignIn:false, showForgotPw:false })} center>
        <div className="testModal">
        <div className="content">
          <modalComp.signUpModal/>
          <p1>Already have an account?</p1>
          <Link to="/signin1">
          <u id="signInTxt" onClick={()=>this.setState({ showSignIn:true, showSignUp:false, showForgotPw:false})}> Sign In</u>
          </Link>
          </div>
          </div>
        </Modal>
        </Link>
        <Link to="/forgotpassword1">
        <Modal open={this.state.showForgotPw} onClose={() => this.setState({ showForgotPw:false, showSignIn:false, showSignUp:false})} center>
        <div className="testModal">
        <div className="content">
          <modalComp.forgotPwModal/>
        </div>
        </div>
        </Modal>
        </Link>
</Nav>
 </Navbar.Collapse>
</Navbar> */}

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"></link>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
<Navbar inverse collapseOnSelect>
  <Navbar.Header>
    <Navbar.Brand>
    <Link to = "/">
      <img className="logo" src={images['logoCM.png']}  />
      </Link>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>

  <Navbar.Collapse>
  <Navbar.Form pullLeft>
      <FormGroup>
        <FormControl type="text" placeholder="Search" />
      </FormGroup>{' '}
      <Button type="submit">Submit</Button>
    </Navbar.Form>
    <Nav>
      <NavItem eventKey={1} href="#">
        Link
      </NavItem>
      <NavItem eventKey={2} href="#">
        Link
      </NavItem>
      <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
        <MenuItem eventKey={3.1}>Action</MenuItem>
        <MenuItem eventKey={3.2}>Another action</MenuItem>
        <MenuItem eventKey={3.3}>Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.3}>Separated link</MenuItem>
      </NavDropdown>
    </Nav>
    <Nav pullRight>
      <NavItem eventKey={1} href="#">
        Link Right
      </NavItem>
      <NavItem eventKey={2} href="#">
        Link Right
      </NavItem>
    </Nav>
  </Navbar.Collapse>
</Navbar>



<Link to="/serviceProvider"> 
       <button className = "searchButton"type="submit"><i className="fa fa-search"></i></button>
        </Link>
       </div>
        );
    
    }}