import React, { Component } from 'react';
import './App.css';
// import * as modalComp from './components/modal';
// import * as mainPage from './components/mainPage';
// import * as searchRes from './components/tempSearchRes';
import * as serviceProvider from './components/serviceProvider';
// import * as signup from './components/signUpMain';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { signUpSP } from './components/signUpSP';
import { signUpClient } from './components/signUpClient';
import { mainPage } from './components/mainPage';
import { searchRes } from './components/tempSearchRes';
import { signUpPage } from './components/signUpMain';
import { signIn } from './components/signIn';
import { forgotpassword } from './components/forgotPw';
import { imageUpload } from './components/imageUpload';
import { Upload } from './components/Upload';
import { signInSP } from './components/signInSP';
import { navstuff } from './components/nav-boots';
import { footer1 } from './components/footer-nav';
import { SPChooseService } from './components/SPChooServ';
import { stepone } from './components/Step1';
import { myAccount } from './components/myAccount';
import { aboutUs } from './components/aboutUs';
import { editView } from './components/editView';
import { ratings } from './components/ratings';
import { searchGoogleMaps } from './components/searchGoogleMaps';
// import { EditOrView } from './components/EditorView';
class App extends Component {
  
  render() {
    return (
    <Router>
      <div className="App">
        <header className="App-header">
        <div className="containerM" >
            <Switch>
            <Route exact={true} path="/" component={mainPage} />
            <Route path="/searchresults" component={searchRes} /> 
            {/* <Route path="/signup" component={signUpPage} /> */}
            <Route path="/signup-serviceprovider" component={signUpSP} />
            <Route path="/signup-client" component={signUpClient} />
            <Route path="/signin" component={signIn} />

            <Route path="/forgotpassword" component={forgotpassword} />
            <Route path="/serviceProvider" component={serviceProvider.serviceProvider} />
            <Route path="/imageUpload" component={imageUpload} />
            <Route path="/Upload" component={Upload} />
            <Route path="/signInSP" component={signInSP}/>
            <Route path="/navstuff" component={navstuff}/>
            <Route path="/choose-service" component={SPChooseService}/>
            <Route path="/step1" component={stepone}/>
            <Route path="/myAccount" component={myAccount}/>
            <Route path="/aboutUs" component={aboutUs}/>
            <Route path="/editView" component={editView}/>
            <Route path="/ratings" component={ratings}/>
            <Route path="/GoogleMapsSearch" component={searchGoogleMaps}/>
            {/* <Route path="/EditOrView" component={EditOrView}/> */}
            {/* <Route path="/signin1" component={searchRes.searchRes} />
            <Route path="/signup1" component={searchRes.searchRes} />
            <Route path="/forgotpassword1" component={searchRes.searchRes} /> */}

          </Switch>
        </div>
        </header>
      </div>
    </Router>
    );
  }


}

export default App;