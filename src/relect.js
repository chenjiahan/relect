/* ===============================
 * Relect v0.0.1
 * =============================== */

import React, { Component, PropTypes } from 'react';
import Option from './option';
import Value from './value';
import './relect.scss';

class Relect extends Component {

    static propTypes = {
        width  : PropTypes.number,
        height : PropTypes.number
    };

    static defaultProps = {
        width  : 300,
        height : 38
    };

    state = {
        optionVisible: false
    };

    toggleOption() {
        const optionVisible = !this.state.optionVisible;
        this.setState({ optionVisible });
    }

    render() {

        const props = this.props;
        const { optionVisible } = this.state;

        return (
            <div className="relect">
                <Value {...props} onClick={this.toggleOption.bind(this)} />
                <Option {...props} visible={optionVisible} />
            </div>
        )
    }
}

export default Relect;
