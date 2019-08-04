
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
    const primaryCity =this.props.app.primaryCity
    if (!primaryCity) {
      return <div></div>
    }
    
    const timezones = [ 
      -12,-11,
      -10, -9, -8, -7, -6,
       -5, -4, -3, -2, -1,
        0,  1,  2,  3,  4,
        5,  6,  7,  8,  9,
        10, 11, 12
    ]
    
    const cities = [Object.assign(primaryCity, {isPrimary: true})]
    cities.push(...this.props.app.cities.map(v => {
      let offset = v.offset
      if (offset > 12) {
        offset = offset - 24
      } else if (offset < -12) {
        offset = offset + 24  
      }  
      return Object.assign(v, {offset})
    }))
    const timezoneBucket = timezones.map(offset => {  
      return {
        offset,
        cities: cities.filter(city => city.offset === offset)
      }
    })

    timezoneBucket.some(timezone => timezone.cities.length > 1)
    let cityDrawn = 0
    return (<div>
      <div className="timezone-scale-container">
        {timezones.map((v, timezoneIdx) => {
          const cities = timezoneBucket.filter(timezone => timezone.offset === v)[0].cities
          const numOfCities = cities.length
          const time = new Date(this.props.app.UTCTimestamp + (v * 60 * 60 * 1000))
          const isPrimaryTimezone = cities.some(city => city.isPrimary)
          const numOfPrimaryTimezoneCity = timezoneBucket.filter(v => v.offset === primaryCity.offset)[0].cities.length
          const numOfPlaceholders = isPrimaryTimezone ? 0 : Math.max(cityDrawn, 0) + numOfPrimaryTimezoneCity

          let scaleHeight = undefined

          if (numOfCities > 0) {
            if (isPrimaryTimezone) {
              scaleHeight = `${46}px`
            } else {
              scaleHeight = `${52 + (numOfPlaceholders) * 80}px`
            }    
          }
        
          return <div key={timezoneIdx} className={
            numOfCities > 0 ? "timezone-scale selected" : "timezone-scale" 
          }
            style={{
              left: `${timezoneIdx* 4.1667}%`,
              height: scaleHeight
            }}
          >
            <div className={"cities"}>
              {
                (() => {
                  // place holder 
                  const ph = []
                  for (let i=0;i<numOfPlaceholders;i++) {
                    ph.push(<div className={"city placeholder"}></div>)
                  }
                  return ph
                })()
              }
              {
                cities.map(city => {
                  cityDrawn = cityDrawn + 1
                  return <div className={"city"}>
                    <div className={"city-name"}>
                      {city.isPrimary && <MaterialIcon icon='place' style={{
                          fontSize: "19px",
                          verticalAlign: "bottom",
                          color: "#d25454",
                        }}/>
                      }
                      <span>{city[1]}</span></div>
                    <div className={"city-time"}>
                    <span>{time.getUTCHours()}:{time.getUTCMinutes()}</span>
                    </div>
                    <div className={"city-date"}>
                    <span>{time.getUTCMonth()}/{time.getUTCDate()}</span>
                    </div>
                    <div className={"city-ampm"}>
                      {/* Afternoon */}
                    </div>
                  </div>
                }) 
              }
              <div className={"city placeholder"}></div>
              <div className={"city placeholder"}></div>
            </div>
          </div>
        })}
      </div>
    </div>)

  }
}

export default connect(state => state, {aquireLocalTimezone, aquireUTCTime})(TimeZoneScale)
