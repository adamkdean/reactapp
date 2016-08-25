'use strict'

import React, { Component } from 'react'
import { AppRegistry, StyleSheet, View, Text } from 'react-native'
import GridView from './GridView'

class ReactApp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: []
    }

    for (let i = 0; i < 100; i++) {
      this.state.data.push({
        id: i,
        uri: 'https://facebook.github.io/react/img/logo_og.png'
      })
    }    
  }

  render() {
    return (
      <GridView>{this.state.data}</GridView>
    )
  }
}

AppRegistry.registerComponent('reactapp', () => ReactApp)
