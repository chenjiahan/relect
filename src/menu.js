import React from 'react';

class Menu extends React.Component {

    render() {

        const props = this.props;
        const style = {
            top        : props.height - 1,
            width      : props.width,
            display    : props.showMenu ? '' : 'none',
            lineHeight : props.optionHeight + 'px',
            maxHeight  : props.optionHeight * 8 + 2
        };

        const options = props.options.map((item, index) => {
            let handleClick = props.handleChoose.bind(null, index);
            let handleMouseEnter = props.focusOption.bind(null, index);
            let className = index === props.focused ? 'relect-focused-option' : '';
            return (
                <li key={index}
                    onClick={handleClick}
                    className={className}
                    onMouseEnter={handleMouseEnter}
                >
                    {item.text}
                </li>
            )
        });

        return (
            <ul className="relect-option" style={style}>
                {options}
            </ul>
        )
    }
}

export default Menu;
