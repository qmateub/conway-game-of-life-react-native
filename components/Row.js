import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  alive: {
    width: 20,
    height: 20,
    backgroundColor: 'aquamarine',
    borderColor: 'black',
    borderWidth: 1,
    margin: 1,
  },
  dead: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    margin: 1,
  },
});

export default class Row extends Component {
  render() {
    const cells = this.props.row.map(cell => {
      return <View style={cell === 1 ? styles.alive : styles.dead} />;
    });

    return (
      <View style={styles.container}>
        {cells}
      </View>
    );
  }
}

Row.propTypes = {
  row: React.PropTypes.array.isRequired,
};
