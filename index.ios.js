import React, { Component } from 'react'
import { AppRegistry, Navigator, Text, TouchableHighlight, View } from 'react-native'

class ReactApp extends Component {
  render() {
    return (
      <Text>Test</Text>
    )
  }
}

AppRegistry.registerComponent('reactapp', () => ReactApp)
