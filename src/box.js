import React from 'react';

class Box extends React.Component {

    renderContent(props) {
        const { chosen, options } = props;
        if (typeof chosen === 'number' && options[chosen] !== undefined) {
            return (
                <div>
                    <span>{options[chosen]}</span>
                    <span className="relect-clear" onClick={props.handleClear} />
                </div>
            )
        } else {
            return <span className="relect-placeholder">{props.placeholder}</span>
        }
    }

    render() {

        const props = this.props;
        const style = {
            width      : props.width,
            lineHeight : props.height - 2 + 'px'
        };

        return (
            <div className="relect-box" style={style} onClick={props.onClick}>
                {this.renderContent(props)}
                <span className="relect-arrow" />
            </div>
        )
    }
}

export default Box;
