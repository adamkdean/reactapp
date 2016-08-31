import React, { Component } from 'react'
import { ListView, Image, StyleSheet, TouchableHighlight, View } from 'react-native'

export default class GridView extends Component {
  constructor(props) {
    super(props)
    this._setInitialState()
    this._bindFunctions()
  }

  componentWillReceiveProps(nextProps) {
    const data = nextProps.children || []
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    const dataSource = ds.cloneWithRows(data)
    this.setState({ ...this.state, dataSource })
  }

  render() {
    return (
      <ListView
        contentContainerStyle={ styles.list }
        dataSource={ this.state.dataSource }
        renderRow={ this._renderRow }
        initialListSize={ 30 }
      />
    )
  }

  _setInitialState() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataSource: ds
    }
  }

  _bindFunctions() {
    this._renderRow = this._renderRow.bind(this)
    this._selectItem = this._selectItem.bind(this)
  }

  _renderRow (rowData, sectionId, rowId) {
    const imgSource = rowData.uri
      ? { uri: rowData.uri }
      : rowData.data

    return (
      <TouchableHighlight
        style={ styles.row }
        onPress={ () => this._selectItem(rowData) }
        underlayColor='rgba(0,0,0,0)'>
        <View>
          <Image style={ styles.thumb } source={ imgSource } />
        </View>
      </TouchableHighlight>
    )
  }

  _selectItem (item) {
    if (typeof item.onSelect === 'function') {
      item.onSelect()
    } else {
      // do nothing with item?
    }
  }
}

const styles = StyleSheet.create({
  list: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  row: {
    backgroundColor: '#aaaaaa',
    justifyContent: 'center',
    margin: 2,
    width: 72,
    height: 72,
    alignItems: 'center'
  },
  thumb: {
    width: 72,
    height: 72
  }
})
