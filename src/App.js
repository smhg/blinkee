import React, { Component } from 'react';
import './App.css';
import distance from 'gps-distance';
import Location from './Location';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vehicles: JSON.parse(localStorage.getItem('blinkees')) || {}
    };

    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleReload = this.handleReload.bind(this);
  }
  componentDidMount() {
    if (!this.state.vehicles.timestamp) {
      this.loadData();
    }
  }
  render() {
    const {
      location: {
        latitude,
        longitude
      } = {},
      vehicles = {},
      distances = new Map()
    } = this.state;

    let closest, closestId, closestDistance;

    if (distances.size > 0) {
      [closestId, closestDistance] = Array.from(distances)[0];
      closest = vehicles.items.find(({id}) => id === closestId);
    }

    return (
      <div>
      <Location
        latitude={latitude}
        longitude={longitude}
        onChange={this.handleLocationChange}
      />
      {vehicles.timestamp &&
        <div>{vehicles.totalItems} blinkees loaded on {(new Date(vehicles.timestamp)).toString()}</div>
      }
      <button onClick={this.handleReload}>Reload blinkee data</button>
      {closest &&
        <div>
          Closest blinkee: <a href={`https://www.google.com/maps/dir/?api=1&travelmode=walking&origin=${latitude},${longitude}&destination=${closest.position.lat},${closest.position.lng}`}>{closestDistance} meters</a>
        </div>
      }
      </div>
    );
  }
  handleLocationChange(location) {
    return (new Promise(resolve => {
      const distances = this.calculateDistances(location, this.state.vehicles);

      this.setState({location, distances}, () => resolve());
    }));
  }
  handleReload() {
    this.loadData();
  }
  loadData() {
    return fetch('https://blinkee.city/api/regions/11/vehicles')
      .then(res => res.json())
      .then(({data: vehicles}) => {
        vehicles.timestamp = +(new Date());

        window.localStorage.setItem('blinkees', JSON.stringify(vehicles));

        return vehicles;
      })
      .then(vehicles => {
        const distances = this.calculateDistances(this.state.location, vehicles);

        this.setState({vehicles, distances});
      });
  }
  calculateDistances({latitude, longitude} = {}, {items: vehicles = []} = {}) {
    if (!latitude || !longitude) {
      return new Map();
    }

    return new Map([...vehicles].map(vehicle =>
      Object.assign({
        distance: Math.round(distance(
          latitude,
          longitude,
          vehicle.position.lat,
          vehicle.position.lng
        ) * 1000),
        ...vehicle
      })
    ).sort((left, right) => {
      if (left.distance < right.distance) {
        return -1;
      }

      if (right.distance < left.distance) {
        return 1;
      }

      return 0;
    }).map(({id, distance}) => [id, distance]));
  }
}

export default App;
