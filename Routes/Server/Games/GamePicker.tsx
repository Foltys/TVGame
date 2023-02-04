import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { View, Text, TouchableHighlight, ScrollView, StyleSheet } from 'react-native'
import { FocusableButton } from '../../../components/Focusables'
import { GameNavigatorStackParams } from './GameNavigator'

const GameList = [
	{ id: 1, name: 'Quiz' },
	// add more games here
]

type GamePickerProps = NativeStackScreenProps<GameNavigatorStackParams, 'GamePicker'>

const GamesPicker = ({ navigation }: GamePickerProps) => {
	return (
		<View style={styles.container}>
			<Text style={styles.header}>Choose Game</Text>
			<View style={styles.divider} />
			<ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent} horizontal>
				{GameList.map((game) => (
					<FocusableButton
						key={game.id}
						style={styles.gameButton}
						onPress={() => {
							navigation.navigate(game.name as any) //todo: fix
						}}
					>
						<Text>{game.name}</Text>
					</FocusableButton>
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
})

export default GamesPicker
