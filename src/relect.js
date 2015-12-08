/* ===============================
 * Relect v0.0.1
 * =============================== */

import React, { PropTypes } from 'react';
import Option from './option';
import Box    from './box';
import './relect.scss';

class Relect extends React.Component {

    static propTypes = {
        width   : PropTypes.number,
        height  : PropTypes.number,
        options : PropTypes.array.isRequired,
        placeholder: PropTypes.string
    };

    static defaultProps = {
        width  : 300,
        height : 38,
        placeholder: ''
    };

    state = {
        chosen: null,
        optionVisible: false
    };

    toggleOption = () => {
        const optionVisible = !this.state.optionVisible;
        this.setState({ optionVisible });
    };

    handleChoose = index => {
        this.setState({
            chosen: index,
            optionVisible: false
        });
        let item = this.props.options[index];
        this.props.onChange(item.val, item.text);
    };

    handleClear = (event) => {
        event.stopPropagation();
        this.setState({
            chosen: null
        });
        this.props.onChange(null, null);
    };

    renderBox = () => {
        const { chosen } = this.state;
        return (
            <Box
                {...this.props}
                chosen={chosen}
                onClick={this.toggleOption}
                handleClear={this.handleClear}
            />
        )
    };

    renderOptions = () => {
        const { optionVisible } = this.state;
        return (
            <Option
                {...this.props}
                visible={optionVisible}
                handleChoose={this.handleChoose}
            />
        )
    };

    render() {
        return (
            <div className="relect">
                {this.renderBox()}
                {this.renderOptions()}
            </div>
        )
    }
}

export default Relect;
