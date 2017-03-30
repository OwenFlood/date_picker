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

import Date from './Date';

export default class DatePicker extends React.Component {
  
  state = {
    currentMonth: Moment(),
    selectedDate: Moment(),
  }
  
  render() {
    if (!this.props.isVisible) {
      return <View />;
    } else {
      return (
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={this.props.closeModal} style={styles.modalBackground} />
          
          <View style={{width: Dimensions.get('window').width * 0.85, height: 310, backgroundColor: 'rgba(250,250,250,1)', borderRadius: 5, alignItems: 'center'}}>
            <Text onPress={this.props.closeModal} style={{color: '#000', position: 'absolute', right: 15, top: 20}}>X</Text>
            
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
            
            <View style={{flexDirection: 'row', width: Dimensions.get('window').width * 0.75, marginTop: 8}}>
              {this._renderWeekDays()}
            </View>
            <View style={{flexWrap: 'wrap', flexDirection: 'row', width: Dimensions.get('window').width * 0.75, marginTop: 10}}>
              {this._renderCalendar()}
            </View>
          </View>
        </View>
      )
    }
  }
  
  _renderWeekDays = () => {
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    
    return days.map((day, i) => {
      return (
        <Text key={i} style={{width: (Dimensions.get('window').width * 0.75) * 0.14, alignItems: 'center'}}>{day}</Text>
      )
    })
  }

  _renderCalendar = () => {
    let days = 1
    let month = []
    let size = (Dimensions.get('window').width * 0.75) * 0.14
    // Using this gets the first day of the month for adjusting the date placement
    // hi.startOf('month').format('MMMM/YY - dddd')
    let firstDay = this.state.currentMonth.startOf('month').format('d')
    
    for (var i = 0; i < firstDay; i++) {
      month.push({day: '', selected: false})
    }
    
    for (var i = 1; i <= this.state.currentMonth.daysInMonth(); i++) {
      month.push({day: i, selected: false})
    }
    
    return month.map((date, i) => {
      if (this.state.currentMonth.month() === this.state.selectedDate.month() && this.state.selectedDate.date() === date.day) {
        return (
          <Date selected size={size} day={date.day} selectDate={this._selectDate} key={i} />
        )  
      } else {
        return (
          <Date size={size} day={date.day} selectDate={this._selectDate} key={i} />
        )
      }
    })
  }
  
  _selectDate = (day) => {
    let currentDate = this.state.currentMonth.clone().date(day)
    this.setState({selectedDate: currentDate})
    this.props.onDateChange(currentDate)
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