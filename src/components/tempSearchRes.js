import React, { Component} from 'react';
 import '../nav.css';
import * as script from '../scripts';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';
import * as footer1 from './footer-nav';
import * as navstuff from './nav-boots';
import Autocomplete from  'react-autocomplete';
// import { Link } from 'react-router';

const images1 = script.importAll(require.context('../ImagesOld', false, /\.(png|jpe?g|svg)$/));
  
const images = script.importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));
export class searchRes extends Component {
  constructor () {
    super()
    this.state = {
      value: '',
    }
  }

  render() {
    
    return (
      <div>
     <script src="https://unpkg.com/react@15.6.1/dist/react.js"></script>
<script src="https://unpkg.com/react-dom@15.6.1/dist/react-dom.js"></script>
<script src="https://unpkg.com/react-autocomplete@1.5.10/dist/react-autocomplete.js"></script>
      <Autocomplete
        items={[
           'foo' ,
         'bar',
            'baz' 
        ]}
        shouldItemRender={(item) => item.toLowerCase()}
        getItemValue={item => item}
        renderItem={(item, highlighted) =>
          <div
            key={item}
            style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
          >
            {item.value}
          </div>
        }
        value={this.state.value}
        onChange={e => this.setState({ value: e.target.value })}
        onSelect={value => this.setState({ value })}
      />
      </div>
    );
  }
    }
    
