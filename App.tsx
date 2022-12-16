/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState } from 'react'
import {
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	useColorScheme,
	View,
	TextInput,
	TouchableHighlight,
	TouchableNativeFeedback,
} from 'react-native'

import { Colors, Header } from 'react-native/Libraries/NewAppScreen'

import { SocketModuleServer, SocketModuleClient } from './modules/SocketModule'
const server = new SocketModuleServer()
const client = new SocketModuleClient()

import { Platform } from 'react-native'
import Client from './components/client'
import Server from './components/server'
import { FocusableButton } from './components/Focusables'

const App = () => {
	const [eventLog, setEventLog] = useState<string[]>([])
	const [clientAddress, setClientAddress] = useState<string>('ws://192.168.0.142:5883')
	const [serverPort, setServerPort] = useState<number>(5993)
	const [connectionType, setConnectionType] = useState<'server' | 'client'>()

	function attachClientLogger() {
		client.addListener('ClientOnClose', (message: string) => {
			logEvent(message, 'ClientOnClose')
		})
		client.addListener('ClientOnError', (message: string) => {
			logEvent(message, 'ClientOnError')
		})
		client.addListener('ClientOnMessage', (message: string) => {
			logEvent(message, 'ClientOnMessage')
		})
		client.addListener('ClientOnOpen', (message: string) => {
			logEvent(message, 'ClientOnOpen')
		})
	}

	function attachServerLogger() {
		server.addListener('ServerOnClose', (message: string) => {
			logEvent(message, 'ServerOnClose')
		})
		server.addListener('ServerOnError', (message: string) => {
			logEvent(message, 'ServerOnError')
		})
		server.addListener('ServerOnMessage', (message: string) => {
			console.log(message)
			logEvent(message, 'ServerOnMessage')
		})
		server.addListener('ServerOnStart', (message: string) => {
			logEvent(message, 'ServerOnStart')
		})
	}

	function logEvent(text: string, tag?: string) {
		eventLog.push(`[${tag}]  ${text}`)
		setEventLog([...eventLog])
	}
	function logError(text: string) {
		logEvent(`error: ${text}`)
	}

	function MainContainer(props: { connectionType?: string }) {
		if (connectionType == 'server') {
			return (
				<>
					<Text>Server started</Text>
				</>
			)
		} else if (connectionType == 'client') {
			return (
				<>
					<Text>Client connected</Text>
				</>
			)
		} else {
			return (
				<>
					<FocusableButton
						onPress={() => {
							server.startServer(serverPort || 5993).then((serverAddress) => {
								logEvent('Server started at device address: ' + serverAddress, 'server')
								attachServerLogger()
							})
							setConnectionType('server')
						}}
						title="Create server"
					/>

					<FocusableButton
						onPress={() => {
							attachClientLogger()
							//TODO: create the client connection
						}}
						title="Connect as client"
					/>
				</>
			)
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentInsetAdjustmentBehavior="automatic">
				<View style={styles.containerSection}>
					{eventLog.map((event, index) => {
						return <Text key={index}>{event}</Text>
					})}
				</View>
				<View style={styles.containerSection}>
					<MainContainer connectionType={connectionType} />
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#E4D0D9',
		flexDirection: 'row',
		flex: 1,
	},
	containerSection: {
		flex: 1,
		padding: 15,
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default App
