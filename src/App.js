import React, { Component } from 'react';
import './App.css';
// import Popup from "reactjs-popup";

// import * as script from './scripts';
import Modal from "react-responsive-modal";
import * as modalComp from './components/modal';
import * as img from './components/images';
// const images = script.importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

class App extends Component {
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
    // const { open } = this.state;
    return (
      
      <div className="App">
       
        <header className="App-header">
        <div className = "test" > </div>
        <div className="container" >
            <img.imagesList/>
            <input className = "search" type="text" placeholder="Search.." name="search"/>
            <button className = "searchButton"type="submit"><i className="fa fa-search"></i></button>
            
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
        </header>
      </div>

 
    );
  }


}

export default App;