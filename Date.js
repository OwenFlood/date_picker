import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Moment from 'moment';

export default class Date extends React.Component {
  state = {
    selected: false,
  }
  
  render() {
    let dateColor;
    this.props.selected ? dateColor = 'green' : dateColor = 'white'
    return (
      <TouchableOpacity
        onPress={this._handlePressed}
        style={[styles.date, {width: this.props.size, height: this.props.size, backgroundColor: dateColor}]}>
        <Text>{this.props.day}</Text>
      </TouchableOpacity>
    )
  }
  
  _handlePressed = () => {
    this.setState({selected: !this.state.selected});
    this.props.selectDate(this.props.day)
  }
}

const styles = StyleSheet.create({
  date: {
    borderWidth: 1,
    borderColor: 'black',
  },
})