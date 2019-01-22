import React, { Component } from 'react';
import { View, StyleSheet, Button, TextInput, Keyboard } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { buildMatrix } from '../../utils';
import Board from '../board';

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flex: 1,
	},
	box: {
		display: 'flex',
		flexDirection: 'row',
		margin: 5,
	},
	buttonbox: {
		margin: 5,
	},
	input: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		flex: 1,
		padding: 5,
	},
});

class StartScreenComponent extends Component {
	state = {
		width: '',
		height: '',
	};

	startGame = () => {
		Keyboard.dismiss();
		this.props.navigation.navigate('Board', {
			width: this.state.width,
			height: this.state.height,
			matrix: buildMatrix(this.state.height, this.state.width),
		});
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.box}>
					<TextInput
						style={styles.input}
						onChangeText={height => this.setState({ height })}
						placeholder={'Rows'}
						keyboardType="numeric"
						value={this.state.height}
					/>
				</View>
				<View style={styles.box}>
					<TextInput
						style={styles.input}
						onChangeText={width => this.setState({ width })}
						placeholder={'Columns'}
						keyboardType="numeric"
						value={this.state.width}
					/>
				</View>
				<View style={styles.buttonbox}>
					<Button
						disabled={!this.state.height || !this.state.width}
						onPress={this.startGame}
						title="Go to board"
					/>
				</View>
			</View>
		);
	}
}

const StartScreen = createStackNavigator({
	StartScreenComponent: {
		screen: StartScreenComponent,
	},
	Board: {
		screen: Board,
	},
});

export default createAppContainer(StartScreen);
