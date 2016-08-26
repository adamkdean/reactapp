import React, { Component } from 'react'
import { AppRegistry } from 'react-native'

import CameraRollExample from './examples/CameraRollExample'

class ReactApp extends Component {
  render() {
    return <CameraRollExample />
  }
}

AppRegistry.registerComponent('reactapp', () => ReactApp)
