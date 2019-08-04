
import React, {Component} from 'react'
import { Route, Redirect, Switch } from "react-router-dom"

import {connect} from 'react-redux'
import Slider from '@material-ui/core/Slider';

// import LabelingJobs from './LabelingJobs'
// import LabelingJobOverview from './LabelingJobOverview'
// import LabelingTool from './LabelingTool'
import SolarVisualization from './SolarVisualization'
import TimeZoneScale from './TimeZoneScale'
import EditCities from './EditCities'


import {aquireLocalTimezone, aquireUTCTime, addCity} from '../actions/app'

import './App.css'

class App extends Component {
  // 앱이 시작될 때 현재 로컬 타임존을 얻어온다.
  // UTC 시간 알아온다.  
  state = {localHours: null, localtimeVal: 0, refPosition:0, timezone: 0}
  componentDidMount() {
    this.props.aquireLocalTimezone()
    setInterval(() => {
      this.props.aquireUTCTime()
    }, 1000)

    // city restore   
    const cities = JSON.parse(localStorage.getItem("cities")) || []
    cities.forEach(city => this.props.addCity(city))    
  }
  componentWillUnmount() {
  }

  render() {
    const time = (new Date()).getUTCHours() +
    (new Date()).getUTCMinutes()/60 +
    (new Date()).getUTCSeconds()/(60*60)

    return (
      <div className="App">
        <div className="content-container">
          <SolarVisualization
            hours={time}
            minutes={0}
            seconds={0}
            width={800}
            height={24}
            startPosition={0.5}
          />
          <TimeZoneScale/>
{/* 
          <p>local time: {parseInt(this.state.localtimeVal/(60*60), 10)}</p>
          <Slider value={this.state.localtimeVal} 
            min={0}
            max={86400}
            onChange={(e, v) => {
              this.setState({localtimeVal: v})
            }} aria-labelledby="local-time-slider" />
          <p>ref position</p>
          <Slider value={this.state.refPosition} 
            min={0}
            max={100}
            onChange={(e, v) => {
              this.setState({refPosition: v})
            }} aria-labelledby="ref-position-slider" />
          <p>timezone: {this.state.timezone}</p>
          <Slider value={this.state.timezone} 
            min={-12}
            max={12}
            onChange={(e, v) => {
              this.setState({timezone: v})
            }} aria-labelledby="timezone-slider" />
          <br/>
          <br/> */}
        </div>
        <EditCities />
      </div>
    )
  }
}
export default connect(state => state, {aquireLocalTimezone, aquireUTCTime, addCity})(App)
