/* ===============================
 * Relect v1.1.0 
 * https://github.com/chenjiahan/relect
 * =============================== */

import React     from 'react';
import ReactDOM  from 'react-dom';
import PropTypes from 'prop-types';
import Menu      from './Menu';
import Box       from './Box';

class Relect extends React.Component {

    static propTypes = {
        width        : PropTypes.number,
        height       : PropTypes.number,
        chosen       : PropTypes.any,
        options      : PropTypes.array,
        tabIndex     : PropTypes.number,
        autoBlur     : PropTypes.bool,
        disabled     : PropTypes.bool,
        placeholder  : PropTypes.string,
        optionHeight : PropTypes.number
    };

    static defaultProps = {
        width        : 240,
        height       : 36,
        options      : [],
        tabIndex     : -1,
        autoBlur     : false,
        disabled     : false,
        placeholder  : '',
        optionHeight : 30
    };

    state = {
        focused  : null,  // index of focused option
        showMenu : false  // whether show option
    };

    toggleMenu = () => {
        this.setState({ showMenu: !this.state.showMenu });
    };

    onChoose = index => {
        this.props.onChange(index);
        this.setState({ showMenu : false });

        if (this.props.autoBlur) {
            this.relectDOM && this.relectDOM.blur();
        }
    };

    onClear = e => {
        e.stopPropagation();
        this.setState({ showMenu : false });
        this.props.onChange(null);
    };

    onBlur = () => {
        this.setState({ showMenu : false })
    };

    onKeyDown = e => {
        switch (e.which) {
            case 8 : // Delete
                this.onClear(e);
                break;
            case 27: // Esc
                this.setState({ showMenu : false });
                break;
            case 13: // Enter
            case 32: // Space
                if (this.state.showMenu && this.state.focused !== null) {
                    this.onChoose(this.state.focused);
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
        e.preventDefault();
    };

    moveFocusedOption = move => {
        if (!this.state.showMenu) {
            this.setState({ showMenu : true });
            return;
        }

        let { focused } = this.state;
        let { length } = this.props.options;
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

    render() {
        const { props } = this;
        const { showMenu, focused } = this.state;
        const style = {
            width      : props.width,
            lineHeight : props.height - 2 + 'px'
        };

        return (
            <div 
                style={style}
                className="relect"
                tabIndex={props.tabIndex}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown}
                ref={node => { this.relectDOM = node; }}
            >
                <Box {...props}
                     showMenu={showMenu}
                     onClick={this.toggleMenu}
                     onClear={this.onClear}
                />
                <Menu {...props}
                      focused={focused}
                      showMenu={showMenu}
                      focusOption={this.focusOption}
                      onChoose={this.onChoose}
                      ref={node => { this.menuDOM = node; }}
                />
            </div>
        )
    }
}

export default Relect;
