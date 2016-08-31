import React, { Component } from 'react'
import { CameraRoll, Image, StatusBar, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import Camera from 'react-native-camera'

export default class CameraScreen extends Component {
  constructor(props) {
    super(props)
    this.camera = null
    this._setInitialState()
    this._bindFunctions()
  }

  _setInitialState() {
    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.cameraRoll,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.auto,
        flashMode: Camera.constants.FlashMode.auto
      }
    }
  }

  _bindFunctions() {
    this._takePicture = this._takePicture.bind(this)
    this._switchType = this._switchType.bind(this)
    this._switchFlash = this._switchFlash.bind(this)
    this._onPhotoCapture = this._onPhotoCapture.bind(this)
    this._onPhotoCaptureError = this._onPhotoCaptureError.bind(this)
  }

  _takePicture() {
    if (this.camera) {
      this.camera
        .capture()
        .then(this._onPhotoCapture)
        .catch(this._onPhotoCaptureError)
    }
  }

  _onPhotoCapture(data) {
    if (typeof this.props.onPhotoCapture === 'function') {
      this.props.onPhotoCapture()
    }
  }

  _onPhotoCaptureError(err) {
    console.error(err)
  }

  _switchType() {
    const { back, front } = Camera.constants.Type
    const newType = (this.state.camera.type === back) ? front : back

    this.setState({
      camera: {
        ...this.state.camera,
        type: newType
      }
    })
  }

  _switchFlash() {
    let newFlashMode
    const { auto, on, off } = Camera.constants.FlashMode

    if (this.state.camera.flashMode === auto) newFlashMode = on
    else if (this.state.camera.flashMode === on) newFlashMode = off
    else if (this.state.camera.flashMode === off) newFlashMode = auto

    this.setState({
      camera: {
        ...this.state.camera,
        flashMode: newFlashMode
      }
    })
  }

  get typeIcon() {
    const { back, front } = Camera.constants.Type
    const icon = (this.state.camera.type === back)
      ? require('../assets/ic_camera_rear_white.png')
      : require('../assets/ic_camera_front_white.png')
    return icon
  }

  get flashIcon() {
    let icon
    const { auto, on, off } = Camera.constants.FlashMode

    if (this.state.camera.flashMode === auto)
      icon = require('../assets/ic_flash_auto_white.png')
    else if (this.state.camera.flashMode === on)
      icon = require('../assets/ic_flash_on_white.png')
    else if (this.state.camera.flashMode === off)
      icon = require('../assets/ic_flash_off_white.png')

    return icon
  }

  get captureIcon() {
    return require('../assets/ic_photo_camera_36pt.png')
  }

  render() {
    const cameraRef = (cameraRef) => {
      this.camera = cameraRef
    }
    return (
      <View style={ styles.container }>
        <StatusBar animated hidden />
        <Camera
          ref={ cameraRef }
          style={ styles.preview }
          aspect={ this.state.camera.aspect }
          captureTarget={ this.state.camera.captureTarget }
          type={ this.state.camera.type }
          flashMode={ this.state.camera.flashMode }
          defaultTouchToFocus />
        <View style={ [styles.overlay, styles.topOverlay] }>
          <TouchableOpacity
            style={ styles.typeButton }
            onPress={ this._switchType }>
            <Image source={ this.typeIcon } />
          </TouchableOpacity>
          <TouchableOpacity
            style={ styles.flashButton }
            onPress={ this._switchFlash }>
            <Image source={ this.flashIcon } />
          </TouchableOpacity>
        </View>
        <View style={ [styles.overlay, styles.bottomOverlay ]}>
          <TouchableOpacity
            style={ styles.captureButton }
            onPress={ this._takePicture }>
            <Image source={ this.captureIcon } />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center'
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  captureButton: {
    flex: 1,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40
  },
  typeButton: {
    padding: 5
  },
  flashButton: {
    padding: 5
  }
})
