import React from 'react';

class Menu extends React.Component {

    render() {

        const props = this.props;
        const style = {
            top        : props.height - 1,
            display    : props.showMenu && !props.disabled ? '' : 'none',
            lineHeight : props.optionHeight + 'px',
            maxHeight  : props.optionHeight * 8 + 2
        };

        const options = props.options.map((item, index) => {
            const className = index === props.focused ? 'relect-focused-option' : '';
            return (
                <li key={index}
                    className={className}
                    onClick={props.handleChoose.bind(null, index)}
                    onMouseEnter={props.focusOption.bind(null, index)}
                >
                    {item.text || item}
                </li>
            )
        });

        return <ul className="relect-option thin-scroll" style={style}>{options}</ul>;
    }
}

export default Menu;
