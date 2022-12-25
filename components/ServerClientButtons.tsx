import React, { useState } from 'react'
import { View, StyleSheet, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { SocketModuleClient, SocketModuleServer } from '../modules/SocketModule'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParams } from '../App'

type HomeViewProps = NativeStackScreenProps<RootStackParams, 'Home'>

const ServerClientButtons = (props: HomeViewProps) => {
	const { navigation } = props

	function handleStartServer() {
		SocketModuleServer.getInstance().startServer(undefined, () => {
			navigation.navigate('ServerNavigator', { screen: 'ServerLobby' })
		})
	}

	return (
		<View style={styles.container}>
			<View style={styles.buttonContainer}>
				<Button title="Start Server" onPress={handleStartServer} />
			</View>
			<View style={styles.buttonContainer}>
				<Button
					title="Join as Client"
					onPress={() => navigation.navigate('ClientNavigator', { screen: 'ClientJoin' })}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonContainer: {
		width: '50%',
		height: '50%',
		alignItems: 'center',
		justifyContent: 'center',
	},
})

export default ServerClientButtons
