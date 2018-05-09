import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { WorldMap, UKMap } from './Components'
import { LoadCarCharging, LoadIMD } from './Helpers'
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="mapContainer">
        <UKMap title="Electric car chargin points by constituency" load={LoadCarCharging}/>
        </div>
        <div className="mapContainer">
        <UKMap title="Deprivation by local authority" load={LoadIMD}/>
        </div>
      </div>
    );
  }
}

export default App;
