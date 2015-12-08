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
        options : PropTypes.array,
        placeholder: PropTypes.string
    };

    static defaultProps = {
        width       : 300,
        height      : 38,
        options     : [],
        placeholder : ''
    };

    state = {
        chosen: null,
        showOption: false
    };

    toggleOption = () => {
        const showOption = !this.state.showOption;
        this.setState({ showOption });
    };

    handleChoose = index => {
        this.setState({
            chosen: index,
            showOption: false
        });
        let item = this.props.options[index];
        this.props.onChange(item.val, item.text);
    };

    handleClear = (event) => {
        event.stopPropagation();
        this.setState({
            chosen: null,
            showOption: false
        });
        this.props.onChange(null, null);
    };

    handleBlur = () => {
        this.setState({ showOption: false })
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
        const { showOption } = this.state;
        return (
            <Option
                {...this.props}
                visible={showOption}
                handleChoose={this.handleChoose}
            />
        )
    };

    render() {
        return (
            <div className="relect" tabIndex="0" onBlur={this.handleBlur}>
                {this.renderBox()}
                {this.renderOptions()}
            </div>
        )
    }
}

export default Relect;
