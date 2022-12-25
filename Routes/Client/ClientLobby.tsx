import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { SocketModuleClient } from '../../modules/SocketModule'
import { ClientNavigatorStackParams } from './ClientNavigator'

type ClientLobbyParams = NativeStackScreenProps<ClientNavigatorStackParams, 'ClientLobby'>

const ClientLobby = ({ navigation }: ClientLobbyParams) => {
	const [name, setName] = useState(SocketModuleClient.getInstance().name)
	useEffect(() => {
		const gameStartListener = SocketModuleClient.getInstance().addJsonListener((json) => {
			if (json.gameStart) {
				navigation.navigate(json.gameStart)
			}
		})
		return () => {
			gameStartListener.remove()
		}
	}, [])
	return (
		<View style={styles.container}>
			<Text style={styles.info}>Waiting for game start</Text>
			<TextInput
				style={styles.input}
				placeholder="Change name.."
				defaultValue={SocketModuleClient.getInstance().name}
				onChangeText={setName}
			></TextInput>
			<TouchableHighlight
				style={styles.okButton}
				onPress={() => {
					SocketModuleClient.getInstance().name = name
				}}
			>
				<Text>Set name</Text>
			</TouchableHighlight>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	info: {
		fontSize: 22,
	},
	input: {
		width: '80%',
		height: 40,
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		marginVertical: 10,
	},
	okButton: {
		width: '80%',
		padding: 15,
		backgroundColor: '#0f0',
		alignItems: 'center',
		justifyContent: 'center',
	},
})

export default ClientLobby
