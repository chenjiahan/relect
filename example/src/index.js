import React    from 'react';
import ReactDOM from 'react-dom';
import Relect   from '../../src/Relect';
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

    constructor(props) {
        super(props);

        this.state = {
            chosen: null,
            disabled: false
        }
    }

    handleChange(chosen) {
        this.setState({ chosen });
    };

    clear() {
        this.setState({ chosen: null });
    }

    selectFirstOption() {
        this.setState({ chosen: 0 });
    }

    setDisable() {
        this.setState({ disabled: !this.state.disabled });
    }

    selectTywin() {
        for (let i = 0; i < objectOptions.length; i++) {
            if (objectOptions[i].text === 'Tywin') {
                this.setState({ chosen: i });
                return;
            }
        }
    }

    render() {
        return (
            <div style={{paddingTop: (window.innerHeight - 525) / 2}}>
                <h1 className="title">Relect</h1>
                <h3 className="intro">A Tiny React Single Select Component.</h3>
                <div className="wrapper">
                    <Relect chosen={this.state.chosen}
                            options={objectOptions}
                            disabled={this.state.disabled}
                            placeholder={'placeholder'}
                            onChange={this.handleChange.bind(this)}
                    />
                    <div>
                        <button className="btn" onClick={this.selectFirstOption.bind(this)}>select first option</button>
                        <button className="btn" onClick={this.selectTywin.bind(this)}>select Tywin</button>
                        <button className="btn" onClick={this.clear.bind(this)}>clear value</button>
                        <button className="btn" onClick={this.setDisable.bind(this)}>{this.state.disabled ? 'enable' : 'set disabled'}</button>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
