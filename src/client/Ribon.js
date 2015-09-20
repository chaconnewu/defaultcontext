import React, { Component, PropTypes } from 'react';

import './Ribon.less';

class Ribon extends Component {
    render () {
        return (
            <div className="DC-Ribon">
                <div className="DC-Ribon-Text">
                    { this.props.name }
                </div>
                <div className="DC-Ribon-Checkbox">
                    <label className="mdl-checkbox mdl-js-checkbox" for="checkbox-2">
                        <input type="checkbox" id="checkbox-2" className="mdl-checkbox__input" />
                        <span className="mdl-checkbox__label DC-Ribon-CheckboxLabel">Anonymize Data</span>
                    </label>
                </div>
            </div>
        );
    }
}

export default Ribon;
