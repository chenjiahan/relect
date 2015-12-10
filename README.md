# Relect
A Tiny React Single Select Component.
[Example](http://chenjiahan.github.io/relect/)

## Install

    npm install relect

## Usage

    import React  from 'react';
    import Relect from 'relect';
    
    var options = [
        { text: 'one', value: 0 },
        { text: 'two', value: 1 }
    ];
    
    class App extends React.Component {
    
        constructor(props) {
            super(props);
            
            this.state = { chosen: null }
        }
        
        onChange(index) {
            this.setState({
                chosen: index
            });
        }
    
        render() {
            return (
                <Relect options={options}
                        chosen={this.state.chosen}
                        onChange={this.onChange.bind(this)}
                />
            )
        }
    }

## Props

Property|Type|Default|Description
---|---|---|---
width|number|300|width of select
height|number|40|height of select
options|array|/|options
chosen|number|/|index of chosen option
placeholder|string|/|placeholder text
optionHeight|number|30|height of option
