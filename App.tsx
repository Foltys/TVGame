/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState, type PropsWithChildren } from 'react'
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
	DeviceEventEmitter,
} from 'react-native'

import {
	Colors,
	DebugInstructions,
	Header,
	LearnMoreLinks,
	ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen'

import { SocketModuleServer, SocketModuleClient } from './modules/SocketModule'
const server = new SocketModuleServer()
const client = new SocketModuleClient()

import { Platform } from 'react-native'

const Section: React.FC<
	PropsWithChildren<{
		title: string
		messages: string[]
	}>
> = ({ children, title, messages }) => {
	const isDarkMode = useColorScheme() === 'dark'
	return (
		<View style={styles.sectionContainer}>
			<Text
				style={[
					styles.sectionTitle,
					{
						color: isDarkMode ? Colors.white : Colors.black,
					},
				]}
			>
				{title}
			</Text>
			{messages.map((message, index) => {
				return <Text key={index}>{message}</Text>
			})}
		</View>
	)
}

const App = () => {
	const [messages, setMessages] = useState<string[]>([])
	const [connectedToServer, setConnectedToServer] = useState<boolean>(false)

	useEffect(() => {
		console.log('Triggered use effect')
		if (!connectedToServer) {
			server
				.startServer(8431)
				.then((ip: string) => {
					console.log({ ip })
					setConnectedToServer(true)
					server.addListener('ServerOnMessage', (msg: string) => {
						console.log({ msg })
						messages.push(msg)
						setMessages([...messages])
					})
					client.addListener('ClientOnMessage', (msg: string) => {
						console.log({ msg })
					})
					return client.attachClient(`ws:/${ip}`)
				})
				.then(console.log)
				.catch(console.error)
		}
	}, [])
	const isDarkMode = useColorScheme() === 'dark'

	let running_on_android_tv = Platform.isTV

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	}

	return (
		<SafeAreaView style={backgroundStyle}>
			<StatusBar
				barStyle={isDarkMode ? 'light-content' : 'dark-content'}
				backgroundColor={backgroundStyle.backgroundColor}
			/>
			<ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
				<Header />
				<View
					style={{
						backgroundColor: isDarkMode ? Colors.black : Colors.white,
					}}
				>
					<Section title="Step One" messages={messages}>
						Running on tv: {running_on_android_tv.toString()}
					</Section>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: '600',
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: '400',
	},
	highlight: {
		fontWeight: '700',
	},
})

export default App
