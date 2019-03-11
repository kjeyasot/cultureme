import React, { Component } from 'react';
import '../nav.css';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
  } from 'react-router-dom';
  import * as script from '../scripts';
  import {Fragment} from 'react';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
  import firebase, { auth, provider } from '../firebase.js';
  const images1 = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));
export class navstuff extends Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
  
    this.state = {
      user: null,
      isOpen: false
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
 
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="dark"  className="navbar-dark font-weight-bold" light expand="xl">
          <NavbarBrand  href="/"> <img className="lnav" alt="logo" src={images1['logoCM.png']} /></NavbarBrand>
         
          <div>
          {/* <div className="BackSearchN"></div> */}
      <div className="SearchLabelCssN"></div>
      <input type="text" className = "searchlabelN" value="Search"  readonly="readonly"/>
      
      <input className = "searchN" type="text" placeholder="Henna, Bridal Makeup.." name="search"/>
      <input className = "nearMeN" type="text" placeholder="City, Province" name="nearMe"/>
      <input type="text" className = "nearMelabelN" value="Near"  readonly="readonly"/>
     
      
       <button className = "searchButtonN"type="submit"><i className="fa fa-search"></i></button>
     
          </div>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>

            <Nav className="ml-auto" navbar >
            
              {!this.state.user ?
              // <Fragment> 
              //    <NavItem>
              //   <NavLink href="./searchresults">Find a Service</NavLink>
              // </NavItem>
              //   <NavItem>
              //   <NavLink href="./signup-serviceprovider">Sign Up</NavLink>
              // </NavItem>

              // <NavItem>
              //   <NavLink href="/signInSP">Sign In</NavLink>
              // </NavItem>
              // </Fragment>
              null
              :

              
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                <i class="fa fa-user"></i> Profile
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem >
                    My Account
                  </DropdownItem>
                  <Link to="/">
                  <DropdownItem onClick={this.logout}>
                  Logout
                  </DropdownItem>
                  </Link>
                </DropdownMenu>
              </UncontrolledDropdown>} 
            </Nav>
          </Collapse>
        </Navbar>
      </div>



    );
  }
}

