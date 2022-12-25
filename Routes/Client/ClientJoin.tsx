import { useFocusEffect } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { SocketModuleClient } from '../../modules/SocketModule'
import { ClientNavigatorStackParams } from './ClientNavigator'

type ClientJoinParams = NativeStackScreenProps<ClientNavigatorStackParams, 'ClientJoin'>

const ClientJoin = ({ navigation }: ClientJoinParams) => {
	const [serverAddress, setServerAddress] = useState('ws://10.0.2.2:4444')
	const [waitingForConnection, setWaitingForConnection] = useState(false)

	useFocusEffect(() => {
		console.log('Client join rendered, calling disconnect')
		SocketModuleClient.getInstance().disconnect()
	})

	return (
		<View style={styles.container}>
			{waitingForConnection ? (
				<Text style={styles.label}>Waiting to be connected</Text>
			) : (
				<>
					<TextInput
						style={styles.input}
						value={serverAddress}
						onChangeText={setServerAddress}
						placeholder="Enter server address `ws://...`"
					/>
					<TouchableOpacity
						style={styles.okButton}
						onPress={() => {
							console.log({ serverAddress })
							SocketModuleClient.getInstance().attachClient(serverAddress, () => {
								const clientCloseListener = SocketModuleClient.getInstance().addListener('ClientOnClose', () => {
									console.log('Client closed')
									navigation.navigate('ClientJoin')
									clientCloseListener.remove()
								})
								navigation.navigate('ClientLobby')
							})
						}}
					>
						<Text style={styles.okButtonText}>OK</Text>
					</TouchableOpacity>
				</>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	label: {
		fontSize: 16,
		textAlign: 'center',
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
	okButtonText: {
		fontSize: 20,
		color: '#fff',
	},
})

export default ClientJoin
