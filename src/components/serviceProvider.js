import React, { Component } from 'react';
import App from './App';
import ClientCard from './ClientCard';
import * as searchRes from './tempSearchRes';

export class serviceProvider extends Component {
    render() {
        return (
        <div>   
            <searchRes.searchRes/>
            <ClientCard></ClientCard>
            <App></App>
            
        </div>
            );
        }
    }
