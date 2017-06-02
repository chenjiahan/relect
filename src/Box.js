import React from 'react';

const BoxContent = props => {
    const { chosen, options, disabled } = props;
    if (typeof chosen === 'number' && options[chosen] !== void 0) {
        const clear = disabled ? null : <span className="relect-clear" onClick={props.onClear} />;
        return <span>{options[chosen].text || options[chosen]}{clear}</span>;
    } else {
        return <span className="relect-placeholder">{props.placeholder}</span>
    }
}

const Box = props => {
    const className = 'relect-box' + (props.disabled ? ' relect-box-disabled' : '');
    return (
        <div className={className} onClick={props.onClick} >
            {BoxContent(props)}
            <span className="relect-arrow" />
        </div>
    )
}

export default Box;
