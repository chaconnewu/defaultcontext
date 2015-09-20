import React, { Component, PropTypes } from 'react';
import * as _ from 'lodash';

import Header from './Header';
import Settings from './Settings';
import Ribon from './Ribon';
import Footer from './Footer';

import './app.less';

var items = ['Calendar', 'Camera', 'Contacts', 'Location', 'Microphone', 'Phone', 'SMS', 'Sensors'];
var ribons = ['APP PERMISSIONS', 'AD LIBRARIES'];

class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            settings: _.map(items, function(item) {
                return ({
                    name: item,
                    on: false
                });
            })
        };

        this.toggleSwitch = this.toggleSwitch.bind(this);
    }

    toggleSwitch (index) {
        var newSettings = _.cloneDeep(this.state.settings);
        newSettings[index].on = !this.state.settings[index].on;
        this.setState({
            settings: newSettings
        });
        console.log(newSettings);
    }

    render () {

        return (
            <div className="DC-App">
                <Header />
                <Ribon
                    name={ ribons[0] }
                />
                <Settings
                    settings={ this.state.settings }
                    toggleSwitch={ this.toggleSwitch }
                />
                <Ribon
                    name={ ribons[1] }
                />
                <Footer />
            </div>
        );
    }
}

React.render(
    <App />,
    document.getElementById('app')
);
