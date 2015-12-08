import React from 'react';

class Box extends React.Component {

    renderContent = () => {
        const { chosen, options, placeholder } = this.props;
        if (chosen === null) {
            return <span className="relect-placeholder">{placeholder}</span>;
        } else {
            return <span className="relect-value">{options[chosen].text}</span>;
        }
    };

    render() {

        const props = this.props;

        const style = {
            width  : props.width,
            height : props.height,
            lineHeight: props.height + 'px'
        };

        return (
            <div className="relect-box" style={style} onClick={props.onClick}>
                {this.renderContent()}
                <span className="relect-clear" onClick={props.handleClear} />
                <span className="relect-arrow"></span>
            </div>
        )
    }
}

export default Box;
