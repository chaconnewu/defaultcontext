import React, { Component, PropTypes } from 'react';
import * as _ from 'lodash';
import $ from 'jquery';
import moment from 'moment';

import Header from './Header';
import Settings from './Settings';
import Ribon from './Ribon';
import Footer from './Footer';

import './app.less';

var items = [
    {
        name: 'Calendar',
        on: true
    },
    {
        name: 'Camera',
        on: false
    },
    {
        name: 'Contacts',
        on: false
    },
    {
        name: 'Location',
        on: false
    },
    {
        name: 'Microphone',
        on: false
    },
    {
        name: 'Phone',
        on: true
    },
    {
        name: 'SMS',
        on: false
    },
    {
        name: 'Sensors',
        on: false
    }
];
var ribons = ['APP PERMISSIONS', 'AD LIBRARIES'];

class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            settings: items,
            startTime: moment().format('YYYY-MM-DD hh:mm:ss'),
            endTime: ''
        };

        this.toggleSwitch = this.toggleSwitch.bind(this);
        this.save = this.save.bind(this);
    }

    toggleSwitch (index) {
        var newSettings = _.cloneDeep(this.state.settings);
        newSettings[index].on = !this.state.settings[index].on;
        this.setState({
            settings: newSettings
        });
    }

    save () {
        var settingConfig = _.map(this.state.settings, function(setting) {
            return setting.on ? 1 : 0;
        });

        var finalConfig = {
            settings: settingConfig,
            startTime: this.state.startTime,
            endTime: moment().format('YYYY-MM-DD hh:mm:ss')
        };
        $.post('/record', finalConfig)
        .done(function () {
            console.log('post successfully');
        });
        console.log(finalConfig);
    }

    render () {
        return (
            <div className="DC-App">
                <Header save={ this.save }/>
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
