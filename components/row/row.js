import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
	},
	alive: {
		width: 10,
		height: 10,
		backgroundColor: 'aquamarine',
		borderColor: 'black',
		borderWidth: 1,
		margin: 0.5,
	},
	dead: {
		width: 10,
		height: 10,
		backgroundColor: 'white',
		borderColor: 'black',
		borderWidth: 1,
		margin: 0.5,
	},
});

export default class Row extends Component {
	render() {
		const cells = this.props.row.map((cell, i) => {
			return (
				<View style={cell === 1 ? styles.alive : styles.dead} key={i} />
			);
		});

		return <View style={styles.container}>{cells}</View>;
	}
}
