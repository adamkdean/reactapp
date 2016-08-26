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
import GridView from './components/GridView'

class ReactApp extends Component {
  constructor(props) {
    super(props)
    this._setInitialState()
    this._bindFunctions()
  }

  componentDidMount() {
    CameraRoll
      .getPhotos({ first: 20, groupTypes: 'All' })
      .then(this._storeImages)
      .catch(this._logError)
  }

  render() {
    console.log(`rendering with ${this.state.images.length} images`, this.state.images)
    return (
      <View style={styles.container}>
        <GridView key='gridview_01' name='gridview_01' count={this.state.images.length}>{this.state.images}</GridView>
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

    // add the camera placeholder
    images.unshift({
      data: require('./assets/camera.png'),
      onSelect: () => {
        console.log('delegate !!')
      }
    })

    this.setState({ ...this.state, images })
  }

  _logError(error) {
    console.log('Error', error)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#eeeeee',
    marginTop: 22
  },
  image: {
    width: 100,
    height: 100
  }
})

AppRegistry.registerComponent('reactapp', () => ReactApp)
