// import React from 'react';
import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import Test2 from './Test2';
import { render } from 'react-dom';
import registerServiceWorker from './serviceWorker';

//ReactDOM.render(<ClientCard/>, document.getElementById('root'));
export class Test3 extends Component {
    render() {
        return (
        <div>
            <Test2>"TEST"</Test2>
        </div>
            );
        }
    }

// export default Test3;
