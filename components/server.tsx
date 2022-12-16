import React, { useState } from 'react'
import { View, TextInput, Button, Text } from 'react-native'
import { SocketModuleServer } from '../modules/SocketModule'
const Server = ({ broadcastMessage, stop }: { broadcastMessage: (message: string) => void; stop: () => void }) => {
	const [message, setMessage] = useState<string>('')
	return (
		<View>
			<Text style={{ backgroundColor: 'red' }}>Connected as Server</Text>
			<TextInput onChangeText={setMessage} value={message}></TextInput>
			<Button
				title="Broadcast Message"
				onPress={() => {
					broadcastMessage(message)
					setMessage('')
				}}
			></Button>
			<Button
				title="Stop Server"
				onPress={() => {
					stop()
				}}
			></Button>
		</View>
	)
}
export default Server
