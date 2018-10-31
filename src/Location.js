import React, { Component } from 'react';
import PropTypes from 'prop-types';

const round = digits => float => Math.round(float * Math.pow(10, digits)) / Math.pow(10, digits);

class Location extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }
  componentDidMount() {
    this.loadLocation()
      .then(this.props.onChange);
  }
  render() {
    const {
      latitude,
      longitude
    } = this.props;

    return (
      <div>
      {(!latitude || !longitude) &&
        <div>Location access is required.</div>
      }
      {latitude && longitude &&
        <div>
          Your location: <a href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}>{round(4)(latitude)},{round(4)(longitude)}</a>
        </div>
      }
      </div>
    );
  }
  loadLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(location => {
        this.setState({location});

        const {latitude, longitude} = location.coords;
        resolve({latitude, longitude});
      }, error => {
        reject(error);
      });
    });
  }
}

Location.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  onChange: PropTypes.func
}

export default Location;
