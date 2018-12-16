import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Test3 from './Test3';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<Test3 />, document.getElementById('Test1'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
