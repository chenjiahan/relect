import React, { Component } from 'react';

class Option extends Component {

    render() {

        const props = this.props;

        const style = {
            width   : props.width,
            top     : props.height + 1,
            display : props.visible ? '' : 'none'
        };

        return (
            <ul className="relect-option" style={style}>
                <li>123</li>
                <li>123</li>
                <li>123</li>
                <li>123</li>
                <li>123</li>
            </ul>
        )
    }
}

export default Option;
