/* ===============================
 * Relect v0.0.1
 * =============================== */

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Option from './option';
import Box from './box';
import './relect.scss';

class Relect extends React.Component {

    static propTypes = {
        width        : PropTypes.number,
        height       : PropTypes.number,
        options      : PropTypes.array,
        placeholder  : PropTypes.string,
        optionHeight : PropTypes.number
    };

    static defaultProps = {
        width        : 300,
        height       : 40,
        options      : [],
        placeholder  : '',
        optionHeight : 30
    };

    state = {
        chosen     : null,  // index of chosen option
        focused    : null,  // index of focused option
        showOption : false  // whether show option
    };

    componentDidMount() {
        this.optionDOM = ReactDOM.findDOMNode(this.refs.option);
    }

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
                let { showOption, focused } = this.state;
                if (showOption && focused !== null) {
                    this.handleChoose(focused);
                } else {
                    this.toggleOption();
                }
                break;
            case 38: // Up
                this.moveFocusedOption(-1);
                break;
            case 40: // Down
                this.moveFocusedOption(1);
                break;
        }
    };

    moveFocusedOption = move => {
        if (!this.state.showOption) {
            this.setState({ showOption: true });
            return;
        }
        let focused = this.state.focused;
        let length  = this.props.options.length;
        if (focused === null) {
            focused = 0;
        } else {
            focused += move;
            focused = (focused + length) % length;
        }
        this.focusOption(focused);
    };

    focusOption = focused => {
        this.setState({ focused });

        // calc offset
        // displays up to 8 options in the same time
        let length = this.props.options.length;
        if (length <= 8) {
            return;
        }

        let height = this.props.optionHeight;
        let max = Math.min((length - 8) * height, focused * height);
        let min = Math.max(0, (focused - 7) * height);
        let current = this.optionDOM.scrollTop;

        if (current > max) {
            this.optionDOM.scrollTop = max;
        } else if (current < min) {
            this.optionDOM.scrollTop = min;
        }
    };

    renderBox = () => {
        const { chosen, showOption } = this.state;
        return (
            <Box {...this.props}
                 chosen={chosen}
                 showOption={showOption}
                 onClick={this.toggleOption}
                 handleClear={this.handleClear}
            />
        )
    };

    renderOptions = () => {
        const { showOption, focused } = this.state;
        return (
            <Option ref="option"
                    {...this.props}
                    focused={focused}
                    showOption={showOption}
                    focusOption={this.focusOption}
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
