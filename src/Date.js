import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Moment from 'moment';

import { Calendar } from './Calendar';

export class Date extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      fadeAnim: new Animated.Value(1),
      currentMonth: props.initial || Moment(),
      selectedDate: props.initial || Moment(),
    }
  }
  
  render() {
    if (!this.props.isVisible) {
      return <View />;
    } else {
      // Animated.timing(this.state.fadeAnim, {
      //   toValue: 1,
      //   duration: 500
      // }).start();
      
      return (
        <Animated.View style={[styles.modalContainer, {opacity: this.state.fadeAnim}]}>
          <TouchableOpacity onPress={this._closeModal} style={styles.modalBackground} />
          
          <View style={{width: Dimensions.get('window').width * 0.85, height: 310, backgroundColor: 'rgba(250,250,250,1)', borderRadius: 5, alignItems: 'center'}}>
            <Text onPress={this._closeModal} style={{color: '#000', position: 'absolute', right: 15, top: 20}}>X</Text>
            
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
              <TouchableOpacity onPress={this._backwards}>
                <Text style={{fontSize: 20}}>{'<'}</Text>
              </TouchableOpacity>
              <View style={{width: 135, alignItems: 'center'}}>
                <Text style={{fontSize: 16}}>{this.state.currentMonth.format('MMMM - YYYY')}</Text>
              </View>
              <TouchableOpacity onPress={this._forwards}>
                <Text style={{fontSize: 20}}>{'>'}</Text>
              </TouchableOpacity>
            </View>
            
            <Calendar selectedDate={this.state.selectedDate} currentMonth={this.state.currentMonth} selectDate={this._selectDate} />
          </View>
        </Animated.View>
      )
    }
  }
  
  _closeModal = () => {
    this.props.onDateChange(this.state.selectedDate)
    this.setState({fadeAnim: new Animated.Value(1)});
    this.props.closeModal()
  }
  
  _selectDate = (day) => {
    let currentDate = this.state.currentMonth.clone().date(day)
    this.setState({selectedDate: currentDate})
    // this.props.onDateChange(currentDate)
  }

  _backwards = () => {
    this.setState({currentDate: this.state.currentMonth.subtract(1, 'months')})
  }

  _forwards = () => {
    this.setState({currentDate: this.state.currentMonth.add(1, 'months')})
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