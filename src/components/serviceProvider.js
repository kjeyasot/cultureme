import React, { Component } from 'react';
import App from './App';
import ClientCard from './ClientCard';

export class serviceProvider extends Component {
    render() {
        return (
        <div>
            <ClientCard></ClientCard>
            <App></App>
            
        </div>
            );
        }
    }
