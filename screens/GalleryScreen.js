import React, { Component } from 'react'
import { CameraRoll, Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import CameraScreen from './CameraScreen'
import LayoutScreen from './LayoutScreen'
import GridView from '../components/GridView'

export default class GalleryScreen extends Component {
  constructor(props) {
    super(props)
    this._setInitialState()
    this._bindFunctions()
  }

  componentDidMount() {
    this._refreshCameraRoll()
  }

  render() {
    return (
      <View style={ styles.container }>
        <GridView key='gridview_01' count={ this.state.images.length }>
          { this.state.images }
        </GridView>
      </View>
    )
  }

  _setInitialState() {
    this.state = {
      images: []
    }
  }

  _bindFunctions() {
    this._refreshCameraRoll = this._refreshCameraRoll.bind(this)
    this._processCameraRoll = this._processCameraRoll.bind(this)
    this._constructCameraIcon = this._constructCameraIcon.bind(this)
    this._constructLayoutIcon = this._constructLayoutIcon.bind(this)
    this._logError = this._logError.bind(this)
  }

  _refreshCameraRoll() {
    CameraRoll
      .getPhotos({ first: 20, groupTypes: 'All' })
      .then(this._processCameraRoll)
      .catch(this._logError)
  }

  _processCameraRoll(data) {
    const self = this
    const assets = data.edges
    const images = assets.map(asset => asset.node.image)

    images.unshift(this._constructLayoutIcon())
    images.unshift(this._constructCameraIcon())

    this.setState({ ...this.state, images })
  }

  _constructCameraIcon() {
    return {
      data: require('../assets/camera.png'),
      onSelect: () => {
        this.props.navigator.push({
          component: CameraScreen,
          type: 'Modal',
          passProps: {
            onPhotoCapture: () => {
              this.props.navigator.pop()
              this._refreshCameraRoll()
            }
          }
        })
      }
    }
  }

  _constructLayoutIcon() {
    return {
      data: require('../assets/layout.png'),
      onSelect: () => {
        this.props.navigator.push({
          component: LayoutScreen,
          type: 'Modal',
          passProps: {
            // TODO
          }
        })
      }
    }
  }

  _logError(error) {
    console.log('Error', error)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#eeeeee'
  },
  image: {
    width: 100,
    height: 100
  }
})
