import React, { Component } from 'react';
import './App.css';
// import * as modalComp from './components/modal';
import * as mainPage from './components/mainPage';
import * as searchRes from './components/tempSearchRes';
import * as Test3 from './Test3';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
            <Route path="/signup" component={mainPage.mainPage} />
            <Route path="/forgotpassword" component={mainPage.mainPage} />
            <Route path="/Test3" component={Test3.Test3} />
          </Switch>
        </div>
        </header>
      </div>
    </Router>
    );
  }


}

export default App;