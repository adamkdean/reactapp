import React, { Component } from 'react'
import { CameraRoll, Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native'

export default class LayoutScreen extends Component {
  constructor(props) {
    super(props)
    this._setInitialState()
    this._bindFunctions()
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text>LayoutScreen</Text>
      </View>
    )
  }

  _setInitialState() {
    this.state = {}
  }

  _bindFunctions() {
    // this._method = this._method.bind(this)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#eeeeee'
  }
})
