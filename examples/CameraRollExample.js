import React, { Component } from 'react'
import {
  AppRegistry,
  CameraRoll,
  Image,
  Navigator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'

export default class CameraRollExample extends Component {
  constructor(props) {
    super(props)
    this._setInitialState()
    this._bindFunctions()
  }

  componentDidMount() {
    CameraRoll
      .getPhotos({ first: 20 })
      .then(this._storeImages)
      .catch(this._logError)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Images: {this.state.images.length}</Text>
        { this.state.images.map(image => <Image key={image.uri} style={styles.image} source={{ uri: image.uri }} />)}
      </View>
    )
  }

  _setInitialState() {
    this.state = {
      images: []
    }
  }

  _bindFunctions() {
    this._storeImages = this._storeImages.bind(this)
    this._logError = this._logError.bind(this)
  }

  _storeImages(data) {
    const assets = data.edges
    const images = assets.map(asset => asset.node.image)
    this.setState({ ...this.state, images })
  }

  _logError(error) {
    console.log(error)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  image: {
    width: 100,
    height: 100
  }
})
