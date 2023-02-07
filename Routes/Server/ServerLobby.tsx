import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { RootStackParams } from '../../App'
import { FocusableButton } from '../../components/Focusables'
import PlayerCard, { Player } from '../../components/PlayerCard'
import { SocketModuleServer } from '../../modules/SocketModule'
import { GameNavigatorStackParams } from './Games/GameNavigator'
import { ServerNavigatorStackParams } from './ServerNavigator'

type ServerLobbyProps = NativeStackScreenProps<ServerNavigatorStackParams, 'ServerLobby'>

const ServerLobby = ({ navigation }: ServerLobbyProps) => {
	useEffect(() => {
		const { addListener, addJsonListener, connectedClients } = SocketModuleServer.getInstance()
		const newPlayerListener = addListener('ServerOnOpen', (clientAddress) => {
			console.log('new connection: ' + clientAddress)
			connectedClients.set(clientAddress, { name: '' })
			setPlayers(new Map(connectedClients))
		})
		addListener('ServerOnClose', (clientAddress) => {
			console.log('client disc ' + clientAddress)
			connectedClients.delete(clientAddress)
			setPlayers(new Map(connectedClients))
		})
		addJsonListener((id, data) => {
			const client = connectedClients.get(id)
			if (data.setName && client) {
				client.name = data.setName
				setPlayers(new Map(connectedClients))
			}
		})
		return () => {
			newPlayerListener.remove()
		}
	}, [])

	const [players, setPlayers] = useState<Map<Player[0], Player[1]>>(new Map())
	const playersToDraw = Array.from(players)
	console.log(playersToDraw)
	return (
		<View style={styles.container}>
			<View style={styles.topHalf}>
				<Text style={styles.addressLineLabel}>To connect, write this in your phone.</Text>
				<Text style={styles.addressLine}>{SocketModuleServer.getInstance().address}</Text>
				<FocusableButton
					style={styles.proceedButton}
					onPress={() => {
						navigation.navigate('GameNavigator')
					}}
					initialFocus={true}
				>
					<Text>Proceed</Text>
				</FocusableButton>
			</View>
			<View style={styles.bottomHalf}>
				{[...Array(4)].map((_, index) => {
					const playerToDraw = playersToDraw[index]
					return (
						<View key={index} style={styles.playerWrapper}>
							<PlayerCard
								player={playerToDraw}
								onPress={() => {
									// Todo: show some context menu to kick player off
									console.log(playerToDraw && playerToDraw[0])
								}}
							/>
						</View>
					)
				})}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#4E4B5C',
		alignItems: 'center',
		justifyContent: 'center',
	},
	topHalf: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		borderBottomColor: 'black',
		borderBottomWidth: 0.2,
	},
	bottomHalf: {
		width: '100%',
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'space-around',
		alignContent: 'center',
	},
	addressLine: {
		color: 'black',
		fontSize: 34,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	addressLineLabel: {
		color: 'black',
		fontSize: 16,
		textAlign: 'center',
	},
	proceedButton: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		borderRadius: 10,
		borderWidth: 0.5,
		backgroundColor: 'azure',
	},
	proceedButtonText: {
		fontSize: 32,
		color: 'black',
	},
	playerWrapper: {
		width: '20%',
		backgroundColor: 'white',
	},
})

export default ServerLobby
