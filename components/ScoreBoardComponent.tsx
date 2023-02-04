import { ScoreBoard } from '../hooks/usePlayersScore'
import { StyleSheet, Text, View } from 'react-native'
import React, { PropsWithChildren, useState } from 'react'
import { SocketModuleServer } from '../modules/SocketModule'

type ScoreBoardProps = React.FC<PropsWithChildren<{ score: ScoreBoard }>>
const ScoreBoardComponent: ScoreBoardProps = ({ score, children }) => {
	const { connectedClients } = SocketModuleServer.getInstance()
	return (
		<View style={styles.container}>
			<View style={styles.scoreBoard}>
				{[...score].map(([playerAddress, value], index) => {
					return (
						<View key={index} style={styles.player}>
							<Text>{connectedClients.get(playerAddress)?.name || playerAddress}</Text>
							<Text>{value}</Text>
						</View>
					)
				})}
			</View>
			{children}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
	},
	scoreBoard: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	player: {
		display: 'flex',
		backgroundColor: 'white',
		width: 160,
		justifyContent: 'space-around',
		alignItems: 'center',
		flexDirection: 'column',
		borderWidth: 1,
		borderColor: 'black',
		margin: 15,
		borderRadius: 15,
	},
})

export default ScoreBoardComponent
