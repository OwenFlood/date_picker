# date_picker

A pure JS, custom react-native date picker for ios/android :iphone:

Are you *tired* of looking at the *bland* react native date pickers for ios and android?

Do you wish that there was a cross-platform, responsive, and elegant solution?

Well you're in luck! With the **date_picker_9000** you can make your bland react native project look **brand new** with little to no hassle!

Just `npm i date_picker` and get coding!

To see how the default date picker seamlessly integrates into your project, just `import DatePicker from 'date_picker'` and put it at the bottom of your `render` method:

```
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import DatePicker from 'date_picker'

class App extends React.Component {
  state = {
    isVisible: false,
    date: new Date(),
  }
  
  render() {
    return (
      <View style={styles.Container}>
        <Text>{this.state.date.toString()}</Text>
        // All you other rad components
        
        <TouchableOpacity
          onPress={this._toggleDatePicker}>
          <Text>Pick That Date!</Text>
        </TouchableOpacity>
        
        <DatePicker
          isVisible={this.state.isVisible}
          onDateChange={this.onDateChange}
        />
      </View>
    )
  }
  
  _toggleDatePicker = () => {
    this.setState({isVisible: !this.state.isVisible})
  }
  
  onDateChange = (newDate) => {
    this.setState({date: newDate});
  }
}
```