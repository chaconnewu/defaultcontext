import React, { Component, PropTypes } from 'react';

import './Header.less';

class Header extends Component {
    save () {
        console.log('save');
    }

    render () {
        return (
            <div className="DC-Header">
                <div className="DC-Header-Text">
                    Privacy Settings
                </div>
                <div
                    className="DC-Header-Save"
                    onClick={ this.save.bind(this) }
                >
                    Save
                </div>
            </div>
        );
    }
}

export default Header;
