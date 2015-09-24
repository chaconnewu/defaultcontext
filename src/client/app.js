import React, { Component, PropTypes } from 'react';
import * as _ from 'lodash';
import $ from 'jquery';
import moment from 'moment';
import { Router, Route, Link, Redirect } from 'react-router';
import Header from './Header';
import Banner from './Banner';
import Settings from './Settings';
import Ribon from './Ribon';
import Footer from './Footer';

import './app.less';

var items = [
    {
        name: 'Calendar',
        on: false
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
        on: false
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

var conditions = [
    {
        'Calendar': 1,
        'Camera': 1,
        'Contacts': 1,
        'Location': 1,
        'SMS': 1
    },
    {
        'Calendar': 1,
        'Location': 1,
        'SMS': 1
    },
    {
        'Camera': 1
    },
    {
        'Location': 1,
        'Sensors': 1
    },
    {

    }
];
class App extends Component {
    constructor (props) {
        super(props);
        var settingItems = items;

        var { id } = this.props.params;
        if (parseInt(id) % 3 === 2) {
            settingItems = items.map(function(item) {
                return {
                    name: item.name,
                    on: !item.on
                }
            });
        } else if (parseInt(id) % 3 === 1) {
            var bannerIdx = parseInt(id / 3);
            settingItems = items.map(function(item) {
                return {
                    name: item.name,
                    on: conditions[bannerIdx].hasOwnProperty(item.name) ? !item.on : item.on
                }
            });
        }

        var url = window.location.href;
        // console.log(url.indexOf('userid'));
        var useridStart = url.indexOf('userid') + 7;
        var rest = url.slice(useridStart);
        var userID = rest.slice(0, rest.indexOf('&'));

        this.state = {
            settings: settingItems,
            startTime: moment().format('YYYY-MM-DD hh:mm:ss'),
            endTime: '',
            userID: userID
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
            userID: this.state.userID,
            settings: settingConfig,
            startTime: this.state.startTime,
            endTime: moment().format('YYYY-MM-DD hh:mm:ss')
        };
        console.log('here');
        $.post('/record', finalConfig, function (data) {
            console.log('post successfully');
            window.open('https://survey.co1.qualtrics.com/SE/?SID=SV_3EJZnaLVLLqTPy5');
        });
        // console.log(finalConfig);
    }

    render () {
        var { id } = this.props.params;
        console.log(id);

        return (
            <div className="DC-App">
                <Header save={ this.save }/>
                <Banner appId={ parseInt(id) } />
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

class Root extends Component {
    render () {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

React.render((
    <Router>
        <Route path="/" component={Root}>
            <Route path="app/:id" component={App} />
        </Route>
    </Router>
    ), document.getElementById('app')
);
