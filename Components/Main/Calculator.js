import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BUTTONS from '../Buttons/Buttons';
import Button from '../Buttons/Button';

export default class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {
      screen: '',
      buttonsGrid: [],
      result: '0'
    }
  }

  componentDidMount() {
    this.createButtonsGrid();
  }

  createButtonsGrid = () => {
    const buttonsGrid = this.state.buttonsGrid;
    for (let i = 0; i < BUTTONS.length; i++) {
      for (let j = 0; j < BUTTONS[i].length; j++) {
        buttonsGrid.push(
          <Button
            key = {BUTTONS[i][j]}
            text = {BUTTONS[i][j]}
            onPress = {() => this.handleButtonPress(BUTTONS[i][j])}
          />
        );
      }
    };

    this.setState({
      buttonsGrid: buttonsGrid
    });
  }

  handleButtonPress = (value) => {
    switch(value) {
      case '+':
      case '-':
      case '/':
      case '*':
      case '%':
        const lastChar = this.state.screen.split('').pop();
        
        if (this.state.screen === '' || value.indexOf(lastChar) !== -1) return;

        this.setState({
          screen: this.state.screen.concat(value)
        });

      break;
    }

    if (typeof value === 'number' || value === '.') {
      this.setState({
        screen: this.state.screen.concat(value)
      });
    }
    
    if (value === 'C') {
      this.setState({
        screen: '',
        result: '0'
      });
    }

    if (value === '-') {
      this.setState({
        screen: this.state.screen.concat(value)
      });
    }

    if (value === '+/-') {
      const value = parseFloat(this.state.screen) * -1
      this.setState({
        screen: value.toString()
      })
    }

    if (value === 'Del') {
      const number = this.state.screen;     
      const arr = number.split('');
      arr.pop();
      
      this.setState({
        screen: arr.join('')
      });
    }

    if (value === '=') {
      this.calulateResult();
    }
  }

  calulateResult = () => {
    const opsArray = ['+', '-', '*', '%', '/'];
    const lastCharacter = this.state.screen.split('').pop();

    if (opsArray.includes(lastCharacter)) return;

    const finalValue = this.state.screen.length === 0 ? eval(0).toString() : eval(this.state.screen).toString();
    this.setState({
      screen: '',
      result: finalValue
    });
  }

  

  render() {
    const { result, screen } = this.state;

    return(
      <View style = {styles.mainContainer}>
        <View style = {styles.screenContainer}>
          <Text style = {styles.screenDigits}>{ screen.length === 0 ? result : screen }</Text>
        </View>
        <View style = {styles.buttonsContainer}>
          {this.state.buttonsGrid}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#000'
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    marginBottom: 30,
    padding: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  buttonsContainer: {
    flex: 4,
    backgroundColor: '#000',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  screenDigits: {
    fontSize: 30
  }

})
