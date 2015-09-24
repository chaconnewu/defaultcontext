import React, { Component, PropTypes } from 'react';
import "./Banner.less";

var banners = ['Messenger', 'MyTrip', 'PicTrans', 'HTrack', 'Book'];

class Banner extends Component {
    render () {
        var appId = this.props.appId;
        var bannerPostfix = banners[parseInt(appId/3)];
        var bannerAppClass = 'DC-AppIcon-' + bannerPostfix;
        return (
            <div className="DC-Banner">
                <div className="DC-AppIcon">
                    <div className={bannerAppClass}></div>
                </div>
                <span className="DC-Banner-AppName">{ bannerPostfix }</span>
            </div>
        );
    }
}

export default Banner;
