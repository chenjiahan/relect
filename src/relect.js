/* ===============================
 * Relect v0.0.1
 * =============================== */

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Menu     from './menu';
import Box      from './box';
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
        chosen   : null,  // index of chosen option
        focused  : null,  // index of focused option
        showMenu : false  // whether show option
    };

    componentDidMount() {
        this.menuDOM = ReactDOM.findDOMNode(this.refs.menu);
    }

    toggleMenu = () => {
        const showMenu = !this.state.showMenu;
        this.setState({ showMenu });
    };

    handleChoose = index => {
        let item = this.props.options[index];
        this.props.onChange(item.val, item.text);
        this.setState({
            chosen: index,
            showMenu: false
        });
    };

    handleClear = (event) => {
        event.stopPropagation();
        this.setState({
            chosen     : null,
            showMenu : false
        });
        this.props.onChange(null, null);
    };

    handleBlur = () => {
        this.setState({ showMenu: false })
    };

    handleKeyDown = event => {
        event.preventDefault();

        switch (event.which) {
            case 8 : // Delete
                this.handleClear(event);
                break;
            case 27: // ESC
                this.setState({ showMenu: false });
                break;
            case 13: // Enter
            case 32: // Space
                let { showMenu, focused } = this.state;
                if (showMenu && focused !== null) {
                    this.handleChoose(focused);
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
        }
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
        if (length <= 8) {
            return;
        }

        let height = this.props.optionHeight;
        let max = Math.min((length - 8) * height, focused * height);
        let min = Math.max(0, (focused - 7) * height);
        let current = this.menuDOM.scrollTop;

        if (current > max) {
            this.menuDOM.scrollTop = max;
        } else if (current < min) {
            this.menuDOM.scrollTop = min;
        }
    };

    renderBox = () => {
        return (
            <Box {...this.props}
                 chosen={this.state.chosen}
                 showMenu={this.state.showMenu}
                 onClick={this.toggleMenu}
                 handleClear={this.handleClear}
            />
        )
    };

    renderOptions = () => {
        const { showMenu, focused } = this.state;
        return (
            <Menu ref="menu"
                  {...this.props}
                  focused={focused}
                  showMenu={showMenu}
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
