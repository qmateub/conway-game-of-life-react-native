import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import StartScreen from './components/start-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StartScreen />
      </View>
    );
  }
}
