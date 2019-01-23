import React, { Component } from 'react';
import './App.css';
// import * as modalComp from './components/modal';
import * as mainPage from './components/mainPage';
import * as searchRes from './components/tempSearchRes';
import * as serviceProvider from './components/serviceProvider';
import * as signup from './components/signUpMain';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { signUpSP } from './components/signUpSP';

class App extends Component {
  
  render() {
    return (
    <Router>
      <div className="App">
        <header className="App-header">
        <div className="containerM" >
            <Switch>
            <Route exact={true} path="/" component={mainPage.mainPage} />
            <Route path="/searchresults" component={searchRes.searchRes} /> 
            <Route path="/signin" component={mainPage.mainPage} />
            <Route path="/signup" component={signup.signUpPage} />
            <Route path="/signup-serviceprovider" component={signUpSP} />

            <Route path="/forgotpassword" component={mainPage.mainPage} />
            <Route path="/serviceProvider" component={serviceProvider.serviceProvider} />

            <Route path="/signin1" component={searchRes.searchRes} />
            <Route path="/signup1" component={searchRes.searchRes} />
            <Route path="/forgotpassword1" component={searchRes.searchRes} />

          </Switch>
        </div>
        </header>
      </div>
    </Router>
    );
  }


}

export default App;