import React, { Component, PropTypes } from 'react';
import './Footer.less';

class Footer extends Component {
    render () {
        return (
            <div className="DC-Footer">
                AppsFlyer
                <ul className="DC-Footer-Items">
                    <li>Knows your wireless carrier</li>
                    <li>Reads your deviced ID (IMEI)</li>
                </ul>
            </div>
        );
    }
}

export default Footer;
