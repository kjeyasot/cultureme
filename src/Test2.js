import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import ClientCard from './components/ClientCard';
import registerServiceWorker from './serviceWorker';
require('./ably');

//ReactDOM.render(<ClientCard/>, document.getElementById('root'));
function Test2(props) {
  return (
  <div>
   <ClientCard name="ClientCard" /> 
    <App name="App" />
    </div>
  );
}

export default Test2;