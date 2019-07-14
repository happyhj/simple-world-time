
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
import './SolarVisualization.scss'

import solarGradient from '../assets/solar_gradient.png';

class SolarVisualization extends Component {
  state = {img: null}
  componentDidMount() {
    const image = new Image()
    image.src = solarGradient
    image.onload = () => {
      this.setState({img: image})
    }
    if (!this.props.app.UTCTimestamp) {
      return
    }
    this.updateCanvas()
  }
  updateCanvas() {
    if(!this.canvas || !this.context || !this.state.img) return
    const canvas = this.canvas
    const ctx = this.context
    let timeProgress = (1-(
      (this.props.hours) * 60 * 60 +
      this.props.minutes * 60 + 
      this.props.seconds
    ) / 86400)
    timeProgress = timeProgress + this.props.startPosition
    if (timeProgress >= 1) {
      timeProgress = timeProgress - 1
    }

    ctx.drawImage(this.state.img,
      this.state.img.width * (1-timeProgress) , 0, // 소스 이미지 시작 위치
      this.state.img.width * timeProgress, this.state.img.height,  // 소스 이미지 크기
      0, 0, // 캔바스 위치
      canvas.width * timeProgress, canvas.height // 캔바스 크기
    )

    ctx.drawImage(this.state.img,
      0, 0, // 소스 이미지 시작 위치
      this.state.img.width * (1-timeProgress), this.state.img.height,  // 소스 이미지 크기
      canvas.width * timeProgress, 0, // 캔바스 위치
      canvas.width * (1-timeProgress), canvas.height // 캔바스 크기
    )
  }
  componentWillUpdate() {
    setTimeout(() => {
      this.updateCanvas()
    }, 0)
  }
  render() {
    if (!this.props.app.UTCTimestamp) {
      return (<div>aquiring utc timestamp</div>)
    }

    let timeProgress = (1-(
      (this.props.hours) * 60 * 60 +
      this.props.minutes * 60 + 
      this.props.seconds
    ) / 86400)
    timeProgress = timeProgress + this.props.startPosition
    if (timeProgress >= 1) {
      timeProgress = timeProgress - 1
    }
    let sunProgress = timeProgress + 0.5
    if (sunProgress >= 1) {
      sunProgress = sunProgress - 1
    }

    // 이미지 좌측이 현재 로컬시간 과 일치해야함
    return (<div>
      <div 
        style={{
          position: "relative",
          width: "100%",
          height: "30px",
      }}>

        <MaterialIcon icon='wb_sunny' style={{
          position: "absolute",
          display: "block",
          left: `${(sunProgress)*100}%`,
          top: "50%",
          transform: "translateX(-50%) translateY(-50%)",
          color: "rgba(0, 0, 0, 0.25)",
          fontSize: "16px"
        }}/>


        <MaterialIcon icon='grade' style={{
          position: "absolute",
          display: "block",
          left: `${(timeProgress)*100}%`,
          top: "50%",
          transform: "translateX(-50%) translateY(-50%)",
          color: "rgba(0, 0, 0, 0.25)",
          fontSize: "16px"
        }}/>
      </div>

      <canvas ref={c => {
        if (c) {
          this.canvas = c
          this.context = c.getContext('2d')
        }
      }} width={this.props.width} height={this.props.height} 
      style={{
        width: "100%",
        height: this.props.height
      }}/>
      <img ref="image" src={solarGradient} className="hidden" />
    </div>)
  }
}

export default connect(state => state, {aquireLocalTimezone, aquireUTCTime})(SolarVisualization)
