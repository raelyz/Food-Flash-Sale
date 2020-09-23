import React from "react";
import TimeLine from "../TimeLine/TimeLine";

export default class GeoLocation extends React.Component {
    constructor() {
        super()
        this.state = {
            latUser: 0,
            lonUser: 0
        }
    }

    componentDidMount() {
        if ('geolocation' in navigator) {
            console.log('geolocation available');
            var options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 100
            };
            function error(err) {
                console.warn(`ERROR(${err.code}): ${err.message}`);
            }
            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                this.setState({ latUser: lat, lonUser: lon })
            }, error, options)
        } else {
            console.log('geolocation not available');
        }
    }



    render() {
        return (
            <div>
                latitude: <span id="latitude">{this.state.latUser}&deg;</span><br />
                    longitude: <span id="longitude">{this.state.lonUser}&deg;</span>
                <TimeLine lon={this.state.lonUser} lat={this.state.latUser} onLogout={this.props.onLogout} stripper={this.props.stripper} user_id={this.props.user_id} />
            </div>
        )
    }
}
