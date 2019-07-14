
import React, {Component} from 'react'
import {connect} from 'react-redux'

import MaterialIcon from '@material/react-material-icon';
import { Link } from 'react-router-dom'
import List, {ListItem, ListItemGraphic, ListItemText, ListItemMeta} from '@material/react-list';

import TopAppBar, {
  TopAppBarFixedAdjust, 
  TopAppBarIcon,
  TopAppBarSection,
  TopAppBarTitle,
} from '@material/react-top-app-bar'
import Button from '@material/react-button'
import '@material/react-button/index.scss'
import {
Headline6,
Headline5,
Headline3,
Body1
} from '@material/react-typography'

import {aquireLocalTimezone, aquireUTCTime} from '../actions/app'

import '@material/react-typography/index.scss'
import './TimeZoneScale.scss'

class TimeZoneScale extends Component {
  state = {}
  componentDidMount() {
  } 
  componentWillUnmount() {
  }
  render() {
    // this.props.timezone
    const timezones = [ 
      -12,-11,
      -10, -9, -8, -7, -6,
       -5, -4, -3, -2, -1,
        0,  1,  2,  3,  4,
        5,  6,  7,  8,  9,
        10, 11, 12
    ]

    
    return (<div>
      <div className="timezone-scale-container">
        {timezones.map((v, i) => {
          return <div key={i} className={
            this.props.timezone === v ? "timezone-scale selected" : "timezone-scale" 
          }
            style={{
              left: `${i* 4.1667}%`
            }}
          >
            <div className={"cities"}>
              <dic className={"city"}>
                <div className={"city-name"}>
                  <MaterialIcon icon='place' style={{
                    // position: "absolute",
                    // display: "block",
                    // left: `${(sunProgress)*100}%`,
                    // top: "50%",
                    // transform: "translateX(-50%) translateY(-50%)",
                    fontSize: "19px",
                    verticalAlign: "bottom",
                    color: "#d25454",
                  }}/>
                  Seoul</div>
                <div className={"city-time"}>
                  12:08 <span className="postfix">PM</span>
                </div>
                <div className={"city-date"}>
                  July 12th
                </div>
                <div className={"city-ampm"}>
                  Afternoon
                </div>
              </dic>
            </div>
          </div>
        })}
      </div>
    </div>)

  }
}

export default connect(state => state, {aquireLocalTimezone, aquireUTCTime})(TimeZoneScale)
