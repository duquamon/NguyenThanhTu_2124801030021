import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Vibration, Dimensions, SafeAreaView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { evaluate, sqrt, pow } from 'mathjs';

const { width } = Dimensions.get('window');

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');
  const [isResult, setIsResult] = useState(false);
  const [savedResult, setSavedResult] = useState('');

  const buttons = [
    ['C', 'DEL', '√', '^2'],
    [7, 8, 9, '/'],
    [4, 5, 6, '*'],
    [1, 2, 3, '-'],
    [0, '.', '=', '+']
  ];

  const calculator = () => {
    try {
      let result = evaluate(currentNumber);
      setCurrentNumber(result.toString());
      setSavedResult(result.toString());
      setIsResult(true);
    } catch (error) {
      setCurrentNumber('Error');
    }
  };

  const handleInput = (buttonPressed: string | number) => {
    if (isResult && [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.'].includes(buttonPressed)) {
      setCurrentNumber(buttonPressed.toString());
      setIsResult(false);
      return;
    }

    if (['+', '-', '*', '/'].includes(String(buttonPressed))) {
      Vibration.vibrate(35);
      setCurrentNumber(currentNumber + buttonPressed);
      setIsResult(false);
      return;
    } else if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.'].includes(buttonPressed)) {
      Vibration.vibrate(35);
    }

    switch (buttonPressed) {
      case 'DEL':
        Vibration.vibrate(35);
        setCurrentNumber(currentNumber.slice(0, -1));
        setIsResult(false);
        return;
      case 'C':
        Vibration.vibrate(35);
        setLastNumber('');
        setCurrentNumber('');
        setIsResult(false);
        return;
      case '=':
        Vibration.vibrate(35);
        setLastNumber(currentNumber);
        calculator();
        return;
      case 'ANS':
        Vibration.vibrate(35);
        setCurrentNumber(currentNumber + savedResult);
        setIsResult(false);
        return;
      case '√':
        Vibration.vibrate(35);
        try {
          const result = sqrt(parseFloat(currentNumber));
          setCurrentNumber(result.toString());
          setSavedResult(result.toString());
        } catch (error) {
          setCurrentNumber('Error');
        }
        setIsResult(true);
        return;
      case '^2':
        Vibration.vibrate(35);
        try {
          const result = pow(parseFloat(currentNumber), 2);
          setCurrentNumber(result.toString());
          setSavedResult(result.toString());
        } catch (error) {
          setCurrentNumber('Error');
        }
        setIsResult(true);
        return;
    }
    setCurrentNumber(currentNumber + buttonPressed);
  };

  const styles = StyleSheet.create({
    results: {
      backgroundColor: darkMode ? '#1A1A1A' : '#F3F3F3',
      minHeight: '30%',
      justifyContent: 'center',
      alignItems: 'flex-end',
      padding: 20,
    },
    resultText: {
      color: darkMode ? '#FFDDC1' : '#333333',
      fontSize: 45,
    },
    historyText: {
      color: darkMode ? '#AAAAAA' : '#AAAAAA',
      fontSize: 18,
      marginBottom: 5,
    },
    themeButton: {
      position: 'absolute',
      top: 20,
      right: 20,
      backgroundColor: darkMode ? '#333333' : '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center',
      width: 60,
      height: 60,
      borderRadius: 30,
    },
    buttonsContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      padding: 15,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15,
    },
    button: {
      borderColor: darkMode ? '#333333' : '#BBBBBB',
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: width / 4 - 20,  // Giảm kích thước nút
      height: width / 4 - 20,
      borderRadius: 12,
    },
    textButton: {
      color: darkMode ? '#FFDDC1' : '#444444',
      fontSize: 26,
    },
    buttonSpecial: {
      backgroundColor: darkMode ? '#555555' : '#DDDDDD',
    },
    ansButton: {
      backgroundColor: '#FF5733',
      color: 'white',
      width: width / 2 - 20,
      height: width / 6 - 30,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 15,
    },
  });
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: darkMode ? '#222222' : '#EEEEEE' }}>
      <View style={styles.results}>
        <TouchableOpacity style={styles.themeButton}>
          <Entypo
            name={darkMode ? 'light-up' : 'moon'}
            size={24}
            color={darkMode ? 'white' : 'black'}
            onPress={() => setDarkMode(!darkMode)}
          />
        </TouchableOpacity>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.ansButton}
            onPress={() => handleInput('ANS')}
          >
            <Text style={[styles.textButton, { color: 'white' }]}>ANS</Text>
          </TouchableOpacity>
        </View>
        {buttons.map((row, rowIndex) =>
          <View key={rowIndex} style={styles.buttonRow}>
            {row.map((button) =>
              button === '√' || button === '^2' || button === 'C' || button === 'DEL' || button === '/' || button === '*' || button === '-' || button === '+' ? (
                <TouchableOpacity
                  key={button}
                  style={[styles.button, styles.buttonSpecial]}
                  onPress={() => handleInput(button)}
                >
                  <Text style={styles.textButton}>{button}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  key={button}
                  style={styles.button}
                  onPress={() => handleInput(button)}
                >
                  <Text style={styles.textButton}>{button}</Text>
                </TouchableOpacity>
              )
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
