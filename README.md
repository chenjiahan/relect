# Relect
A Tiny React Single Select Component.    
[Example](http://chenjiahan.github.io/relect/)

## Install

    npm i relect -S

## Usage
``` javascript
import React  from 'react';
import Relect from 'relect';

// include styles
import 'relect/lib/relect.css';

const options = [
    { text: 'one', value: 1 },
    { text: 'two', value: 2 }
];

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { chosen : null }
    }
    
    onChange(index) {
        this.setState({ chosen : index });
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
```
## Props

Property|Type|Default|Description
---|---|---|---
width|number|240|width of select
height|number|36|height of select
options|array|/|options
chosen|number|/|index of chosen option
tabIndex|number|-1|tab order
disabled|bool|false|whether to disable select
autoBlur|bool|false|auto blur after selection 
placeholder|string|/|placeholder text
optionHeight|number|30|height of option
