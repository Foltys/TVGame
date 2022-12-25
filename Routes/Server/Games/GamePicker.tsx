import React from 'react'
import { View, Text, TouchableHighlight, ScrollView, StyleSheet } from 'react-native'

const GameList = [
	{ id: 1, name: 'Game 1' },
	{ id: 2, name: 'Game 2' },
	{ id: 3, name: 'Game 3' },
	// add more games here
]

const GamesPicker = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.header}>Choose Game</Text>
			<View style={styles.divider} />
			<ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent} horizontal>
				{GameList.map((game) => (
					<TouchableHighlight key={game.id} style={styles.gameButton}>
						<Text style={styles.gameText}>{game.name}</Text>
					</TouchableHighlight>
				))}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	header: {
		fontSize: 24,
		textAlign: 'center',
	},
	divider: {
		borderBottomColor: 'gray',
		borderBottomWidth: 1,
		width: '100%',
	},
	scrollView: {
		flexDirection: 'row',
	},
	scrollViewContent: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	gameButton: {
		padding: 10,
		margin: 10,
		backgroundColor: 'lightgray',
		borderRadius: 5,
	},
	gameText: {
		fontSize: 16,
	},
})

export default GamesPicker
