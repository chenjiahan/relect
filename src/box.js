import React from 'react';

class Box extends React.Component {

    renderContent(props) {
        if (props.chosen === null) {
            return <span className="relect-placeholder">{props.placeholder}</span>;
        } else {
            return <span className="relect-value">{props.options[props.chosen].text}</span>;
        }
    };

    renderClear(props) {
        return props.chosen === null ? null : <span className="relect-clear" onClick={props.handleClear} />;
    };

    render() {

        const props = this.props;
        const style = {
            width      : props.width,
            lineHeight : props.height - 2 + 'px'
        };

        return (
            <div className="relect-box" style={style} onClick={props.onClick}>
                {this.renderContent(props)}
                {this.renderClear(props)}
                <span className="relect-arrow" />
            </div>
        )
    }
}

export default Box;
