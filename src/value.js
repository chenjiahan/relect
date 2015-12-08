import React, { Component } from 'react';

class Value extends Component {
    render() {

        const style = {
            width  : this.props.width,
            height : this.props.height
        };

        return (
            <div className="relect-value" style={style} onClick={this.props.onClick}>

            </div>
        )
    }
}

export default Value;
