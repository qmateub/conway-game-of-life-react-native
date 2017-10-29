import React, { Component } from 'react';
import { Text, Easing, Animated, Button, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import Row from '../row';
import { buildMatrix, getSize } from '../../utils';

export default class Board extends Component {
  static navigationOptions = {
    title: 'Board',
  };

  state = {
    matrix: this.props.navigation.state.params.matrix,
    iteration: 0,
    angle: new Animated.Value(0),
  };

  componentDidMount() {
    this.state.angle.setValue(0);
    this.runAnimation();
  }

  runAnimation = () => {
    Animated.timing(this.state.angle, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear,
    }).start(o => {
      if (o.finished) {
        this.calculateNextGeneration();
        this.runAnimation();
      }
    });
  };

  // Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
  // Any live cell with two or three live neighbours lives on to the next generation.
  // Any live cell with more than three live neighbours dies, as if by overpopulation.
  // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
  calculateNextGeneration = () => {
    const nextGeneration = this.state.matrix;
    let neighbors = 0;

    for (let i = 0; i < this.props.navigation.state.params.height; i++) {
      for (let j = 0; j < this.props.navigation.state.params.width; j++) {
        // look down only
        if (i - 1 >= 0) if (this.state.matrix[i - 1][j] === 1) neighbors++;
        // look up only
        if (i + 1 < this.props.navigation.state.params.height)
          if (this.state.matrix[i + 1][j] === 1) neighbors++;
        // look right
        if (j + 1 < this.props.navigation.state.params.width)
          if (this.state.matrix[i][j + 1] === 1) neighbors++;
        // look left
        if (j - 1 >= 0) if (this.state.matrix[i][j - 1] === 1) neighbors++;

        // look top-left
        if (j - 1 >= 0 && i - 1 >= 0)
          if (this.state.matrix[i - 1][j - 1] === 1) neighbors++;
        // look top-right
        if (i - 1 >= 0 && j + 1 < this.props.navigation.state.params.width)
          if (this.state.matrix[i - 1][j + 1] === 1) neighbors++;
        // look bottom-right
        if (
          j + 1 < this.props.navigation.state.params.width &&
          i + 1 < this.props.navigation.state.params.height
        )
          if (this.state.matrix[i + 1][j + 1] === 1) neighbors++;
        // look bottom-left
        if (i + 1 < this.props.navigation.state.params.height && j - 1 >= 0)
          if (this.state.matrix[i + 1][j - 1] === 1) neighbors++;

        if (this.state.matrix[i][j] === 1) {
          // console.log(i, j, neighbors)
          if (neighbors < 2) nextGeneration[i][j] = 0;
          if (neighbors > 3) nextGeneration[i][j] = 0;
        }

        if (this.state.matrix[i][j] === 0)
          if (neighbors === 3) nextGeneration[i][j] = 1;

        neighbors = 0;
      }
    }

    this.setState(prevState => ({
      matrix: nextGeneration,
      iteration: prevState.iteration + 1,
    }));
  };

  stopGame = () => {
    this.state.angle.stopAnimation();
  };

  resetGame = () => {
    this.setState({
      iteration: 0,
      matrix: buildMatrix(
        this.props.navigation.state.params.height,
        this.props.navigation.state.params.width
      ),
    });
  };

  render() {
    const rows = this.state.matrix.map((row, j) => <Row row={row} key={j} />);

    return (
      <View style={styles.container}>
        {rows}
        <View style={styles.box}>
          <Button
            onPress={this.stopGame}
            title="Stop"
            color="purple"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
        <Text style={styles.baseText}>Iteration:{this.state.iteration}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  baseText: {
    fontFamily: 'Cochin',
    fontSize: 40,
    fontWeight: 'bold',
  },
  box: {
    margin: 5,
  },
});
