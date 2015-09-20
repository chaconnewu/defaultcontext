import React, { Component, PropTypes } from 'react';
import './Settings.less';

class SettingItem extends Component {
    toggle () {
        this.props.toggleSwitch(this.props.index);
    }

    render () {
        var settingObj = this.props.setting;
        return (
            <div className="DC-Settings-Item">
                <div className="DC-Settings-Item-Icon">
                    <div className={ 'DC-Icons-' + settingObj.name }></div>
                </div>
                <div className="DC-Settings-Item-Name">
                    { settingObj.name }
                </div>
                <div className="DC-Settings-Item-Switch">
                    <label className="mdl-switch mdl-js-switch">
                        <input
                            type="checkbox"
                            className="mdl-switch__input"
                            onClick={ this.toggle.bind(this) }
                        />
                        <span className="mdl-switch__label"></span>
                    </label>
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
