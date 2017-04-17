import React from 'react';
import {
  Text,
  View,
  Dimensions,
} from 'react-native';

import { CalendarDate } from './CalendarDate';

export class Calendar extends React.Component {
  render() {
    return (
      <View>        
        <View style={{flexDirection: 'row', width: Dimensions.get('window').width * 0.75, marginTop: 8}}>
          {this._renderWeekDays()}
        </View>
        <View style={{flexWrap: 'wrap', flexDirection: 'row', width: Dimensions.get('window').width * 0.75, marginTop: 10}}>
          {this._renderCalendar()}
        </View>
      </View>
    )
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
    let firstDay = this.props.currentMonth.startOf('month').format('d')
    
    for (var i = 0; i < firstDay; i++) {
      month.push({day: '', selected: false})
    }
    
    for (var i = 1; i <= this.props.currentMonth.daysInMonth(); i++) {
      month.push({day: i, selected: false})
    }
    
    return month.map((date, i) => {
      if (this.props.currentMonth.month() === this.props.selectedDate.month() && this.props.selectedDate.date() === date.day) {
        return (
          <CalendarDate selected size={size} day={date.day} selectDate={this.props._selectDate} key={i} />
        )  
      } else {
        return (
          <CalendarDate size={size} day={date.day} selectDate={this.props._selectDate} key={i} />
        )
      }
    })
  }
}