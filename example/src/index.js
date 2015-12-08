import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Relect from '../../src/relect';
import './index.scss';

const options = [
    { val: 0, text: 'Jon Snow' },
    { val: 1, text: 'Ned Stark' },
    { val: 2, text: 'Tywin' },
    { val: 3, text: 'Robb' },
    { val: 4, text: 'Sansa' },
    { val: 5, text: 'Arya' },
    { val: 6, text: 'Bran' },
    { val: 7, text: 'Cersei' },
    { val: 8, text: 'Jaime' },
    { val: 9, text: 'Joffrey' },
    { val: 10, text: 'Tyrion' },
    { val: 11, text: 'Stannis' },
    { val: 12, text: 'Melisandre' }
];

class App extends Component {

    handleChange = (val, text) => {
        console.log('val: ', val, ', text: ', text);
    };

    render() {
        return (
            <div className="wrapper">
                <Relect
                    options={options}
                    placeholder={'relect something'}
                    onChange={this.handleChange}
                />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);

