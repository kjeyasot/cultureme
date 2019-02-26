import React, { Component } from 'react';
import '../nav.css';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
  } from 'react-router-dom';
  import * as script from '../scripts';

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

  const images1 = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));
export class navstuff extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="dark"  className="navbar-dark navbar-expand-sm font-weight-bold" light expand="md">
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
            <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">Provide a Service</NavLink>
              </NavItem>



                <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">Sign Up</NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">Sign In</NavLink>
              </NavItem>
              {/* <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

