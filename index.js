import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

export default class DatePicker extends React.Component {
  render() {
    if (!this.props.isVisible) {
      return <View />;
    } else if (Platform.OS === 'ios') {
      return (
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={this.props.closeModal} style={styles.modalBackground} />

          <View style={{width: Dimensions.get('window').width * 0.85, height: 250, backgroundColor: 'rgba(250,250,250,1)', borderRadius: 5, alignItems: 'center'}}>
          <Text onPress={this.props.closeModal} style={{color: '#000', position: 'absolute', right: 15, top: 20}}>X</Text>
            {/*<DatePickerIOS
              date={this.props.startDate}
              style={{width: 250, height: 175, marginTop: 15}}
              mode={this.props.type}
              onDateChange={this.props.onDateChange}
            />*/}
          </View>
        </View>
      )
    } else if (Platform.OS === 'android') {
      this._isAndroid()
      return <View />;
    }
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    backgroundColor: 'rgba(0,0,0,.8)',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  }
});