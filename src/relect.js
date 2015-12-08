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
        showOption: false,
        focusedOption: null
    };

    toggleOption = () => {
        const showOption = !this.state.showOption;
        this.setState({ showOption });
    };

    handleChoose = index => {
        let item = this.props.options[index];
        this.props.onChange(item.val, item.text);
        this.setState({
            chosen: index,
            showOption: false
        });
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

    handleKeyDown = (event) => {
        event.preventDefault();
        switch (event.which) {
            case 8 : // Delete
                this.handleClear(event);
                break;
            case 27: // ESC
                this.setState({ showOption: false });
                break;
            case 13: // Enter
            case 32: // Space
                this.toggleOption();
                break;
            case 38: // Up
                if (this.props.showOption) {

                } else {
                    this.setState({ showOption: true });
                }
                break;
            case 40: // Down
                if (this.props.showOption) {

                } else {
                    this.setState({ showOption: true });
                }
                break;
        }
    };

    renderBox = () => {
        const { chosen, showOption, focusedOption } = this.state;
        return (
            <Box
                {...this.props}
                chosen={chosen}
                showOption={showOption}
                onClick={this.toggleOption}
                focusedOption={focusedOption}
                handleClear={this.handleClear}
            />
        )
    };

    renderOptions = () => {
        const { showOption } = this.state;
        return (
            <Option
                {...this.props}
                showOption={showOption}
                handleChoose={this.handleChoose}
            />
        )
    };

    render() {
        return (
            <div tabIndex="0"
                 className="relect"
                 onBlur={this.handleBlur}
                 onKeyDown={this.handleKeyDown}
            >
                {this.renderBox()}
                {this.renderOptions()}
            </div>
        )
    }
}

export default Relect;
