/* ===============================
 * Relect v0.0.1
 * =============================== */

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Menu     from './Menu';
import Box      from './Box';
import './relect.scss';

class Relect extends React.Component {

    static propTypes = {
        width        : PropTypes.number,
        height       : PropTypes.number,
        chosen       : PropTypes.any,
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
        focused  : null,  // index of focused option
        showMenu : false  // whether show option
    };

    componentDidMount() {
        this.menuDOM = ReactDOM.findDOMNode(this.refs.menu);
    }

    toggleMenu = () => {
        this.setState({ showMenu: !this.state.showMenu });
    };

    handleChoose = index => {
        this.props.onChange(index);
        this.setState({
            showMenu : false
        });
    };

    handleClear = event => {
        event.stopPropagation();
        this.setState({
            showMenu : false
        });
        this.props.onChange(null);
    };

    handleBlur = () => {
        this.setState({ showMenu: false })
    };

    handleKeyDown = event => {
        switch (event.which) {
            case 8 : // Delete
                this.handleClear(event);
                break;
            case 27: // Esc
                this.setState({ showMenu: false });
                break;
            case 13: // Enter
            case 32: // Space
                if (this.state.showMenu && this.state.focused !== null) {
                    this.handleChoose(this.state.focused);
                } else {
                    this.toggleMenu();
                }
                break;
            case 38: // Up
                this.moveFocusedOption(-1);
                break;
            case 40: // Down
                this.moveFocusedOption(1);
                break;
            default:
                return;
        }
        event.preventDefault();
    };

    moveFocusedOption = move => {
        if (!this.state.showMenu) {
            this.setState({ showMenu: true });
            return;
        }
        let focused = this.state.focused;
        let length  = this.props.options.length;
        focused = focused === null ? 0 : (focused + move + length) % length;
        this.focusOption(focused);
    };

    focusOption = focused => {
        this.setState({ focused });

        // calc offset
        // displays up to 8 options in the same time
        let length = this.props.options.length;
        if (length > 8) {
            let height  = this.props.optionHeight;
            let current = this.menuDOM.scrollTop;
            let max = Math.min((length - 8) * height, focused * height);
            let min = Math.max(0, (focused - 7) * height);

            if (current > max) {
                this.menuDOM.scrollTop = max;
            } else if (current < min) {
                this.menuDOM.scrollTop = min;
            }
        }
    };

    renderBox = () => {
        return (
            <Box {...this.props}
                 onClick={this.toggleMenu}
                 showMenu={this.state.showMenu}
                 handleClear={this.handleClear}
            />
        )
    };

    renderOptions = () => {
        return (
            <Menu ref="menu"
                  {...this.props}
                  focused={this.state.focused}
                  showMenu={this.state.showMenu}
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
