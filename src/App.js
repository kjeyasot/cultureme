import React, { Component } from 'react';
import './App.css';
import Popup from "reactjs-popup";

import * as script from './scripts';
import * as Modal from './components/modal';

const images = script.importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

class App extends Component {
 
  render() {
    return (
           <div className="App">
       
        <header className="App-header">
        <div className="container" >
                <img className="slide" alt="bridal" src={images['bridal.jpg']}/>
                <img className="slide" alt="henna" src={images['henna.jpg']} />
                <img className="slide" alt="hair" src={images['hair.jpg']} />
                <div>
    <Popup trigger={<button className="signInBtn"> Sign In </button>} modal>
    {close => (
      <div className="modal">
        <a className="close" onClick={close}>
          &times;
        </a> 
        <div className="content">
        <Modal.signInModal/> 
        </div>    
      </div>  
    )}
    </Popup>
    <Popup trigger={<button className="signUpBtn"> Sign Up </button>} modal >
        {close => (
      <div className="modal">
        <a className="close" onClick={close}>
          &times;
        </a> 
        <div className="content">
        <Modal.signUpModal/>
         
        </div>    
      </div>  
        )}
    </Popup>
    </div>
        </div>
        </header>
      </div>

 
    );
  }


}

export default App;