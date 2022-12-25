import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

export type Player = [
	address: string,
	player: {
		name?: string
	},
]
const PlayerCard = (props: { player?: Player; onPress: () => void }) => {
	const { player, onPress } = props
	const name = player ? player[1].name : null

	return (
		<TouchableOpacity style={styles.playerCard} onPress={onPress}>
			<Image
				style={styles.playerImage}
				source={name != null ? require('./../assets/player-active.png') : require('./../assets/player-inactive.png')}
			/>
			<Text style={styles.playerLabel}>{player ? name || player[0] : 'Join'}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	playerCard: {
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 10,
	},
	playerImage: {
		width: '100%',
		aspectRatio: 1,
	},
	playerLabel: {
		fontSize: 12,
		textAlign: 'center',
		borderWidth: 1,
		borderColor: 'grey',
		borderRadius: 15,
		opacity: 70,
		paddingHorizontal: 15,
		paddingVertical: 5,
		width: '100%',
		fontWeight: 'bold',
	},
})

export default PlayerCard
