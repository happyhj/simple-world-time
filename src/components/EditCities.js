
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

import {search, getNearCities, addCity, removeCity} from '../actions/app'

import '@material/react-typography/index.scss'
import './EditCities.scss'
import TextField, {Input} from '@material/react-text-field';

import debounce from 'debounce'


class EditCities extends Component {
  state = {query: '', open: false}
  componentDidMount() {
    this.props.getNearCities()

    // this.search = debounce(this.search, 250)
  }
  search(query) {
    console.log("search", query.length)
    this.props.search(query)
  }
  // getNearCities() {
  //   console.log("getNearCities")
  //   this.props.getNearCities()
  // }
  open() {
    this.setState({open: true})
  }
  close() {
    this.setState({open: false, query: ''})
  }
  render() {
    return <div>
      <Button className={"center-bottom"} 
        style={{zIndex: 100}}
      unelevated onClick={() => this.open()}>Edit</Button>
      { this.state.open && <div className={"exit-container"}>
 
      <br/>
      <TextField outlined dense>
        <Input value={this.state.query} 
          onChange={e => {
            const query = e.currentTarget.value
            this.setState({query})
            this.search(query)
          }} />
      </TextField><br/><br/>

      {        
        this.props.app.searchResultCities.map((city, idx) => {
          return <Button key={idx} dense onClick={e => {
            this.props.addCity(city)
          }}>
            {city[1]}({city[17]} {city.offset})
          </Button>
        })
      }
      <Headline6>My Cities</Headline6>
      {        
        this.props.app.cities.map((city, idx) => {
          return <Button key={idx} dense onClick={e => {
            this.props.removeCity(city)
          }}>
            {city[1]}({city[17]} {city.offset})
          </Button>
        })
      }

      <Button className={"center-bottom"} unelevated onClick={() => this.close()}>close</Button>

      </div>}
    </div>
  }
}

export default connect(state => state, {search, getNearCities, addCity, removeCity})(EditCities)
