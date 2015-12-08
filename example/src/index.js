import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Relect from '../../src/relect';
import './index.scss';

class App extends Component {
    render() {
        return (
            <div className="wrapper">
                <Relect />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);

