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
export class navstuffclient extends Component {
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

        <Link to= "/">
          <NavbarBrand> 
          <img className="lnav" alt="logo" src={images1['logoCM.png']} />
          </NavbarBrand>
         </Link>
     

          <div>
          {/* <div className="BackSearchN"></div> */}

     
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

              
              // <UncontrolledDropdown nav inNavbar>
              //   <DropdownToggle nav caret>
              //   <i class="fa fa-user"></i> Profile
              //   </DropdownToggle>
              //   <DropdownMenu right>
              //   <Link to="/myAccount">
              //     <DropdownItem >
              //       My Account
              //     </DropdownItem>
              //     </Link>
              //     <Link to="/">
              //     <DropdownItem onClick={this.logout}>
              //     Logout
              //     </DropdownItem>
              //     </Link>
              //   </DropdownMenu>
              // </UncontrolledDropdown>
              <NavItem>
              <NavLink href="/" onClick={this.logout}>Logout</NavLink>
             </NavItem>
            
            
            
            } 
            </Nav>
          </Collapse>
        </Navbar>
      </div>



    );
  }
}

