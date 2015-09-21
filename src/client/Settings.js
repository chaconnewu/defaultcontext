import React, { Component, PropTypes } from 'react';
import Toggle from 'react-toggle';

import './Settings.less';

class SettingItem extends Component {
    constructor (props) {
        super(props);

    }

    toggle () {
        this.props.toggleSwitch(this.props.index);
    }

    render () {
        var settingObj = this.props.setting;
        var checkboxCom = this.props.on ?
        (<input onChange={ this.toggle.bind(this) }  type="checkbox" id={ 'switch-' + this.props.index } className="mdl-switch__input" checked />) :
        (<input onChange={ this.toggle.bind(this) }  type="checkbox" id={ 'switch-' + this.props.index } className="mdl-switch__input" />)
        return (
            <div className="DC-Settings-Item">
                <div className="DC-Settings-Item-Icon">
                    <div className={ 'DC-Icons-' + settingObj.name }></div>
                </div>
                <div className="DC-Settings-Item-Name">
                    { settingObj.name }
                </div>
                <div className="DC-Settings-Item-Switch" >
                    <Toggle
                      defaultChecked={ settingObj.on }
                      name="milkIsReady"
                      value="yes"
                      onChange={ this.toggle.bind(this) }
                    />
                </div>
            </div>
        );
    }
}

class Settings extends Component {
    render () {
        var self = this;
        var allSettings = _.map(self.props.settings, function(setting, index) {
            return (
                <SettingItem
                    key={ index }
                    setting={ setting }
                    index={ index }
                    toggleSwitch={ self.props.toggleSwitch }
                />
            );
        });
        return (
            <div className="DC-Settings">
                { allSettings }
            </div>
        );
    }
}

export default Settings;
