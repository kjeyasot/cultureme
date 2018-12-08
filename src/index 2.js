import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import ClientCard from './components/ClientCard';
import registerServiceWorker from './registerServiceWorker';
require('./ably');

//ReactDOM.render(<ClientCard/>, document.getElementById('root'));
ReactDOM.render(
  <div>
  <ClientCard name="ClientCard" /> 
    <App name="App" />
  </div>,
  document.getElementById('root')
);
registerServiceWorker();
