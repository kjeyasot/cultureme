import React from 'react';
import ReactDOM from 'react-dom';
import Test2 from './Test2';
import { render } from 'react-dom';
import registerServiceWorker from './serviceWorker';

//ReactDOM.render(<ClientCard/>, document.getElementById('root'));
class Test3 extends React.Component {
    render() {
        return (
        <div>
            <Test2></Test2>
        </div>
            );
        }
    }

export default Test3;
