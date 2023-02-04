import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { SocketModuleServer } from '../modules/SocketModule'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParams } from '../App'
import { FocusableButton } from './Focusables'

type HomeViewProps = NativeStackScreenProps<RootStackParams, 'Home'>

const ServerClientButtons = (props: HomeViewProps) => {
	const { navigation } = props

	function handleStartServer() {
		SocketModuleServer.getInstance().startServer(undefined, () => {
			navigation.navigate('ServerNavigator', { screen: 'ServerLobby' })
		})
	}
	const handleJoinClient = () => navigation.navigate('ClientNavigator', { screen: 'ClientJoin' })

	return (
		<View style={styles.container}>
			<FocusableButton style={styles.buttonContainer} onPress={handleStartServer} initialFocus>
				<Text adjustsFontSizeToFit>Start Server</Text>
			</FocusableButton>
			<FocusableButton style={styles.buttonContainer} onPress={handleJoinClient}>
				<Text adjustsFontSizeToFit>Join as Client</Text>
			</FocusableButton>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	buttonContainer: {
		width: '45%',
		height: '45%',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 15,
	},
})

export default ServerClientButtons
