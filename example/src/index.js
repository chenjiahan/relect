import React    from 'react';
import ReactDOM from 'react-dom';
import Relect   from '../../src/relect';
import './index.scss';

const objectOptions = [
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

const arrayOptions = ['one', 'two', 'three', 'four', 'five', 'six'];

class App extends React.Component {

    handleChange = (val, text) => {
        console.log('val: ', val, ', text: ', text);
    };

    render() {
        return (
            <div style={{paddingTop: (window.innerHeight - 525) / 2}}>
                <h1 className="title">Relect</h1>
                <h3 className="intro">A Tiny React Single Select Component.</h3>
                <div className="wrapper">
                    <Relect value={10}
                            options={arrayOptions}
                            placeholder={'placeholder'}
                            onChange={this.handleChange}
                    />
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
