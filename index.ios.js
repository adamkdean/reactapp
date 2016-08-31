import React, { Component } from 'react'
import { AppRegistry, Navigator, Text, TouchableHighlight, View } from 'react-native'

import GalleryScreen from './screens/GalleryScreen'

class ReactApp extends Component {
  render() {
    return (
      <Navigator
        style={{ flex: 1, paddingTop: 22  }}
        initialRoute={{ component: GalleryScreen }}
        renderScene={ this._renderScene }
        configureScene={ this._configureScene }/>
    )
  }

  _configureScene(route, routeStack) {
    // SceneConfigs: https://gist.github.com/adamkdean/e14102e4c0170fe0ae553f0eee475170
    return (route.type === 'Modal')
       ? Navigator.SceneConfigs.FloatFromBottom
       : Navigator.SceneConfigs.PushFromRight
  }

  _renderScene(route, navigator) {
    const props = { ...this.props, ...route.passProps, route, navigator }
    return React.createElement(route.component, props)
  }
}

AppRegistry.registerComponent('reactapp', () => ReactApp)
