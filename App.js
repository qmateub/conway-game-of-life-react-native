import React, { Component } from 'react';
import { Easing, Animated, Button, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import Row from './components/Row';
import { buildMatrix } from './utils';

const WIDTH = 10;
const HEIGHT = 10;

export default class App extends Component {
  state = {
    matrix: buildMatrix(HEIGHT, WIDTH),
    running: new Animated.Value(0),
    iteration: 0,
  };

  // Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
  // Any live cell with two or three live neighbours lives on to the next generation.
  // Any live cell with more than three live neighbours dies, as if by overpopulation.
  // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
  calculateNextGeneration = () => {
    const nextGeneration = this.state.matrix;
    let vecinos = 0;
    let then = new Date().getTime();
    let now;
    // let delta;

    for (let i = 0; i < HEIGHT; i++) {
      for (let j = 0; j < WIDTH; j++) {
        // look down only
        if (i - 1 > 0) if (this.state.matrix[i - 1][j] === 1) vecinos++;
        // look up only
        if (i + 1 < HEIGHT) if (this.state.matrix[i + 1][j] === 1) vecinos++;
        // look right
        if (j + 1 < WIDTH) if (this.state.matrix[i][j + 1] === 1) vecinos++;
        // look left
        if (j - 1 > 0) if (this.state.matrix[i][j - 1] === 1) vecinos++;

        // look top-left
        if (j - 1 > 0 && i - 1 > 0)
          if (this.state.matrix[i - 1][j - 1] === 1) vecinos++;
        // look top-right
        if (i - 1 > 0 && j + 1 < WIDTH)
          if (this.state.matrix[i - 1][j + 1] === 1) vecinos++;
        // look bottom-right
        if (j + 1 < WIDTH && i + 1 < HEIGHT)
          if (this.state.matrix[i + 1][j + 1] === 1) vecinos++;
        // look bottom-left
        if (i + 1 < HEIGHT && j - 1 > 0)
          if (this.state.matrix[i + 1][j - 1] === 1) vecinos++;

        console.log(`celula[${i}][${j}] tiene ${vecinos} vecinos`);

        if (this.state.matrix[i][j] === 1) {
          if (vecinos < 2) nextGeneration[i][j] = 0;
          if (vecinos > 3) nextGeneration[i][j] = 0;
        }

        if (this.state.matrix[i][j] === 0)
          if (vecinos === 3) nextGeneration[i][j] = 1;

        vecinos = 0;
      }
    }

    this.setState(prevState => ({
      matrix: nextGeneration,
      iteration: prevState.iteration + 1,
    }));
  };

  startGame = () => {
    this.calculateNextGeneration();
  };

  resetGame = () => {
    this.setState({
      iteration: 0,
      matrix: buildMatrix(HEIGHT, WIDTH),
    });
  };

  render() {
    const rows = this.state.matrix.map((row, j) => <Row row={row} key={j} />);

    return (
      <View style={styles.container}>
        {rows}
        <Button
          onPress={this.startGame}
          title="Next generation"
          color="green"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={this.resetGame}
          title="Reset"
          color="red"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});
