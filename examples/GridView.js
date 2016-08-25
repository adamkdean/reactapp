import React, { Component } from 'react'
import {
  AppRegistry,
  ListView,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'

export default class GridView extends Component {
  constructor(props) {
    super(props)
    const data = props.children || []
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataSource: ds.cloneWithRows(data)
    }

    this._renderRow = this._renderRow.bind(this)
    this._selectItem = this._selectItem.bind(this)
  }

  render() {
    return (
      <View style={styles.mainView}>
        <ListView
          contentContainerStyle={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          initialListSize={30}
        />
      </View>
    )
  }

  _renderRow (rowData, sectionId, rowId) {
    const imgSource = { uri: rowData.uri }
    console.log('imgSource', imgSource)
    return (
      <TouchableHighlight
        style={styles.row}
        onPress={() => this._selectItem(rowData)}
        underlayColor='rgba(0,0,0,0)'>
        <View>
          <Image style={styles.thumb} source={imgSource} />
        </View>
      </TouchableHighlight>
    )
  }

  _selectItem (item) {
    // do something with item
    console.log('item selected', item.id, item.uri)
  }
}

const styles = StyleSheet.create({
  mainView: {
    paddingTop: 22,
    flex: 1
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#eeeeee',
    paddingTop: 8,
  },
  row: {
    justifyContent: 'center',
    margin: 6,
    width: 64,
    height: 64,
    alignItems: 'center'
  },
  thumb: {
    width: 64,
    height: 64
  }
})
