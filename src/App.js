import React, { Component } from 'react';
import './App.css';
import distance from 'gps-distance';
import Settings from './Settings';

const sortDistance = (left, right) => {
  if (left.distance < right.distance) {
    return -1;
  }

  if (right.distance < left.distance) {
    return 1;
  }

  return 0;
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      settings: JSON.parse(localStorage.getItem('settings')) || {
        pollInterval: 60,
        maxDistance: 500
      }
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
    this.setStatePromise = this.setStatePromise.bind(this);
  }
  setStatePromise(state) {
    return new Promise(resolve => {
      this.setState(state, () => {
        resolve()
      });
    });
  }
  render() {
    const {
      active,
      settings,
      scooters
    } = this.state;

    const toggleIconClass = `icon fas fa-toggle-${active ? 'on' : 'off'}`;
    const label = active ? 'on' : 'off';

    return (
      <div>
        <div className="toggle" onClick={this.handleToggle}>
          <i className={toggleIconClass} /> {label}
        </div>
        <Settings
          {...settings}
          onChange={this.handleSettingsChange}
        />
        <footer>
          {scooters &&
            <div>{scooters.length} blinkees available</div>
          }
        </footer>
      </div>
    );
  }
  handleToggle() {
    const active = !this.state.active;

    return this.setStatePromise({active})
      .then(() => {
        if (!active) {
          return this.stopPolling();
        }

        return this.requestPermission('Notification')
          .then(() => this.startPolling());
      });
  }
  handleSettingsChange(settings) {
    this.setStatePromise({settings: Object.assign({}, this.state.settings, settings)})
      .then(() => {
        window.localStorage.setItem('settings', JSON.stringify(this.state.settings));
      })
      .then(() => {
        this.handleDataChange();
      });

    return Promise.resolve();
  }
  requestPermission(permission) {
    if (!(permission in window)) {
      return Promise.reject();
    }

    const api = window[permission];

    if (api.permission === 'denied') {
      return Promise.reject();
    }

    if (api.permission === 'granted') {
      return Promise.resolve();
    }

    return api.requestPermission();
  }
  startPolling() {
    const {pollInterval} = this.state.settings;

    if (pollInterval) {
      this.fetchBlinkee()
        .then(() => this.handleDataChange());
      this.poller = setInterval(() => {
        this.fetchBlinkee()
          .then(() => this.handleDataChange());
      }, pollInterval * 1000);
    }

    this.locationWatch = navigator.geolocation.watchPosition(({coords: location}) => {
      this.setStatePromise({location})
        .then(() => this.handleDataChange());
    });

    return Promise.resolve();
  }
  stopPolling() {
    clearInterval(this.poller);
    delete this.poller;

    navigator.geolocation.clearWatch(this.locationWatch);
    delete this.locationWatch;

    delete this.closest;

    return this.setStatePromise({scooters: undefined, location: undefined});
  }
  fetchBlinkee() {
    return fetch('https://blinkee.city/api/regions/11/vehicles')
      .then(res => res.json())
      .then(({data: {items: vehicles}}) => {
        return {scooters: vehicles
          .filter(({type}) => type === 'scooter')
          .map(({id, position}) => ({id, position}))
        };
      })
      .then(this.setStatePromise);
  }
  handleDataChange() {
    const {
      location: {
        latitude,
        longitude
      } = {},
      scooters = [],
      settings: {
        maxDistance
      }
    } = this.state;

    if (maxDistance && latitude && longitude) {
      const withDistance = scooters.map(scooter =>
          Object.assign({}, scooter, {distance: distance(
            latitude,
            longitude,
            scooter.position.lat,
            scooter.position.lng
          ) * 1000})
        )
        .sort(sortDistance);

      if (withDistance.length > 0) {
        const closest = withDistance[0];

        if (closest.distance < maxDistance) {
          if (!this.closest || (closest.distance < this.closest.distance && closest.id !== this.closest.id)) {
            this.closest = closest;

            this.notifyUser();
          }
        }
      }
    }
  }
  notifyUser() {
    if (Notification.permission === 'granted') {
      const dist = Math.ceil(this.closest.distance);

      this.notification = new Notification('blinkee close by!', {
        icon: 'favicon.png',
        body: `Blinkee parked at ${dist + ''} meters.`
      });
      this.notification.onclick = event => {
        event.preventDefault();
      }
    }
  }
}

export default App;
