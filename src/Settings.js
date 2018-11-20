import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Settings.css';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.handlePollIntervalChange = this.handlePollIntervalChange.bind(this);
    this.handleMaxDistanceChange = this.handleMaxDistanceChange.bind(this);
  }
  render() {
    const {
      pollInterval = 60,
      maxDistance = 500
    } = this.props;

    return (
      <form className="settings">
        Check every <input
          id="pollInterval"
          name="pollInterval"
          type="number"
          value={pollInterval}
          onChange={this.handlePollIntervalChange}
          min={15}
          step={15}
        /> seconds<br />
        Notify when Blinkee within <input
          id="maxDistance"
          name="maxDistance"
          type="number"
          value={maxDistance}
          onChange={this.handleMaxDistanceChange}
          min={100}
          step={100}
        /> meters
      </form>
    );
  }
  handlePollIntervalChange(event) {
    const pollInterval = parseInt(event.target.value, 10);

    return this.props.onChange({pollInterval});
  }
  handleMaxDistanceChange(event) {
    const maxDistance = parseInt(event.target.value, 10);

    return this.props.onChange({maxDistance});
  }
}

Settings.propTypes = {
  pollInterval: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

export default Settings;
