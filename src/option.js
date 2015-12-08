import React from 'react';

class Option extends React.Component {

    render() {

        const props = this.props;

        const style = {
            width   : props.width,
            top     : props.height - 1,
            display : props.visible ? '' : 'none'
        };

        const options = props.options.map((item, index) => {
            let handleClick = props.handleChoose.bind(null, index);
            return (
                <li key={index} onClick={handleClick}>
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

export default Option;
